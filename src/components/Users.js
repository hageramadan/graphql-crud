import { useEffect, useState } from "react";
import { graphqlRequest } from "../graphqlClient";
import { GET_USERS, ADD_USER, DELETE_USER, GET_COMPANIES, UPDATE_USER } from "../graphql/queries";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ id: null, firstName: "", age: "", companyId: "" });
  const [editMode, setEditMode] = useState(false);

  async function loadUsers() {
    const data = await graphqlRequest(GET_USERS);
    setUsers(data.users);
  }

  async function loadCompanies() {
    const data = await graphqlRequest(GET_COMPANIES);
    setCompanies(data.companies);
  }

  useEffect(() => {
    loadUsers();
    loadCompanies();
  }, []);

  async function handleAdd() {
    if (editMode) {
      await graphqlRequest(UPDATE_USER, {
        id: form.id,
        firstName: form.firstName,
        age: parseInt(form.age),
        companyId: form.companyId,
      });
    } else {
      await graphqlRequest(ADD_USER, {
        firstName: form.firstName,
        age: parseInt(form.age),
        companyId: form.companyId,
      });
    }

    setForm({ id: null, firstName: "", age: "", companyId: "" });
    setEditMode(false);
    loadUsers();
  }

  async function handleDelete(id) {
    await graphqlRequest(DELETE_USER, { id });
    loadUsers();
  }

  function handleEdit(user) {
    setForm({
      id: user.id,
      firstName: user.firstName,
      age: user.age,
      companyId: user.company?.id || "",
    });
    setEditMode(true);
  }

  return (
    <div className="card">
      <h2 className="title">Users</h2>

      <div className="form">
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <select
          value={form.companyId}
          onChange={(e) => setForm({ ...form, companyId: e.target.value })}
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="btn add" onClick={handleAdd}>
          {editMode ? "Update User" : "Add User"}
        </button>
        {editMode && (
          <button
            className="btn cancel"
            onClick={() => {
              setEditMode(false);
              setForm({ id: null, firstName: "", age: "", companyId: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="list">
        {users.map((u) => (
          <li key={u.id} className="list-item">
            <span>
              <b>{u.firstName}</b> ({u.age}) - <i>{u.company?.name}</i>
            </span>
            <div>
              <button className="btn edit" onClick={() => handleEdit(u)}>Edit</button>
              <button className="btn delete" onClick={() => handleDelete(u.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
