import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  const [backendData, setBackendData] = useState({ users: [] });

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      {backendData.users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}

function DB() {
  const [dbData, setDBData] = useState([]);

  useEffect(() => {
    fetch("/db")
      .then((response) => response.json())
      .then((data) => {
        setDBData(data.data);
      });
  }, []);

  return (
    <div>
      <h2>DB</h2>
      {dbData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Movie Review</th>
            </tr>
          </thead>
          <tbody>
            {dbData.map((row) => (
              <tr key={row.id}>
                <td>{row.movieName}</td>
                <td>{row.movieReview}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/db">DB</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/db" element={<DB />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
