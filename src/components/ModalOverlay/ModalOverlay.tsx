import {FC} from 'react';
import style from './ModalOverlay.module.scss';

interface IModalOverlay {
    closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({closeModal}) => (
    <div className={style.overlay} onClick={closeModal}></div>
);
export default ModalOverlay;
