import React, { useEffect } from 'react';
import styles from './ModalOverlay.module.scss';

import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, );

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose} />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;