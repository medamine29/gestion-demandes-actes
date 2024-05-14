import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react';
import FullscreenProgress from './components/layout/FullscreenProgress.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <PersistGate loading={<FullscreenProgress/>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
