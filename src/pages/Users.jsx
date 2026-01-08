import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addUser,
  toggleUser,
  deleteUser,
  updateUser,
} from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, selectedUserIds } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", age: "", country: "" });

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
    <div className="space-y-8">
      <div className="bg-slate-800 p-4 rounded-lg shadow flex gap-4 flex-wrap">
        <input
          className="input"
          placeholder="Full name"
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
          className="px-5 py-2 bg-emerald-600 rounded-md font-medium hover:bg-emerald-700 transition"
        >
          + Add User
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-700 shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-center">Select</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Age</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-center">Flight ID</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const selected = selectedUserIds.includes(u.id);
              const hasFlight = u.flightId !== null;

              return (
                <tr
                  key={u.id}
                  className={`
                    border-t border-slate-700 transition
                    ${selected ? "bg-slate-700/60" : ""}
                    ${hasFlight ? "bg-emerald-900/20" : ""}
                    hover:bg-slate-700/40
                  `}
                >
                  <td className="p-3">{u.id}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => dispatch(toggleUser(u.id))}
                      className="scale-110 accent-amber-500"
                    />
                  </td>
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-center">{u.age}</td>
                  <td className="p-3">{u.country}</td>
                  <td className="p-3 text-center font-semibold">
                    {u.flightId ?? "-"}
                  </td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setEditId(u.id);
                        setEditData(u);
                      }}
                      className="px-2 py-1 bg-blue-600 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteUser(u.id))}
                      className="px-2 py-1 bg-red-600 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editId && (
        <div className="bg-slate-800 p-4 rounded space-x-2">
          <input
            className="input"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <input
            className="input"
            type="number"
            value={editData.age}
            onChange={(e) => setEditData({ ...editData, age: +e.target.value })}
          />
          <input
            className="input"
            value={editData.country}
            onChange={(e) =>
              setEditData({ ...editData, country: e.target.value })
            }
          />
          <button
            onClick={() => {
              dispatch(updateUser({ id: editId, data: editData }));
              setEditId(null);
            }}
            className="bg-emerald-600 px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditId(null)}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex justify-end">
        <button
          disabled={!selectedUserIds.length}
          onClick={() => navigate("/flights")}
          className="
            px-6 py-2 rounded-md font-semibold
            bg-amber-600 hover:bg-amber-700
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          Assign Flight →
        </button>
      </div>
    </div>
  );
}

export default Users;
