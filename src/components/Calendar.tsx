"use client";
import { QueryFunctionContext } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import CalendarProps from "react-calendar";
import Sessions from "../components/Sessions";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import use from "react";
import { format } from "date-fns";
const API = process.env.NEXTAUTH_URL;
import { api } from "~/utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// Create a function to get the slots for the day clicked by user with prisma query and return the data

// Display the calendar
function ReserveCalendar(): JSX.Element {
  const [date, onChange] = useState<Date | number>(new Date());
  const [dataSession, setDataSession] = useState([] as any);
  const [dateFormat, setDateFormat] = useState<string>("");

  const [slots, setSlots] = useState([] as any);

  console.log(dateFormat);

  api.day.getSlots.useQuery({ dateFormat: dateFormat }, {
    onSuccess: (data) => {
      setSlots(data);
    },
    queryKey: [dateFormat] as [string],
  } as {
    onSuccess: (data: any) => void;
  });
  useEffect(() => {
    console.log(dataSession);
  }, [dataSession]);

  useEffect(() => {
    setDateFormat(format(date, "yyyy-MM-dd"));
  }, [date]);

  const handleDay = async () => {
    if (slots.length > 1) {
      console.log(slots);
      setDataSession({ date: dateFormat, slots: slots });
    } else {
      setDataSession({
        date: dateFormat,
        slots: [
          { slot: "a", available: true },
          { slot: "b", available: true },
          { slot: "c", available: true },
          { slot: "d", available: true },
          { slot: "e", available: true },
          { slot: "f", available: true },
          { slot: "g", available: true },
          { slot: "h", available: true },
        ],
      });
    }
  };

  // Update the state with data from the day clicked when date change
  useEffect(() => {
    handleDay();
  }, [slots]);

  //    <Sessions dataSessions={dataSession} />
  return (
    <>
      <div className="bg-white p-2 shadow-md md:p-5 lg:p-10 ">
        <p className="mb-10 rounded bg-white pt-5 text-center text-2xl font-bold text-darkest">
          Pick a day you want to play
        </p>
        <div className="lg:flex lg:justify-center lg:space-x-24">
          <div>
            <Calendar
              locale="en-GB"
              minDate={new Date()}
              onChange={(value) => {
                if (typeof value === "number" || value instanceof Date) {
                  onChange(value);
                  return value;
                }
              }}
            />
            <p>Selected date: {date.toString()}</p>
          </div>

          <h1>Sessions componant with dataSessions</h1>
        </div>
      </div>
    </>
  );
}

export default ReserveCalendar;
