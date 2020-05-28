import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type SquareProps = {
    value: string;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({value, onClick}) => {
    return (
        <button 
            className="square"
            onClick={() => onClick()}
        >
            {value}
        </button>
    );
}

type BoardProps = {
    squares: string[];
    onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({squares, onClick}) => {
    const renderSquare = (i: number) => {
        return (
            <Square 
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    }
    // まず0~8の連番の配列を生成
    let nums: number[] = [...Array(9)].map((_,i) => i);
    // 配列の中身を3要素ごとに分割
    let sqrSet: number[][] = chunk(nums, 3);
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


const Game: React.FC = () => {
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
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return '';
}

function chunk<T extends any[]>(arr: T, size: number) {
    return arr.reduce(
        (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
        [] as T[][]
    )
}

// 1. 履歴内のそれぞれの着手の位置を (col, row) というフォーマットで表示する。
// 2. 着手履歴のリスト中で現在選択されているアイテムをボールドにする。
// 3. Board でマス目を並べる部分を、ハードコーディングではなく 2 つのループを使用するように書き換える。

// 4. 着手履歴のリストを昇順・降順いずれでも並べかえられるよう、トグルボタンを追加する。
// 5. どちらかが勝利した際に、勝利につながった 3 つのマス目をハイライトする。
// 6. どちらも勝利しなかった場合、結果が引き分けになったというメッセージを表示する。
