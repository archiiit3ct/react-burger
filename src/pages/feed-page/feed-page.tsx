import {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import style from './feed-page.module.scss';
import {OrderBlankHistory} from '../../components/OrderBlankHistory/OrderBlankHistory';
import {InfoTotalOrders} from '../../components/InfoTotalOrders/InfoTotalOrders';
import {useDispatch, useSelector} from '../../services/hooks';
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START,} from '../../services/constants/ws';
import {TOrder} from '../../services/types';

const FeedPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, [dispatch]);
    const {messages} = useSelector((store) => store.ws);
    return (
        <>
            <main>
                <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
                <div className={style.content}>
                    <div className={`${style.feed} pr-2`}>
                        {messages &&
                        messages?.orders?.slice(0, 20).map((item: TOrder) => (
                            <Link
                                key={item._id}
                                to={{
                                    pathname: `/feed/${item._id}`,
                                    state: {background: location},
                                }}
                            >
                                <OrderBlankHistory {...item} status={''}/>
                            </Link>
                        ))}
                    </div>
                    <InfoTotalOrders/>
                </div>
            </main>
        </>
    );
};
export default FeedPage;
