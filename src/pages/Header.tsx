import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  async function handleSignOut() {
    await signOut();
  }
  async function handleSignIn() {
    await signIn();
  }
  if (session) {
    return (
      <>
        <nav className=" mb-5 items-center justify-between p-4 sm:flex">
          <Link href="/" className="text-4xl  font-black text-darkest">
            Tennis Court
          </Link>
          <ul className="sm:flex">
            <li className="mr-4 pt-2">
              <Link href="/reserve" className="btn p-3">
                Sessions
              </Link>
            </li>
            <li className="mr-4  pt-2">
              <Link href="/profile" className="btn p-3">
                Profile
              </Link>
            </li>
            <li className="mr-4">
              <button className="btn" onClick={() => void handleSignOut()}>
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
  return (
    <>
      <nav className=" mb-5 items-center justify-between p-4 sm:flex">
        <Link href="/" className="text-4xl  font-black text-darkest">
          Tennis Court
        </Link>
        Not signed in <br />
        <button className="btn" onClick={() => void handleSignIn()}>
          Sign in
        </button>
      </nav>
    </>
  );
}
