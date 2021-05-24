import { NOTIFICATIONS } from './actionTypes';

const INITIAL_STATE = {};
const notificationsReducer = (state = INITIAL_STATE, action) => {
  const { SHOW } = NOTIFICATIONS;
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        notificationKey: action.payload.notificationKey,
        messageType:     action.payload.messageType,
        message:         action.payload.message,
        link:            action.payload.link,
        linkParams:      action.payload.linkParams
      };
    default:
      return state;
  }
};

export default notificationsReducer;
