import {useMemo} from "react";
import styles from "./TotalPrice.module.scss";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_ORDER, createOrder} from "../../services/actions/order";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useHistory} from "react-router-dom";

const TotalPrice = () => {
	const dispatch = useDispatch();
	const {bun, fillings, showOrderDetails, user} = useSelector(store => ({
		bun: store.order.bun,
		fillings: store.order.fillings,
		showOrderDetails: store.order.showOrderDetails,
		user: store.user.user
	}));

	const history = useHistory();

	const getOrder = () => {
		if (!user) {
			history.push({pathname: '/login'});
			return;
		}
		dispatch(createOrder())
	}

	const closeModal = (e) => {
		e.stopPropagation();
		dispatch({type: CLOSE_ORDER})
	}

	const totalPrice = useMemo(
		() => {
			let result = 0;
			if (!!bun) {
				result += 2 * bun.price;
			}
			if (fillings.length > 0) {
				result += fillings.reduce((acc, filling) => acc + filling.price, 0);
			}
			return result;
		},
		[bun, fillings]
	);

	return (
		<section className={styles.total}>
			<div className={styles.price}>
				<p className={`${styles.number} text text_type_main-large`}>
					{totalPrice}
				</p>
				<CurrencyIcon type="primary"/>
			</div>
			<Button type="primary" size="medium" onClick={() => getOrder()}>
				Оформить заказ
			</Button>
			{showOrderDetails &&
			<Modal type="ingredient" onClose={closeModal}>
				<OrderDetails/>
			</Modal>
			}
		</section>
	);
};

export default TotalPrice;
