import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample event data
const myEvents = [
  {
    id: 1,
    imageUrl:
      "https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/468832258_597627909273295_1713242684082415912_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Q9yf8amEU94Q7kNvgFC-FOP&_nc_zt=23&_nc_ht=scontent.fcmb1-2.fna&_nc_gid=ADbslNRX_Ztgz51_B9e4NNY&oh=00_AYAa1WrQ_z2cOdZXduUbH6JifwB2O5rYAok9ihGuf2qC_w&oe=675F03D0",
  },
  {
    id: 2,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQosmRT34-mJZzG-OACK8YFLQ6QX1eGaEWw&ss",
  },
];

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((data) => {
        const eventsWithImages = data.map((event) => {
          // Find matching image for each event
          const imageData = myEvents.find(
            (imageEvent) => imageEvent.id === event.id
          );
          return {
            ...event,
            imageUrl: imageData
              ? imageData.imageUrl
              : "https://via.placeholder.com/150", // Default image if no match
          };
        });
        setEvents(eventsWithImages);
      })
      .catch((error) => console.error("Error fetching events:", error));

    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType || "");
  }, []);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Upcoming Events</h2>
      <div className="row">
        {events.map((event) => (
          <div
            key={event.id}
            className="col-md-3"
            onClick={() => handleEventClick(event.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="card mb-4">
              <img
                src={event.eventImage || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={event.name}
              />
              <div className="card-body">
                <h5 className="card-title">Title: {event.name}</h5>
                <p className="card-text">Description: {event.description}</p>
                <p className="card-time">Time: {event.time}</p>
                <p className="card-location">Location: {event.location}</p>
                <p className="card-date">Date: {event.date}</p>
                {/* <p className="card-location">{event.eventImage}</p> */}
                <p className="card-date">Available Tickets: {event.ticketCapacity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userType === "vendor" && (
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => navigate("/customers")}
          >
            View all customers (Table)
          </button>
          <button
            type="button"
            className="btn btn-dark ms-2"
            onClick={() => navigate("/vendors")}
          >
            View All Vendors (Table)
          </button>
          <button
            type="button"
            className="btn btn-dark ms-2"
            onClick={() => navigate("/events")}
          >
            View All Events (Table)
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
