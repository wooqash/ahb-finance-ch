// import '@/styles/index.css'
import '../styles/index.scss'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';

const MyApp:React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => setLoading(true)
        const handleComplete = (url: string) => setLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    });
    
    return (
      <>
        <Component id="App" {...pageProps} />
        { loading && (<Spinner />) }
      </>
    );
}
  
export default MyApp;