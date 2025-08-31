import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientSlice';
import { setIngredient, setFeedOrder } from '../../services/slices/appSlice';
import { fetchUser, init } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { fetchOrderByNumber } from '../../services/slices/appSlice';
import { DetailsPage } from '../details-page';

const App = () => {
  const loc = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(fetchUser())
        .unwrap()
        .then(() => {
          dispatch(init());
        });
    } else {
      dispatch(init());
    }
  }, [dispatch]);

  const background = loc.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || loc}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/ingredients/:id' element={<ModalIngredientDetails />} />
        <Route path='/feed/:number' element={<ModalFeedOrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <ModalOrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/feed/:number' element={<ModalFeedOrderInfo />} />
          <Route path='/ingredients/:id' element={<ModalIngredientDetails />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ModalOrderInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const ModalFeedOrderInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (params.number) {
      dispatch(fetchOrderByNumber(Number.parseInt(params.number, 10)));
    }
    dispatch(setFeedOrder(params.number || null));
  }, [params, dispatch]);

  const handleClose = () => {
    dispatch(setFeedOrder(null));
    nav(-1);
  };

  if (loc.state?.background) {
    return (
      <Modal title={`#${params.number}`} onClose={handleClose}>
        <OrderInfo />
      </Modal>
    );
  }

  return (
    <DetailsPage title={`#${params.number}`}>
      <OrderInfo />
    </DetailsPage>
  );
};

const ModalIngredientDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    dispatch(setIngredient(String(params.id)));
  }, [params]);

  const handleClose = () => {
    dispatch(setIngredient(null));
    nav(-1);
  };

  if (loc.state?.background) {
    return (
      <Modal title='Детали ингредиента' onClose={handleClose}>
        <IngredientDetails />
      </Modal>
    );
  }

  return (
    <DetailsPage title='Детали ингредиента'>
      <IngredientDetails />
    </DetailsPage>
  );
};

const ModalOrderInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (params.number) {
      dispatch(fetchOrderByNumber(Number.parseInt(params.number, 10)));
    }
    dispatch(setFeedOrder(params.number || null));
  }, [params, dispatch]);

  const handleClose = () => {
    dispatch(setFeedOrder(null));
    nav(-1);
  };

  if (loc.state?.background) {
    return (
      <Modal title={`#${params.number}`} onClose={handleClose}>
        <OrderInfo />
      </Modal>
    );
  }

  return (
    <DetailsPage title={`#${params.number}`}>
      <OrderInfo />
    </DetailsPage>
  );
};

export default App;
