import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export function Scheduler() {
  const events = [];
  const locales = {
    "en-US": enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  // const handleIndexEvents = (params) => {
  //   axios.get("http://localhost:3000/events.json", params).then((response) => {
  //     setAllEvents([...allEvents, response.data]);
  //   });
  // };

  // useEffect(() => {
  //   axios.get("http://localhost:3000/events.json").then((response) => {
  //     setAllEvents(response.data);
  //   });
  // }, []);

  const handleIndexEvent = () => {
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setAllEvents(response.data);
      // setAllEvents([
      //   {
      //     title: "Big Meeting",
      //     allDay: true,
      //     start: new Date(2023, 3, 5),
      //     end: new Date(2023, 3, 10),
      //   },
      //   {
      //     title: "Vacation",
      //     start: new Date(2023, 2, 7),
      //     end: new Date(2023, 2, 10),
      //   },
      //   {
      //     title: "Conference",
      //     start: new Date(2023, 2, 20),
      //     end: new Date(2023, 2, 23),
      //   },
      // ]);
      console.log(allEvents);
    });
  };

  useEffect(handleIndexEvent, []);

  function handleAddEvent(event) {
    event.preventDefault();
    console.log(allEvents);
    console.log(event.target);
    const params = new FormData(event.target);
    console.log("hello");
    axios.post("http://localhost:3000/events.json", params).then((response) => {
      setAllEvents([
        ...allEvents,
        ...(Array.isArray(response.data) ? response.data : []),
      ]);

      console.log(response.data);
      console.log("test");
    });
  }

  return (
    <div className="calendar">
      <center>
        <h2>Calendar</h2>
        <h3>Add New Event</h3>
      </center>
      <div>
        <form onSubmit={handleAddEvent}>
          <center>
            <input
              name="title"
              type="text"
              placeholder="Add Title"
              style={{ width: "20%", marginRight: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <DatePicker
              name="start_date"
              placeholderText="Start Date"
              style={{ marginRight: "10px" }}
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
            <DatePicker
              name="end_date"
              placeholderText="End Date"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />

            <button style={{ marginTop: "10px" }}>Add Event</button>
          </center>
        </form>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}
