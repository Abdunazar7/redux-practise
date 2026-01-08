import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addFlight,
  deleteFlight,
  updateFlight,
} from "../reducers/flightsSlice";
import { assignFlightToUsers } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

function Flights() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const flights = useSelector((state) => state.flights.flights);

  const [flightNum, setFlightNum] = useState("");
  const [company, setCompany] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    flightNum: "",
    company: "",
    departureTime: "",
    arrivalTime: "",
  });

  const handleAdd = () => {
    if (!flightNum || !company || !departureTime || !arrivalTime) return;

    dispatch(
      addFlight({
        flightNum,
        company,
        departureTime,
        arrivalTime,
      })
    );

    setFlightNum("");
    setCompany("");
    setDepartureTime("");
    setArrivalTime("");
  };

  const handleSelect = (flightId) => {
    dispatch(assignFlightToUsers(flightId));
    navigate("/users");
  };

  const handleStartEdit = (e, flight) => {
    e.stopPropagation();
    setEditId(flight.id);
    setEditData(flight);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteFlight(id));
  };

  const handleUpdate = () => {
    dispatch(updateFlight({ id: editId, data: editData }));
    setEditId(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-4 rounded-lg shadow flex gap-4 flex-wrap">
        <input
          className="input"
          placeholder="Flight number"
          value={flightNum}
          onChange={(e) => setFlightNum(e.target.value)}
        />
        <input
          className="input"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="time"
          className="input"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />
        <input
          type="time"
          className="input"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-emerald-600 rounded-md font-medium hover:bg-emerald-700 transition"
        >
          + Add Flight
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-700 shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Flight</th>
              <th className="p-3">Company</th>
              <th className="p-3">Departure</th>
              <th className="p-3">Arrival</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr
                key={f.id}
                onClick={() => handleSelect(f.id)}
                className="border-t border-slate-700 text-center cursor-pointer hover:bg-amber-900/30 transition"
              >
                <td className="p-3">{f.id}</td>
                <td className="p-3 font-semibold">{f.flightNum}</td>
                <td className="p-3">{f.company}</td>
                <td className="p-3">{f.departureTime}</td>
                <td className="p-3">{f.arrivalTime}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={(e) => handleStartEdit(e, f)}
                    className="px-2 py-1 bg-blue-600 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, f.id)}
                    className="px-2 py-1 bg-red-600 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editId && (
        <div className="bg-slate-800 p-4 rounded space-x-2 flex flex-wrap gap-2">
          <input
            className="input"
            value={editData.flightNum}
            onChange={(e) =>
              setEditData({ ...editData, flightNum: e.target.value })
            }
            placeholder="Flight Num"
          />
          <input
            className="input"
            value={editData.company}
            onChange={(e) =>
              setEditData({ ...editData, company: e.target.value })
            }
            placeholder="Company"
          />
          <input
            type="time"
            className="input"
            value={editData.departureTime}
            onChange={(e) =>
              setEditData({ ...editData, departureTime: e.target.value })
            }
          />
          <input
            type="time"
            className="input"
            value={editData.arrivalTime}
            onChange={(e) =>
              setEditData({ ...editData, arrivalTime: e.target.value })
            }
          />
          <button
            onClick={handleUpdate}
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
    </div>
  );
}

export default Flights;
