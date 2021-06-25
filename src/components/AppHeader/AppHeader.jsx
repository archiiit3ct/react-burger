import React from 'react'
import styles from './AppHeader.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader = () => {
  return (
    <header className={styles.header} >
      <div className={styles.menu}>
        <button className={styles.constructor}>
          <BurgerIcon type="primary" />
          <div className={styles.title}>
            <p className="text text_type_main-default">Конструктор</p>
          </div>
        </button>
        <button className={styles.tape} >
          <ListIcon type="primary"/>
          <div className={styles.title}>
            <p className="text text_type_main-default">Лента заказов</p>
          </div>
        </button>
      </div>
      <Logo className={styles.logo} />
      <button className={styles.personal} >
        <ProfileIcon type="primary" />
        <div className={styles.title}>
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
      </button>
    </header>
  )
}

export default AppHeader;