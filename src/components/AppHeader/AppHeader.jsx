import styles from './AppHeader.module.scss'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

const AppHeader = () => {
  const { path } = useRouteMatch();

  const user = useSelector(store => store.user.user)

  return (
    <header className={styles.header} >
      <div className={styles.menu}>
        <NavLink
          to="/"
          exact
          className={styles.constructor}
          activeClassName={styles.linkActive}
        >
          <BurgerIcon type={path === '/' ? 'primary' : 'secondary'}/>
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </NavLink>
        <NavLink to="/feed" className={styles.tape} activeClassName={styles.linkActive}>
          <ListIcon type={path === '/feed' ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2">Лента заказов</p>
        </NavLink>
      </div>
      <Logo className={styles.logo} />
      {!user && (
        <NavLink to="/login" className={styles.personal} activeClassName={styles.linkActive} >
        <ProfileIcon type={path === '/profile' ? 'primary' : 'secondary'}/>
        <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      )}
      {user && (
        <NavLink to="/profile" className={styles.personal} activeClassName={styles.linkActive} >
          <ProfileIcon type={path === '/profile' ? 'primary' : 'secondary'}/>
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      )}
    </header>
  )
}

export default AppHeader;