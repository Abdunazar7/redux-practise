import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser, toggleUser } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, selectedUserIds } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const handleAdd = () => {
    if (!name || !age || !country) return;

    dispatch(
      addUser({
        name,
        age: Number(age),
        country,
      })
    );

    setName("");
    setAge("");
    setCountry("");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          type="number"
          min={0}
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="input"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700"
        >
          Add User
        </button>
      </div>

      <table className="w-full border border-slate-700">
        <thead className="bg-slate-400">
          <tr>
            <th className="p-2">№</th>
            <th className="p-2"></th>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Country</th>
            <th className="p-2">Flight ID</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <tr key={u.id} className="border-t border-slate-700 text-center">
              <td className="p-2 opacity-70">{index + 1}</td>

              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(u.id)}
                  onChange={() => dispatch(toggleUser(u.id))}
                />
              </td>

              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.age}</td>
              <td className="p-2">{u.country}</td>
              <td className="p-2">{u.flightId ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        disabled={!selectedUserIds.length}
        onClick={() => navigate("/flights")}
        className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
      >
        Assign Flight
      </button>
    </div>
  );
}

export default Users;
