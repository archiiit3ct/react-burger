import {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation,} from 'react-router-dom';
import style from './App.module.scss';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import NotFound404Page from "../../pages/not-found-404-page/nof-found-404-page";
import {ProtectedRouteAuth, ProtectedRouteUnAuth,} from '../ProtectedRoute/ProtectedRoute';
import Modal from "../modal/Modal";
import {
  FeedPage,
  ForgotPage,
  HistoryPage,
  LoginPage,
  MainPage,
  ProfilePage,
  RegisterPage,
  ResetPage,
  SingleOrderPage,
} from '../../pages';
import {useDispatch, useSelector} from '../../services/hooks';
import {getIngredients} from '../../services/actions/ingredients';
import Loader from '../Loader/Loader';
import {refresh} from '../../services/actions/auth';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
        dispatch(refresh());
    }, [dispatch]);
    const {ingredientsSuccess} = useSelector((store) => store.ingredients);
    const ModalSwitch = () => {
        const location = useLocation();
        const history = useHistory();
        const background =
            history.action === 'PUSH' && location.state && location.state.background;
        return (
            <>
                <AppHeader/>
                <main className={style.main}>
                    <Switch location={background || location}>
                        <Route path='/' exact>
                            <MainPage/>
                        </Route>
                        <ProtectedRouteUnAuth path='/login' exact>
                            <LoginPage/>
                        </ProtectedRouteUnAuth>
                        <ProtectedRouteUnAuth path='/register' exact>
                            <RegisterPage/>
                        </ProtectedRouteUnAuth>
                        <ProtectedRouteUnAuth path='/forgot-password' exact>
                            <ForgotPage/>
                        </ProtectedRouteUnAuth>
                        <ProtectedRouteUnAuth path='/reset-password' exact>
                            <ResetPage/>
                        </ProtectedRouteUnAuth>
                        <Route path='/feed' exact>
                            <FeedPage/>
                        </Route>
                        <Route path='/feed/:id' exact>
                            <SingleOrderPage/>
                        </Route>
                        <ProtectedRouteAuth path='/profile' exact>
                            <ProfilePage/>
                        </ProtectedRouteAuth>
                        <ProtectedRouteAuth path='/profile/orders' exact>
                            <HistoryPage/>
                        </ProtectedRouteAuth>
                        <ProtectedRouteAuth path='/profile/orders/:id' exact>
                            <SingleOrderPage/>
                        </ProtectedRouteAuth>
                        <Route path='/ingredients/:id' exact>
                            <IngredientDetails headerText='Детали ингредиента'/>
                        </Route>
                        <Route>
                            <NotFound404Page/>
                        </Route>
                    </Switch>
                    {background && (
                        <>
                            <Route
                                path='/ingredients/:id'
                                children={
                                    <Modal headerText='Детали ингредиента' back={'/'}>
                                        <IngredientDetails/>
                                    </Modal>
                                }
                            />
                            <Route
                                path='/feed/:id'
                                children={
                                    <Modal back={'/feed'}>
                                        <SingleOrderPage/>
                                    </Modal>
                                }
                            />
                            <Route
                                path='/profile/orders/:id'
                                children={
                                    <Modal back={'/profile/orders'}>
                                        <SingleOrderPage/>
                                    </Modal>
                                }
                            />
                        </>
                    )}
                </main>
            </>
        );
    };
    if (!ingredientsSuccess) return <Loader/>;
    return (
        <Router>
            <ModalSwitch/>
        </Router>
    );
};

export default App;
