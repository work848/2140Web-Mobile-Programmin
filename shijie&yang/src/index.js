import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Share from "./pages/share";  
import Createsamples from "./pages/createsample";  
import Displayhead from './pages/header'
import Displayfooter from './pages/footer'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Displayhead />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/share" element={<Share />} />  
        <Route path="/share/:id" element={<Share />} />
        <Route path="/Createsamples" element={<Createsamples />} />  
        <Route path="/Createsamples/:id" element={<Createsamples />} />  
      </Routes>
      <Displayfooter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);