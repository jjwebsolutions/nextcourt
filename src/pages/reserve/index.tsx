import Calendar from "../../components/Calendar";
import { useSession } from "next-auth/react";
// Display reserve page
export default function Reserve() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <>
      <div>
        <p className="mb-14 text-center text-3xl font-bold text-darkest">
          Use this app to book a session or directly call us with the number
          below
        </p>
        <div className="flex   justify-center space-x-24 ">
          <Calendar />
        </div>
        <div className="mt-24 flex justify-center text-3xl font-bold text-darkest">
          Call us: XXX-XXX-XXX
        </div>
      </div>
    </>
  );
}
