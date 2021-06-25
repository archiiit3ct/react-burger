import { useState } from "react";
import "./BurgerIngredients.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Ingredient from "../Ingredient/Ingredient";

const tabs = [
  {
    label: "Булки",
    value: "bun",
  },
  {
    label: "Соусы",
    value: "sauce",
  },
  {
    label: "Начинки",
    value: "main",
  },
];

const BurgerIngredients = (props) => {
  const { data } = props;
  const [current, setCurrent] = useState("bun");

  const handleTabClick = (item) => {
    setCurrent(item);
    document.querySelector(`#${item}`)?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section className="main">
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className="tab">
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.label}
              value={tab.value}
              active={current === tab.value}
              onClick={handleTabClick}
            >
              {tab.label}
            </Tab>
          );
        })}
      </div>
      <div className="scrollable">
        {tabs.map((tab) => (
          <ul key={tab.label} className="list mt-2">
            <li className="list-item">
              <p id={`${tab.value}`} className="text text_type_main-medium">
                {tab.label}
              </p>
            </li>

            <ul className="list p-2">
              {data.map((item) => item.type === tab.value && (
                    <li key={item._id} className="list-item">
                      <Ingredient
                        image={item.image}
                        name={item.name}
                        price={item.price}
                      />
                    </li>
                  )
              )}
            </ul>
          </ul>
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients;
