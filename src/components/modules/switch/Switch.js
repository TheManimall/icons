import React from 'react';
import PropTypes from 'prop-types';
import { easing, pointer, trackOffset, transform } from 'popmotion';

export default class Switch extends React.Component {
  static propTypes = {
    ariaLabel:       PropTypes.string,
    checked:         PropTypes.bool,
    className:       PropTypes.string,
    disabled:        PropTypes.bool,
    handleColor:     PropTypes.string,
    name:            PropTypes.string,
    offColor:        PropTypes.string,
    onChange:        PropTypes.func,
    onColor:         PropTypes.string,
    pendingOffColor: PropTypes.string,
    pendingOnColor:  PropTypes.string,
    readOnly:        PropTypes.bool,
    style:           PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    width:           PropTypes.number
  };

  static defaultProps = {
    ariaLabel:       'Switch',
    checked:         false,
    className:       '',
    disabled:        false,
    handleColor:     'white',
    name:            'switch',
    offColor:        'white',
    onChange:        () => {},
    onColor:         'rgb(76, 217, 100)',
    pendingOffColor: undefined,
    pendingOnColor:  undefined,
    readOnly:        false,
    style:           {},
    width:           50
  };

  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      offset:     null
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  getHandleCursor = () => {
    if (this.isDisabled()) {
      return 'default';
    }

    return this.state.isDragging ? 'grabbing' : 'grab';
  };

  getHandleLength = () => this.getHeight() - 2;

  getHeight = () => 30;

  getOffset = () => {
    if (this.state.isDragging) {
      return this.state.offset;
    }

    return this.props.checked ? this.getOffsetWidth() : 0;
  };

  getOffsetProgress = () => this.getOffset() / this.getOffsetWidth();

  getOffsetWidth = () => this.props.width - this.getHandleLength() - 2;

  getPendingColor = ({ color, pendingColor }) => {
    if (!pendingColor) {
      return color === 'white' ? '#dfdfdf' : color;
    }

    return pendingColor;
  };

  getPendingOffColor = () =>
    this.getPendingColor({
      color:        this.props.offColor,
      pendingColor: this.props.pendingOffColor
    });

  getPendingOnColor = () =>
    this.getPendingColor({
      color:        this.props.onColor,
      pendingColor: this.props.pendingOnColor
    });

  setRef = ref => {
    this.ref = ref;
  };

  handleMouseUp = () => {
    if (!this.state.isDragging) {
      return;
    }

    this.pointerTracker.stop();
    this.offsetTracker.stop();

    const prevOffset = this.props.checked ? this.getOffsetWidth() : 0;
    const checked =
      this.state.offset === prevOffset
        ? // handle case when the handle is clicked
        !this.props.checked
        : // handle case when the handle is dragged
        this.getOffsetProgress() >= 0.5;

    this.setState({
      isDragging: false,
      offset:     null
    });

    this.clickChange(checked);
  };

  handleOnKeyDown = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      this.handleClick(e);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  isDisabled = () => this.props.disabled || this.props.readOnly;

  handleMouseDown = e => {
    if (this.isDisabled()) {
      return;
    }

    this.pointerTracker = pointer(e).start();

    this.offsetTracker = trackOffset(this.pointerTracker.x, {
      from:     this.getOffset(),
      onUpdate: transform.pipe(
        transform.clamp(0, this.getOffsetWidth()),
        offset => this.setState({ offset })
      )
    }).start();

    this.setState({
      isDragging: true,
      offset:     this.getOffset()
    });
  };

  handleHandleClick = e => {
    e.stopPropagation();
  };

  handleClick = () => {
    if (this.isDisabled()) {
      return;
    }

    // handle case when the switch is clicked
    this.clickChange(!this.props.checked);
  };

  handleChange = e => {
    this.props.onChange(e.target.checked);
  };

  clickChange = checked => {
    if (this.ref.parentNode && this.ref.parentNode.tagName.toLowerCase() === 'label') {
      // if the parent is a label, we don't need to emit the change event ourselves
      return;
    }

    this.props.onChange(checked);
  };

  render() {
    const {
      ariaLabel,
      checked,
      className,
      disabled,
      handleColor,
      name,
      offColor,
      readOnly,
      onColor,
      style,
      width
    } = this.props;

    const { isDragging } = this.state;

    const color = transform.pipe(
      easing.createExpoIn(2),
      transform.blendColor(offColor, onColor),
      transform.rgba
    )(this.getOffsetProgress());

    const borderColor = transform.pipe(
      easing.createExpoIn(1),
      transform.blendColor(this.getPendingOffColor(), this.getPendingOnColor()),
      transform.rgba
    )(this.getOffsetProgress());

    return (
      <div
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-readonly={readOnly}
        className={className}
        ref={this.setRef}
        style={{ display: 'inline-block', ...style }}
        tabIndex="0"
        role="switch"
        onKeyDown={this.handleOnKeyDown}
      >
        <span
          onClick={this.handleClick}
          onKeyDown={this.handleOnKeyDown}
          role="presentation"
          style={{
            backgroundColor:  color,
            border:           `1px solid ${borderColor}`,
            borderRadius:     this.getHeight() / 2,
            boxShadow:        `inset 0 0 0 ${this.getOffset()}px ${borderColor}`,
            boxSizing:        'border-box',
            display:          'inline-block',
            height:           this.getHeight(),
            opacity:          this.isDisabled() ? 0.5 : 1,
            position:         'relative',
            transition:       isDragging ? null : '0.2s',
            userSelect:       'none',
            msUserSelect:     'none',
            WebkitUserSelect: 'none',
            width
          }}
        >
          <span
            onClick={this.handleHandleClick}
            onMouseDown={this.handleMouseDown}
            role="presentation"
            style={{
              backgroundColor: handleColor,
              borderRadius:    '100%',
              boxShadow:       '0 1px 3px rgba(0, 0, 0, 0.4)',
              cursor:          this.getHandleCursor(),
              display:         'inline-block',
              height:          this.getHandleLength(),
              left:            this.getOffset(),
              position:        'absolute',
              top:             0,
              transition:      isDragging ? null : '0.2s',
              width:           this.getHandleLength()
            }}
          />
          <input
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={this.handleChange}
            readOnly={readOnly}
            style={{
              display: 'none'
            }}
            type="checkbox"
          />
        </span>
      </div>
    );
  }
}
