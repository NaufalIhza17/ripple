"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-5xl italic font-bold text-white">Ripple.</h1>
      <div className="bg-white rounded p-6">
        <div className="text-2xl">Connect your account now!</div>
        <p>Start to help people and earn money 🤑</p>
        <div className="pt-4 flex flex-col gap-4">
          <div className="flex gap-2 w-full justify-between items-center">
            <button className="welcome-button" onClick={() => router.push('/connect')}>Connect Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
