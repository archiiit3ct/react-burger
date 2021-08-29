import {useEffect} from 'react';
import style from './history-page.module.scss';
import NavProfile from '../../components/NavProfile/NavProfile';
import {OrderBlankHistory} from '../../components/OrderBlankHistory/OrderBlankHistory';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from '../../services/hooks';
import {WS_CONNECTION_PRIVATE_CLOSED, WS_CONNECTION_PRIVATE_START,} from '../../services/constants/ws-private';
import {TOrder} from '../../services/types';

const HistoryPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {messages} = useSelector((store) => store.wsPrivate);
    useEffect(() => {
        dispatch({type: WS_CONNECTION_PRIVATE_START});
        return () => {
            dispatch({type: WS_CONNECTION_PRIVATE_CLOSED});
        };
    }, [dispatch]);
    return (
        <div className={`${style.container} mt-10`}>
            <nav className={style.nav}>
                <NavProfile/>
                <p className='text text_type_main-default text_color_inactive mt-20'>
                    В этом разделе вы можете просмотреть свою историю заказов
                </p>
            </nav>
            <div className={style.feed}>
                {messages &&
                messages?.orders?.map((item: TOrder) => (
                    <Link
                        key={item._id}
                        to={{
                            pathname: `/profile/orders/${item._id}`,
                            state: {background: location},
                        }}
                    >
                        <OrderBlankHistory {...item} status={item.status}/>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default HistoryPage;
