import { dispatchNotification } from './actions';
import { NOTIFICATIONS } from './actionTypes';
import NotificationsComponent from './components/notifications';
import notificationsReducer from './reducers';
import { showNotificationEpic } from './epics';

const Notifications = {
  dispatchNotification,
  NOTIFICATIONS,
  notificationsReducer,
  showNotificationEpic,
  Component: NotificationsComponent
};

export default Notifications;
