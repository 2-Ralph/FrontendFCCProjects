import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faRecycle,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';
import './App.css';


/* eslint-disable */

let TimeDisplay = (props) => {
  return (
    <div id="timer-container">
      <IncrementAndDecrement
        breakVal={props.breakVal}
        sessionVal={props.sessionVal}
        handleIncrementAndDecrement={props.handleIncrementAndDecrement}
      />
      <div id="timer-field">
        <h1>{props.formattedTimer}</h1>
      </div>
      <div id="timer-controls">
        <div id="stop-start-icon-container" title="Pause">
          {props.iconToggleState === 'fa fa-pause' &&
            <i
              id="stop-start-icon"
              aria-hidden="true"
              onClick={props.handleCountDown}>
              <FontAwesomeIcon icon={faPause} />
            </i>
          }
          {props.iconToggleState === 'fa fa-play' &&
            <i
              id="stop-start-icon"
              aria-hidden="true"
              onClick={props.handleCountDown}>
              <FontAwesomeIcon icon={faPlay} />
            </i>
          }
        </div>
        <div id="restart-container">
          <i
            onClick={props.handleRestartClick}>
            <FontAwesomeIcon icon={faRecycle} />
          </i>
        </div>
      </div>
    </div>
  )
}

const IncrementAndDecrement = (props) => {
  return (
    <div id="increment-and-decrement-wrapper">
      <p>Session Length</p>
      <div className="inc-dec-wrappers">
        <button
          className="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="sesh-inc">
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>

        </button>
        <div className="val-wrapper">
          <h5 i="session-time-val">{props.sessionVal}</h5>
        </div>

        <button
          className="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="sesh-dec">
          <span>
            <FontAwesomeIcon icon={faMinus} />
          </span>

        </button>
      </div>
      <p>Break Length</p>
      <div className="inc-dec-wrappers">
        <button
          className="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="break-inc">
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>

        </button>
        <div className="val-wrapper">
          <h5 id="break-time-val">{props.breakVal}</h5>
        </div>

        <button
          className="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="break-dec">
          <span>
            <FontAwesomeIcon icon={faMinus} />
          </span>

        </button>
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakVal: 5,
      sessionVal: 25,
      iconToggleState: 'fa fa-pause',
      currentTimerState: 'session',
      formattedTimer: '25 : 00',
      timerActive: false,
      timeLeftElapsed: this.state.sessionVal * 1000 * 60
    }
    this.handleIncrementAndDecrement = this.handleIncrementAndDecrement.bind(this);
    this.handleIconChange = this.handleIconChange.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
  };

  handleIconChange() {
    if (this.state.iconToggleState == 'fa fa-pause') {
      this.setState({
        iconToggleState: "fa fa-play"
      })
    } else {
      this.setState({
        iconToggleState: 'fa fa-pause'
      })
    };
  };

  handleRestartClick() {
    this.setState({
      breakVal: 5,
      sessionVal: 25,
      iconToggleState: 'fa fa-pause',
      currentTimerState: 'session',
      formattedTimer: '25 : 00'
    })
  }

  handleCountDown() {
    let interval;
    const countDown = () => {
      this.setState({
        timeLeftElapsed: this.state.timeLeftElapsed - 1000
      })
      let m = Math.floor(this.state.timeLeftElapsed / 60000);
      let s = Math.floor(this.state.timeLeftElapsed / 1000) % 60;
      console.log("countdown func run VAL:", s);
      this.setState({
        formattedTimer: `${m} : ${s}`
      })
    };
    const resume = () => {
      console.log('hello');
      interval = setInterval(countDown, 1000);
    }
    const pause = () => {
      console.log('bye');
      clearInterval(interval);
    };

    this.state.timerActive ? pause()
    : resume();
    this.setState({
      timerActive: !this.state.timerActive
    });
  };




  handleIncrementAndDecrement(e) {
    if (this.state.breakVal === 0 && /dec/i.test(e.target.value) || this.state.sessionVal === 0 && /dec/i.test(e.target.value)) {
      return;
    }

    switch (e.target.value) {
      case 'sesh-inc':
        this.setState({
          sessionVal: this.state.sessionVal += 1
        });
        break;
      case 'sesh-dec':
        this.setState({
          sessionVal: this.state.sessionVal -= 1
        });
        break;
      case 'break-inc':
        this.setState({
          breakVal: this.state.breakVal += 1
        });
        break;
      case 'break-dec':
        this.setState({
          breakVal: this.state.breakVal -= 1
        });
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div id="wrapper">
        <TimeDisplay
          handleIconChange={this.handleIconChange}
          iconToggleState={this.state.iconToggleState}
          breakVal={this.state.breakVal}
          sessionVal={this.state.sessionVal}
          handleIncrementAndDecrement={this.handleIncrementAndDecrement}
          handleRestartClick={this.handleRestartClick}
          formattedTimer={this.state.formattedTimer}
          handleCountDown={this.handleCountDown}
        />
      </div>
    )
  }
}
export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);