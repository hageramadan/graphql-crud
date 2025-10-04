import { useEffect, useState } from "react";
import { graphqlRequest } from "../graphqlClient";
import { GET_COMPANIES, ADD_COMPANY, DELETE_COMPANY, UPDATE_COMPANY } from "../graphql/queries";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", slogan: "" });
  const [editMode, setEditMode] = useState(false);

  async function loadCompanies() {
    const data = await graphqlRequest(GET_COMPANIES);
    setCompanies(data.companies);
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  async function handleAddOrUpdate() {
    if (editMode) {
      await graphqlRequest(UPDATE_COMPANY, {
        id: form.id,
        name: form.name,
        slogan: form.slogan,
      });
    } else {
      await graphqlRequest(ADD_COMPANY, { name: form.name, slogan: form.slogan });
    }

    setForm({ id: null, name: "", slogan: "" });
    setEditMode(false);
    loadCompanies();
  }

  async function handleDelete(id) {
    await graphqlRequest(DELETE_COMPANY, { id });
    loadCompanies();
  }

  function handleEdit(company) {
    setForm({
      id: company.id,
      name: company.name,
      slogan: company.slogan,
    });
    setEditMode(true);
  }

  return (
    <div className="card">
      <h2 className="title">Companies</h2>

      <div className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Slogan"
          value={form.slogan}
          onChange={(e) => setForm({ ...form, slogan: e.target.value })}
        />
        <button className="btn add" onClick={handleAddOrUpdate}>
          {editMode ? "Update Company" : "Add Company"}
        </button>
        {editMode && (
          <button
            className="btn cancel"
            onClick={() => {
              setEditMode(false);
              setForm({ id: null, name: "", slogan: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="list">
        {companies.map((c) => (
          <li key={c.id} className="list-item">
            <div>
              <b>{c.name}</b> - <i>{c.slogan}</i>
              {c.users?.length > 0 && (
                <ul className="sub-list">
                  {c.users.map((u) => (
                    <li key={u.id} className="sub-list-item">
                      {u.firstName} ({u.age})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <button className="btn edit" onClick={() => handleEdit(c)}>Edit</button>
              <button className="btn delete" onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
