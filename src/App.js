import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Navbar from "./ui-components/Navbar/Navbar";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { WithAuthenticator } from "./authenticator/WithAuthenticator";

const App = () => {
  return (
    <Provider store={store}>
      <WithAuthenticator>
        <Router className="App">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
      </WithAuthenticator>
    </Provider>
  );
};

export default App;
