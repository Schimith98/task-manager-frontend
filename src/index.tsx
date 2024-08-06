import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext';
import { TaskProvider } from './contexts/TaskContext';
import { ModalProvider } from './contexts/ModalContext';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <React.Fragment>
    <BrowserRouter>
      <ToastContainer limit={3} />
      <UserProvider>
        <TaskProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  </React.Fragment>
);