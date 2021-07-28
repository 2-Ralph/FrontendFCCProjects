import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

/* eslint-disable */



class CalculatorButtons extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="calc-btn-container">
        <button
        className="calc-btn btn-wide"
        id="ac-btn"
        onClick={this.props.initCalc}
        value="AC">AC</button>

        <button
        id="del-btn"
        className="calc-btn btn-wide"
        value="DEL"
        onClick={this.props.deleteNum}>DEL</button>

        <button
        className="calc-operator calc-btn"
        id="multi-btn"
        value="*"
        onClick={this.props.handleOperator}>*</button>

        <button
        id="buttoni-btn"
        className="calc-btn calc-operator"
        value="/"
        onClick={this.props.handleOperator}>/</button>

        <button
        id="add-btn"
        className="calc-btn calc-operator"
        value="+"
        onClick={this.props.handleOperator}>+</button>

        <button
        id="sub-btn"
        className="calc-btn calc-operator"
        value="-"
        onClick={this.props.handleOperator}>-</button>

        <button
        id="one-btn"
        className="calc-btn num-btn"
        value="1"
        onClick={this.props.handleNumOnclick}>1</button>

        <button
        id="two-btn"
        className="calc-btn num-btn"
        value="2"
        onClick={this.props.handleNumOnclick}>2</button>

        <button  
        id="three-btn"
        className="calc-btn num-btn"
        value="3"
        onClick={this.props.handleNumOnclick}>3</button>
        
        <button
        id="four-btn"
        className="calc-btn num-btn"
        value="4"
        onClick={this.props.handleNumOnclick}>4</button>

        <button
        id="five-btn"
        className="calc-btn num-btn"
        value="5"
        onClick={this.props.handleNumOnclick}>5</button>

        <button
        id="six-btn"
        className="calc-btn num-btn"
        value="6"
        onClick={this.props.handleNumOnclick}>6</button>

        <button
        id="seven-btn"
        className="calc-btn num-btn"
        value="7"
        onClick={this.props.handleNumOnclick}>7</button>

        <button
        id="eight-btn"
        className="calc-btn num-btn"
        value="8"
        onClick={this.props.handleNumOnclick}>8</button>

        <button
        id="nine-btn"
        className="calc-btn num-btn"
        value="9"
        onClick={this.props.handleNumOnclick}>9</button>

        <button
        id="zero-btn"
        className="calc-btn num-btn"
        value="0"
        onClick={this.props.handleNumOnclick}>0</button>
        
        <button
        className="calc-btn"
        id="decimal-btn"
        value="."
        onClick={this.props.handleDecimal}>.</button>

        <button
        id="equals-btn"
        className="calc-btn"
        value="="
        onClick={this.props.computeNums}>=</button>
      </div>
    )
  }
};

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentOperand: '0',
      formula: '',
      operatorRegex: /[\*\+\/\-]/,
      deciRegex: /\./
    }
    this.initCalc = this.initCalc.bind(this);
    this.updatecurrentOperand = this.updatecurrentOperand.bind(this);
    this.deleteNum = this.deleteNum.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.computeFormula = this.computeFormula.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  };



  updatecurrentOperand(event){
    if(this.state.deciRegex.test(this.state.currentOperand) && event.target.value === "."){
      return;
    };
    this.setState({
      formula: this.state.formula += event.target.value
    })


    if(this.state.currentOperand === '0'){
      this.setState({
        currentOperand: event.target.value,
      })
    } else if(this.state.operatorRegex.test(this.state.currentOperand)){
      this.setState({
        currentOperand: event.target.value,
      })
    }
    else{
      this.setState({
        currentOperand: this.state.currentOperand.length <= 6 ? this.state.currentOperand += event.target.value
        : this.state.currentOperand
      });
    };

  };

  handleDecimal(){
    if(this.state.deciRegex.test(this.state.currentOperand)){
      return;
    } else{
      this.setState({
        currentOperand: this.state.currentOperand += '.',
        formula: this.state.formula += '.'
      })
    }
  }

  computeFormula(){
    function getOperator(operator, previous, current){
      if(arguments[0] === null || arguments[1] === null || arguments[2] === null){
        return;
      }
      switch(operator){
        case '+':
          return previous + current;
        case '-':
          return previous - current;
        case '*':
          return previous * current;
        case '/':
          return previous / current;
      
        default:
          console.log("there won't be no default");
          break;
      }
    } 
    let operatorArr;
    let numArr;
    if(/[\*\/\-\+][\*\/\-\+]/g.test(this.state.formula)){
      operatorArr = this.state.formula.match(/[\*\/\+\-]/)
    }else{
      operatorArr = this.state.formula.match(/[\*\/\+\-]/g)
    }

    if(/[\*\/\+\-]\-/.test(this.state.formula) === false){
      numArr = this.state.formula.match(/\d+\.*\d*/g)
    }else{
      numArr = this.state.formula.match(/[\*\/\+\-]?\-?\d+\.?\d*/g);
    }


    for(let x = 0; x < numArr.length; x++){
      if(numArr[x].length === 3){
        numArr[x] = numArr[x].replace(/[\*\/\+]/, "");
      };
    }
    for(let i = 0; i < numArr.length; i++){
      numArr[i] = +numArr[i];
    };
    console.log(operatorArr, numArr);

    let result = getOperator(operatorArr[0], numArr[0], numArr[1]);
    // calculating answer into result variable
    for(let j = 1; j < operatorArr.length; j++){
      result = getOperator(operatorArr[j], result, numArr[j + 1])
    }
    this.setState({
      currentOperand: result,
      formula: result
    })
  }

  initCalc(){
    this.setState({
      currentOperand: '0',
      formula: ''
    });
  };

  handleOperator(e){
    if(this.state.currentOperand === '0' && e.target.value !== '-'){
      return;
    }
    
    
    if(/[\*\/\+\-]{2}/.test(this.state.formula)){
      this.setState({
        formula: this.state.formula.slice(0, -2).concat(e.target.value),

      });
      return
    }

    if(/[\*\/\+\-]/.test(this.state.currentOperand)){
      if(e.target.value === '-' && this.state.currentOperand.length < 2){
        this.setState({
          currentOperand: "-",
          formula: this.state.formula += e.target.value
        });
      } else if(e.target.value === '-' && this.state.currentOperand.length == 2){
        return;
      } else {
          this.setState({
            formula: this.state.formula.split('').slice(0, -1).join('').concat(e.target.value),
            currentOperand: e.target.value
          })
        }
    } else{
        this.setState({
          formula: this.state.formula += e.target.value,
          currentOperand: e.target.value
        });
      }
  };

  deleteNum(){
    if(this.state.currentOperand.length === 1){
      this.setState({
        currentOperand: '0',
        formula: ''
      })
    } else{
      this.setState({
        currentOperand: this.state.currentOperand.slice(0, -1),
        formula: this.state.currentOperand
      })
    }
  }

  render(){
    return(
      <div id="calc-container">
        <div id="calc-display">{this.state.currentOperand}</div>
        <CalculatorButtons
          initCalc={this.initCalc}
          handleNumOnclick={this.updatecurrentOperand}
          deleteNum={this.deleteNum}
          handleOperator={this.handleOperator}
          computeNums={this.computeFormula}
          handleDecimal={this.handleDecimal}
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

