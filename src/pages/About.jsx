
import moment from "moment";
import { useAddFlightMutation, useGetFlightsQuery } from "../services/api";
import { useState } from "react";

function About() {
  const [addFlight] = useAddFlightMutation();
  const { data } = useGetFlightsQuery();

  const [flightObj, setFlightObj] = useState({
    flightNum: "",
    company: "",
    departureTime: "",
    arrivalTime: "",
  });

  const handleChange = (e) => {
    setFlightObj({
      ...flightObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addFlight({
      ...flightObj,
      departureTime: moment(flightObj.departureTime).format("DD HH:mm"),
      arrivalTime: moment(flightObj.arrivalTime).format("DD HH:mm"),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div>
        {data?.map((flight) => {
          return (
            <div key={flight.id}>
              <p>
                {flight.flightNum} | {flight.company}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="flightNum">Flight number</label> <br />
            <input
              onInput={handleChange}
              type="text"
              placeholder="Flight num"
              id="flightNum"
              name="flightNum"
            />
          </div>{" "}
          <br />
          <div>
            <label htmlFor="company">Flight company</label> <br />
            <input
              onInput={handleChange}
              type="text"
              placeholder="Flight com"
              id="company"
              name="company"
            />
          </div>{" "}
          <br />
          <div>
            <label htmlFor="departureTime">Departure time</label> <br />
            <input
              onInput={handleChange}
              type="datetime-local"
              id="departureTime"
              name="departureTime"
            />
          </div>{" "}
          <br />
          <div>
            <label htmlFor="arrivalTime">Arrival Time</label> <br />
            <input
              onInput={handleChange}
              type="datetime-local"
              id="arrivalTime"
              name="arrivalTime"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default About;
