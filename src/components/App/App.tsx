import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    productData: [],
    success: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const openModal = ( content: object ) => {
      console.log(content);
      setShowModal(true);
      setModalContent(content);
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
            <BurgerConstructor data={state.productData} openModal={openModal} />
          </>
        )}
      </main>
        { showModal && (
            <Modal onClose={closeModal}>

            </Modal>
        )}
    </div>
  );
}

export default App;
