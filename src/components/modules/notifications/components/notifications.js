import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NodeGroup from 'react-move/NodeGroup';
import NotificationItem from './notification-item';
import NotificationStyles, { animate } from '../styles';
import colors from '../../colors';
import typography from '../../typography';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = { notifications: [] };

    this.styles = new NotificationStyles({
      colors:     props.colors,
      typography: props.typography
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.validateProps(nextProps)) return false;

    this.setState((state, props) => ({
      notifications: props.bubble
        ? [...state.notifications, nextProps.notifications]
        : [nextProps.notifications]
    }));
  }

  componentDidUpdate() {
    if (this.props.sticky) {
      this.props.stickyParent(this.state.notifications);
    }
  }

  validateProps = nextProps => {
    const { notifications } = nextProps;

    return (
      !isEmpty(notifications) &&
      notifications.notificationKey === this.props.notificationKey
    );
  };

  dismissNotification = notificationId => {
    const { notifications } = this.state;
    this.setState({
      notifications: notifications.filter(
        notice => notice.notificationId !== notificationId
      )
    });
  };

  render() {
    const animationType = animate(this.props.transition);
    const { colors, typography, CloseIcon } = this.props;

    return (
      <NodeGroup
        data={this.state.notifications}
        keyAccessor={(d, i) => d.notificationId || i}
        start={() => animationType.start}
        enter={() => animationType.enter}
        update={() => animationType.update}
        leave={() => animationType.leave}
      >
        {nodes => (
          <div className={this.styles.notificationParent}>
            {nodes.map(({ key, data, state }) => (
              <NotificationItem
                key={key}
                CloseIcon={CloseIcon}
                colors={colors}
                typography={typography}
                style={animationType.animation(state)}
                notifyParent={this.removeNotice}
                dismiss={this.dismissNotification}
                duration={this.props.duration}
                {...data}
              />
            ))}
          </div>
        )}
      </NodeGroup>
    );
  }
}

Notifications.propTypes = {
  messageType:     PropTypes.string,
  message:         PropTypes.string,
  transition:      PropTypes.string,
  duration:        PropTypes.number,
  bubble:          PropTypes.bool,
  notificationKey: PropTypes.string,
  notifications:   PropTypes.object,
  stickyParent:    PropTypes.func,
  sticky:          PropTypes.bool,
  CloseIcon:       PropTypes.func.isRequired,
  colors:          PropTypes.object.isRequired,
  typography:      PropTypes.object.isRequired
};

Notifications.defaultProps = {
  colors:     colors.notifications,
  typography: typography
};
export default Notifications;
