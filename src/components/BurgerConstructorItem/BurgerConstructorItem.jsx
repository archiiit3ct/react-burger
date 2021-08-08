import React from 'react';
import styles from './BurgerConstructorItem.module.scss';
import {useDispatch} from 'react-redux';
import {useDrag, useDrop} from "react-dnd";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {removeIngredientConstructor, sortFillingsOrder} from "../../services/actions/order";
import PropTypes from 'prop-types';

const BurgerConstructorItem = ({index, id, text, price, thumbnail, isLocked}) => {

  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const [{isDragging}, drag] = useDrag({

    type: "fillings",
    item: {id, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'fillings',
    hover(item, monitor) {

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const node = ref.current.querySelector('div');
      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset(); //cursor position when it intersects drop target
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { //downwards
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { //upwards
        return;
      }

      dispatch(sortFillingsOrder(dragIndex, hoverIndex));
      monitor.getItem().index = hoverIndex;
    }
  });

  const removeIngredient = (ingredientKey) => {
    dispatch(removeIngredientConstructor(ingredientKey));
  }

  const style = {cursor: "grabbing"};
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <section className={styles.element} id={id} ref={ref} style={{...style, opacity}}>
      <section className={styles.icon}>
        <DragIcon type="primary"/>
      </section>
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        className={styles.element}
        handleClose={() => removeIngredient(id)}
      />
    </section>
  )

}

export default BurgerConstructorItem

BurgerConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired
};