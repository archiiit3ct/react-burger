import style from './InfoTotalOrders.module.scss';
import {useSelector} from '../../services/hooks';
import {TOrder} from '../../services/types';

export const InfoTotalOrders = () => {
    const {totalToday, total, orders} = useSelector(
        (store) => store.ws.messages
    );
    const readyOrders = orders?.filter((item: TOrder) => item.status === 'done');

    const upcomingOrders = orders?.filter(
        (item: TOrder) => item.status !== 'done'
    );
    return (
        <div className={style.info}>
            <div className={style.stage}>
                <div className={`${style.wrapper} text text_type_main-medium`}>
                    Готовы:
                    <ul className={`${style.ready} pt-6 text text_type_digits-default`}>
                        {readyOrders?.slice(0, 20).map((item: TOrder) => (
                            <li key={item._id}>{item.number}</li>
                        ))}
                    </ul>
                </div>
                <div className={`${style.wrapper} text text_type_main-medium`}>
                    В работе:
                    <ul className='pt-6 text text_type_digits-default'>
                        {upcomingOrders?.map((item: TOrder) => (
                            <li key={item._id}>{item.number}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='text text_type_main-medium'>
                Выполнено за всё время:
                <div className={`${style.total} text text_type_digits-large`}>
                    {total}
                </div>
            </div>
            <div className='text text_type_main-medium'>
                Выполнено за сегодня:
                <div className={`${style.total} text text_type_digits-large`}>
                    {totalToday}
                </div>
            </div>
        </div>
    );
};
