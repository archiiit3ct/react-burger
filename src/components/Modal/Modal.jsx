import React from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.scss';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal');

const Modal = ({onClose, children, header}) => {
	return createPortal(
		(
			<>
				<ModalOverlay onClose={onClose}/>
				<div className={styles.modal}>
					<section className={`${styles.header} text text_type_main-large`}>
						{header ? header : null}
						<section className={styles.closeButton}>
							<CloseIcon type="primary" onClick={onClose}/>
						</section>
					</section>
					{children}
				</div>
				,
			</>
		),
		modalRoot
	);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	header: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default Modal;
