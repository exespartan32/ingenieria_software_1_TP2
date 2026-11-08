import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const ABMDirecciones = () => {
  const [direcciones, setDirecciones] = useState([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    id: null,
    alias: "",
    calle: "",
    numero: "",
    ciudad: "",
    localidad: "",
    coordenadas: "",
    piso: "",
    depto: "",
    aclaraciones: "",
  });

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("direcciones")) || [];
    setDirecciones(guardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem("direcciones", JSON.stringify(direcciones));
  }, [direcciones]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos obligatorios (Escenario Alt. 2 de HU-05)
    if (
      !formData.alias ||
      !formData.calle ||
      !formData.numero ||
      !formData.ciudad ||
      !formData.localidad ||
      !formData.coordenadas
    ) {
      return alert(
        "Faltan completar datos obligatorios (Alias, Calle, Número, Ciudad, Localidad, Coordenadas).",
      );
    }

    if (formData.id) {
      // Modificar
      setDirecciones(
        direcciones.map((d) => (d.id === formData.id ? formData : d)),
      );
    } else {
      // Alta
      setDirecciones([...direcciones, { ...formData, id: uuid() }]);
    }
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormData({
      id: null,
      alias: "",
      calle: "",
      numero: "",
      ciudad: "",
      localidad: "",
      coordenadas: "",
      piso: "",
      depto: "",
      aclaraciones: "",
    });
  };

  const handleEdit = (dir) => setFormData(dir);
  const handleDelete = (id) =>
    setDirecciones(direcciones.filter((d) => d.id !== id));

  return (
    <div className="card p-4">
      <h2>Gestión de Direcciones de Entrega</h2>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        {/* Campos Obligatorios */}
        <div className="col-md-4">
          <input
            name="alias"
            className="form-control"
            placeholder="Alias (Ej. Casa)*"
            value={formData.alias}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            name="calle"
            className="form-control"
            placeholder="Calle*"
            value={formData.calle}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="numero"
            className="form-control"
            placeholder="Número*"
            value={formData.numero}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            name="ciudad"
            className="form-control"
            placeholder="Ciudad*"
            value={formData.ciudad}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            name="localidad"
            className="form-control"
            placeholder="Localidad*"
            value={formData.localidad}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            name="coordenadas"
            className="form-control"
            placeholder="Coordenadas*"
            value={formData.coordenadas}
            onChange={handleChange}
          />
        </div>

        {/* Campos Opcionales (HU-06) */}
        <div className="col-md-2">
          <input
            name="piso"
            className="form-control"
            placeholder="Piso (Opc.)"
            value={formData.piso}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            name="depto"
            className="form-control"
            placeholder="Depto (Opc.)"
            value={formData.depto}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-8">
          <input
            name="aclaraciones"
            className="form-control"
            placeholder="Aclaraciones (Opc.)"
            value={formData.aclaraciones}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success me-2">
            {formData.id ? "Guardar Cambios" : "Registrar Dirección"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Alias</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {direcciones.map((d) => (
            <tr key={d.id}>
              <td>
                <strong>{d.alias}</strong>
              </td>
              <td>
                {d.calle} {d.numero} {d.piso && `Piso ${d.piso}`}{" "}
                {d.depto && `Dpto ${d.depto}`} - {d.localidad}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(d)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(d.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ABMDirecciones;
