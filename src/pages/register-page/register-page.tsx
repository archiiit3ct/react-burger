import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../../services/actions/auth';
import {SyntheticEvent} from 'react';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const submit = (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(registration(email, password, name));
  };
  const hasToken = localStorage.getItem('refreshToken');

  if (hasToken) {
    return (
      <Redirect
        to={{
          pathname: '/profile-page',
        }}
      />
    );
  }
  return (
    <div className={style.container}>
      <form onSubmit={submit} className={style.form}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          name={'name'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name={'email'}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name={'password'}
        />
        <Button type='primary' size='medium'>
          Зарегистрироваться
        </Button>
        <div className={`mt-10 ${style.nav}`}>
          <div className='text text_type_main-default text_color_inactive'>
            Уже зарегистрированы?
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
export default Register;
