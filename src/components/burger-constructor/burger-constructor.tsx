import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  resetOrderModalData
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const {
    items: constructorItems,
    orderRequest,
    orderModalData
  } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispacth = useDispatch();
  const nav = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      return nav('/login');
    }
    const items = constructorItems.ingredients.map(
      (ingredients) => ingredients._id
    );
    items.push(constructorItems.bun._id, constructorItems.bun._id);
    dispacth(fetchOrders(items));
  };
  const closeOrderModal = () => {
    dispacth(resetOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
