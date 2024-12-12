import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [message, setMessage] = useState("");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [id]);

  const handleTicketAction = () => {
    const endpoint = userType === "vendor"
      ? "http://localhost:8080/api/tickets/add"
      : "http://localhost:8080/api/tickets/buy";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: parseInt(id),
        quantity: ticketCount,
      }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Error processing request."));
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg border-light rounded">
            <img
              src={event.eventImage || "https://via.placeholder.com/800x400"}
              className="card-img-top rounded-top"
              alt={event.name}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h1 className="card-title text-center">
                <strong>{event.name}</strong>
              </h1>
              <h3 className="card-text mt-3">
                <strong>Description:</strong> {event.description}
              </h3>
              <div className="row mt-4">
                <div className="col">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                </div>
                <div className="col">
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Available Ticket:</strong> {event.ticketCapacity}</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <div>
                  <label>
                    Number of Tickets:
                    <input
                      type="number"
                      min="1"
                      value={ticketCount}
                      onChange={(e) => setTicketCount(parseInt(e.target.value, 10))}
                    />
                  </label>
                  <button
                    style={{ marginLeft: "20px" }}
                    className="btn btn-primary"
                    onClick={handleTicketAction}
                  >
                    {userType === "vendor" ? "Add Ticket" : "Buy Ticket"}
                  </button>
                </div>
                {message && (
                  <div className="mt-3 alert alert-info">{message}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
