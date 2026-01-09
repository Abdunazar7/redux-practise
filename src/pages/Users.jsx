import { useState } from "react";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetFlightsQuery,
  useAssignFlightMutation,
} from "../services/api";

function Users() {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data: flights = [] } = useGetFlightsQuery();
  const [assignFlightToUsers] = useAssignFlightMutation();

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isAssignMode, setIsAssignMode] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", age: "", country: "" });


  const handleAdd = async () => {
    if (!name || !age || !country) return;
    await addUser({ name, age: Number(age), country });
    setName("");
    setAge("");
    setCountry("");
  };

  const handleUpdate = async () => {
    await updateUser({ id: editId, data: editData });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(id);
      setSelectedUserIds((prev) => prev.filter((userId) => userId !== id));
    }
  };

  const toggleUserSelection = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((i) => i !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const handleAssignConfirm = async (flightId) => {
    if (selectedUserIds.length === 0) return;

    try {
      await assignFlightToUsers({
        flightId,
        userIds: selectedUserIds,
      }).unwrap();
      alert("Users assigned successfully!");
      setIsAssignMode(false);
      setSelectedUserIds([]); 
    } catch (error) {
      console.error("Assign failed", error);
      alert("Failed to assign users.");
    }
  };

  if (isLoading) return <div className="text-white p-4">Loading users...</div>;
  if (isError)
    return <div className="text-red-500 p-4">Error loading users</div>;

  return (
    <div className="space-y-8 pb-20">
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
          className="px-5 py-2 bg-emerald-600 rounded-md font-medium hover:bg-emerald-700 transition text-white"
        >
          Add User
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-700 shadow">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-center">Select</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Age</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-center">Flight</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const selected = selectedUserIds.includes(u.id);
              const assignedFlight = u.flight
                ? u.flight.flightNum
                : u.flightId
                ? u.flightId
                : "-";

              return (
                <tr
                  key={u.id}
                  className={`
                    border-t border-slate-700 transition bg-slate-500
                    ${selected ? "bg-slate-700/60" : ""}
                    ${u.flightId ? "bg-emerald-900/10" : ""}
                    hover:bg-slate-700/40
                  `}
                >
                  <td className="p-3">{u.id}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleUserSelection(u.id)}
                      className="scale-110 accent-amber-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3 text-center">{u.age}</td>
                  <td className="p-3">{u.country}</td>
                  <td className="p-3 text-center font-semibold text-emerald-400">
                    {assignedFlight}
                  </td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setEditId(u.id);
                        setEditData(u);
                      }}
                      className="px-2 py-1 bg-blue-600 rounded text-xs text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-2 py-1 bg-red-600 rounded text-xs text-white"
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
        <div className="bg-slate-800 p-4 rounded space-x-2 flex gap-2">
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
            onClick={handleUpdate}
            className="bg-emerald-600 px-4 py-2 rounded text-white"
          >
            Save
          </button>
          <button
            onClick={() => setEditId(null)}
            className="bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex justify-between items-center border-t border-slate-700 pt-4">
        <div className="text-slate-400 text-sm">
          {selectedUserIds.length} users selected
        </div>
        <button
          disabled={!selectedUserIds.length}
          onClick={() => setIsAssignMode(!isAssignMode)}
          className={`
            px-6 py-2 rounded-md font-semibold text-white transition
            ${isAssignMode ? "bg-slate-600" : "bg-amber-600 hover:bg-amber-700"}
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
        >
          {isAssignMode ? "Cancel Selection" : "Assign Flight"}
        </button>
      </div>

      {isAssignMode && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-bold text-amber-500 mb-3">
            Select a Flight to Assign
          </h3>
          <div className="overflow-hidden rounded-lg border border-amber-600/30 shadow-lg">
            <table className="w-full text-sm text-slate-300">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-3">Flight Num</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Time</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900">
                {flights.map((f) => (
                  <tr
                    key={f.id}
                    className="border-t border-slate-700 hover:bg-amber-900/20 transition"
                  >
                    <td className="p-3 font-bold text-white">{f.flightNum}</td>
                    <td className="p-3">{f.company}</td>
                    <td className="p-3">
                      {f.departureTime} - {f.arrivalTime}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleAssignConfirm(f.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-bold"
                      >
                        Select & Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
