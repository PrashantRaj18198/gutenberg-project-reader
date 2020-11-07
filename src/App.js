import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './app.css';

import CategoryPage from './components/CategoryPage';
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-2" style={{ marginTop: 40 }}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/category/:categoryName">
            <CategoryPage />
          </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
