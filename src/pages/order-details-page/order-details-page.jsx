import React, {useEffect} from 'react';
import styles from './order-details-page.module.scss';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useRouteMatch} from 'react-router-dom';
import {showStatus, transformDate} from '../../services/utils';
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_PRIVATE_CLOSED,
	WS_CONNECTION_PRIVATE_START,
	WS_CONNECTION_START,
} from '../../services/actions';
import IconIngredient from "../../components/IconIngredient/IconIngredient";
import Loader from "../../components/Loader/Loader";

const OrderDetailsPage = () => {
	const isProfile = !!useRouteMatch('/profile');
	const dispatch = useDispatch();

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

	const {id} = useParams();
	const {catalog, orders} = useSelector((state) => ({
		orders: isProfile
			? state.wsPrivate.messages.orders
			: state.ws.messages.orders,
		catalog: state.ingredients.ingredients,
	}));
	const selectedOrder = orders && orders.find((item) => item._id === id);
	const listId = orders && selectedOrder.ingredients;
	const orderIngredients =
		orders &&
		listId.map((id) => {
			return catalog.find((item) => item._id === id);
		});
	const price =
		orders &&
		orderIngredients.reduce((sum, item) => {
			return sum + item.price;
		}, 0);

	return orders ? (
		<div className={styles.container}>
			<div className={`${styles.id} text text_type_digits-default`}>
				#{selectedOrder.number}
			</div>
			<div className='text text_type_main-medium pt-10'>
				{selectedOrder.name}
			</div>
			<div className={`${styles.status} text text_type_main-default pt-3`}>
				{showStatus(selectedOrder.status)}
			</div>
			<div className='text text_type_main-medium pt-15'>Состав:</div>
			<ul className={`${styles.wrapper} pt-6`}>
				{orderIngredients.map((item, i) => (
					<li className={styles.item} key={i}>
						<IconIngredient img={item.image_mobile}/>
						<div className={`${styles.name} text text_type_main-default`}>{item.name}</div>
						<div className={`${styles.price} text text_type_digits-default`}>
							<span>{item.price}</span>
							<CurrencyIcon type='primary'/>
						</div>
					</li>
				))}
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
	) : (<Loader/>)
};
export default OrderDetailsPage;
