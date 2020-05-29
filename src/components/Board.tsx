import React from 'react';
import Square from './Square';

type Props = {
  squares: string[];
}

const Board: React.FC<Props> = ({squares}) => {
  const renderSquare = (i: number) => {
    return (
      <Square 
          key={i}
          value={squares[i]}
          num={i}
      />
    );
  }
  // まず0~8の連番の配列を生成
  let nums: number[] = [...Array(9)].map((_,i) => i);
  // 配列の中身を3要素ごとに分割
  let sqrSet: number[][] = nums.reduce(
    (newarr, _, i) => (i % 3 ? newarr : [...newarr, nums.slice(i, i +3)]), [] as number[][]
  );
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

export default Board;