import React from 'react';

import OrderItem from "../../components/OrderItem/OrderItem";

import styles from './orders-page.module.scss';

const OrdersPage = () => {
	return (
		<div className={`${styles.orders} pt-12`}>
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
			<OrderItem />
		</div>
	)
}

export default OrdersPage;