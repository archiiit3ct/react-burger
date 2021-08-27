import {
  MOVE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_INGREDIENT,
  DEL_CONSTRUCTOR_INGREDIENT,
  TConstructorAction
} from '../actions/constructor';
import { ADD_ORDER_SUCCESS } from '../actions/order';
import {TIngredient} from '../types';
type TConstructorState = {
  constructorIngredients: Array<TIngredient & {key: number}>,
  constructorBun: TIngredient | {} ,
};

const initialState: TConstructorState = {
  constructorIngredients: [],
  constructorBun: {},
};

export const constructorReducer = (state = initialState, action: TConstructorAction) => {
  switch (action.type) {
    case MOVE_CONSTRUCTOR_ITEM: {
      const dragIndex = action.dragIndex;
      const hoverIndex = action.hoverIndex;
      const arr = [...state.constructorIngredients];

      const dragElement = arr[dragIndex];
      const hoverElement = arr[hoverIndex];

      arr[hoverIndex] = dragElement;
      arr[dragIndex] = hoverElement;

      return {
        ...state,
        constructorIngredients: arr,
      };
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return { ...state, constructorBun: action.ingredient };
      } else if (state.constructorIngredients) {
        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            {
              ...action.ingredient,
              key: action.randomId,
            },
          ],
        };
      } else {
        return {
          ...state,
          constructorIngredients: [
            {
              ...action.ingredient,
              key: action.randomId,
            },
          ],
        };
      }
    }
    case DEL_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item, index) => action.index !== index
          ),
        ],
      };
    }
    case ADD_ORDER_SUCCESS: {
      return {
        ...state,
        constructorIngredients: null,
        constructorBun: null,
      };
    }
    default: {
      return state;
    }
  }
};
