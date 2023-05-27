import { useState, useEffect, Suspense } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSessions = () => {
  // Type interfaces
  type Session = {
    id: string;
    date: string;
    slots: string[];
  };
  // data with user's session infos
  const { data: session, status } = useSession();
  // Data with sessions that user programmed
  const [userSession, setUserSession] = useState<Session[]>([]);
  // State that store what session is clicked to delete
  const [sessionToDelete, setSessionToDelete] = useState<Session>({
    id: "",
    date: "",
    slots: [],
  });
  // Trigger to update day sessions
  const [trigger, setTrigger] = useState<boolean>(false);
  // Username
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Mutation to delete order
  const mutationDeleteOrder = api.order.deleteOrder.useMutation();
  // Mutation to update day
  const mutationUpdateDay = api.day.updateDay.useMutation();

  useEffect(() => {
    if (session && session.user.name) {
      setUsername(session.user.name);
    }
  });

  // Fetch orders from user
  api.order.getOrdersByUsername.useQuery({ username: username }, {
    onSuccess: (data) => {
      setUserSession(data);
      setLoading(false);
    },
    queryKey: [userSession],
  } as {
    onSuccess: (data: []) => void;
  });

  // Fetch slots from day to update and on success update day sessions in db and delete order
  api.day.getSlots.useQuery({ dateFormat: sessionToDelete.date }, {
    enabled: trigger,
    onSuccess: (data: { slot: string; available: boolean }[]) => {
      // Update slots available for the day
      sessionToDelete.slots.forEach((element) => {
        data.forEach((slotToUpdate) => {
          if (slotToUpdate.slot === element) {
            slotToUpdate.available = true;
          }
        });
        const dataUpdated = {
          dateFormat: sessionToDelete.date,
          slots: data,
        };
        mutationUpdateDay.mutate(dataUpdated);
      });

      // Delete order
      if (sessionToDelete) {
        const orderId = sessionToDelete.id;

        if (orderId) {
          mutationDeleteOrder.mutate({ orderId });
          const newListOrder = userSession.filter(
            (item) => item.id !== orderId
          );

          setUserSession(newListOrder);
          toast.success("Session deleted", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      }

      setTrigger(false);
    },
    queryKey: [trigger],
  } as {
    onSuccess: (data: []) => void;
  });
  // Handle Cancel button
  const handleDeleteSession = (session: Session, i: number) => {
    if (session) {
      setSessionToDelete(session);
      setTrigger(true);
    }
  };

  if (loading == true) {
    return <LoadingSpinner />;
  }

  if (userSession.length == 0) {
    return (
      <>
        <div className="flex w-4/12 flex-col bg-white p-4 text-center shadow">
          <p>No sessions</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col bg-white p-4 shadow">
          <div className="flex w-7/12 justify-between p-1 ">
            <p>Date</p>
            <p>Time</p>
          </div>

          {userSession.map((session: Session, i: number) => {
            return (
              <li className="mt-2 flex list-none" key={i}>
                <div className="mr-5 mt-2 ">{session.date}</div>
                <div className="mr-5 mt-2 ">{session.slots}</div>
                <button
                  onClick={() => void handleDeleteSession(session, i)}
                  className="btn"
                >
                  Cancel
                </button>
              </li>
            );
          })}
        </div>
      </>
    );
  }
  // Display user sessions
};

export default UserSessions;
