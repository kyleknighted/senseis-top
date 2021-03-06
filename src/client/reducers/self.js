import {
  JOIN_ROOM_SUCCESS,
  DECREMENT_LIFE,
  INCREMENT_LIFE,
} from '../../shared/action-types';

const self = (state = {userId: '', life: 20}, action) => {
  switch (action.type) {
    case JOIN_ROOM_SUCCESS:
      return Object.assign({}, state, {userId: action.userId});
    case INCREMENT_LIFE:
      return Object.assign({}, state, {life: state.life + 1});
    case DECREMENT_LIFE:
      return Object.assign({}, state, {life: state.life - 1});
    default:
      return state;
  }
};

export default self;
