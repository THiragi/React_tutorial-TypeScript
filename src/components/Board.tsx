import React from 'react';
import Square from './Square';

type Props = {
  squares: string[];
}

const Board: React.FC<Props> = ({squares}): JSX.Element => {
  const renderSquare = (i: number) => {
    return (
      <Square 
          key={i}
          value={squares[i]}
          num={i}
      />
    );
  }
  const nums: number[] = [...Array(9)].map((_,i) => i);
  const sqrSet: number[][] = nums.reduce(
    (newarr, _, i) => (i % 3 ? newarr : [...newarr, nums.slice(i, i +3)]), [] as number[][]
  );
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

export default Board;