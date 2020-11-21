import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "./component/Navigation";
import {useUserContext} from "./hook/UserContextHook";
import {userContext as UserContext} from './context/UserContext'
import Calc from "./component/depreciationCalc/Calc";

const App: React.FunctionComponent = () => {

    const user = useUserContext();

    useEffect(() => {
        console.log("Current user: ", user);
    }, [user]);

    return (
        <UserContext.Provider value={user}>
            <div className="App">
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route path={'/depreciationCalc'}>
                            <Calc/>
                        </Route>
                        <Route path={'/features'}>
                            <div>Features</div>
                        </Route>
                        <Route path={'/pricing'}>
                            <div>Pricing</div>
                        </Route>
                        <Route path={'/'}>
                            <div>Home</div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </UserContext.Provider>
    );
}

export default App;
