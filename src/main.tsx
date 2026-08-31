import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/routes.js';
import { AuthContextProvider } from '@/context/AuthContext.tsx';
import { ThemeProvider } from './components/theme-provider';

createRoot(document.getElementById('root')!).render(
	<AuthContextProvider>
		<ThemeProvider defaultTheme="system" storageKey="awbilliard-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	</AuthContextProvider>
);
