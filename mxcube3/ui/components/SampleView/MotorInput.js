import React from 'react';
import cx from 'classnames'
import { Button } from 'react-bootstrap';
import PopInput from '../PopInput/PopInput';

export default class MotorInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.abort = this.abort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.refs.motorValue.value = nextProps.value.toFixed(this.props.decimalPoints);
    }
  }

  handleKey(e) {
    e.preventDefault();
    e.stopPropagation();
    if ([13, 38, 40].includes(e.keyCode)) {
      this.props.save(e.target.name, e.target.valueAsNumber);
    }
  }

  handleClick(e) {
    if (e.target.valueAsNumber != this.props.value.toFixed(this.props.decimalPoints)) {
      this.props.save(e.target.name, e.target.valueAsNumber);
    }
  }

  abort(name) {
    this.props.abort(name);
  }

  render() {
    const { value, motorName, step, suffix, decimalPoints } = this.props;
    const valueCropped = value.toFixed(decimalPoints);

    let inputCSS = cx('form-control input-sm', {
      active: this.props.state === 4,
      success: this.props.state === 2,
      error: this.props.state === 3,
      warning: this.props.state === 1
    });

    let data = { state: 'IMMEDIATE', value: step }

    return (
          <form className="inline form-inline form-group" onSubmit={this.handleKey} noValidate>
              <input
                ref="motorValue"
                className={inputCSS}
                onKeyUp={this.handleKey}
                onClick={this.handleClick}
                type="number" 
                step={step}
                defaultValue={valueCropped}
                name={motorName}
                disabled={this.props.state !== 2}
              />
              {this.props.saveStep ?
                <span>
                  <Button
                    bsStyle="default"
                    className="btn-sm"
                    disabled={this.props.state !== 4}
                    onClick={this.abort}
                  >
                    <i className="glyphicon glyphicon-remove" />
                  </Button>
                  <PopInput
                    className="step-size"
                    ref={motorName} name="Step size" pkey={`${motorName}Step`}
                    data={data} onSave={this.props.saveStep} suffix={suffix}
                  />
                </span> 
                : null
              }

          </form>
      );
  }
}
