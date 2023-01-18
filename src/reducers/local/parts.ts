import { AnyAction } from 'redux';
import { DECREMENT_PART, INCREMENT_PART } from '../../actions/parts';

// import { v4 as uuid } from 'uuid';

const initialState = [
  {
    name: 'Wheel',
    amount: 0,
  },
  {
    name: 'Chasis',
    amount: 0,
  },
  {
    name: 'Engine',
    amount: 0,
  },
  {
    name: 'Windshield',
    amount: 0,
  },
];

const partsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INCREMENT_PART: {
      const idx = state.findIndex(part => part.name === action.partName);
      state[idx].amount += 1;
      return state;
    }
    case DECREMENT_PART: {
      const idx = state.findIndex(part => part.name === action.partName);
      state[idx].amount -= 1;
      return state;
    }

    default:
      return state;
  }
};

export default partsReducer;
