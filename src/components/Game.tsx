import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";

const Game = (): JSX.Element => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(""),
      location: [0, 0],
    },
  ]);
  const [stepNum, setStepNum] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const histories = history.slice(0, stepNum + 1);
    const current = histories[histories.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    const col = Math.floor(i / 3) + 1;
    const row = (i % 3) + 1;

    setHistory(
      histories.concat([
        {
          squares: squares,
          location: [col, row],
        },
      ])
    );
    setStepNum(histories.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNum(step);
    setXIsNext(step % 2 === 0);
  };
  const current = history[stepNum];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const location = step.location;
    const desc = move
      ? "Go to move #" + move + " (" + location[0] + ", " + location[1] + ")"
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={move === stepNum ? "cursor" : ""}
        >
          {desc}
        </button>
      </li>
    );
  });
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "0");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
