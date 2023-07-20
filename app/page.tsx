"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-5 lg:gap-14 w-full p-3 lg:p-24">
      <div className="rounded-2xl bg-gradient-to-b from-gray-500 to-gray-700 overflow-hidden">
        <img
          src="https://source.unsplash.com/500x500?dry-cleaning,laundry"
          alt="hero pic"
          className="object-cover w-full h-full mix-blend-overlay "
        />
      </div>
      <div className="rounded-2xl bg-slate-50 shadow-sm flex flex-col p-7 lg:p-20 justify-center items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Welcome</h1>
          <h2 className="font-mono text-xl lg:text-2xl font-bold my-2">
            Revive Your Home with our Professional Steam Cleaning Service
          </h2>
          <p className="text-sm lg:text-md">
            Experience the Power of Steam: Say Goodbye to Dirt, Germs, and
            Stains!
          </p>
          <div className="mt-6 lg:mt-14">
            <p className="text-xs mb-4">
              Give us your location to pick up your laundry
            </p>

            <Link href="/get-started" className="bg-slate-300 p-3 rounded-md">
              Get Started
            </Link>

            {/* <DialogDemo /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
