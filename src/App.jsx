import React from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [editMode, setEdit] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState();

  const agregarTable = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("no a escrito en tarea");
      setError("escriba una tarea");
      return;
    }

    console.log(tarea);

    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);

    setTarea("");
    setError(null);
  };

  const deleteTarea = (id) => {
    console.log(id);

    const filterArray = tareas.filter((item) => item.id !== id);

    setTareas(filterArray);
  };

  const editTarea = (item) => {
    console.log(item);
    setEdit(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("no a escrito en tarea");
      setError("escriba algo para editar");
      return;
    }

    const newArray = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );

    setTareas(newArray);
    setEdit(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">TAREAS</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          {/* lista de tareas */}
          <h5 className="text-center">Lista de Tareas</h5>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger float-end btn-sm ms-2"
                    onClick={() => deleteTarea(item.id)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-warning float-end btn-sm ms-2"
                    onClick={() => editTarea(item)}
                  >
                    editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          {/*  formulario */}
          <h5 className="text-center">{editMode ? "EDIT TAREA" : "AGREGAR"}</h5>
          <form onSubmit={editMode ? editarTarea : agregarTable}>
            {error ? (
              <span className="text-center text-danger">{error}</span>
            ) : null}
            <input
              className="form-control mb-2"
              type="text"
              placeholder="ingrese la tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {editMode ? (
              <button type="submit" class="btn btn-warning btn-block">
                editar
              </button>
            ) : (
              <button type="submit" class="btn btn-primary btn-block">
                agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
