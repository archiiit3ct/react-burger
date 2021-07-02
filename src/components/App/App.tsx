import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Modal from '../Modal/Modal';

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    productData: null,
    success: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState({});

  const openModal = ( content: object ) => {
      setShowModal(true);
      setModalMode(content);
  }

  const closeModal = () => {
      setShowModal(false)
  }

  const handleKeyDown = (e: any) => {
      if (e.keyCode === 27) {
          setShowModal(false);
      }
  }

  useEffect(() => {
    const getData = async () => {
      fetch(API)
        .then((res) => res.json())
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
            <Modal onClose={closeModal} modalMode={modalMode} handleKeyDown={handleKeyDown}/>
        )}
    </div>
  );
}

export default App;
