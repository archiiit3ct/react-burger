import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.scss';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal');

const Modal = ({ onClose, handleKeyDown, modalMode }) => {
  return createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} onKeyDown={handleKeyDown}/>
        <div className={styles.modal}>
          <section className={`${styles.header} text text_type_main-large`}>
            { modalMode.header ? modalMode.header : null }
            <section className={styles.closeButton}>
              <CloseIcon type="primary" onClick={onClose} />
            </section>
          </section>
          { modalMode.mode === 'order' ? <OrderDetails order={modalMode.order.id} /> : <IngredientDetails ingredient={modalMode.ingredient} /> }
        </div>,
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  content: PropTypes.object
}

export default Modal;
