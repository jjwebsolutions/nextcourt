import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import Head from "next/head";
export default function Header() {
  const { data: session } = useSession();

  async function handleSignOut() {
    await signOut();
  }
  async function handleSignIn() {
    await signIn();
  }
  if (session) {
    if (session.role === "ADMIN") {
      return (
        <>
          <Head>
            <link
              rel="icon"
              href="https://cdn-icons-png.flaticon.com/512/5147/5147762.png"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Reserve your tennis court" />

            <title>Tennis Court</title>
          </Head>
          <Popover className="relative">
            <header>
              <nav className=" mb-5 flex items-center justify-between p-4">
                <Link href="/" className="text-4xl  font-black text-darkest">
                  Tennis Court
                </Link>

                <Popover.Button>
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
                </Popover.Button>

                <ul className="hidden sm:flex">
                  <li className="mr-4 pt-2 ">
                    <Link href="/admin" className="btn p-3  ">
                      Admin
                    </Link>
                  </li>
                  <li className="mr-4 pt-2 ">
                    <Link href="/reserve" className="btn p-3 ">
                      Sessions
                    </Link>
                  </li>
                  <li className="mr-4  pt-2">
                    <Link href="/profile" className="btn p-3">
                      Profile
                    </Link>
                  </li>
                  <li className="mr-4">
                    <button
                      className="btn"
                      onClick={() => void handleSignOut()}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </nav>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel>
                  <ul className="flex flex-col items-center sm:hidden ">
                    <li className="mr-4 p-2">
                      <Link
                        href="/reserve"
                        className="p-3 text-xl  font-bold text-darkest"
                      >
                        Sessions
                      </Link>
                    </li>

                    <li className="mr-4  p-2">
                      <Link
                        href="/profile"
                        className="p-3 text-xl font-bold  text-darkest"
                      >
                        Profile
                      </Link>
                    </li>

                    <li className="mr-4 p-3 text-xl font-bold text-darkest">
                      <button className="" onClick={() => void handleSignOut()}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </Popover.Panel>
              </Transition>
            </header>
          </Popover>
        </>
      );
    }

    return (
      <>
        <Head>
          <link
            rel="icon"
            href="https://cdn-icons-png.flaticon.com/512/5147/5147762.png"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Reserve your tennis court" />

          <title>Tennis Court</title>
        </Head>
        <Popover className="relative">
          <header>
            <nav className=" mb-5 flex items-center justify-between p-4">
              <Link href="/" className="text-4xl  font-black text-darkest">
                Tennis Court
              </Link>

              <Popover.Button>
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
              </Popover.Button>

              <ul className="hidden sm:flex">
                <li className="mr-4 pt-2 ">
                  <Link href="/reserve" className="btn p-3 ">
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
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel>
                <ul className="flex flex-col items-center sm:hidden ">
                  <li className="mr-4 p-2">
                    <Link
                      href="/reserve"
                      className="p-3 text-xl  font-bold text-darkest"
                    >
                      Sessions
                    </Link>
                  </li>

                  <li className="mr-4  p-2">
                    <Link
                      href="/profile"
                      className="p-3 text-xl font-bold  text-darkest"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="mr-4 p-3 text-xl font-bold text-darkest">
                    <button className="" onClick={() => void handleSignOut()}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </Popover.Panel>
            </Transition>
          </header>
        </Popover>
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
