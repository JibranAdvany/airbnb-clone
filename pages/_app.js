import '../public/global.css';
import './../styles/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import Head from 'next/head';

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
