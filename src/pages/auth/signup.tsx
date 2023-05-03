import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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

    // Data of user for registration
    const dataUser = {
      email: target.email.value,
      name: target.name.value,
      username: target.username.value,
      password: target.password.value,
    };

    try {
      //Post data of user for registration
      await mutationCreateUser.mutateAsync(dataUser);
      alert("Welcome to Tennis Court !");
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
          <label
            className="text-gray-700 mb-2 mt-4  block text-sm font-bold"
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
          <label
            className="text-gray-700 mb-2 mt-4 block text-sm font-bold"
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
          <label
            className="text-gray-700 mb-2 mt-4 block text-sm  font-bold"
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

          <div className="mt-5 flex items-center justify-between">
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
