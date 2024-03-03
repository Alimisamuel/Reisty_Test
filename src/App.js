
import './STYLES/main.css'
import { Routes } from './Routes';
import ScrollToTop from './ScrollToTop';
import { SnackbarProvider } from "notistack";
import { useLocation } from 'react-router-dom';
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AnimatePresence } from 'framer-motion';
function App() {
  const location = useLocation()
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3}>
            <ScrollToTop />

              <Routes />
        
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
