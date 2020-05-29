import React from 'react';
import { useDispatch } from 'react-redux';
import {jumpTo, calculateWinner } from '../modules/gamesModule';
import Board from './Board';
import { RootState } from '../rootReducer';
import { useSelector } from 'react-redux';

const Game: React.FC = () => {
  const { history, stepNum, xIsNext } = useSelector((state: RootState) => state.games);
  const dispatch = useDispatch();
  const current = history[stepNum];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
      const location = step.location;
      const desc = move ?
          'Go to move #' + move + ' (' + location[0] + ', ' + location[1] + ')':
          'Go to game start';
      return (
          <li key={move}>
              <button 
                  onClick={()=> dispatch(jumpTo(move))}
                  className={move === stepNum ? 'cursor': ''}
              >
                  {desc}
              </button>
          </li>
      )
  });
  let status;
  if (winner) {
      status = 'Winner: ' + winner;
  } else {
      status = 'Next player: ' + (xIsNext ? 'X' :'0');
  };
  return (
      <div className="game">
          <div className="game-board">
              <Board 
                  squares={current.squares}
              />
          </div>
          <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
          </div>
      </div>
  );
}


export default Game;