import '@/styles/main.scss'
import App from 'next/app'
import { appWithTranslation } from '../i18n'
import { AuthProvider } from '@/hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const defaultProps = appContext.Component.defaultProps
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [...(appProps.pageProps.namespacesRequired || []), ...(defaultProps?.i18nNamespaces || [])]
    }
  }
}

export default appWithTranslation(MyApp);
