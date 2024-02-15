// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './assets/css/App.css'

import { AuthProvider } from './ContextAPI/AuthContext';
import { AnimatePresence } from 'framer-motion';

import Routes from './routes'
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {

  return (

    <>
      <AnimatePresence wait>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </GoogleOAuthProvider>;

      </AnimatePresence>
    </>

  )
}

export default App
