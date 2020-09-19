export interface QueryParams {
  [key: string]: string;
}

export class QueryPath {
  public readonly route: string[];
  public readonly query: QueryParams;

  public constructor(queryType: string[], query: QueryParams) {
    this.route = queryType;
    this.query = query;
  }
}
