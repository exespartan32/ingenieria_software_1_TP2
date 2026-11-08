import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ABMPaises from "./components/ABMPaises";
import ABMDirecciones from "./components/ABMDirecciones";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">
          Trabajo Práctico N°2 - Parte Individual
        </h1>
        <nav className="mb-4 d-flex justify-content-center gap-3">
          <Link to="/paises" className="btn btn-primary">
            Gestión de Países (Ej. B)
          </Link>
          <Link to="/direcciones" className="btn btn-success">
            Gestión de Direcciones (Ej. E)
          </Link>
        </nav>
        <Routes>
          <Route path="/paises" element={<ABMPaises />} />
          <Route path="/direcciones" element={<ABMDirecciones />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
