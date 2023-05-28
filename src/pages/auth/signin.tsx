import React from "react";
import Link from "next/link";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    const email = target.email.value;
    const password = target.password.value;

    // next-auth signIn function
    signIn("credentials", {
      callbackUrl: "/",
      redirect: false,
      email: email,
      password: password,
    })
      .then((error) => {
        if (error) {
          console.log(error.status);
          if (error.status == 401) {
            toast.warn("Please check your email and password", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            console.log(error.status);
          }
          if (error.status == 200) {
            window.location.replace("/");
          }
        } else {
          toast.warn("Internal error", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
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

          <label
            className="mb-2 mt-5 block text-sm font-bold text-darkest"
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

          <div className="mt-3 flex items-center justify-between">
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
