import { combineReducers } from '@reduxjs/toolkit';
import gamesModule from './modules/gamesModule';

const rootReducer = combineReducers({
  games: gamesModule.reducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;