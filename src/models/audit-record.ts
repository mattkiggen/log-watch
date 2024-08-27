export type AuditRecord = {
  trackingId?: string;
  action?: string;
  source?: string;
  destination?: string;
  eventDate?: Date;
  startTime?: Date;
  endTime?: Date;
  performance?: number;
  request?: object;
  response?: object;
  statusCode?: number;
  host?: string;
};
