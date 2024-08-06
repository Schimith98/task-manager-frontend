import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface PublicRouteProps {
  restricted?: boolean; // If restricted, authenticated users cannot access this route
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted = false }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/matriz')
    }
  }, [user])

  return  <Outlet />;
};

export default PublicRoute;
