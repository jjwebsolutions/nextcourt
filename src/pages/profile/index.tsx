import UserSessions from "~/components/UserSessions";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

// Display Profile page
export default function Profil() {
  const { data: session, status } = useSession();
  const name = session?.user.name;

  if (status === "unauthenticated") {
    return <p className=" flex justify-center text-4xl">Access Denied</p>;
  }
  return (
    <>
      <p className="my-8 mt-20 flex justify-center text-3xl font-medium text-darkest">
        Hey {name}
      </p>
      <div className="  flex justify-center text-center">
        <p className="text-xl">Here are the sessions you have scheduled</p>
      </div>
      <div className=" mt-10  flex justify-center">
        <Suspense fallback={<p>loading</p>}>
          <UserSessions />
        </Suspense>
      </div>
    </>
  );
}
