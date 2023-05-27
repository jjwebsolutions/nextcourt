import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Type interfaces
type Data = {
  date: string;
  slots: {
    slot: string;
    available: boolean;
  }[];
};
type OrderData = {
  date: string;
  slots: string[];
  username: string;
};

function Sessions({ dataSessions }: { dataSessions: Data }) {
  const [loading, setLoading] = useState<boolean>(true);
  // data: day clicked by user and sessions available for this day
  const [data, setData] = useState<Data>(dataSessions);
  // State that store what sessions are checked
  const [checkedSessions, setCheckedSessions] = useState<string[]>([]);
  // Mutation to post order
  const mutation = api.order.postOrder.useMutation();

  // Fetch user infos from Session
  const getUser = async () => {
    const session = await getSession();
    if (!session) {
      redirect("/");
    }
    return session.user.name;
  };

  // Handle click on button
  const handleClick = async () => {
    if (checkedSessions.length == 0) {
      toast.warn("No session selected", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      if (checkedSessions.length > 1) {
        toast.warn("Please select only one session", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        await handlePost();
      }
    }
  };

  // Get data from day clicked and checked sessions and update data state with new infos
  const handlePost = async () => {
    // Get user infos
    const user: string | undefined | null = await getUser(); // TYPESCRIPT ERROR HERE

    if (user) {
      if (checkedSessions) {
        // Update the sessions available for the day in data
        if (data) {
          checkedSessions.forEach((element: string) => {
            data.slots.forEach((slot: { slot: string; available: boolean }) => {
              if (slot.slot === element) {
                slot.available = false;
              }
            });
          });

          // Post order and update day sessions data in db

          const orderData = {
            username: user,
            dateFormat: data.date,
            slots: data.slots,
            slotsOrder: checkedSessions,
          };
          if (orderData) {
            mutation.mutate(orderData);
            toast.success("Thanks for your order" + user + " " + "!", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: false,
            });

            window.location.replace("/profile");
          }
        }

        // Response
      }
    }
  };

  // Handle change when user check or uncheck a sessions and store in checkedSessions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedSessions((pre: string[]) => [...pre, value]);
    } else {
      setCheckedSessions((pre: string[]) => {
        return [...pre.filter((slot) => slot !== value)];
      });
    }
  };

  // Store the data from the day picked in Calendar in state data (will update when user click on another day)
  useEffect(() => {
    console.log("hey");

    setData(dataSessions);
    setLoading(true);
  }, [dataSessions]);
  useEffect(() => {
    setLoading(false);
  }, [data]);

  // Display sessions available for the day clicked by user on Calendar
  return (
    <>
      <div className="bg-white   ">
        <div className="flex  justify-center">
          <ul className=" columns-2  text-xl font-medium text-darkest">
            {loading ? (
              <LoadingSpinner />
            ) : (
              // Check if each session is available or not
              data.slots.map(
                (session: { slot: string; available: boolean }, i: number) => {
                  return (
                    <li className="flex     p-2 shadow" key={i}>
                      {session.available === true ? (
                        <>
                          <div className="mr-2">{session.slot}</div>
                          <input
                            className="checkbox"
                            value={session.slot}
                            onChange={handleChange}
                            type="checkbox"
                          />
                        </>
                      ) : (
                        <>
                          <div className="mr-2 min-w-full bg-darkest">
                            {session.slot}
                          </div>
                        </>
                      )}
                    </li>
                  );
                }
              )
            )}
          </ul>
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => void handleClick()} className="btn text">
            Reserve
          </button>
        </div>
      </div>
    </>
  );
}

export default Sessions;
