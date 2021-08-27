import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import Modal from '../../components/modal/Modal';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import {useSelector} from '../../services/hooks';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const MainPage = () => {
    const {orderSuccess, ingredientsError} = useSelector((state) => ({
        ingredientsError: state.ingredients.ingredientsError,
        orderSuccess: state.order.orderSuccess,
    }));
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
            {orderSuccess && (
                <Modal back={'/'}>
                    <OrderDetails/>
                </Modal>
            )}
            {ingredientsError && (
                <p className='text text_type_main-medium text_color_inactive'>
                    Всё сломалось, на нас напали Тираниды
                </p>
            )}
        </>
    );
};
export default MainPage;
