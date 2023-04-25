import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu } from "@headlessui/react";
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
        <Menu>
          <header>
            <nav className=" mb-5 flex items-center justify-between p-4">
              <Link href="/" className="text-4xl  font-black text-darkest">
                Tennis Court
              </Link>

              <Menu.Button>
                <button className="text-teal-200 border-teal-400 flex items-center rounded border px-3 py-2 hover:border-white hover:text-white sm:hidden">
                  <svg
                    className="h-3 w-3 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </Menu.Button>

              <ul className="hidden sm:flex">
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
            <Menu.Items>
              <ul className="flex flex-col items-center sm:hidden ">
                <Menu.Item>
                  <li className="mr-4 p-2">
                    <Link href="/reserve" className="p-3">
                      Sessions
                    </Link>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="mr-4  p-2">
                    <Link href="/profile" className=" p-3">
                      Profile
                    </Link>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="mr-4 p-2">
                    <button className="" onClick={() => void handleSignOut()}>
                      Sign out
                    </button>
                  </li>
                </Menu.Item>
              </ul>
            </Menu.Items>
          </header>
        </Menu>
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
