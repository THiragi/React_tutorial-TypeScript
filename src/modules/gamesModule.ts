import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameHistory } from '../Types';

type State = {
  history: GameHistory[],
  stepNum: number,
  xIsNext: boolean
}

const initialState: State = {
  history: [{
    squares: Array(9).fill(''),
    location: [0,0]
  }],
  stepNum: 0,
  xIsNext: true
}

const gamesModule = createSlice({
  name: 'games',
  initialState,
  reducers: {
    handleClick: (state: State, action: PayloadAction<number>) => {
      const histories = state.history.slice(0, state.stepNum + 1);
      const current = histories[histories.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[action.payload]) {
          return;
      }
      squares[action.payload] = state.xIsNext ? 'X' : 'O';
      
      const col = Math.floor(action.payload / 3) + 1;
      const row = (action.payload % 3) + 1;
      return state = {
        history: histories.concat([{
          squares: squares,
          location: [col, row]
        }]),
        stepNum: histories.length,
        xIsNext: !state.xIsNext
      }
    },
    jumpTo: (state: State, action: PayloadAction<number>) => {
      state.stepNum = action.payload;
      state.xIsNext = (action.payload % 2) === 0;
    }
  }
});

export const calculateWinner = (squares: string[]): string => {
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

export const {handleClick, jumpTo} = gamesModule.actions;

export default gamesModule