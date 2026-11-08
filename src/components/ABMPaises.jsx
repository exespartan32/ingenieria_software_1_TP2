import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const ABMPaises = () => {
  const [paises, setPaises] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);

  // Cargar desde LocalStorage al iniciar
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("paises")) || [];
    setPaises(guardados);
  }, []);

  // Guardar en LocalStorage cuando el estado cambie
  useEffect(() => {
    localStorage.setItem("paises", JSON.stringify(paises));
  }, [paises]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert("Debe indicar el nombre del país."); // Validar blanco (Escenario Alt. 4a)

    // Validar duplicados (Escenario Excepción 5a)
    const existe = paises.find(
      (p) => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id !== editId,
    );
    if (existe) return alert("El país ya se encuentra registrado.");

    if (editId) {
      // Modificar
      setPaises(paises.map((p) => (p.id === editId ? { ...p, nombre } : p)));
      setEditId(null);
    } else {
      // Alta
      setPaises([...paises, { id: uuid(), nombre }]);
    }
    setNombre("");
  };

  const handleEdit = (pais) => {
    setNombre(pais.nombre);
    setEditId(pais.id);
  };

  const handleDelete = (id, nombrePais) => {
    // Advertencia (Escenario Principal Paso 2)
    if (
      window.confirm(
        `¿Está seguro que desea dar de baja el país ${nombrePais}?`,
      )
    ) {
      setPaises(paises.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="card p-4">
      <h2>Gestión de Países</h2>
      <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del país"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Guardar Cambios" : "Registrar País"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setEditId(null);
              setNombre("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre del País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id, p.nombre)}
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

export default ABMPaises;
