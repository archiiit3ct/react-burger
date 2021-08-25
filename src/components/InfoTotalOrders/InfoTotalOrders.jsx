import styles from './InfoTotalOrder.module.scss';
import {useSelector} from 'react-redux';

export const InfoTotalOrders = () => {
	const {totalToday, total, orders} = useSelector(
		(store) => store.ws.messages
	);
	const readyOrders = orders?.filter((item) => item.status === 'done');

	const upcomingOrders = orders?.filter((item) => item.status !== 'done');
	return (
		<div className={styles.info}>
			<div className={styles.stage}>
				<div className={`${styles.wrapper} text text_type_main-medium`}>
					Готовы:
					<ul className={`${styles.ready} pt-6 text text_type_digits-default`}>
						{readyOrders?.slice(0, 20).map((item) => (
							<li key={item._id}>{item.number}</li>
						))}
					</ul>
				</div>
				<div className={`${styles.wrapper} text text_type_main-medium`}>
					В работе:
					<ul className='pt-6 text text_type_digits-default'>
						{upcomingOrders?.map((item) => (
							<li key={item._id}>{item.number}</li>
						))}
					</ul>
				</div>
			</div>
			<div className='text text_type_main-medium'>
				Выполнено за всё время:
				<div className={`${styles.total} text text_type_digits-large`}>
					{total}
				</div>
			</div>
			<div className='text text_type_main-medium'>
				Выполнено за всё сегодня:
				<div className={`${styles.total} text text_type_digits-large`}>
					{totalToday}
				</div>
			</div>
		</div>
	);
};
