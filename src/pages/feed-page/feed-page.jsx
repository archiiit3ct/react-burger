import React from 'react';
import OrderItem from "../../components/OrderItem/OrderItem";

import styles from './feed-page.module.scss';

const FeedPage = () => {
	return (
		<div className={`${styles.main} pt-10`}>
			<h2 className="text text_type_main-large mb-10">Лента заказов</h2>
			<div className={styles.container}>
				<div className={styles.orders}>
					<OrderItem/>
					<OrderItem/>
					<OrderItem/>
					<OrderItem/>
					<OrderItem/>
				</div>
				<div className={styles.details}>
					<div className={`${styles.info} mb-15`}>
						<div>
							<h4 className="text text_type_main-medium mb-6">Готовы:</h4>
							<p className={`${styles.ready} text text_type_digits-default mb-2`}>034533</p>
							<p className={`${styles.ready} text text_type_digits-default mb-2`}>034532</p>
							<p className={`${styles.ready} text text_type_digits-default mb-2`}>034530</p>
							<p className={`${styles.ready} text text_type_digits-default mb-2`}>034527</p>
							<p className={`${styles.ready} text text_type_digits-default mb-2`}>034525</p>
						</div>
						<div>
							<h4 className="text text_type_main-medium mb-6">В работе:</h4>
							<p className="text text_type_digits-default mb-2">034538</p>
							<p className="text text_type_digits-default mb-2">034541</p>
							<p className="text text_type_digits-default mb-2">034542</p>
						</div>
					</div>
					<h3 className="text text_type_main-medium">Выполнено за все время:</h3>
					<p className={`${styles.shadow} text text_type_digits-large mb-15`}>28 752</p>
					<h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
					<p className={`${styles.shadow} text text_type_digits-large text_shadow`}>138</p>
				</div>
			</div>
		</div>
	)
}

export default FeedPage;