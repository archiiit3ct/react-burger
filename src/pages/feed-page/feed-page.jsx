import React, {useCallback, useEffect} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import OrderItem from "../../components/OrderItem/OrderItem";
import styles from "./feed-page.module.scss";
import {
  CLOSE_INGREDIENT_MODAL,
  OPEN_INGREDIENT_MODAL,
  SET_MODAL_CONTENT,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions";
import {InfoTotalOrders} from "../../components/InfoTotalOrders/InfoTotalOrders";
import Modal from "../../components/Modal/Modal";
import FeedDetails from "../../components/FeedDetails/FeedDetails";

const FeedPage = () => {
	const {showIngredientModal} = useSelector(store => store.ingredients);

	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();
	const {orders} = useSelector((store) => store.ws.messages);

	useEffect(() => {
		dispatch({type: WS_CONNECTION_START});
		return () => dispatch({type: WS_CONNECTION_CLOSED});
	}, [dispatch]);

	const openModal = (ingredient) => {
		dispatch({type: SET_MODAL_CONTENT, value: ingredient});
		dispatch({type: OPEN_INGREDIENT_MODAL});
	}

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_INGREDIENT_MODAL})
		dispatch({type: SET_MODAL_CONTENT, value: null});
		history.replace({pathname: '/feed', state: null})
	}, [history, dispatch]);

	return (
		<div className={`${styles.main} pt-10`}>
			<h2 className="text text_type_main-large mb-10">Лента заказов</h2>
			<div className={styles.container}>
				<div className={styles.orders}>
					{orders?.slice(0, 20).map((item) => (
						<Link
							key={item._id}
							className={styles.link}
							to={{
								pathname: `/feed/${item._id}`,
								state: {background: location},
							}}
							onClick={() => {
								openModal(item)
							}}
						>
							<OrderItem {...item} status={null}/>
						</Link>
					))}
				</div>
				<InfoTotalOrders/>
			</div>

			{showIngredientModal && (
				<Modal type="ingredient" onClose={closeModal}>
					<FeedDetails/>
				</Modal>
			)
			}
		</div>
	);
};

export default FeedPage;
