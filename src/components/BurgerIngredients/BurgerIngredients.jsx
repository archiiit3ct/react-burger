import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
// import { data } from '../../utils/data';

const tabs = [
  {
    label: "Булки",
    value: "buns",
  },
  {
    label: "Соусы",
    value: "sauce",
  },
  {
    label: "Начинки",
    value: "toppings",
  },
]

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('buns')

  const handleTabClick = (item) => {
    setCurrent(item)
  }

  return (
    <section className={styles.main}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={styles.tab}>
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.label}
              value={tab.value}
              active={current === tab.value}
              onClick={handleTabClick}>
              {tab.label}
            </Tab>
          )
        })}
      </div>
    </section>
  )
}

export default BurgerIngredients;