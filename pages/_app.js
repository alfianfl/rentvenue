import 'tailwindcss/tailwind.css';

import '../styles/global.css';
import Tenant from '../components/Layout/Tenant';

import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';
import withUtils from '../utils/withUtils';
import { Provider } from "react-redux";
import store from "../redux/store";
import { useState } from 'react';
import Loading from "../components/Loading";


const progress = new ProgressBar({
  size:4,
  color:'#049ADA',
  className:'z-50',
  delay:100
})

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url)=>{
    setLoading(true)
    progress.start()
  });
  Router.events.on('routeChangeComplete', (url)=>{
    setLoading(false)
    progress.finish()
  });
  Router.events.on('routeChangeError', (url)=>{
    setLoading(false)
    progress.finish()
  });

  const Layout = Component.Layout || Tenant ;
  return (
    <div className="app">
      {
        loading ? <Loading /> :
      <Provider store={store}>
        <Layout>
          <withUtils>
            <Component {...pageProps} />
          </withUtils>
        </Layout>
      </Provider>
      }
    </div>
  )
}

export default MyApp;
