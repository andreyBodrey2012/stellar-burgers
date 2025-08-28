import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const { items: orders, isLoading } = useSelector((state) => state.userOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (!orders.length || isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
