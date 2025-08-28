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
  Navigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientSlice';
import { setIngredient, setFeedOrder } from '../../services/slices/appSlice';
import { fetchUser, init } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';
import { fetchOrderByNumber } from '../../services/slices/appSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isInit, isLoading } = useSelector((state) => state.user);

  if (isLoading || !isInit) return <Preloader />;

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

const App = () => {
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

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
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
        <Route path='/feed/:number' element={<ModalFeedOrderInfo />} />
        <Route path='/ingredients/:id' element={<ModalIngredientDetails />} />
        <Route path='/profile/orders/:number' element={<ModalOrderInfo />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

const ModalFeedOrderInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

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

  return (
    <Modal title={'OrderInfo'} onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

const ModalIngredientDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(setIngredient(String(params.id)));
  }, [params]);

  const handleClose = () => {
    dispatch(setIngredient(null));
    nav(-1);
  };
  return (
    <Modal title={'IngredientDetails'} onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

const ModalOrderInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

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
  return (
    <Modal title={'OrderInfo'} onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

export default App;
