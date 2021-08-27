import {
	CLEAR_CART,
	CLOSE_ORDER,
	CREATE_NEW_ORDER_FAILED,
	CREATE_NEW_ORDER_REQUEST,
	CREATE_NEW_ORDER_SUCCESS,
	UPDATE_CART
} from "../actions";

const initialState = {
	bun: null,
	fillings: [],

	createOrder: false,
	createOrderSuccess: false,
	createOrderFailed: false,
	showOrderDetails: false,
	orderDetails: null,
}

export const order = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CART: {
			return {
				...state,
				bun: action.updatedCart.bun,
				fillings: action.updatedCart.fillings,
			}
		}
		case CLEAR_CART: {
			return {
				...state,
				bun: null,
				fillings: [],
			}
		}
		case CREATE_NEW_ORDER_REQUEST: {
			return {
				...state,
				createOrder: true,
			}
		}
		case CREATE_NEW_ORDER_SUCCESS: {
			return {
				...state,
				createOrder: false,
				createOrderSuccess: true,
				orderDetails: action.orderDetails,
				showOrderDetails: true,
			}
		}
		case CREATE_NEW_ORDER_FAILED: {
			return {
				...state,
				createOrder: false,
				createOrderFailed: true,
			}
		}
		case CLOSE_ORDER: {
			return {
				...state,
				showOrderDetails: false,
				bun: null,
				fillings: [],
			}
		}

		default:
			return state;
	}
}