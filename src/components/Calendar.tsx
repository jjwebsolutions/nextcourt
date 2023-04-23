import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { api } from "~/utils/api";
import Sessions from "./Sessions";

interface SessionData {
  date: string;
  slots: {
    slot: string;
    available: boolean;
  }[];
}

// Display the calendar
function ReserveCalendar(): JSX.Element {
  const [date, onChange] = useState<Date | number>(new Date());
  const [dataSession, setDataSession] = useState<SessionData>({
    date: "",
    slots: [],
  });
  const [dateFormat, setDateFormat] = useState<string>("");

  const [slots, setSlots] = useState([]);

  api.day.getSlots.useQuery({ dateFormat: dateFormat }, {
    onSuccess: (data) => {
      setSlots(data);
    },
    queryKey: [dateFormat] as [string],
  } as {
    onSuccess: (data: []) => void;
  });

  useEffect(() => {
    setDateFormat(format(date, "yyyy-MM-dd"));
  }, [date]);

  const handleDay = () => {
    if (slots.length > 1) {
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
          </div>

          <Sessions dataSessions={dataSession} />
        </div>
      </div>
    </>
  );
}

export default ReserveCalendar;
