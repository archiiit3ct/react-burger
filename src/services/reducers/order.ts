import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
  TAddOrderAction,
} from '../actions/order';
import { CLOSE_MODAL, ICloseModalAtion } from '../actions/modal';
type TOrderState = {
  orderRequest: boolean,
  orderSuccess: boolean,
  orderFailed: boolean,
  order: number | null,
}
const initialState: TOrderState = {
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
  order: null,
};

export const orderReducer = (state = initialState, action: TAddOrderAction | ICloseModalAtion) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderSuccess: false,
        orderFailed: false,
      };
    }
    case ADD_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderSuccess: true,
        orderFailed: false,
      };
    }
    case ADD_ORDER_ERROR: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        orderSuccess: false,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        orderSuccess: false,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};
