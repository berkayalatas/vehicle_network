import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';
import { AuthProvider } from "../contexts/AuthContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';

const progress = new ProgressBar({
  size:5,
  color:"#3f97f2",
  className: "z-50",
  delay:40,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return(
  <>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
)
}

export default MyApp
