import React, {Component} from 'react';
import './App.css';

class App extends Component {

  state = {
    winner: undefined
  }
  gameState = {
    change: 'X',
    gameLocked: false,
    board: Array(9).fill(""),
    end: false,
    totalMoves: 0
  }
  
  handleClick = (box) => {

    if(this.gameState.end || this.gameState.gameLocked) return;

    if(this.gameState.board[box.dataset.square] === ""){
        this.gameState.board[box.dataset.square] = this.gameState.change
        box.innerHTML = this.gameState.change
        
        this.gameState.change = this.gameState.change == 'X' ? 'O' : 'X'
        this.gameState.totalMoves++;
    }
    let result = this.checkWinner();
    if(result == 'X'){
      this.gameState.end = true;
      this.setState({
        winner: 'X',
        textResult: 'Match won by X'
      })
    } else if(result == 'O'){
      this.gameState.end = true;
      this.setState({
        winner: 'O',
        textResult: 'Match won by O'
      })
    } else if(result == 'draw'){
      this.gameState.end = true;
      this.setState({
        winner: 'draw',
        textResult: 'Match is draw'
      })
    }

    if(this.gameState.change == 'O' && !this.gameState.end){
      this.gameState.gameLocked = true;
      setTimeout(() => {
        do {
          var random1 = Math.floor(Math.random()*9);
        } while (this.gameState.board[random1] != '')
        this.gameState.gameLocked = false;
        this.handleClick(document.querySelectorAll('.square')[random1])
      },1000)
    }
  }

  checkWinner = () => {
    let moves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let board = this.gameState.board;
    for(let i=0; i<moves.length; i++){
      if(board[moves[i][0]] == board[moves[i][1]] && board[moves[i][1]] == board[moves[i][2]]){
        return board[moves[i][0]]
      }
    }
    if(this.gameState.totalMoves === 9){
      return 'draw'
    }
  }
  render(){
    return (
      <div className="game">
        <div className="head">
          <h1>XO Board Game App</h1>
          <div className="status">{this.state.textResult}</div>
        </div>
        <div className="board" onClick={(e) => this.handleClick(e.target)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
      </div>
    )
  }
}

export default App;
