import styles from "./BurgerConstructor.module.scss";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalPrice from "../TotalPrice/TotalPrice";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredientConstructor} from "../../services/actions/order";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";

const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const {bun, fillings} = useSelector(store => store.order);

	const [{isHover}, dropTarget] = useDrop({
		accept: 'ingredient-page',
		drop(item) {
			dispatch(addIngredientConstructor(item.id));
		},
		collect: monitor => ({
			isHover: monitor.isOver()
		})
	})

	const background = isHover ? '#1C1C21' : '';
	const border = isHover ? '1px solid #4C4CFF' : '';
	const cartHasItems = bun || fillings.length > 0;

	return (
		<section className={styles.main} ref={dropTarget}>
			{cartHasItems ? (
				<>
					<section className={styles.edgeElement}>
						{bun !== null && (
							<ConstructorElement
								type="top"
								isLocked={true}
								text={bun.name + ' (верх)'}
								price={bun.price}
								thumbnail={bun.image}
							/>
						)}
					</section>

					<div className={styles.container}>
						{fillings.map((item, index) => {
							return (
								<BurgerConstructorItem
									key={item.key}
									text={item.name}
									thumbnail={item.image}
									index={index}
									price={item.price}
									id={item.key}
									isLocked={false}/>
							)
						})}
					</div>

					<section className={styles.edgeElement}>
						{bun !== null && (
							<ConstructorElement
								type="bottom"
								isLocked={true}
								text={bun.name + ' (верх)'}
								price={bun.price}
								thumbnail={bun.image}
							/>
						)}
					</section>

					<TotalPrice/>
				</>
			) : (
				<p className={`${styles.emptyConstructor} text text_type_main-large`} style={{background, border}}>Перенесите
					сюда ингредиенты</p>
			)}
		</section>
	);
};

export default BurgerConstructor;