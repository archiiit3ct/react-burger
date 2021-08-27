import {useEffect} from 'react';
import styles from './single-order-page.module.scss';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ItemInOrder from '../../components/ItemInOrder/ItemInOrder';
import {useDispatch, useSelector} from '../../services/hooks';
import {useParams, useRouteMatch} from 'react-router-dom';
import {showStatus, transformDate} from '../../services/utils';
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START,} from '../../services/constants/ws';
import {WS_CONNECTION_PRIVATE_CLOSED, WS_CONNECTION_PRIVATE_START,} from '../../services/constants/ws-private';
import Loader from '../../components/Loader/Loader';

const SingleOrderPage = () => {
    const isProfile = !!useRouteMatch('/profile');
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();
    useEffect(() => {
        dispatch(
            isProfile
                ? {type: WS_CONNECTION_PRIVATE_START}
                : {type: WS_CONNECTION_START}
        );
        return () => {
            dispatch(
                isProfile
                    ? {type: WS_CONNECTION_PRIVATE_CLOSED}
                    : {type: WS_CONNECTION_CLOSED}
            );
        };
    }, [dispatch, isProfile]);

    const {catalog, orders} = useSelector((state) => ({
        orders: isProfile
            ? state.wsPrivate.messages.orders
            : state.ws.messages.orders,
        catalog: state.ingredients.ingredients,
    }));
    const selectedOrder = orders && orders.find((item) => item._id === id);
    const listId = orders && selectedOrder?.ingredients;
    const orderIngredients =
        orders &&
        listId?.map((id: string) => {
            return catalog.find((item) => item._id === id);
        });
    const price =
        orders &&
        orderIngredients?.reduce((sum, item) => {
            return sum + (item?.price || 0);
        }, 0);
    const status = selectedOrder && showStatus(selectedOrder.status);

    return selectedOrder ? (
        <div className={styles.container}>
            <div className={`${styles.id} text text_type_digits-default`}>
                #{selectedOrder.number}
            </div>
            <div className='text text_type_main-medium pt-10'>
                {selectedOrder.name}
            </div>
            <div className={`${styles.status} text text_type_main-default pt-3`}>
                <span style={{color: status?.color}}>{status?.orderStatus}</span>
            </div>
            <div className='text text_type_main-medium pt-15'>Состав:</div>
            <ul className={`${styles.wrapper} pt-6`}>
                {orderIngredients &&
                orderIngredients.map((item, i) =>
                    item ? <ItemInOrder key={i} {...item} /> : null
                )}
            </ul>
            <div className={`${styles.footer} pt-10`}>
                <span className='text text_type_main-default text_color_inactive'>
                  {transformDate(selectedOrder.createdAt)}
                </span>
                <span className={`${styles.price} text text_type_digits-default`}>
                  {price}
                    <CurrencyIcon type='primary'/>
                </span>
            </div>
        </div>
    ) : (
        <Loader/>
    );
};
export default SingleOrderPage;
