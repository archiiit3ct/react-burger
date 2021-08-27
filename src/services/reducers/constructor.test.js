import {
  MOVE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_INGREDIENT,
  DEL_CONSTRUCTOR_INGREDIENT,
} from '../actions/constructor';
import { ADD_ORDER_SUCCESS } from '../actions/order';
import { initialState, constructorReducer } from './constructor';

describe('constructor reducer', () => {
  it('should handle MOVE_CONSTRUCTOR_ITEM', () => {
    expect(
      constructorReducer(
        { ...initialState, constructorIngredients: [1, 2, 3] },
        { type: MOVE_CONSTRUCTOR_ITEM, dragIndex: 0, hoverIndex: 1 }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: [2, 1, 3],
      })
    );
  });
  it('should handle ADD_CONSTRUCTOR_INGREDIENT Bun', () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          constructorBun: { name: 'bread1', type: 'bun' },
        },
        {
          type: ADD_CONSTRUCTOR_INGREDIENT,
          ingredient: { name: 'bread2', type: 'bun' },
        }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorBun: { name: 'bread2', type: 'bun' },
      })
    );
  });
  it('should handle ADD_CONSTRUCTOR_INGREDIENT not Bun', () => {
    expect(
      constructorReducer(
        {
          ...initialState,
          constructorIngredients: [{ name: 'cheese', type: 'food', key: 22 }],
        },
        {
          type: ADD_CONSTRUCTOR_INGREDIENT,
          ingredient: { name: 'butter', type: 'food' },
          randomId: 33,
        }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: [
          { name: 'cheese', type: 'food', key: 22 },
          { name: 'butter', type: 'food', key: 33 },
        ],
      })
    );
  });
  it('should handle DEL_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      constructorReducer(
        { ...initialState, constructorIngredients: [1, 2, 3] },
        { type: DEL_CONSTRUCTOR_INGREDIENT, index: 0 }
      )
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: [2, 3],
      })
    );
  });
  it('should handle ADD_ORDER_SUCCESS', () => {
    expect(
      constructorReducer(initialState, { type: ADD_ORDER_SUCCESS })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: null,
        constructorBun: null,
      })
    );
  });
  it('return initial state', () => {
    expect(constructorReducer(initialState, {})).toEqual({
      constructorIngredients: [],
      constructorBun: {},
    });
  });
});
