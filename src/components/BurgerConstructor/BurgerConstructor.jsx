import "./BurgerConstructor.scss";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import TotalPrice from "../TotalPrice/TotalPrice";

const BurgerConstructor = () => {
  return (
    <section className="constructor">
      <div className="container">
        <section className="edge-element">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="element">
          <section className="icon">
            <DragIcon type="primary" />
          </section>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[1].image}
          />
        </section>
        <section className="edge-element">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />
        </section>
      </div>

      <TotalPrice total={610}/>
    </section>
  );
};

export default BurgerConstructor;
