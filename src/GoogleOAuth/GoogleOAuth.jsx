import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import "./GoogleOAuth.css";
import axios from "axios";

export function GoogleOAuth() {
  const [summary, setSummary] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [attendees, setAttendees] = useState();
  const [googleToken, setGoogleToken] = useState();
  var event = {
    summary: summary,
    location: location,
    description: description,
    start: {
      dateTime: startDate,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endDate,
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  function Button() {
    let scope = "https://www.googleapis.com/auth/calendar.events";
    const login = useGoogleLogin({
      onSuccess: (response) => {
        setGoogleToken(response.access_token);
        console.log(response);
        // addToCal(response);
      },
      flow: "implicit",
      scope,
    });

    function addToCal() {
      console.log("adding to calendar");
      console.log(googleToken);
      axios
        .post(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events/",
          event,
          {
            headers: { Authorization: `Bearer ${googleToken}` },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }

    return (
      <div className="form=box">
        <div className="container">
          <h2>Add To Google Calendar</h2>
          <label>Summary: </label>
          <form>
            <input
              name="summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              className="form-control"
              type="text"
            />
          </form>
          <label>Location: </label>
          <form>
            <input
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="form-control"
              type="text"
            />
          </form>
          <label>Description: </label>
          <form>
            <input
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="form-control"
              type="text"
            />
          </form>
          <label>Start Date & Time: </label>
          <form>
            <input
              name="startDate"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="form-control"
              type="text"
            />
          </form>
          <label>End Date & Time: </label>
          <form>
            <input
              name="endDate"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="form-control"
              type="text"
            />
          </form>
          <label>Attendees: </label>
          <form>
            <input
              name="attendees"
              value={attendees}
              onChange={(event) => setAttendees(event.target.value)}
              className="form-control"
              type="text"
            />
          </form>
          <button onClick={() => login()}>Google Authorization </button>
          {/* FOR TESTING */}
          <button onClick={addToCal}>Add to calendar</button>
        </div>
      </div>
    );
  }
  return (
    <GoogleOAuthProvider clientId="">
      <Button />
    </GoogleOAuthProvider>
  );
}
