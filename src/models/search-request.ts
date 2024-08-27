export type SearchRequest = {
  env: string;
  trackingId?: string;
  source?: string;
  fromDate?: Date;
  toDate?: Date;
  requestText?: string;
  responseText?: string;
};
