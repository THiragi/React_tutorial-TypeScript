import React from 'react';
import { useDispatch } from 'react-redux';
import { handleClick} from '../modules/gamesModule';

type Props = {
  value: string;
  num: number;
}

const Square: React.FC<Props> = ({value, num}) => {
  const dispatch = useDispatch();

  return (
      <button 
          className="square"
          onClick={() => dispatch(handleClick(num))}
      >
          {value}
      </button>
  );
}

export default Square;