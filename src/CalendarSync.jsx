import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Calendar, EventInput } from "./google-calendar-api";

const SyncCalendars = () => {
  const [accessToken, setAccessToken] = useState("");
  const [calendars, setCalendars] = useState([]);
  const [firstCalendarEvents, setFirstCalendarEvents] = useState([]);
  const [googleCalendarEvents, setGoogleCalendarEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;

      // Get the user's Google Calendars
      const calendar = new Calendar(accessToken);
      const userCalendars = await calendar.getCalendars();
      setCalendars(userCalendars);

      // Get events from the first calendar
      const firstCalendar = userCalendars[0];
      const events = await calendar.getEvents(firstCalendar.id);
      setFirstCalendarEvents(events);

      // Get events from the user's primary Google Calendar
      const googleEvents = await calendar.getEvents("primary");
      setGoogleCalendarEvents(googleEvents);

      // Compare the events and add, update, or delete as necessary to keep both calendars in sync
      const eventsToAdd = [];
      const eventsToUpdate = [];
      const eventsToDelete = [];
      for (const firstCalendarEvent of firstCalendarEvents) {
        const googleCalendarEvent = googleCalendarEvents.find(
          (event) => event.id === firstCalendarEvent.id
        );
        if (!googleCalendarEvent) {
          eventsToAdd.push(firstCalendarEvent);
        } else if (
          googleCalendarEvent.updated !== firstCalendarEvent.updated
        ) {
          eventsToUpdate.push({
            ...googleCalendarEvent,
            ...firstCalendarEvent,
          });
        }
      }
      for (const googleCalendarEvent of googleCalendarEvents) {
        const firstCalendarEvent = firstCalendarEvents.find(
          (event) => event.id === googleCalendarEvent.id
        );
        if (!firstCalendarEvent) {
          eventsToDelete.push(googleCalendarEvent);
        }
      }

      for (const eventToAdd of eventsToAdd) {
        await calendar.addEvent("primary", {
          summary: eventToAdd.summary,
          start: eventToAdd.start,
          end: eventToAdd.end,
        });
      }
      for (const eventToUpdate of eventsToUpdate) {
        await calendar.updateEvent("primary", eventToUpdate.id, {
          summary: eventToUpdate.summary,
          start: eventToUpdate.start,
          end: eventToUpdate.end,
        });
      }
      for (const eventToDelete of eventsToDelete) {
        await calendar.deleteEvent("primary", eventToDelete.id);
      }
    };

    fetchData();
  }, [accessToken, firstCalendarEvents, googleCalendarEvents]);

  const onSuccess = (
