import { FC, useRef } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './add-ingredient.module.css';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useDispatch } from '../../services/hooks';
import { moveConstructorItem } from '../../services/actions/constructor';
import { DEL_CONSTRUCTOR_INGREDIENT } from '../../services/constants/constructor';
import { TIngredient } from '../../services/types';
interface IAddIngredient {
  name: string;
  price: number;
  image: string;
  id: string;
  index: number;
}
const AddIngredient: FC<IAddIngredient> = ({
  name,
  price,
  image,
  id,
  index,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, dropRef] = useDrop({
    accept: 'swap-ingredient',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TIngredient & { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveConstructorItem({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'swap-ingredient',
    item: { id: id, index: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  const removeAddIngredient = () =>
    dispatch({
      type: DEL_CONSTRUCTOR_INGREDIENT,
      index: index,
    });
  return (
    <li
      className={style.wrapper}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => removeAddIngredient()}
      />
    </li>
  );
};
export default AddIngredient;
