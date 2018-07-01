import React, { Component } from 'react';
import './Game.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Board from './Board';

/* Initialize the board 
* Empty: 0
*        King | Queen | Bishop | Knight | Rook | Pawn
* Black|  1       2       3        4        5     6
* White|  7       8       9       10       11    12
*/
let initSquares = new Array(8);
for (let i = 0; i < 8; i++) {
  initSquares[i] = Array(8).fill(0); 
}
initSquares[0][0] = 5;
initSquares[0][1] = 4;
initSquares[0][2] = 3;
initSquares[0][3] = 1;
initSquares[0][4] = 2;
initSquares[0][5] = 3;
initSquares[0][6] = 4;
initSquares[0][7] = 5;
for(let i = 0; i < 8; i++){
  initSquares[1][i] = 6;
}
initSquares[7][0] = 11;
initSquares[7][1] = 10;
initSquares[7][2] = 9;
initSquares[7][3] = 8;
initSquares[7][4] = 7;
initSquares[7][5] = 9;
initSquares[7][6] = 10;
initSquares[7][7] = 11;
for(let i = 0; i < 8; i++){
  initSquares[6][i] = 12;
}

class Game extends Component {
  
  squareArray = initSquares.map(arr => arr.slice())
  state = {//TODO
    squares: this.squareArray,
    blackIsNext: true,
    info: "Next Player is: Black",
    finished: false
  }
  handleClick(i, j) {//TODO
    if(this.state.squares[i][j] || this.state.finished) return;
    let squares = this.state.squares.slice();
    squares[i][j] = this.state.blackIsNext ? 1 : 2;//black:1 white:2
    this.setState({
      squares: squares
    });
    if(this.determineWinner(i)){
      let winner;
      if(this.state.blackIsNext)
        winner = "Black";
      else
        winner = "White";
      this.setState({
        info: "Winner is: " + winner,
        finished: true
      })
    }
    else{
      let next;
      if(this.state.blackIsNext)
        next = "White";
      else
        next = "Black";
      this.setState({
        info: "Next Player is: " + next,
        blackIsNext: !this.state.blackIsNext
      })
    }   
      

  }
  determineWinner(lastMove){//TODO
    let row = Math.floor(lastMove/20);
    let column = lastMove % 20;
    let color = 1;
    let connectNum = 0;
    if(!this.state.blackIsNext)
      color += 1;
    let c = column - 1;
    let r = row;
    //水平
    while (c >= 0) {
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      c--;
    }
    c = column + 1;
    while(c < 20){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      c++;
    }
    //鉛直
    c = column;
    r = row - 1;
    connectNum = 0;
    while(r >= 0){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      r--;
    }
    r = row + 1;
    while(r < 20){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      r++;
    }

    //左上右下
    c = column - 1;
    r = row - 1;
    connectNum = 0;
    while(r >= 0 && c >= 0){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      r--;
      c--;
    }
    r = row + 1;
    c = column + 1;
    while(r < 20 && c < 20){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      r++;
      c++;
    }
    //右上左下
    c = column + 1;
    r = row - 1;
    connectNum = 0;
    while(r >= 0 && c < 20){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      r--;
      c++;
    }
    r = row + 1;
    c = column - 1;
    while(r < 20 && c >= 0){
      if(this.state.squares[20 * r + c] !== color)
        break;
      connectNum++;
      if(connectNum >= 4)
        return true;
      r++;
      c--;
    }
    return false;
  }
  restart() {//TODO
    let initArray = initSquares.map(arr => arr.slice())
    
    this.setState({
      squares: initArray,
      blackIsNext: true,
      info: "Next Player is: Black",
      finished: false
    })
  }
  render() {
    return (
      <div className="game" id="container">
        <div className="game-board">
          <Board onClick = {(i, j) => this.handleClick(i, j)} squares = {this.state.squares}/>
        </div>
        <div className="game-info">
          <div>
            <button className="btn btn-primary btn-sm" onClick = {() => this.restart()}>重新開始</button>
          </div>
          <div id="info">
            {this.state.info}
          </div>
        </div>
      </div>
    );
  }
}


export default Game;
