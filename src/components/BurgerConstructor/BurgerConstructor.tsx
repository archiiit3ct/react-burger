import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AddIngredient from '../constructor-ingredient/add-ingredient';
import style from './burger-constructor.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { ADD_CONSTRUCTOR_INGREDIENT } from '../../services/constants/constructor';
import { handleAddOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { TIngredient } from '../../services/types';

const BurgerConstructor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hasToken = localStorage.getItem('refreshToken');
  const {
    constructorIngredients,
    constructorBun,
  }: {
    constructorIngredients: Array<TIngredient & { key: number }>;
    constructorBun: TIngredient;
  } = useSelector((state) => state.constructor);
  const { orderRequest } = useSelector((state) => state.order);
  const [, dropTarget] = useDrop({
    accept: 'Ingredient',
    drop(ingredient: Array<TIngredient>) {
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ...ingredient,
        randomId: Math.round(Math.random() * 1000),
      });
    },
  });

  const idForOrder = () => {
    const fullList = [...constructorIngredients, constructorBun];
    return fullList && fullList.map((item: TIngredient) => item._id);
  };
  const calculate = (
    constructorIngredients: Array<TIngredient>,
    constructorBun: TIngredient
  ) => {
    if (constructorIngredients && constructorBun) {
      return constructorIngredients.reduce(
        (result: number, item: { price: number }) => result + item.price,
        constructorBun?.price * 2
      );
    } else if (constructorBun) return constructorBun?.price * 2;
    else
      return constructorIngredients?.reduce(
        (result: number, item: { price: number }) => result + item.price,
        0
      );
  };
  const totalPrice = useMemo(
    () => calculate(constructorIngredients, constructorBun),
    [constructorIngredients, constructorBun]
  );

  return (
    <section
      className={style.burgerConstructor + ' pl-4'}
      ref={dropTarget}
      data-test='dropTarget'
    >
      {constructorIngredients || constructorBun ? (
        <>
          {constructorBun && (
            <div className={style.bun} data-test='container-bun-up'>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${constructorBun.name} (верх)`}
                price={constructorBun.price}
                thumbnail={constructorBun?.image}
              />
            </div>
          )}
          {constructorIngredients ? (
            <ul className={style.dopElement} data-test='container'>
              {constructorIngredients.map((item, index) => (
                <AddIngredient
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item._id}
                  index={index}
                  key={item.key}
                />
              ))}
            </ul>
          ) : (
            <p className='text text_type_main-medium text_color_inactive'>
              Может хоты бы кетчуп?
            </p>
          )}
          {constructorBun && (
            <div className={style.bun} data-test='container-bun-down'>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${constructorBun.name} (низ)`}
                price={constructorBun.price}
                thumbnail={constructorBun.image}
              />
            </div>
          )}

          <div className={style.finalPrice}>
            <div className={style.price}>
              <span className='text text_type_digits-medium'>{totalPrice}</span>
              <CurrencyIcon type='primary' />
            </div>
            {constructorBun && constructorIngredients ? (
              <>
                {orderRequest ? (
                  <p className='text text_type_main-medium text_color_inactive'>
                    Подождите отправляем на кухню
                  </p>
                ) : (
                  <Button
                    type='primary'
                    size='large'
                    onClick={
                      hasToken
                        ? () => dispatch(handleAddOrder(idForOrder()))
                        : () => history.replace('/login')
                    }
                  >
                    Оформить заказ
                  </Button>
                )}
              </>
            ) : constructorIngredients ? (
              <p className='text text_type_main-medium text_color_inactive'>
                И булку не забудь
              </p>
            ) : (
              <p className='text text_type_main-medium text_color_inactive'>
                Добавь начинку
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className='text text_type_main-default text_color_inactive'
            style={{ paddingLeft: '70px' }}
          >
            <p>Давай собери уже свой бургер!</p>
            <p>Перетаскивай сюда всё что хочешь!</p>
            <p>И булку не забудь.</p>
            <p>Бургер без булки, как окрошка без кваса - салат.</p>
          </div>
        </>
      )}
    </section>
  );
};

export default BurgerConstructor;
