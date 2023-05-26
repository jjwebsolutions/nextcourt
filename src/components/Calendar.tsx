import React, { Suspense, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { api } from "~/utils/api";
import Sessions from "./Sessions";
import LoadingSpinner from "./LoadingSpinner";
type SessionData = {
  date: string;
  slots: {
    slot: string;
    available: boolean;
  }[];
};

// Display the calendar
function ReserveCalendar(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [date, onChange] = useState<Date | number>(new Date());
  const [dateFormat, setDateFormat] = useState<string>("");
  const [slots, setSlots] = useState([]);
  const [dataSession, setDataSession] = useState<SessionData>({
    date: "",
    slots: [],
  });

  // Request new data everytimes dateFormat change
  api.day.getSlots.useQuery({ dateFormat: dateFormat }, {
    onSuccess: (data) => {
      setSlots(data);
      setLoading(false);
    },
    queryKey: [dateFormat] as [string],
  } as {
    onSuccess: (data: []) => void;
  });

  useEffect(() => {
    setLoading(true);
    setDateFormat(format(date, "yyyy-MM-dd"));
  }, [date]);

  const handleDay = () => {
    if (slots.length > 1) {
      setDataSession({ date: dateFormat, slots: slots });
    } else {
      setDataSession({
        date: dateFormat,
        slots: [
          { slot: "08h00", available: true },
          { slot: "09h30", available: true },
          { slot: "10h00", available: true },
          { slot: "11h30", available: true },
          { slot: "13h00", available: true },
          { slot: "14h30", available: true },
          { slot: "16h00", available: true },
          { slot: "17h30", available: true },
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
    <div className="bg-white p-2 shadow-md md:p-5  lg:p-10">
      <p className="mb-10 rounded bg-white pt-5 text-center text-3xl font-bold text-darkest">
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
        <div className="mb-10 mt-10 h-72 text-2xl font-bold text-darkest sm:mt-0">
          <p className="mb-7"> Sessions available for this day </p>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Sessions dataSessions={dataSession} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReserveCalendar;
