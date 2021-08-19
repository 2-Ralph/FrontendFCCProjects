import React, { useState, useEffect, useRef } from 'react';
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
  const [pauseState, setPauseState] = useState(false);
  const [ms, setMs] = useState(sessionVal*1000*60);
  const mounted = useRef();

  useEffect(() => {
    setFormattedTimer(`${sessionVal} : 00`);
    setMs(sessionVal*1000*60);
  }, [sessionVal]);

  useEffect(() => {
    if(!mounted.current) {
      console.log("hello");
      mounted.current = true;
      return;
    }
    let interval = null;
    if(pauseState){
      interval = setInterval(() => {
        setMs(prev => prev - 1000);
      }, 1000);
    } else if(!pauseState && ms !== 0){
      console.log('pause entered!')
      clearInterval(interval);
    };
    let m = Math.floor(ms / 60000);
    let s = Math.floor(ms / 1000) % 60;
    setFormattedTimer(`${m} : ${s == 0 ? '00' : s}`);
    return () => {
      clearInterval(interval);
    }
  }, [pauseState, ms]) 

  function toggle(){
    setPauseState(prev => !prev);
  };

  function resetTimer(){
    setBreakVal(5);
    setSessionVal(25);
    setFormattedTimer(`${sessionVal} : 00`)
  };


  function handleCountDown(){


/*
    const countDown = () => {
      setMs(prev => prev - 1000);
      let m = Math.floor(ms / 60000);
      let s = Math.floor(ms / 1000) % 60;
      setFormattedTimer(`${m} : ${s}`);
    };
    const initInterval = () => {
      interval.current = setInterval(countDown, 1000)
    }
    const pause = () => {
      clearInterval(interval.current);
    };

    pauseState ? initInterval() : pause();
    setPauseState(prev => !prev);
    */
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
      handleRestartClick={resetTimer}
      handleCountDown={toggle}
    />
    </div>
  );
};

export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);