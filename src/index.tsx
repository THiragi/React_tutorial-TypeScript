import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareProps = {
    key: number;
    value: string;
    onClick: () => void;
}

const Square = (props: SquareProps): JSX.Element => {
    return (
        <button 
            className="square"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}

  
type BoardProps = {
    squares: string[];
    onClick: (i: number) => void;
}

const Board = (props: BoardProps): JSX.Element => {
    const renderSquare = (i: number) => {
        return (
            <Square 
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    }
    // まず0~8の連番の配列を生成
    const nums: number[] = [...Array(9)].map((_,i) => i);
    // 配列の中身を3要素ごとに分割
    const sqrSet: number[][] = chunk(nums, 3);
    // map()で1行3列のマス目をレンダリングしていく
    return (
        <div>
            {sqrSet.map((v, i) => {
                return (
                    <div key={i} className="board-row">
                        {v.map( n => renderSquare(n))}
                    </div>
                );
            })}
        </div>
    );

}


const Game = ():JSX.Element => {
    const [history, setHistory] = useState(
        [{
            squares: Array(9).fill(''),
            location: [0,0]
        }]
    );
    const [stepNum, setStepNum] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i: number) => {
        const histories = history.slice(0, stepNum + 1);
        const current = histories[histories.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        
        const col = Math.floor(i / 3) + 1;
        const row = (i % 3) + 1;

        setHistory(histories.concat([{
            squares: squares,
            location: [col, row]
        }]));
        setStepNum(histories.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step: number) => {
        setStepNum(step);
        setXIsNext((step % 2) === 0);
    }
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
                    onClick={()=> jumpTo(move)}
                    className={move === stepNum ? 'cursor': ''}
                >
                    {desc}
                </button>
            </li>
        )
    });
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' :'0') ;

    return (
        
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares: string[]): string {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const result = lines.find(line => {
        const [a,b,c] = line;
        return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
      });
    return result ? squares[result[0]] : '';
}

function chunk<T extends any[]>(arr: T, size: number) {
    return arr.reduce(
        (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
        [] as T[][]
    )
}
