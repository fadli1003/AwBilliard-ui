import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter, Router, RouterProvider } from 'react-router-dom';
import router from './routes/router.js';
import { StrictMode } from 'react';
import { AuthContextProvider } from './context/AuthContext.js';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</StrictMode>
);
