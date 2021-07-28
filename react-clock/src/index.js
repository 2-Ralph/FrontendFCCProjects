import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../src/styles.css';


/* eslint-disable */

let TimeDisplay = (props) => {
  return(
    <div id="timer-container">
        <IncrementAndDecrement
          breakVal={props.breakVal}
          sessionVal={props.sessionVal}
          handleIncrementAndDecrement={props.handleIncrementAndDecrement}
        />
      <div id="timer-field">
        <h1>25 : 00</h1>
      </div>
      <div id="timer-controls">
        <div id="stop-start-icon-container" title="Pause">
          <i
          className={props.iconToggleState}
          id="stop-start-icon"
          aria-hidden="true"
          onClick={props.handleIconClick}></i>
        </div>
        <div id="restart-container">
          <i className="fa fa-refresh" />
        </div>
      </div>
    </div>
  )
}

const IncrementAndDecrement = (props) => {
  return(
    <div id="increment-and-decrement-wrapper">
      <p>Session Length</p>
      <div class="inc-dec-wrappers">
        <button
          className="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="sesh-inc">
            <span>
              <i class="fa fa-plus" aria-hidden="true"></i>
            </span>
            
        </button>
          <div class="val-wrapper">
            <h5 i="session-time-val">{props.sessionVal}</h5>
          </div>

        <button
          className="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="sesh-dec">
            <span><i class="fa fa-minus" aria-hidden="true"></i></span>

        </button>
      </div>
      <p>Break Length</p>
      <div class="inc-dec-wrappers">
        <button
          class="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="break-inc">
            <span><i class="fa fa-plus" aria-hidden="true"></i></span>
            
        </button>
        <div class="val-wrapper">
          <h5 id="break-time-val">{props.breakVal}</h5>
        </div>

        <button
          class="change-val-btn"
          onClick={props.handleIncrementAndDecrement}
          value="break-dec">
            <span><i class="fa fa-minus" aria-hidden="true"></i></span>
            
        </button>
      </div>
    </div>
    )
    }

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakVal: 5,
      sessionVal: 25,
      iconToggleState: 'fa fa-pause'
    }
    this.handleIncrementAndDecrement = this.handleIncrementAndDecrement.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleCountDown = this.handleCountDown.bind(this);
  };

  handleIconClick(){
    if(this.state.iconToggleState == 'fa fa-pause'){
      this.setState({
        iconToggleState: "fa fa-play"
      })
      return;
    }
    this.setState({
      iconToggleState: 'fa fa-pause'
    })
  }

  handleCountDown(){
    const time = new Date();
    const year = time.getFullYear();
    const date = time.getDate();

  }

  handleIncrementAndDecrement(e){
    if(this.state.breakVal === 0 && /dec/i.test(e.target.value) || this.state.sessionVal === 0 && /dec/i.test(e.target.value)){
      return;
    }

    switch(e.target.value){
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

  render(){
    return (
      <div id="wrapper">
        <TimeDisplay
        handleIconClick={this.handleIconClick}
        iconToggleState={this.state.iconToggleState}
        breakVal={this.state.breakVal}
        sessionVal={this.state.sessionVal}
        handleIncrementAndDecrement={this.handleIncrementAndDecrement}
        />
      </div>
      
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);