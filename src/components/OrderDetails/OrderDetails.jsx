import React from 'react';
import styles from "../OrderDetails/OrderDetails.module.scss";
import doneImage from "../../images/done.png";
import {useSelector} from "react-redux";


const OrderDetails = () => {
	const {orderDetails} = useSelector(store => store.order)
	const title = orderDetails.success ? "Ваш заказ начали готовить" : "Заказ не может быть выполнен";
	const description = orderDetails.success ? "Дождитесь готовности на орбитальной станции" : "Обратитесь в поддержку";

	return (
		<div className={styles.order}>
			<p className={`${styles.title} text text_type_digits-large`}>{orderDetails.order.number}</p>
			<p className='text text_type_main-medium'>идентификатор заказа</p>
			<img src={doneImage} alt="Done" className={styles.icon}/>
			<p className="text text_type_main-default">{title}</p>
			<p className={`${styles.desc} text text_type_main-default`}>{description}</p>
		</div>
	)
};

export default OrderDetails;
