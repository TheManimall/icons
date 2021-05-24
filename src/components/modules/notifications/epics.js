import { uniqueId } from 'lodash';
import { Observable } from 'rxjs';
import { NOTIFICATIONS } from './actionTypes';

const showNotificationEpic = action$ =>
  action$.ofType(NOTIFICATIONS.REQUEST).switchMap(action =>
    Observable.of({
      type:    NOTIFICATIONS.SHOW,
      payload: {
        notificationId:  uniqueId('notification'),
        notificationKey: action.payload.notificationKey,
        messageType:     action.payload.messageType,
        message:         action.payload.message,
        link:            action.payload.link,
        linkParams:      action.payload.linkParams
      }
    })
  );

export { showNotificationEpic };
