import React, { useEffect } from 'react';
import styles from './ModalOverlay.module.scss';

import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose, onKeyDown }) => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className={styles.modalOverlay} onClick={onClose} />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
}

export default ModalOverlay;