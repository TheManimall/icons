import { NOTIFICATIONS } from './actionTypes';

const dispatchNotification = payload => ({
  type: NOTIFICATIONS.REQUEST,
  payload
});

export { dispatchNotification };
