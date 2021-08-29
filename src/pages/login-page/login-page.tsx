import {SyntheticEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../services/actions/auth';
import {Button, Input, PasswordInput,} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login-page.module.scss';
import {Link} from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const submit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <div className={style.container}>
            <form onSubmit={submit} className={style.form}>
                <h2 className='text text_type_main-medium'>Вход</h2>
                <Input
                    type={'email'}
                    value={email}
                    placeholder={'E-mail'}
                    onChange={(e) => setEmail(e.target.value)}
                    name={'email'}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name={'password'}
                />
                <Button type='primary' size='medium'>
                    Войти
                </Button>
                <div className={`mt-10 ${style.nav}`}>
                    <div className='text text_type_main-default text_color_inactive'>
                        Вы — новый пользователь?
                        <Link
                            to='/register'
                            className={`text text_type_main-default pl-2 ${style.link}`}
                        >
                            Зарегистрироваться
                        </Link>
                    </div>
                    <div className='text text_type_main-default text_color_inactive pt-4'>
                        Забыли пароль?
                        <Link
                            to='/forgot-password'
                            className={`text text_type_main-default pl-2 ${style.link}`}
                        >
                            Восстановить пароль
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default LoginPage;
