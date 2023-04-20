"use client";

import { useState, useEffect } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
// env variables
const API = process.env.REACT_APP_API;

function Sessions({ dataSessions }: { dataSessions: Object }) {
  // data: day clicked by user and sessions available for this day
  const [data, setData] = useState([] as any);
  // State that store what sessions are checked
  const [checkedSessions, setCheckedSessions] = useState([] as any);

  // Get data from day clicked and checked sessions and update data state with new infos
  const handleClick = async (req: NextApiRequest, res: NextApiResponse) => {
    // Get data from the user
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    // Get user infos
    const user = session.user;

    const dataUpdate = data;
    if (checkedSessions) {
      // Update the sessions available for the day in data
      checkedSessions.forEach((element) => {
        dataUpdate.slots.forEach(
          (slot: { slot: string; available: boolean }) => {
            if (slot.slot === element) {
              slot.available = false;
            }
          }
        );
      });
      // Post order and update day sessions data in db
      const response = await fetch(API + "/order", {
        method: "POST",
        headers: {
          authorization: "Bearer" + " " + "token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          session: checkedSessions,
          dateFormat: data.date,
          slots: dataUpdate.slots,
        }),
      });
      // Response
      const res = await response.json();
      if (res) {
        alert("Thanks for your reservation" + " " + user.name);
        redirect("/profile");
      } else {
        alert("noo");
      }
    }
  };

  // Handle change when user check or uncheck a sessions and store in checkedSessions
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedSessions((pre) => [...pre, value]);
    } else {
      setCheckedSessions((pre) => {
        return [...pre.filter((slot) => slot !== value)];
      });
    }
  };

  // Store the data from the day picked in Calendar in state data (will update when user click on another day)
  useEffect(() => {
    setData(dataSessions);
  }, [dataSessions]);

  // Display sessions available for the day clicked by user on Calendar
  return (
    <>
      <div className="bg-white   ">
        <div className="mb-10 text-2xl font-bold text-darkest">
          Sessions available for this day
        </div>
        <div>
          <ul className=" columns-2  text-xl font-medium text-darkest">
            {data.length < 2 ? (
              <>
                <li className=" flex ">a available</li>
                <li className=" flex ">b available</li>
                <li className=" flex">c available</li>
                <li className=" flex ">d available</li>
                <li className=" flex ">e available</li>
                <li className=" flex ">ff available</li>
                <li className=" flex">g available</li>
                <li className=" flex ">h available</li>
              </>
            ) : (
              // Check if each session is available or not
              data.slots.map((session, i) => {
                return (
                  <li className=" m-1 flex p-1 shadow" key={i}>
                    <div className="mr-2">{session.slot}</div>
                    {session.available === true ? (
                      <>
                        <p className="mr-5">Available</p>
                        <input
                          value={session.slot}
                          onChange={handleChange}
                          type="checkbox"
                        />
                      </>
                    ) : (
                      <>
                        <p>Taken</p>
                      </>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className="mt-10 text-center">
          <button onClick={handleClick} className="btn text">
            Reserve
          </button>
        </div>
      </div>
    </>
  );
}

export default Sessions;
