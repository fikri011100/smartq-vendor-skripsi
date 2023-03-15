import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// import { ProvideAuth } from "./common/login"
import { AuthProvider } from "./common/Firebase/authContext"
import PrivateRouter from "./common/PrivateRouter"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

import './style/css/app.css';
import Homepage from './pages/landing/Homepage';
import Login from './pages/landing/Login';
import AboutUs from './pages/landing/AboutUs';
import Sidebar from './components/Sidebar';

//import Register from './pages/landing/Register';
import Signup from "./pages/landing/regis";
import Register from "./pages/landing/Register";
import Antrian from './pages/vendor/Antrian';
import Dashboard from './pages/vendor/Dashboard';
import Pegawai from './pages/vendor/Pegawai';
import Setelan from './pages/vendor/Setelan';
import History from './pages/vendor/History';
import Toko from './pages/vendor/Toko';
import Profile from './pages/vendor/Profile';
// import SidebarLayout from './pages/vendor/SidebarLayout';

const App = () => {
    return ( 
        <AuthProvider >
            <Router >
                <Sidebar />
                <Switch >
                    <Route path = '/'
                        exact component = { Homepage }
                    /> 
                    <Route path = '/login'
                        exact component = { Login }
                    /> 
                    <Route path = '/aboutus'
                        exact component = { AboutUs }
                    /> 
                    <Route path = '/register'
                        exact component = { Signup }
                    /> 
                    <Route path = '/registertoko'
                        exact component={Register}
                    />
                    <PrivateRouter path = '/dashboard/:id'
                        component = { Dashboard }
                    /> 
                    <PrivateRouter path = '/antrian/:id'
                        component = { Antrian }
                    /> 
                    <PrivateRouter path = '/pegawai/:id'
                        component = { Pegawai }
                    /> 
                    <PrivateRouter path = '/setelan/:id'
                        component = { Setelan }
                    /> 
                    <PrivateRouter path = '/history/:id'
                        component = { History }
                    />
                    <PrivateRouter path = '/toko/:id'
                        component = { Toko }
                    />
                    <PrivateRouter path = '/profile/:id'
                        component = { Profile }
                    />
                </Switch>
            </Router> 
        </AuthProvider >
    );
}



export default App;