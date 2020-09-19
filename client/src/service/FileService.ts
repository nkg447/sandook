import ApiService from '../api/ApiService';
import { GET_FILE_META } from '../api/file/types';
import { QueryParams, QueryPath } from '../api/QueryPath';
import * as services from '../api/ServiceType';
import { File } from '../types/file';

class FileService {
  public apiService: ApiService = new ApiService(services.FileService);

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
}
const service = new FileService();

export default service;
