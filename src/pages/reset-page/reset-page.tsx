import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset.module.css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { reset } from '../../services/actions/auth';
const Reset = () => {
  const { forgotSuccess } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const submit = (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(reset(password, token, history));
  };
  if (!forgotSuccess) {
    return <Redirect to='/forgot-password' />;
  }
  return (
    <div className={style.container}>
      <form onSubmit={submit} className={style.form}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <Input
          icon={'ShowIcon'}
          type={'password'}
          name={'password'}
          value={password}
          placeholder={'Введите новый пароль'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setToken(e.target.value)}
          name={'token'}
          value={token}
        />

        <Button type='primary' size='medium'>
          Сохранить
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
export default Reset;
