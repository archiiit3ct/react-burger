import {useMemo} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, ConstructorElement, CurrencyIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient';
import style from './BurgerConstructor.module.scss';
import {useDispatch, useSelector} from '../../services/hooks';
import {ADD_CONSTRUCTOR_INGREDIENT} from '../../services/constants/constructor';
import {handleAddOrder} from '../../services/actions/order';
import {useDrop} from 'react-dnd';
import {TIngredient} from '../../services/types';

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
    const {orderRequest} = useSelector((state) => state.order);
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
                    {constructorIngredients && (
                        <ul className={style.dopElement} data-test='container'>
                            {constructorIngredients.map((item, index) => (
                                <ConstructorIngredient
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    id={item._id}
                                    index={index}
                                    key={item.key}
                                />
                            ))}
                        </ul>
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
                            <CurrencyIcon type='primary'/>
                        </div>
                        {constructorBun && constructorIngredients ? (
                            <>
                                {orderRequest ? (
                                    <p className='text text_type_main-medium text_color_inactive'>
                                        Оформление заказа
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
                                Добавьте булку
                            </p>
                        ) : (
                            <p className='text text_type_main-medium text_color_inactive'>
                                Добавьте начинку
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <p className={`${style.emptyConstructor} text text_type_main-large`}>
                    Перенесите сюда ингредиенты
                </p>
            )}
        </section>
    );
};

export default BurgerConstructor;
