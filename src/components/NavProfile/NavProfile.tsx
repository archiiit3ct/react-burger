import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch} from '../../services/hooks';
import {logout} from '../../services/actions/auth';
import style from './NavProfile.module.scss';

const NavProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handlerClick = () => {
        dispatch(logout(history));
    };
    return (
        <ul className='text text_type_main-medium'>
            <li className='pt-6 pb-6'>
                <NavLink
                    exact
                    to='/profile'
                    className='text_color_inactive'
                    activeClassName={style.active}
                >
                    Профиль
                </NavLink>
            </li>
            <li className='pt-6 pb-6'>
                <NavLink
                    exact
                    to='/profile/orders'
                    className='text_color_inactive'
                    activeClassName={style.active}
                >
                    История заказов
                </NavLink>
            </li>
            <li
                className={`pt-6 pb-6 text_color_inactive ${style.exit}`}
                onClick={handlerClick}
            >
                Выход
            </li>
        </ul>
    );
};

export default NavProfile;
