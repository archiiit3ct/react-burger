import style from './BurgerIngredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import {useSelector} from '../../services/hooks';
import {FC, useCallback, useRef, useState} from 'react';

const BurgerIngredients: FC = () => {
    const {ingredients} = useSelector((state) => state.ingredients);
    const [tab, setTab] = useState('bun');

    const wrapperRef = useRef<HTMLDivElement>(null),
        bunRef = useRef<HTMLDivElement>(null),
        sauceRef = useRef<HTMLDivElement>(null),
        mainRef = useRef<HTMLDivElement>(null);

    const handleTab = (value: string, ref: typeof bunRef | typeof sauceRef | typeof mainRef) => () => {
        setTab(value);
        if (!ref.current) {
            return null
        }
        if (bunRef.current && sauceRef.current && mainRef.current) {
            ref.current.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
    }

    const handlerScrollBar = useCallback(() => {
        if (!wrapperRef.current || !bunRef.current || !sauceRef.current) {
            return null
        }
        if (
            Math.ceil(wrapperRef.current.scrollTop) <
            bunRef.current.scrollHeight / 2
        ) {
            setTab('bun');
        } else if (
            Math.ceil(wrapperRef.current.scrollTop) <
            bunRef.current.scrollHeight + sauceRef.current.scrollHeight / 2
        ) {
            setTab('sauce');
        } else {
            setTab('main');
        }
    }, []);

    return (
        <section className={style.burgerIngredients}>
            <h1 className='text text_type_main-large'>Собери бургер</h1>
            <div className={`${style.tabs} mt-5 mb-5`}>
                <div className={style.tab}>
                    <Tab value='bun' active={tab === 'bun'} onClick={handleTab('bun', bunRef)}>
                        Булки
                    </Tab>
                </div>
                <div className={style.tab}>
                    <Tab value='sauce' active={tab === 'sauce'} onClick={handleTab('sauce', sauceRef)}>
                        Соусы
                    </Tab>
                </div>
                <div className={style.tab}>
                    <Tab value='main' active={tab === 'main'} onClick={handleTab('main', mainRef)}>
                        Начинки
                    </Tab>
                </div>
            </div>
            <div
                className={style.wrapperAllIngredients}
                onScroll={handlerScrollBar}
                ref={wrapperRef}
            >
                <div className={style.allIngredients}>
                    <h2 className='text text_type_main-medium'>Булки</h2>
                    <div className={style.cardsIngredients} ref={bunRef}>
                        {ingredients.map(
                            (item) =>
                                item.type === 'bun' && (
                                    <BurgerIngredient ingredient={item} key={item._id}/>
                                )
                        )}
                    </div>
                </div>
                <div className={style.allIngredients}>
                    <h2 className='text text_type_main-medium'>Соусы</h2>
                    <div className={style.cardsIngredients} ref={sauceRef}>
                        {ingredients.map(
                            (item) =>
                                item.type === 'sauce' && (
                                    <BurgerIngredient ingredient={item} key={item._id}/>
                                )
                        )}
                    </div>
                </div>
                <div className={style.allIngredients}>
                    <h2 className='text text_type_main-medium'>Начинки</h2>
                    <div className={style.cardsIngredients} ref={mainRef}>
                        {ingredients.map(
                            (item) =>
                                item.type === 'main' && (
                                    <BurgerIngredient ingredient={item} key={item._id}/>
                                )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BurgerIngredients;
