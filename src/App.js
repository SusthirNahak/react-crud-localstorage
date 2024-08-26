import { useEffect, useState } from "react";
import "./App.css";
import { EmployeeData } from "./EmployeeData";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

function App() {
  const [employee, setEmployee] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLasttName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {

   const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployee(storedEmployees);
    } else {
      setEmployee(EmployeeData);
    }
  }, []);

  const updateLocalStorage = (employees) => {
    localStorage.setItem('employees', JSON.stringify(employees));
  };

  const HandleEdit = (id) => {
    const editItem = employee.filter((emp) => emp.id === id);
    if (editItem !== undefined) {
      setIsUpdate(true);
      setFirstName(editItem[0].first_name);
      setLasttName(editItem[0].last_name);
      setAge(editItem[0].age);
      setId(id);
    }
  };
  const HandleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete the employee!!")) {
        const delItem = employee.filter((emp) => emp.id !== id);
        setEmployee(delItem);
        updateLocalStorage(delItem);
      }
    }
  };

  const HandleSave = (e) => {
    let error = "";
    if (first_name === "") {
      error += "First Name is Required,  ";
    }
    if (last_name === "") {
      error += "Last Name is Required,  ";
    }
    if (age <= 0) {
      error += "age is Required,  ";
    }

    if (error === "") {
      e.preventDefault();
      const save = [...employee];
      const finalSave = {
        id: EmployeeData.length + 1,
        first_name: first_name,
        last_name: last_name,
        age: age,
      };
      save.push(finalSave);
      setEmployee(save);
      updateLocalStorage(save); 
      HandleClear();
    } else {
      alert(error);
    }
  };

  const HandleUpdate = () => {
    const index = employee
      .map((emp) => {
        return emp.id;
      })
      .indexOf(id);

    const update = [...employee];
    update[index].first_name = first_name;
    update[index].last_name = last_name;
    update[index].age = age;
    setEmployee(update);
    updateLocalStorage(update);
    HandleClear();
  };

  const HandleClear = () => {
    setFirstName("");
    setLasttName("");
    setAge("");
    setId(0);
    setIsUpdate(false);
  };
  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "black",
          color: "#06D001",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <h3>React Employee CRUD Operation</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        className="container"
      >
        <div>
          <label htmlFor="first_name">First Name : </label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name : </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={last_name}
            onChange={(e) => setLasttName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Your Age : </label>
          <input
            type="text"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          {!isUpdate ? (
            <Button varient="primary" onClick={(e) => HandleSave(e)}>
              Save
            </Button>
          ) : (
            <Button varient="primary" onClick={() => HandleUpdate()}>
              Update
            </Button>
          )}
          &nbsp;
          <Button variant="danger" onClick={() => HandleClear()}>
            Claer
          </Button>
        </div>
      </div>

      <div className="container p-5">
        <Table className="striped border table-hover table-responsive">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.id}</td>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.age}</td>
                <td>
                  <Button varient="primary" onClick={() => HandleEdit(emp.id)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button variant="danger" onClick={() => HandleDelete(emp.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
