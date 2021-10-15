import 'tailwindcss/tailwind.css'

import '../styles/global.css';
import Tenant from '../components/Layout/Tenant';

import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';


const progress = new ProgressBar({
  size:4,
  color:'#049ADA',
  className:'z-50',
  delay:100

})

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout || Tenant ;
  return (
    <div className="app">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp;
