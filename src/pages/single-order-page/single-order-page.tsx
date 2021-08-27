import { useEffect } from 'react';
import style from './single-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ItemInOrder from '../../components/ItemInOrder/ItemInOrder';
import { useSelector, useDispatch } from '../../services/hooks';
import { useParams, useRouteMatch } from 'react-router-dom';
import { transformDate, showStatus } from '../../services/utils';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/constants/ws';
import {
  WS_CONNECTION_PRIVATE_START,
  WS_CONNECTION_PRIVATE_CLOSED,
} from '../../services/constants/ws-private';
import Loader from '../../components/Loader/Loader';
const SingleOrder = () => {
  const isProfile = !!useRouteMatch('/profile-page');
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch(
      isProfile
        ? { type: WS_CONNECTION_PRIVATE_START }
        : { type: WS_CONNECTION_START }
    );
    return () => {
      dispatch(
        isProfile
          ? { type: WS_CONNECTION_PRIVATE_CLOSED }
          : { type: WS_CONNECTION_CLOSED }
      );
    };
  }, [dispatch, isProfile]);

  const { catalog, orders } = useSelector((state) => ({
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
    <div className={style.container}>
      <div className={`${style.id} text text_type_digits-default`}>
        #{selectedOrder.number}
      </div>
      <div className='text text_type_main-medium pt-10'>
        {selectedOrder.name}
      </div>
      <div className={`${style.status} text text_type_main-default pt-3`}>
        <span style={{ color: status?.color }}>{status?.orderStatus}</span>
      </div>
      <div className='text text_type_main-medium pt-15'>Cотав:</div>
      <ul className={`${style.wrapper} pt-6`}>
        {orderIngredients &&
          orderIngredients.map((item, i) =>
            item ? <ItemInOrder key={i} {...item} /> : null
          )}
      </ul>
      <div className={`${style.footer} pt-10`}>
        <span className='text text_type_main-default text_color_inactive'>
          {transformDate(selectedOrder.createdAt)}
        </span>
        <span className={`${style.price} text text_type_digits-default`}>
          {price}
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default SingleOrder;
