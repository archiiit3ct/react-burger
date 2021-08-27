import { TIngredient } from '../types';
import { MOVE_CONSTRUCTOR_ITEM, ADD_CONSTRUCTOR_INGREDIENT,
  DEL_CONSTRUCTOR_INGREDIENT, } from '../constants/constructor';
  import { ADD_ORDER_SUCCESS } from './order';
export {MOVE_CONSTRUCTOR_ITEM, ADD_CONSTRUCTOR_INGREDIENT,
  DEL_CONSTRUCTOR_INGREDIENT, ADD_ORDER_SUCCESS };

interface IMoveConstructorItemAction {readonly type: typeof MOVE_CONSTRUCTOR_ITEM; readonly dragIndex: number; readonly hoverIndex: number;}
interface IAddConstructorIngredientAction {readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT; readonly ingredient: TIngredient; readonly randomId: number;}
interface IDelConstructorIngredientAction {readonly type: typeof DEL_CONSTRUCTOR_INGREDIENT; readonly index: number;}
interface IAddOrderSuccessAction {readonly type: typeof ADD_ORDER_SUCCESS;}
export type TConstructorAction = IMoveConstructorItemAction | IAddConstructorIngredientAction | IDelConstructorIngredientAction | IAddOrderSuccessAction
export const moveConstructorItem = ({ dragIndex, hoverIndex }:{dragIndex: number, hoverIndex: number}) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  dragIndex,
  hoverIndex,
});
