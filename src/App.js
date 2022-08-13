import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


const Square = (props)=> {
    const {value, onClick, winLines} = props
 // const [value, setValue] = useState(Array(9).fill(null));
  return(
    <>
      <button className={`square ${winLines ? "win-line":""}`} onClick={onClick}>
        {value}
      </button>
    </>
  )
}

function Board(props) {
  
  const {squares, onClick, xIsNext, winLines} = props;
  const status = "Next player: " + (xIsNext ? "X" : "O");
  //console.log(winLines);
  const renderSquare = (i) => {
    return <Square 
              value={squares[i]} 
              onClick={()=> onClick(i)}
              winLines={winLines.includes(i)}
    />;
  }
  let squaresC = [];

  for (let j = 0; j < 3; j++) {
    let squareC = [];
    for(let k = 0; k < 3; k++){
      squareC.push(renderSquare(j*3+k));
    }
    squaresC.push(<div className={`board-row`}>{squareC}</div>);
    
  }
  return (
    <div className="App">
        <div>
            {squaresC}
        </div>
    </div>
  );
}

function Game(props) {
  

 // const [board, setBoard] = useState(Array(9).fill(null));
  const [board, setBoard] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [sortBy, setSortBy] = useState(true);
//  const [winLines, setWinLines] = useState(0);
  const winner = calculareWinner(board[stepNumber]);
 // console.log();
  let status;
  let winlines = [];
  //const winner = calculateWinner(board);

  
  //console.log(winlines);
  const handleClick = (i) =>{
    
    const historyStep = board.slice(0, stepNumber + 1);
    console.log(historyStep);
    const current = historyStep[stepNumber];
    const squares = [...current];
    
    if(winner || squares[i]){
      return false;
    }
    squares[i] = xIsNext ? "X":"O";
    setBoard([...historyStep, squares]);
    setStepNumber(historyStep.length);
    setXisNext(!xIsNext);
  }
  const jumpTo = step =>{
    setStepNumber(step);
    setXisNext(step % 2 === 0);
    if(step === 0){
      setBoard([Array(9).fill(null)]);
    }
  }
  const historyStep = board.slice(0, stepNumber + 1);
  const current = historyStep[stepNumber];
  if(winner){
    status = "Winner: " + winner[0].squares;
    winlines = winner[0].lines;
    //winlines.push([winline]);
  }else if(!current.includes(null)){
    status = "Draw!";
  }
   else{
    status = "Nex player: " + ( xIsNext ? "X":"O");
  }
  const renderMoves = board.map((board, move) =>{
        const dest = move ? `Go to move #${move}` : "Go to start";
        return(
              <li key={move}>
                <button onClick={()=> jumpTo(move)}>{move === stepNumber ? <b>{dest}</b> : dest}</button>
              </li>
        )
  });
  const orderDesc = () =>{
    setSortBy(!sortBy);
  }
  return (
    <div className="App">
        <div className="game">
          <div className="game-board">
            <Board squares={board[stepNumber]} onClick={handleClick} xIsNext={xIsNext} winLines={winlines}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{sortBy ? renderMoves : renderMoves.reverse()}</ol>
            <button onClick={orderDesc}>
              Sort by: {sortBy ? "Desc":"Asc"}
            </button>
          </div>
        </div>
    </div>
  );
}
function calculareWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
   
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      
      const response = [{"lines":lines[i], "squares":squares[a]}];
     //  console.log(response);
      return response;
    }
    
  }
  return null;
}
export default Game;
