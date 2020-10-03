import 'reflect-metadata';

import del from 'del';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { inject, injectable } from 'inversify';
import _path from 'path';
import request from 'request';

import { io } from '../../';
import Config from '../../config/';
import { ControllerError, ControllerSuccess } from '../../core/controller/definition';
import { TYPES } from '../../di/types';
import { File } from '../../entity/file';
import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import { info } from '../../event/sys-log/';
import IFileService from '../../service/file';
import { analyseAndCreateMetaFile, ensurePath } from '../../util/FileUtil';

/* tslint:disable-next-line:no-var-requires */
const progress = require('request-progress');

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

  public uploadFromUrl(path: string, url: string) {
    const absolutePath = _path.join(Config.basePath, path);
    const socketEvent = `/download?path=${path}`;
    progress(request(url), {
      throttle: 2000 // Throttle the progress event to 2000ms, defaults to 1000ms
      // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms
      // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length
    })
      .on('progress', (state: any) => {
        // The state is an object that looks like this:
        // {
        //     percent: 0.5,               // Overall percent (between 0 to 1)
        //     speed: 554732,              // The download speed in bytes/sec
        //     size: {
        //         total: 90044871,        // The total payload size in bytes
        //         transferred: 27610959   // The transferred payload size in bytes
        //     },
        //     time: {
        //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals)
        //         remaining: 81.403       // The remaining seconds to finish (3 decimals)
        //     }
        // }
        io.sockets.emit(socketEvent, {
          ...state,
          status: 'downloading'
        });
      })
      .on('error', (err: any) => {
        io.sockets.emit(socketEvent, { ...err, status: 'error' });
      })
      .on('end', () => {
        io.sockets.emit(socketEvent, { status: 'done' });
      })
      .pipe(
        fs.createWriteStream(
          _path.join(Config.basePath, absolutePath, _path.basename(url))
        )
      );
  }
}
