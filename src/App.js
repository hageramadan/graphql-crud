import Companies from "./components/Companies";
import Users from "./components/Users";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Manage your employees</h1>
      <div className="grid">
        <Companies />
        <Users />
      </div>
    </div>
  );
}

export default App;
