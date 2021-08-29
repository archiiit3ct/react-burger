import {Button, Input,} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './forgot-page.module.scss';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {SyntheticEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {forgot} from '../../services/actions/auth';

const ForgotPage = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(forgot(email, history));
    };
    const hasToken = localStorage.getItem('refreshToken');
    if (hasToken) {
        return <Redirect to={{pathname: '/profile-page'}}/>;
    }

    return (
        <div className={style.container}>
            <form onSubmit={submit} className={style.form}>
                <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                <Input
                    type={'email'}
                    value={email}
                    placeholder={'Укажите e-mail'}
                    onChange={(e) => setEmail(e.target.value)}
                    name={'email'}
                />

                <Button type='primary' size='medium'>
                    Восстановить
                </Button>
                <div className={`mt-10 ${style.nav}`}>
                    <div className='text text_type_main-default text_color_inactive'>
                        Вспомнили пароль?
                        <Link
                            to='/login'
                            className={`text text_type_main-default pl-2 ${style.link}`}
                        >
                            Войти
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default ForgotPage;
