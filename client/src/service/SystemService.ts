import ApiService from '../api/ApiService';
import { QueryParams, QueryPath } from '../api/QueryPath';
import * as services from '../api/ServiceType';
import AppSettings from '../AppSettings';
import { File } from '../types/file';

class SystemService {
  protected apiService: ApiService = new ApiService(services.SystemService);

  public constructor() {}

  public getSystemData() {
    const queryPath: QueryPath = new QueryPath([], {});
    return new Promise<File[] | Error>((resolve, reject) => {
      this.apiService
        .get<File[]>(queryPath)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}
const service = new SystemService();

export default service;
