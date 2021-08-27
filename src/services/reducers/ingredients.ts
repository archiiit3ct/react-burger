import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  TGetIngredientsAction
} from '../actions/ingredients';
import {TIngredient} from '../types';
type TIngredientsState = {
  ingredientsRequest: boolean,
  ingredientsSuccess: boolean,
  ingredientsError: boolean,
  ingredients: Array<TIngredient>,
}

const initialState: TIngredientsState = {
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsError: false,
  ingredients: [],
};

export const ingredientsReducer = (state = initialState, action: TGetIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsSuccess: true,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsError: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
