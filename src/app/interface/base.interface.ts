export interface Response{
  status: number,
  data: any;
  message: string,
}

export interface Pagination{
  current_page: number;
  total: number;
  last_page: number;
  per_page: number;
  next_page: number|null;
  query_param: string;
}
