import { type NextPage } from "next";
import Image from "next/image";
import tennis_court_W from "../assets/tennis_court_W.webp";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <div className=" space-x-10 xl:ml-5 xl:flex">
          <div className="p-10 xl:p-1 ">
            <p className="mt-5 text-center text-5xl font-bold text-darkest sm:mt-16 sm:text-6xl">
              Welcome to our tennis court reservation website!
            </p>
            <p className="mt-16 text-center text-3xl font-medium  sm:text-5xl">
              Easy and fast way to book your next tennis game.
            </p>
            <p className="mt-28 text-center text-4xl font-medium sm:mt-16">
              Occasional player or a passionate competitor, we have the perfect
              court to meet your needs.
            </p>
          </div>
          <Image
            className="invisible max-w-[60%] xl:visible"
            src={tennis_court_W}
            alt="tennis court photo"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
