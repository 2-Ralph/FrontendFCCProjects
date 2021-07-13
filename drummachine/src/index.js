import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'

const bank = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class Pads extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: "",
      padStyle: {
        background: '#a2e2ff'
      }
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateSoundAndDisplay = this.updateSoundAndDisplay.bind(this);
    this.changePadStyle = this.changePadStyle.bind(this);
  };

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  };
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress(e){
    if(this.props.keyCode === e.keyCode){
      this.updateSoundAndDisplay();
    }
  };

  changePadStyle(){
    if(this.state.padStyle.background === '#a2e2ff'){
      this.setState({
        padStyle: {
          background: '#79d4ff',
          transform: 'translate(4px, 4px)',
          boxShadow: 0
        }
      })
    } else{
      this.setState({
        padStyle: {
          background: '#a2e2ff',
          transform: 'none',
          boxShadow: '4px 4px 10px rgba(0, 0, 0, .3)'
        }
      })
    }
  }

  updateSoundAndDisplay(){
    const replaceRegex = /\-/g
    this.props.updateDisplay(this.props.padId.replace(replaceRegex, ' '));

    const audio = document.getElementById(this.props.keyTrigger + '-audio');
    audio.play();

    this.changePadStyle();
    setTimeout(this.changePadStyle, 50);
  }

  render(){
    return(
      <div
          className="drum-pads"
          id={this.props.padId}
          onClick={this.updateSoundAndDisplay}
          style={this.state.padStyle}
      >{this.props.keyTrigger}
        <audio className="audio-clip" id={this.props.keyTrigger + "-audio"} src={this.props.clipSrc} />
      </div>
    )
  }
};

class PadGrid extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    const bankPads = bank.map((random, i) => {
      return (
        <Pads
      padId={bank[i].id}
      keyTrigger={bank[i].key}
      clipSrc={bank[i].src}
      keyCode={bank[i].keyCode}
      updateDisplay={this.props.updateDisplay}
        />
      );
    });
  return <div id="bank-pads-grid">{bankPads}</div>
  } 
};


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: ""
    }

    this.updateDisplayClip = this.updateDisplayClip.bind(this);
  };
  updateDisplayClip(name){
    this.setState({
      display: name
    })
  }

  render(){
      return(
        <div id="pad-board">
          <PadGrid updateDisplay={this.updateDisplayClip} />
          <div className="txt-container">
            <h1>Drum Set</h1>
            <div id="display">{this.state.display}</div>
          </div>
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

