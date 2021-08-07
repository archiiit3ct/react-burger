import React from 'react';
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./constructor-page.module.scss";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import {DndProvider} from "react-dnd";

const ConstructorPage = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<main className={styles.main}>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</main>
		</DndProvider>
	);
};

export default ConstructorPage;
