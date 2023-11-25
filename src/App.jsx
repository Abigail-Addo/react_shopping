// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './assets/css/App.css'

import { AuthProvider } from './Context/AuthContext';
import { AnimatePresence } from 'framer-motion';

import Routes from './routes'
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {

  return (

    <>

      <AnimatePresence wait>
        <GoogleOAuthProvider clientId="534640297346-4rs21f6gd3ukh7551m0n9raomgcvgcj7.apps.googleusercontent.com">
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </GoogleOAuthProvider>;

      </AnimatePresence>

    </>

  )
}

export default App
