import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/routes.js';
import { AuthContextProvider } from '@/context/AuthContext.tsx';
import { ThemeProvider } from './components/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')!).render(
	<AuthContextProvider>
	{/* <QueryClientProvider client={}> */}
		<ThemeProvider defaultTheme="system" storageKey="awbilliard-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	{/* </QueryClientProvider> */}
	</AuthContextProvider>
);
