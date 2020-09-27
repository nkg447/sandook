import * as axios from 'axios';
import { resolve } from 'dns';

import AppSettings from '../AppSettings';
import AxiosInstance from './AxiosInstance';
import { QueryPath } from './QueryPath';
import { ServiceType } from './ServiceType';

export default class ApiService {
  protected readonly serviceType: ServiceType;

  public constructor(serviceType: ServiceType) {
    this.serviceType = serviceType;
  }

  public get<T = void>(path: QueryPath): Promise<T> {
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) => {
      instance
        .get(this.getUrl(path))
        .then((res) => resolve(res.data))
        .catch((err) => reject(this.processError(err)));
    });
  }

  public post<T = void>(path: QueryPath, body: any): Promise<T> {
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance.post(this.getUrl(path), body).then(
        (res: any) => {
          resolve(res.data.data ? res.data.data : res.data);
        },
        (err: any) => {
          reject(this.processError(err));
        }
      )
    );
  }

  public delete<T = void>(path: QueryPath): Promise<T> {
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance.delete(this.getUrl(path)).then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(this.processError(err));
        }
      )
    );
  }

  public put<T = void>(path: QueryPath): Promise<T> {
    const instance = this.getAxiosInstance();
    return new Promise<T>((resolve, reject) =>
      instance.put(this.getUrl(path)).then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(this.processError(err));
        }
      )
    );
  }

  public getAxiosInstance(): axios.AxiosInstance {
    const instance = AxiosInstance.create();
    return instance;
  }

  public processError(error: any): Error {
    const errorCode = error.response ? error.response.status || 500 : 500;

    switch (errorCode) {
      case 404:
        return new Error('The request is not found');
      case 500:
        return new Error('Internal server error');

      case 400:
      case 422: {
        if (error.response.data.errors) {
          const err = error.response.data.errors;

          if (err instanceof Array) {
            const errArr = err as any[];

            if (errArr.length > 0 && errArr[0]) {
              if ((errArr[0] as any).message) {
                return new Error(errArr[0].message.toString());
              } else if ((errArr[0] as any).Message) {
                return new Error(errArr[0].Message.toString());
              } else {
                return new Error(errArr[0].toString());
              }
            }
          } else if ((err as any).message) {
            return new Error((err as any).message.toString());
          } else if ((err as any).Message) {
            return new Error((err as any).Message.toString());
          } else {
            return new Error(err.toString());
          }
        }

        return new Error('Internal server error');
      }
    }
    return error;
  }

  protected getUrl(path: QueryPath): string {
    const baseUrl = AppSettings.server.baseUrl;
    let url: string = this.serviceType
      ? `${baseUrl}/${this.serviceType}`
      : `${baseUrl}`;

    if (path) {
      if (path.route && path.route.length > 0) {
        for (const route of path.route) {
          if (route && route !== 'undefined') {
            url += `/${route}`;
          }
        }
      }

      if (path.query) {
        let separator = '?';

        for (const name in path.query) {
          if (path.query[name]) {
            url += `${separator}${encodeURI(name)}=${encodeURI(
              path.query[name]!.toString()
            )}`;
            separator = '&';
          }
        }
      }
    }
    return url;
  }
}
