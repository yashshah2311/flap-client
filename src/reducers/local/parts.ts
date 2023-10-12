import { AnyAction } from 'redux';
import { DECREMENT_PART, INCREMENT_PART, ADD_PART } from '../../actions/parts';

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
    case ADD_PART:
      // Check if the part name already exists
      if (state.some(part => part.name === action.partName)) {
        // Handle the error, for example, by returning the current state
        return state;
      }

      // If it doesn't exist, add the new part
      return [...state, { name: action.partName, amount: action.amount }];

    case INCREMENT_PART: {
      const partName = action.partName;
      const updatedState = state.map(part =>
        part.name === partName ? { ...part, amount: part.amount + 1 } : part
      );
      return updatedState;
    }
    case DECREMENT_PART: {
      const partName = action.partName;
      const updatedState = state.map(part =>
        part.name === partName ? { ...part, amount: part.amount - 1 } : part
      );
      return updatedState;
    }
    default:
      return state;
  }
};

export default partsReducer;
