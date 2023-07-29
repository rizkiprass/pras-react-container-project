import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

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
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch the pre-signed URL from your Node.js server
    fetch("/api/images/popcat")
      .then((response) => response.json())
      .then((data) => setImageUrl(data.url))
      .catch((error) => console.error("Error fetching image URL:", error));
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Popcat"
          style={{ maxWidth: "400px", maxHeight: "400px" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ user_id: "", name: "", address: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User added successfully:", data);
        navigate("/db"); // Redirect back to the /db route after successful creation
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div>
      <h2>Create User</h2>
      <p>SOME CHANGES TEST</p>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="number"
          name="user_id"
          value={user.user_id}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

function UpdateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ user_id: "", name: "", address: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User updated successfully:", data);
        navigate("/db"); // Redirect back to the /db route after successful update
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="number"
          name="user_id"
          value={user.user_id}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

function DeleteUser() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User deleted successfully:", data);
        navigate("/db"); // Redirect back to the /db route after successful delete
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
}

function DB() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/db")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => console.error("Error fetching data from DB:", error));
  }, []);

  return (
    <div>
      <h2>DB</h2>
      <ul>
        {backendData.map((user) => (
          <li key={user.user_id}>
            {user.name} - {user.address}
          </li>
        ))}
      </ul>
      <Link to="/db/create">Create User</Link>
      <br />
      <Link to="/db/update">Update User</Link>
      <br />
      <Link to="/db/delete">Delete User</Link>
    </div>
  );
}

function App() {
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
          <Route path="/db" element={<DB />} />
          <Route path="/db/create" element={<CreateUser />} />
          <Route path="/db/update" element={<UpdateUser />} />
          <Route path="/db/delete" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
