import React from "react";

type Props = {
  key: number;
  value: string;
  onClick: () => void;
};

const Square = (props: Props): JSX.Element => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

export default Square;
