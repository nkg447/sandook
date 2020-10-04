import ApiService from '../api/ApiService';
import { GET_FILE_META, NEW_FOLDER } from '../api/file/types';
import { QueryParams, QueryPath } from '../api/QueryPath';
import * as services from '../api/ServiceType';
import AppSettings from '../AppSettings';
import { File } from '../types/file';

const DOWNLOAD_FILE_PATH = '/api/file';
const UPLOAD_FILE_PATH = '/api/file';

class FileService {
  protected apiService: ApiService = new ApiService(services.FileService);

  public constructor() {}

  public getMetaData(path: string) {
    const queryParams: QueryParams = {
      path
    };
    const queryPath: QueryPath = new QueryPath(GET_FILE_META, queryParams);
    return new Promise<File[] | Error>((resolve, reject) => {
      this.apiService
        .get<File[]>(queryPath)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  public download(path: string) {
    const iFrame = document.getElementById('download_iframe');
    if (iFrame)
      iFrame.setAttribute(
        'src',
        `${AppSettings.server.baseUrl}${DOWNLOAD_FILE_PATH}?path=${path}`
      );
  }

  public upload(
    file: any,
    path: string,
    progressHandler: (this: XMLHttpRequestUpload) => void
  ) {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append('multipartFile', file);
    xhr.upload.addEventListener('progress', progressHandler, false);
    xhr.addEventListener(
      'error',
      () => {
        console.log('failed');
      },
      false
    );
    xhr.open(
      'POST',
      `${AppSettings.server.baseUrl}${UPLOAD_FILE_PATH}?path=${path}`
    );
    xhr.send(fd);
  }

  public newFolder(path: string, folderName: string) {
    const queryParams: QueryParams = {
      path,
      folderName
    };
    const queryPath: QueryPath = new QueryPath(NEW_FOLDER, queryParams);
    return new Promise<any>((resolve, reject) => {
      this.apiService
        .get<any>(queryPath)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  public delete(path: string) {
    const queryParams: QueryParams = {
      path
    };
    const queryPath: QueryPath = new QueryPath([], queryParams);
    return new Promise<any>((resolve, reject) => {
      this.apiService
        .delete<any>(queryPath)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  public rename(srcPath: string, destPath: string) {
    const queryParams: QueryParams = {
      srcPath,
      destPath
    };
    const queryPath: QueryPath = new QueryPath([], queryParams);
    return new Promise<any>((resolve, reject) => {
      this.apiService
        .put<any>(queryPath)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  public uploadFromUrl(path: string, url: string) {
    const queryParams: QueryParams = {
      path,
      url
    };
    const queryPath: QueryPath = new QueryPath(['fromUrl'], queryParams);
    return new Promise<any>((resolve, reject) => {
      this.apiService
        .get<any>(queryPath)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}
const service = new FileService();

export default service;
