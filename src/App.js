import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Axios from "axios";
import "./App.css"; // Import the CSS file

function Home({ backendData }) {
  return (
    <>
      <h1>Welcome to the home page</h1>
      {typeof backendData.users === "undefined" ? (
        <p>Loading ... </p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </>
  );
}

function About() {
  return <h1>About us</h1>;
}

function CRUD() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/api/get").then((response) => {
      setMovieList(response.data);
    });
  });

  const submitReview = () => {
    Axios.post("http://localhost:8080/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:8080/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:8080/api/delete/${movie}`, movieName);
  };

  return (
    <div className="crud-container">
      <h1>CRUD APP</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val, index) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//setMovieName = untuk menyimpan value yg di ketik dari placeholder, lalu dikirimkan ke submitReview

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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/crud">CRUD</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home backendData={backendData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/crud" element={<CRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
