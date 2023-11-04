// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import './index.css'
import './App.css'

import { AuthProvider } from './Context/AuthContext';
import { AnimatePresence } from 'framer-motion';

import Routes from './routes'



function App() {

  return (

    <>

      <AnimatePresence wait>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </AnimatePresence>

    </>

  )
}

export default App
