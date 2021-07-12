import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { ConstructorContext } from "../../services/constructorContext";

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    productData: [],
    success: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = ( content: any ) => {
      setShowModal(true);
      if(content.mode === 'order') {
        setModalContent(
            <Modal onClose={closeModal} >
              <OrderDetails order={content.order.id} />
            </Modal>
        )
      } else {
        setModalContent(
            <Modal onClose={closeModal} header={content.header}>
              <IngredientDetails ingredient={content.ingredient} />
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
            <ConstructorContext.Provider value={{state.productData}}>
              <BurgerConstructor data={state.productData} openModal={openModal} />
            </ConstructorContext.Provider>
          </>
        )}
      </main>
        { showModal && ( modalContent )}
    </div>
  );
}

export default App;
