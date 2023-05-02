import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { redirect } from "next/navigation";
// Display the form register
const FormRegister = () => {
  const router = useRouter();
  const mutationCreateUser = api.authUser.createUser.useMutation();
  // Post infos of users for registration
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: { value: string };
      username: { value: string };
    };
    const dataUser = {
      email: target.email.value,
      name: target.name.value,
      username: target.username.value,
      password: target.password.value,
    };

    try {
      await mutationCreateUser.mutateAsync(dataUser);
      window.location.replace("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Display register form
    <div className="flex justify-center sm:mt-20">
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline text-gray-700 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="example@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="focus:shadow-outline text-gray-700 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="Johnny"
            />
          </div>
          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="focus:shadow-outline text-gray-700 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline border-red-500 text-gray-700 mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button className="btn" type="submit">
              Sign Up
            </button>
            <Link
              className="inline-block align-baseline text-sm font-bold text-darkest hover:text-light"
              href="/auth/signin"
            >
              Already registered ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
