import {FC} from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import style from './IngredientDetails.module.scss';
import {useSelector} from '../../services/hooks';
import {useParams} from 'react-router-dom';
import {TIngredient} from '../../services/types';
import Loader from '../Loader/Loader';

interface IIngredientDetails {
    headerText?: string
}

const IngredientDetails: FC<IIngredientDetails> = ({headerText}) => {
    const {id} = useParams<{ id: string }>();
    const {ingredients} = useSelector((store) => store.ingredients);
    const selectedIngredient = ingredients?.find((item: TIngredient) => item._id === id);
    if (!selectedIngredient) {
        return (<Loader/>)
    }
    return (
        <section className={style.ingredient}>
            <h2 className='text text_type_main-large mt-30'>{headerText}</h2>
            <img src={selectedIngredient.image_large} alt={selectedIngredient.name} className='mb-4'/>
            <h2 className='text text_type_main-medium mb-8'>{selectedIngredient.name}</h2>
            <div className={style.info + ' text_color_inactive mb-15'}>
                <div className={style.wrapper}>
                    <span className='text text_type_main-default pb-2'>Калории,ккал</span>
                    <span className='text text_type_digits-default'>{selectedIngredient.calories}</span>
                </div>
                <div className={style.wrapper}>
                    <span className='text text_type_main-default pb-2'>Белки, г</span>
                    <span className='text text_type_digits-default'>{selectedIngredient.proteins}</span>
                </div>
                <div className={style.wrapper}>
                    <span className='text text_type_main-default pb-2'>Жиры, г</span>
                    <span className='text text_type_digits-default'>{selectedIngredient.fat}</span>
                </div>
                <div className={style.wrapper}>
                    <span className='text text_type_main-default pb-2'>Углеводы, г</span>
                    <span className='text text_type_digits-default'>{selectedIngredient.carbohydrates}</span>
                </div>
            </div>
        </section>
    );
};

export default IngredientDetails;
