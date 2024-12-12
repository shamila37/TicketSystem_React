import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent, listEvents } from "../../services/EventService";

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEvents();
  }, []);

  function getAllEvents() {
    listEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching events: " + error);
      });
  }

  function addNewEvent() {
    navigator("/viewEvents");
  }

  function updateEvent(id: any) {
    navigator(`/viewEvents/${id}`);
  }

  function removeEvent(id: any) {
    console.log(id);
    deleteEvent(id)
      .then((response) => {
        getAllEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 style={{ color: "yellowgreen" }}>List of events</h2>
      <br />
      <button className="btn btn-primary mb-2" onClick={addNewEvent}>
        {" "}
        Add event
      </button>

      <table className="table table-striped table-hover table-bordered table-success">
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Event date</th>
            <th>Event description</th>
            <th>Event name</th>
            <th>Event location</th>
            <th>Event time</th>
            <th>Event ticket count</th>
            <th>Image url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.date}</td>
              <td>{event.description}</td>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{event.time}</td>
              <td>{event.ticketCapacity}</td>
              <td
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  maxWidth: "200px",
                  whiteSpace: "normal",
                }}
              >
                {event.eventImage}
              </td>
              <td>
                {/* <button
                  className="btn btn-info"
                  onClick={() => updateEvent(event.id)}
                >
                  Update
                </button> */}
                <button
                  className="btn btn-danger"
                  onClick={() => removeEvent(event.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EventTable;
