import React, { useState, useEffect, useReducer } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { ConstructorContext, IngredientContext } from "../../services/constructorContext";

const API = "https://norma.nomoreparties.space/api/ingredients";
const ORDER_API = "https://norma.nomoreparties.space/api/orders";

const productInitialState = { product: [], bun: [] };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if(action.payload.type === 'bun') return {
        ...state,
        bun: state.bun.splice(0, 1, action.payload)
      }
      return {
        ...state,
        product: state.product.concat(action.payload)
      }
    case "delete":
      return state.product.filter(item => item !== action.payload);
    default:
      return state;
  }
}

function App() {
  const [state, setState] = useState({
    productData: [],
    success: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [productState, productDispatcher] = useReducer(reducer, productInitialState ,undefined)

  const getTotalPrice = (type, price) => {
    if(type === 'bun') {
      setTotalPrice(totalPrice + price * 2)
    } else {
      setTotalPrice(totalPrice + price)
    }
  }

  const getOrder = () => {
    if(productState.bun.length === 0) return null;
    const product = productState.product.map((item) => { return item._id })
    const multiBun = productState.bun.concat(productState.bun)
    const bun = multiBun.map((item) => { return item._id})
    const ingredients = product.concat(bun);
    fetch(ORDER_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredients }),
    })
      .then(res => {
        if(res.ok) return res.json();
        return Promise.reject(`Ошибка ${res.status}`)
      })
      .then((data) => {
        console.log(data.order.number)
        openModal({mode: 'order', order: data.order.number, header: '' })
      })
      .catch(e => console.error(e));
  }

  const openModal = ( content ) => {
      setShowModal(true);
      if(content.mode === 'order') {
        setModalContent(
            <Modal onClose={closeModal} >
              <OrderDetails order={content.order} />
            </Modal>
        )
      } else {
        setModalContent(
            <Modal onClose={closeModal} header={content.header}>
              <IngredientContext.Provider value={{ productDispatcher, getTotalPrice }}>
                <IngredientDetails ingredient={content.ingredient} onClose={closeModal} />
              </IngredientContext.Provider>
            </Modal>
        )
      }
  }

  const closeModal = () => {
      setShowModal(false)
  }

  useEffect(() => {
    const getData = async () => {
      fetch(API)
        .then((res) => {
            if(res.ok) return res.json();
            return Promise.reject(`Ошибка ${res.status}`)
        })
        .then((data) => setState({ ...state, productData: data.data, success: data.success }))
        .catch((e) => {
          console.error(e);
          setState({ ...state, success: false });
        });
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        {state.success && (
          <>
            <BurgerIngredients data={state.productData} openModal={openModal}/>
            <ConstructorContext.Provider value={{productState, productDispatcher, openModal, totalPrice, getOrder}}>
              <BurgerConstructor />
            </ConstructorContext.Provider>
          </>
        )}
      </main>
        { showModal && ( modalContent )}
    </div>
  );
}

export default App;
