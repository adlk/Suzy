import { INotification } from 'common/types/notification';
import moment from 'moment';

export function transform(data: INotification): INotification {
  return Object.assign(data, {
    reason: formatReason(data.reason),
    body: cleanUpBody(data.body || ''),
    updatedAt: formatUpdatedAt(data.updatedAt),
  });
}

export function cleanUpBody(body: string) {
  return body.replace('(?s)<!--\\[if(.*?)\\[endif\\] *-->', '');
}

export function formatReason(reason: string) {
  return reason.replace('_', ' ');
}

export function formatUpdatedAt(date: string) {
  return moment(date).fromNow();
}
