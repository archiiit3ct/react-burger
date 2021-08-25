import {
	CLOSE_INGREDIENT_MODAL,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	OPEN_INGREDIENT_MODAL,
	SET_INGREDIENT_PAGE,
	SET_MODAL_CONTENT
} from "../actions";

const initialState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsSuccess: false,
	ingredientsFailed: false,
	error: '',

	modalContent: null,
	showIngredientModal: false,
	ingredientPage: null
}

export const ingredients = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredientsRequest: true,
			}
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredientsSuccess: true,
				ingredientsRequest: false,
				ingredients: action.items
			}
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsRequest: false,
				ingredientsFailed: true,
				error: action.value
			}
		}
		case OPEN_INGREDIENT_MODAL: {
			return {
				...state,
				showIngredientModal: true
			}
		}
		case CLOSE_INGREDIENT_MODAL: {
			return {
				...state,
				showIngredientModal: false
			}
		}
		case SET_MODAL_CONTENT: {
			return {
				...state,
				modalContent: action.value
			}
		}
		case SET_INGREDIENT_PAGE: {
			return {
				...state,
				ingredientPage: action.value
			}
		}
		default:
			return state;
	}
}