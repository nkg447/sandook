import 'reflect-metadata';

import del from 'del';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { inject, injectable } from 'inversify';
import _path from 'path';
import wget from 'wget-improved';

import { io } from '../../';
import Config from '../../config/';
import { ControllerError, ControllerSuccess } from '../../core/controller/definition';
import { TYPES } from '../../di/types';
import { File } from '../../entity/file';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import { info } from '../../event/sys-log/';
import IFileService from '../../service/file';
import { analyseAndCreateMetaFile, ensurePath } from '../../util/FileUtil';

@injectable()
export default class FileController implements IFileService {
  public fetch(path: string) {
    info(`Fetching metadata for "${path}"`);
    return new Promise<StandardError | File[]>(async (resolve, reject) => {
      try {
        const metaFilePath = _path.join(Config.basePath, path, Config.metaFile);
        fs.readFile(metaFilePath, (err, data) => {
          if (err) {
            reject(new ControllerError(err.message));
          } else {
            const result: File[] = JSON.parse(data.toString('utf8'));
            resolve(result);
          }
        });
      } catch (err) {
        reject(new ControllerError(err.message));
      }
    });
  }

  public upload(path: string, files: fileUpload.FileArray) {
    return new Promise<StandardError | StandardSuccess>(
      async (resolve, reject) => {
        const uploadPromises = Object.keys(files)
          .map((key) => files[key])
          .map((file) => {
            info(`Uploading file "${file.name}" at "${path}"`);
            const uploadPath = _path.join(Config.basePath, path);
            ensurePath(uploadPath);
            return new Promise<string>((res, rej) => {
              file.mv(_path.join(uploadPath, file.name), (err) => {
                if (err) {
                  rej(err);
                  return;
                }
                res(file.name);
              });
            });
          });
        Promise.all(uploadPromises)
          .then((data) => resolve(new ControllerSuccess(data.toString())))
          .catch((err) => reject(new ControllerError(err)));
      }
    );
  }

  public download(path: string) {
    info(`Downloading file at "${path}"`);
    return new Promise<StandardError | string>(async (resolve, reject) => {
      try {
        const filePath = _path.join(Config.basePath, path);
        resolve(filePath);
      } catch (err) {
        reject(new ControllerError(err.message));
      }
    });
  }

  public remove(path: string) {
    return new Promise<StandardError | StandardSuccess>(
      async (resolve, reject) => {
        try {
          const absolutePath = _path.join(Config.basePath, path);
          if (fs.statSync(absolutePath).isDirectory()) {
            del(absolutePath, { force: true }).then((data) =>
              analyseAndCreateMetaFile(_path.dirname(absolutePath))
            );
          } else {
            fs.unlinkSync(absolutePath);
          }
          info(`Deleted "${path}"`);
          resolve(new ControllerSuccess(`Deleted "${path}"`));
        } catch (err) {
          info(`Unable to delete "${path}"`);
          reject(new ControllerError(err));
        }
      }
    );
  }

  public newFolder(path: string, folderName: string) {
    return new Promise<StandardError | StandardSuccess>((resolve, reject) => {
      try {
        const absolutePath = _path.join(Config.basePath, path, folderName);
        ensurePath(absolutePath);
        analyseAndCreateMetaFile(absolutePath);
        info(`"${folderName}" folder created at ${path}`);
        resolve(
          new ControllerSuccess(`"${folderName}" folder created at ${path}`)
        );
      } catch (err) {
        info(`Unable to create new folder "${folderName}" at ${path}`);
        reject(new ControllerError(err));
      }
    });
  }

  public rename(srcPath: string, destPath: string) {
    return new Promise<StandardError | StandardSuccess>((resolve, reject) => {
      try {
        const srcAbsolutePath = _path.join(Config.basePath, srcPath);
        const destAbsolutePath = _path.join(Config.basePath, destPath);
        fs.rename(srcAbsolutePath, destAbsolutePath, (err) => {
          if (err) {
            reject(new ControllerError(err.message));
          } else {
            info(`"${srcPath}" renamed as ${destPath}`);
            resolve(
              new ControllerSuccess(`"${srcPath}" renamed as ${destPath}`)
            );
          }
        });
      } catch (err) {
        info(`Unable to rename "${srcPath}" as ${destPath}`);
        reject(new ControllerError(err));
      }
    });
  }

  private fileExist(file: string): boolean {
    try {
      const stat = fs.statSync(file);
      return stat.isDirectory();
    } catch (err) {
      return false;
    }
  }

  public uploadFromUrl(path: string, url: string) {
    const absolutePath = _path.join(Config.basePath, path);
    const socketEvent = `/download?path=${_path.join(
      path,
      _path.basename(url)
    )}`;
    const fileName = _path.basename(url).substring(0, 50);
    const filePath = this.fileExist(absolutePath)
      ? _path.join(absolutePath, fileName)
      : absolutePath;
    const file = new File({
      path: this.fileExist(absolutePath) ? _path.join(path, fileName) : path,
      isDir: false
    });
    return new Promise<File | StandardError>((resolve, reject) => {
      try {
        const download = wget.download(url, filePath);
        let intervalId: NodeJS.Timeout;
        let progress: any = 0;
        download.on('error', (err) => {
          console.log(err);
          reject(new ControllerError(err));
        });
        download.on('start', (fileSize) => {
          file.setProgress(1);
          resolve(file);
          io.sockets.emit(socketEvent, file);
        });
        download.on('end', (output) => {
          progress = 1;
          file.setProgress(100);
          io.sockets.emit(socketEvent, file);
          clearInterval(intervalId);
        });
        download.on('progress', (p) => {
          progress = p;
        });
        intervalId = setInterval(() => {
          file.setProgress(Number(progress) * 100);
          io.sockets.emit(socketEvent, file);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
