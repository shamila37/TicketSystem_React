import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  eventImage: string;
  ticketCapacity: string;
}

function AddEvent() {
  const [event, setEvent] = useState<Event>({
    name: "",
    location: "",
    date: "",
    time: "",
    description: "",
    eventImage: "",
    ticketCapacity: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Event added successfully:", data);
      alert("Event added successfully!");

      // Reset the form after successful submission
      setEvent({
        name: "",
        location: "",
        date: "",
        time: "",
        description: "",
        eventImage: "",
        ticketCapacity: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div
          className="card col-md-10 offset-md-1"
          style={{ backgroundColor: "#79c269" }}
        >
          <br />
          <h2>Add an Event</h2>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/** Event Name */}
              <div className="form-group mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={event.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/** Location */}
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={event.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/** Date */}
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={event.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/** Time */}
              <div className="mb-3">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={event.time}
                  onChange={handleChange}
                  required
                />
              </div>

              {/** Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/** Image link */}
              <div className="mb-3">
                <label className="form-label">Image-link</label>
                <input
                  type="url"
                  className="form-control"
                  name="eventImage"
                  value={event.eventImage}
                  onChange={handleChange}
                  required
                />
              </div>

              {/** Max Ticket Capacity */}
              <div className="mb-3">
                <label className="form-label">Max Ticket Capacity</label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketCapacity"
                  value={event.ticketCapacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Event
              </button>
            </form>
            <button
              style={{ marginTop: "10px" }}
              type="submit"
              className="btn btn-secondary"
              onClick={() => navigate("/home")}
            >
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
