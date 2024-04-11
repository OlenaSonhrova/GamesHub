import { createStore } from 'redux';
import AddLikedGames from './reducer/addLikedGame';

const store = createStore(AddLikedGames);

export default store;