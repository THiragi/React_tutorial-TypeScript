import React from "react";
import Square from "./Square";
import chunk from "../utils/chunk";

type Props = {
  squares: string[];
  onClick: (i: number) => void;
};

const Board = (props: Props): JSX.Element => {
  const renderSquare = (i: number) => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  };
  // まず0~8の連番の配列を生成
  const nums: number[] = [...Array(9)].map((_, i) => i);
  // 配列の中身を3要素ごとに分割
  const sqrSet: number[][] = chunk(nums, 3);
  // map()で1行3列のマス目をレンダリングしていく
  return (
    <div>
      {sqrSet.map((v, i) => {
        return (
          <div key={i} className="board-row">
            {v.map((n) => renderSquare(n))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
