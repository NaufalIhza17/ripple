"use client"

export default function ConnectPage() {
  return (
    <div className="bg-white rounded p-6">
      <div className="text-2xl">Connect</div>
      <div className="pt-4 flex flex-col gap-4">
        <div className="flex gap-2 w-full justify-between items-center">
          <div className="px-2 rounded-full border">1</div>
          <div className="flex-1 border-t border-dashed"></div>
          <div className="px-2 rounded-full border">2</div>
        </div>
        {/* First step is ConnectSelf */}
        <ConnectSelf />
        {/* If ConnectSelf is done then user can go through the ConnectWallet */}
      </div>
    </div>
  );
}

import QRCodeSelf from "@/components/QrcodeSelf";

function ConnectSelf() {
  return (
    <div className="">
      <QRCodeSelf />
    </div>
  );
}

function ConnectWallet() {
  return (
    <div>
      <p>wallet</p>
    </div>
  );
}
