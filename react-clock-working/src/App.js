import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faRecycle,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';


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
          {props.iconToggleState === true &&
            <i
              id="stop-start-icon"
              aria-hidden="true"
              onClick={() => {
                props.handleCountDown();
                props.handleIconChange();
              }}>
              <FontAwesomeIcon icon={faPause} />
            </i>
          }
          {props.iconToggleState === false &&
            <i
              id="stop-start-icon"
              aria-hidden="true"
              onClick={() => {
                props.handleCountDown();
                props.handleIconChange();
              }}>
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

function App(){
  const [sessionVal, setSessionVal] = useState(25);
  const [breakVal, setBreakVal] = useState(5);
  const [pauseIcon, setPauseIcon] = useState(false);
  const [formattedTimer, setFormattedTimer] = useState('25 : 00');
  const [pauseState, setPauseState] = useState(true);
  let timer;
  
  useEffect(() => {
    setFormattedTimer(`${sessionVal} : 00`)
  }, [sessionVal]);

  function handleCountDown(ms=sessionVal*60*1000){
    let startTime, timer, objMethods = {};

    objMethods.resume = function () {
      startTime = new Date().getTime();
      timer = setInterval(objMethods.step, 200);
    };
    objMethods.pause = function () {
      ms = objMethods.step();
      console.log(ms);
      setFormattedTimer('lol')
      clearInterval(timer);

    };
    objMethods.step = function () {
      let now = Math.max(0, ms - (new Date().getTime() - startTime))
      let m = Math.floor(now / 60000);
      let s = Math.floor(now / 1000) % 60;
      s = (s < 10 ? "0" : "") + s;
      setFormattedTimer(`${m} : ${s}`)
      return now;
    };
    objMethods.resume();
    return objMethods;
  }



  function handlePause(){
    timer = handleCountDown();
    console.log('handlePause entered')
    if(pauseState) {
      console.log('pausestate true')
      timer.resume();
    }
    else {
      console.log('pausestate false');
      timer.pause();
    }
    setPauseState(prev => !prev);
  }

  function handleIncrementAndDecrement(e) {
    if (breakVal === 0 && /dec/i.test(e.target.value) || sessionVal === 0 && /dec/i.test(e.target.value)) {
      return;
    };

    switch (e.target.value) {
      case 'sesh-inc':
        setSessionVal(prev => ++prev)
        break;
      case 'sesh-dec':
        setSessionVal(prev => --prev)
        break;
      case 'break-inc':
        setBreakVal(prev => ++prev)
        break;
      case 'break-dec':
        setBreakVal(prev => --prev)
        break;
      default:
        return;
    };
  };
   

  return(
    <div id="wrapper">
      <TimeDisplay
      handleIconChange={() => {
        pauseIcon == false ? setPauseIcon(true)
        : setPauseIcon(false);
      }}
      iconToggleState={pauseIcon}
      sessionVal={sessionVal}
      breakVal={breakVal}
      handleIncrementAndDecrement={handleIncrementAndDecrement}
      formattedTimer={formattedTimer}
      handleRestartClick={() => {
        setBreakVal(5);
        setSessionVal(25);
      }}
      handleCountDown={handlePause}
    />
    </div>
    
  )

}
/*
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakVal: 5,
      sessionVal: 25,
      iconToggleState: 'fa fa-pause',
      currentTimerState: 'session',
      formattedTimer: '25 : 00',
      timerActive: false
    }
    this.handleIncrementAndDecrement = this.handleIncrementAndDecrement.bind(this);
    this.handleIconChange = this.handleIconChange.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
    this.handlePause = this.handlePause.bind(this);
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

  handleCountDown(ms = this.state.sessionVal * 1000 * 60) {
    let that = this;
    let startTime, timer, objMethods = {};

    objMethods.resume = function () {
      startTime = new Date().getTime();
      timer = setInterval(objMethods.step, 200);
    };
    objMethods.pause = function () {
      ms = objMethods.step();
      clearInterval(timer);
    };
    objMethods.step = function () {
      let now = Math.max(0, ms - (new Date().getTime() - startTime))
      let m = Math.floor(now / 60000);
      let s = Math.floor(now / 1000) % 60;
      s = (s < 10 ? "0" : "") + s;
      that.setState({
        formattedTimer: `${m} : ${s}`
      });
      return now;
    };
    objMethods.resume();
    return objMethods;
  };

  handlePause() {
    let timer = this.handleCountDown();
    if (this.state.timerActive) {
      timer.pause();
      console.log('pause entered');
    } else {
      timer.resume();
      console.log('resume entered');
    }
    this.setState({
      timerActive: !this.state.timerActive
    });
  }



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
          handleCountDown={this.handlePause}
        />
      </div>
    )
  }
}
*/
export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);