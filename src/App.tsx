import { useEffect } from 'react';
import { Box } from '@mui/material';
import {  Route, Routes } from 'react-router-dom';
import PublicRoute from './routes/PublicRoutes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './routes/PrivateRoutes';
import PrioritizationMatrix from './pages/PriorizationMatrix';
import KanbanBoard from './pages/KanbanBoard';
import Navbar from './components/Navbar';
import React from 'react';
import {  useUser } from './contexts/UserContext';
import ActionButtons from './components/ActionButtons';
import FullPageLoader from './components/FullPageLoader';
import Backlog from './pages/Backlog';
import CompletedTasks from './pages/CompletedTasks';

function App() {

  const { user, loading } = useUser()

  useEffect(() => {
    function adjustHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, []);

  return (<React.Fragment>
    <Box
      sx={{
        height: 'calc(var(--vh, 1vh) * 100)',
        backgroundColor: '#f8f8f8',
        overflow: 'auto',
        pb: '32px'
      }}>
      <Navbar />
      {user && <ActionButtons />}
      {loading && <FullPageLoader />}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/registrar" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/matriz" element={<PrioritizationMatrix />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
        </Route>
      </Routes>
    </Box>
  </React.Fragment>
  );
}

export default App;
