import { FC } from 'react';
import style from './icon-ingredient.module.css';
interface IIconIngredient {
  style?: { left: number; zIndex: number };
  img: string | undefined;
  inf?: string;
}
const IconIngredient: FC<IIconIngredient> = (props) => {
  return (
    <div className={style.pict} style={props.style}>
      <img className={style.img} src={props.img} alt='ingredient' />
      {props.inf && (
        <div className={`${style.inf} text text_type_main-default`}>
          {props.inf}
        </div>
      )}
    </div>
  );
};
export default IconIngredient;
