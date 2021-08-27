import ReactDOM from 'react-dom';
import { useEffect, FC, ReactNode } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.scss';
import { CLOSE_MODAL } from '../../services/constants/modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
interface IModalProps {
  headerText?: string;
  children: ReactNode;
  back: string;
}
const modalContainer = document.getElementById('ModalComponent');
const Modal: FC<IModalProps> = ({ children, headerText, back }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    history.push(back);
  };
  const closeModalsByEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', closeModalsByEscape);
    return () => {
      document.removeEventListener('keydown', closeModalsByEscape);
    };
  });
  return modalContainer ? ReactDOM.createPortal(
    (<>
      <div className={style.modal}>
        <header className={style.header}>
          <p className='text text_type_main-large'>{headerText}</p>
          <CloseIcon type='primary' onClick={closeModal} />
        </header>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal}></ModalOverlay>
    </>),
    modalContainer) : null
};

export default Modal;
