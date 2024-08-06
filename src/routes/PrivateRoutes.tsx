import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';


const PrivateRoute: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/')
    }
  }, [user])

  return <Outlet />
};

export default PrivateRoute;
