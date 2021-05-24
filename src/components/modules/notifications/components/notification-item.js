import { classes } from 'typestyle';
import { isNumber } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import { TdWindow } from '@td/utils';
import NotificationStyles, { notificationStyle } from '../styles';

class NotificationItem extends Component {
  constructor(props) {
    super(props);

    this.styles = new NotificationStyles({
      colors:     props.colors,
      typography: props.typography
    });
  }

  timeout = null;

  componentDidMount() {
    if (isNumber(this.props.duration)) {
      this.setDuration(this.dismissNotification, 20000);
    }
  }

  componentWillUnmount() {
    this.removeTimeout();
  }

  removeTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  setDuration = (fn, duration) =>
    (this.timeout = setTimeout(() => fn(), duration || 10000));

  dismissNotification = () => {
    const { notificationId } = this.props;

    this.removeTimeout();
    this.props.dismiss(notificationId);
  };

  renderMessage = props => {
    const noticeTypes = {
      startVideoNotification: consultationId => (
        <span>
          Your consultation is starting.
          <a
            onClick={() =>
              TdWindow.popup(`/video/${consultationId}`, 'videoWaitingRoom')
            }
          >
            Join consultation now
          </a>
        </span>
      )
    };

    if (props.link) {
      const {
        linkParams: { consultationId, noticeType }
      } = props;
      const linkToUse = noticeTypes[noticeType];
      return linkToUse(consultationId);
    }
    return renderHTML(props.message);
  };

  render() {
    const { messageType, style } = this.props;
    const notificationClasses = notificationStyle(messageType, this.styles);

    return (
      <div
        className={classes(this.styles.notification, notificationClasses)}
        style={style}
      >
        <p className={this.styles.message}>{this.renderMessage(this.props)}</p>
        <div
          className={this.styles.closeWrapper}
          onClick={this.dismissNotification}
        >
          <this.props.CloseIcon width="48" height="48" />
        </div>
      </div>
    );
  }
}
NotificationItem.propTypes = {
  messageType:    PropTypes.string,
  message:        PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  duration:       PropTypes.number,
  dismiss:        PropTypes.func,
  notificationId: PropTypes.string,
  style:          PropTypes.object,
  link:           PropTypes.bool,
  linkParams:     PropTypes.object,
  CloseIcon:      PropTypes.func.isRequired,
  colors:         PropTypes.object.isRequired,
  typography:     PropTypes.object.isRequired
};

export default NotificationItem;
