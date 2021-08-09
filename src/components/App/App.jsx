import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import ConstructorPage from "../../pages/constructor-page/constructor-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import FeedPage from "../../pages/feed-page/feed-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import OrderDetailsPage from "../../pages/order-details-page/order-details-page";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import OrdersPage from "../../pages/orders-page/orders-page";
import NotFound404Page from "../../pages/not-found-404-page/nof-found-404-page";
import WithHeaderLayout from "../../layouts/with-header-layout/with-header-layout";
import {ProtectedRoute} from "../../layouts/protected-route/protected-route";
import WithNavProfile from "../../layouts/with-nav-profile/with-nav-profile";
import {getUserInfo} from "../../services/actions";
import DefaultRoute from "../../layouts/default-route/default-route";

function App() {
	const dispatch = useDispatch();
	const {ingredients} = useSelector(store => store.ingredients);

	useEffect(() => {
		if (!ingredients.length) dispatch(getIngredients());
		if (localStorage.getItem('refreshToken')) {
			dispatch(getUserInfo());
		}
	}, [dispatch]);

	const AppContent = () => {
		const location = useLocation();
		const history = useHistory();
		const background = history.action === 'PUSH' && location.state && location.state.background;

		return (
			<Switch location={background || location}>
				<Route path="/" exact>
					<WithHeaderLayout>
						<ConstructorPage/>
					</WithHeaderLayout>
				</Route>

				<DefaultRoute path="/login" exact>
					<WithHeaderLayout>
						<LoginPage/>
					</WithHeaderLayout>
				</DefaultRoute>

				<DefaultRoute path="/register" exact>
					<WithHeaderLayout>
						<RegisterPage/>
					</WithHeaderLayout>
				</DefaultRoute>

				<DefaultRoute path="/forgot-password" exact>
					<WithHeaderLayout>
						<ForgotPasswordPage/>
					</WithHeaderLayout>
				</DefaultRoute>

				<DefaultRoute path="/reset-password" exact>
					<WithHeaderLayout>
						<ResetPasswordPage/>
					</WithHeaderLayout>
				</DefaultRoute>

				<Route path="/feed" exact>
					<WithHeaderLayout>
						<FeedPage/>
					</WithHeaderLayout>
				</Route>

				<Route path="/feed/:id" exact>
					<WithHeaderLayout>
						<OrderDetailsPage/>
					</WithHeaderLayout>
				</Route>

				<ProtectedRoute path="/profile" exact>
					<WithHeaderLayout>
						<WithNavProfile>
							<ProfilePage/>
						</WithNavProfile>
					</WithHeaderLayout>
				</ProtectedRoute>

				<ProtectedRoute path="/profile/orders" exact>
					<WithHeaderLayout>
						<WithNavProfile>
							<OrdersPage/>
						</WithNavProfile>
					</WithHeaderLayout>
				</ProtectedRoute>

				<ProtectedRoute path="/profile/orders/:id" exact>
					<WithHeaderLayout>
						<OrderDetailsPage/>
					</WithHeaderLayout>
				</ProtectedRoute>

				<Route path="/ingredients/:id" exact>
					<WithHeaderLayout>
						<IngredientPage/>
					</WithHeaderLayout>
				</Route>

				<Route>
					<NotFound404Page/>
				</Route>
			</Switch>
		)
	}

	return (
		<Router>
			<AppContent/>
		</Router>
	);
}

export default App;
