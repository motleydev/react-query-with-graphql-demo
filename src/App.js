import { useQuery, useMutation, useQueryClient } from "react-query";

import logo from "./logo.svg";
import "./App.css";
const getData = () =>
  new Promise((resolve, reject) => {
    resolve({ test: "hello" });
  });
function App() {
  const queryClient = useQueryClient();

  const query = useQuery("data", getData);
  console.log(query);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
