import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/events";

export const listEvents = () => {
  return axios.get(API_BASE_URL);
}

export const getEvent = (eventId: any) => axios.get(API_BASE_URL + '/' + eventId);

/** Fetch all events */
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
};

/** Fetch an event by ID */
export const getEventById = async (id: number): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch event with ID ${id}`);
  }
  return response.json();
};

/** Create a new event */
export const createEvent = async (event: Event): Promise<Event> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error("Failed to create event");
  }
  return response.json();
};

/** Update an event */
export const updateEvent = async (id: number, event: Event): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error(`Failed to update event with ID ${id}`);
  }
  return response.json();
};

/** Delete an event */
export const deleteEvent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete event with ID ${id}`);
  }
};
