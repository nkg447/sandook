enum QueryType {
  GET_FILE_META = ''
}
export interface QueryParams {
  [key: string]: string;
}

export class QueryPath {
  public readonly route: string;
  public readonly query: QueryParams;

  public constructor(queryType: QueryType, query: QueryParams) {
    this.route = queryType.valueOf();
    this.query = query;
  }
}
