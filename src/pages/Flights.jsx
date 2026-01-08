import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addFlight } from "../reducers/flightsSlice";
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

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
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
          className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700"
        >
          Add Flight
        </button>
      </div>

      <table className="w-full border border-slate-700">
        <thead className="bg-slate-400">
          <tr>
            <th className="p-2">№</th>
            <th className="p-2">Flight</th>
            <th className="p-2">Company</th>
            <th className="p-2">Departure</th>
            <th className="p-2">Arrival</th>
          </tr>
        </thead>

        <tbody>
          {flights.map((f, index) => (
            <tr
              key={f.id}
              onClick={() => handleSelect(f.flightNum)}
              className="border-t border-slate-700 text-center cursor-pointer hover:bg-slate-300 transition"
            >
              <td className="p-2 opacity-70">{index + 1}</td>
              <td className="p-2 font-medium">{f.flightNum}</td>
              <td className="p-2">{f.company}</td>
              <td className="p-2">{f.departureTime}</td>
              <td className="p-2">{f.arrivalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Flights;
