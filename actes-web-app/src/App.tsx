import Home from "./pages/Home.tsx"
import MainLayout from "./layouts/MainLayout.tsx"
import BirthForm from "./pages/BirthForm.tsx"
import DeathForm from "./pages/DeathForm.tsx"
import MarriageForm from "./pages/MarriageForm.tsx"
import React from "react"
import { createBrowserRouter,  createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux';
import { persistor, store } from './store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import FullscreenProgress from "./components/layout/FullscreenProgress.tsx";
import ContactForm from "./pages/ContactForm.tsx"
import CGV from "./pages/CGV.tsx"
import Steps from "./pages/Steps.tsx"
import LegalNotice from "./pages/LegalNotice.tsx"
import Login from "./pages/Login.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import ActsRequests from "./pages/ActsRequests.tsx"
import Messages from "./pages/Messages.tsx"
import ProtectedRoute from "./components/common/ProtectedRoute.tsx"
import SnackbarProvider from 'react-simple-snackbar'
import ActDetails from "./pages/ActDetails.tsx"

const App: React.FC<{}> = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/acte-de-naissance/:city?" element={<BirthForm />} />
        <Route path="/acte-de-mariage/:city?" element={<MarriageForm />} />
        <Route path="/acte-de-deces/:city?" element={<DeathForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/mentions-légales" element={<LegalNotice />} />
        <Route path="/démarche" element={<Steps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute Element={Dashboard} redirectTo="/login" />} />
        <Route path="/actes" element={<ProtectedRoute Element={ActsRequests} />} />
        <Route path="/messages" element={<ProtectedRoute Element={Messages} />} />
        <Route path="/actes/:actId" element={<ProtectedRoute Element={ActDetails} />} />
      </Route>
    )
  )

  return (
    <SnackbarProvider>
      <Provider store={store}>
        <PersistGate loading={<FullscreenProgress/>} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  )
}

export default App