import { FC, SyntheticEvent, useState, useCallback } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchRegisterUser } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (userName && email && password) {
        dispatch(fetchRegisterUser({ name: userName, email, password }))
          .unwrap()
          .then((data) => {
            if (data) nav(loc?.state?.from?.pathname || '/', { replace: true });
          })
          .catch((error: Error) => {
            console.error('Who use this email or userName.', error);
          });
      }
    },
    [userName, email, password, dispatch]
  );

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
