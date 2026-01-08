import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, decrement, increment, reset } from "./reducers/counterSlice";
import { addUser, removeUser, updateUser } from "./reducers/userSlice";

function App() {
  const count = useSelector((state) => state.counter.count);

  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const users = useSelector((state) => state.users.users);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!name || !age || !email) return;

    if (editingId) {
      dispatch(
        updateUser({
          id: editingId,
          name,
          age: Number(age),
          email,
        })
      );
    } else {
      dispatch(
        addUser({
          id: Date.now(),
          name,
          age: Number(age),
          email,
        })
      );
    }

    setName("");
    setAge("");
    setEmail("");
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    setEditingId(user.id);
  };

  return (
    <>
      <div className="app">
        <div className="counter">
          <button onClick={() => dispatch(increment())}>increment</button>
          <p>{count}</p>
          <button onClick={() => dispatch(decrement())}>decrement</button>
          <br />
          <button onClick={() => dispatch(reset())}>reset</button>
          <br />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={() => dispatch(add(Number(value)))}>add</button>
        </div>

        <hr />

        <h2>{editingId ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          min={0}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName("");
              setAge("");
              setEmail("");
            }}
          >
            Cancel
          </button>
        )}
        <hr />
        <h2>Users</h2>
        <ul>
          <li>Name | Age | Email</li>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} | {user.age} | {user.email}
              <button className="icon-btn" onClick={() => handleEdit(user)}>
                ✏️
              </button>
              <button
                className="danger"
                onClick={() => dispatch(removeUser(user.id))}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
