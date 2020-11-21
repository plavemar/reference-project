import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "./component/Navigation";
import Calc from "./component/depreciationCalc/Calc";

const App: React.FunctionComponent = () => {

    return (
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
    );
}

export default App;
