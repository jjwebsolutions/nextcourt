import UserSessions from "~/components/UserSessions";
import { useSession } from "next-auth/react";

// Display Profile page
export default function Profil() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <p className=" flex justify-center text-4xl">Access Denied</p>;
  }
  return (
    <>
      <p className="my-8 mt-20 flex justify-center text-3xl font-medium text-darkest">
        Profile
      </p>
      <div className="  flex justify-center">
        <p>List of your sessions programmed</p>
      </div>
      <div className=" mt-10  flex justify-center">
        <UserSessions />
      </div>
    </>
  );
}
