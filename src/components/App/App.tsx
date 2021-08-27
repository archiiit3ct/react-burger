import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  ProtectedRouteAuth,
  ProtectedRouteUnAuth,
} from '../protected-route/protected-route';
import Modal from '../modal/modal';
import {
  Main,
  Login,
  Register,
  Forgot,
  Reset,
  Profile,
  History,
  Feed,
  SingleOrder,
} from '../../pages';
import { useSelector, useDispatch } from '../../services/hooks';
import { getIngredients } from '../../services/actions/ingredients';
import Loader from '../loader/loader';
import { refresh } from '../../services/actions/auth';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(refresh());
  }, [dispatch]);
  const { ingredientsSuccess } = useSelector((store) => store.ingredients);
  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    const background =
      history.action === 'PUSH' && location.state && location.state.background;
    return (
      <>
        <AppHeader />
        <main className={style.main}>
          <Switch location={background || location}>
            <Route path='/' exact>
              <Main />
            </Route>
            <ProtectedRouteUnAuth path='/login' exact>
              <Login />
            </ProtectedRouteUnAuth>
            <ProtectedRouteUnAuth path='/register' exact>
              <Register />
            </ProtectedRouteUnAuth>
            <ProtectedRouteUnAuth path='/forgot-password' exact>
              <Forgot />
            </ProtectedRouteUnAuth>
            <ProtectedRouteUnAuth path='/reset-password' exact>
              <Reset />
            </ProtectedRouteUnAuth>
            <Route path='/feed' exact>
              <Feed />
            </Route>
            <Route path='/feed/:id' exact>
              <SingleOrder />
            </Route>
            <ProtectedRouteAuth path='/profile' exact>
              <Profile />
            </ProtectedRouteAuth>
            <ProtectedRouteAuth path='/profile/orders' exact>
              <History />
            </ProtectedRouteAuth>
            <ProtectedRouteAuth path='/profile/orders/:id' exact>
              <SingleOrder />
            </ProtectedRouteAuth>
            <Route path='/ingredients/:id' exact>
              <IngredientDetails headerText='Детали ингредиента' />
            </Route>
            <Route>
              <p className='text text_type_digits-large'>
                404
                <span className='text text_type_main-large'>
                  Я страница и меня нет
                </span>
              </p>
            </Route>
          </Switch>
          {background && (
            <>
              <Route
                path='/ingredients/:id'
                children={
                  <Modal headerText='Детали ингредиента' back={'/'}>
                    <IngredientDetails />
                  </Modal>
                }
              ></Route>
              <Route
                path='/feed/:id'
                children={
                  <Modal back={'/feed'}>
                    <SingleOrder />
                  </Modal>
                }
              ></Route>
              <Route
                path='/profile/orders/:id'
                children={
                  <Modal back={'/profile/orders'}>
                    <SingleOrder />
                  </Modal>
                }
              ></Route>
            </>
          )}
        </main>
      </>
    );
  };
  if (!ingredientsSuccess) return <Loader />;
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
};

export default App;
