import { api } from "src/utils/api";
import { useState, useEffect } from "react";
import AllSessions from "~/components/AllSessions";
import { useSession } from "next-auth/react";
// Display Profile page
export default function Admin() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  // Display user sessions
  return (
    <>
      <>
        <p className="my-8 mt-20 flex justify-center text-3xl font-medium text-darkest">
          Admin
        </p>
        <div className="  flex justify-center">
          <p>List of sessions programmed</p>
        </div>
        <div className="  flex justify-center">
          <AllSessions />
        </div>
      </>
    </>
  );
}
