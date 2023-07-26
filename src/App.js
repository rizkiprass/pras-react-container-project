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

function Hello() {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    // Fetch image URLs from your backend server
    fetch("/api/images")
      .then((response) => response.json())
      .then((data) => setImageURLs(data.urls))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      <h2>Hello World</h2>
      <div>
        {imageURLs.map((url) => (
          <img key={url} src={url} alt="test" />
        ))}
      </div>
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
            <li>
              <Link to="/hello">Hello</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello" element={<Hello />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
