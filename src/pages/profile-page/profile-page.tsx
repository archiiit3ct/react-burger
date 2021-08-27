import { useDispatch, useSelector } from '../../services/hooks';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavProfile from '../../components/NavProfile/NavProfile';
import style from './profile.module.css';
import { useState, useEffect, SyntheticEvent } from 'react';
import { user, edit } from '../../services/actions/auth';
import Loader from '../../components/Loader/Loader';
const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(user());
  }, [dispatch]);
  const defaultName = useSelector((state) => state.auth.name);
  const defaultEmail = useSelector((state) => state.auth.email);
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  useEffect(() => {
    setName(() => defaultName);
    setEmail(() => defaultEmail);
  }, [defaultName, defaultEmail]);
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(edit(email, password, name));
  };
  const cancel = () => {
    setName(() => defaultName);
    setEmail(() => defaultEmail);
    setPassword('');
  };
  if (!defaultName) return <Loader />;
  return (
    <div className={`${style.container} mt-30`}>
      <nav className={style.nav}>
        <NavProfile />
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </nav>
      <form className={style.form} onSubmit={submit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setName(e.target.value)}
          icon={'EditIcon'}
          value={name}
          name={'name'}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Логин'}
          onChange={(e) => setEmail(e.target.value)}
          icon={'EditIcon'}
          value={email}
          name={'login'}
          size={'default'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          icon={'EditIcon'}
          value={password}
          name={'password'}
          size={'default'}
        />
        {name !== defaultName || email !== defaultEmail || password ? (
          <div className={style.buttons}>
            <button
              className={`${style.button} text text_type_main-default`}
              type='reset'
              onClick={cancel}
            >
              Отмена
            </button>
            <Button type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};
export default Profile;
