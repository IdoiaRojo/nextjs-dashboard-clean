import '@/styles/main.scss'
import { AuthProvider } from '@/hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
