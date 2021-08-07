export const UPDATE_CART = 'UPDATE_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CREATE_NEW_ORDER_REQUEST = 'CREATE_NEW_ORDER_REQUEST';
export const CREATE_NEW_ORDER_SUCCESS = 'CREATE_NEW_ORDER_SUCCESS';
export const CREATE_NEW_ORDER_FAILED = 'CREATE_NEW_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

const ORDER_API = "https://norma.nomoreparties.space/api/orders";

export const addIngredientConstructor = (ingredient) => {
	return (dispatch, getState) => {
		const getIngredientKey = (ingredients) => {
			const maxAvailableIndex = ingredients.reduce((res, item) => {
				const currentKey = Number(item.key.split("_")[1]);
				return res < currentKey ? currentKey : res;
			}, -1);

			return maxAvailableIndex + 1;
		};

		const assignKeyToIngredient = (ingredient) => {
			if (ingredient.type === "bun") {
				ingredient.key = ingredient._id;
				return;
			}
			ingredient.key = [
				ingredient._id,
				getIngredientKey(prevCart.fillings),
			].join("_");
		};

		const prevCart = getState().order;
		const newIngredient = {
			...getState().ingredients.ingredients.filter(
				(item) => item._id === ingredient
			)[0],
		};

		assignKeyToIngredient(newIngredient);

		const updatedCart =
			newIngredient.type === "bun"
				? {...prevCart, bun: newIngredient}
				: {...prevCart, fillings: [...prevCart.fillings, newIngredient]};
		dispatch({type: UPDATE_CART, updatedCart: updatedCart});
	};
};

export const removeIngredientConstructor = (ingredientKey) => {
	return (dispatch, getState) => {
		const prevCart = getState().order;
		const removedIngredientIndex = prevCart.fillings.findIndex(
			(item) => item.key === ingredientKey
		);
		const updatedFillings = [...prevCart.fillings];

		updatedFillings.splice(removedIngredientIndex, 1);

		dispatch({
			type: UPDATE_CART,
			updatedCart: {...prevCart, fillings: updatedFillings},
		});
	};
};

export const createOrder = () => {

	return (dispatch, getState) => {
		const prevCart = getState().order;
		const {bun, fillings} = {...prevCart};
		if (bun === null) return null;
		dispatch({type: CREATE_NEW_ORDER_REQUEST});

		fetch(ORDER_API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ingredients: [...fillings, bun].map((item) => item && item._id),
			}),
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then((res) => {
				dispatch({
					type: CREATE_NEW_ORDER_SUCCESS,
					orderDetails: res,
				});
			})
			.catch((e) => {
				console.error(e);
				dispatch({type: CREATE_NEW_ORDER_FAILED});
			});
	};
};

export const sortFillingsOrder = (oldItemIndex, newItemIndex) => {
	return (dispatch, getState) => {
		const prevCart = getState().order;
		const newFillings = [...prevCart.fillings];

		const itemToMove = newFillings[oldItemIndex];
		newFillings.splice(oldItemIndex, 1);
		newFillings.splice(newItemIndex, 0, itemToMove);

		const updatedCart = {...prevCart, fillings: newFillings};

		dispatch({type: UPDATE_CART, updatedCart: updatedCart});
	};
};