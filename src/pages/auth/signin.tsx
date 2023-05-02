import React from "react";
import Link from "next/link";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Post infos of users for login
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    signIn("credentials", {
      callbackUrl: "/",
      redirect: true,
      email: email,
      password: password,
    })
      .then((error) => console.log(error))
      .catch((error) => console.log(error));
  };
  return (
    // Display login Form
    <div className="flex justify-center sm:mt-20">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-darkest"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-darkest shadow focus:outline-none"
              id="email"
              type="text"
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-darkest"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline border-red-500 mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-darkest shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button className="btn">Sign In</button>
            <Link
              className="inline-block align-baseline text-sm font-bold text-darkest hover:text-light"
              href="/auth/signup"
            >
              Not registered yet ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
