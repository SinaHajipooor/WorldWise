import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Suspense, lazy } from "react";

import ProtectedRoutes from "./pages/ProtectedRoutes";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'
// lazy loading 
const HomePage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))



function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    {/* to show the spinner page while the lazy page is downloading */}
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<HomePage />} />
                            <Route path="product" element={<Product />} />
                            <Route path="pricing" element={<Pricing />} />
                            <Route path="login" element={<Login />} />
                            <Route path="app"
                                element={
                                    <ProtectedRoutes>
                                        <AppLayout />
                                    </ProtectedRoutes>
                                }>
                                <Route index element={<Navigate replace to='cities' />} />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route path="countries" element={<CountryList />} />
                                <Route path="form" element={<Form />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
}

export default App
