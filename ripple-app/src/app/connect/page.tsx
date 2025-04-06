"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import QRCodeSelf from "@/components/QrcodeSelf";
import ProgressIndicator from "@/components/ProgressIndicator";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default function ConnectPage() {
  const [isSelfVerified, setIsSelfVerified] = useState(false);
  const [isManualToggle, setIsManualToggle] = useState(false);

  const handleSelfVerificationSuccess = (isVerified: boolean) => {
    setIsSelfVerified(isVerified);
  };

  const toggleVerification = () => {
    setIsSelfVerified((prev) => !prev);
  };

  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/home");
    }
  }, [isConnected]);

  return (
    <div className="bg-white rounded p-6 min-w-[400px] min-h-[500px]">
      <div className="flex justify-between items-center">
        <div className="text-2xl">Connect</div>
        {/* Manual toggle button */}
        <button
          onClick={toggleVerification}
          className="px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors"
        >
          {isSelfVerified ? "Show QR Code" : "Show Connect"}
        </button>
      </div>

      <div className="pt-4 flex flex-col gap-4">
        <ProgressIndicator isSelfVerified={isSelfVerified} />

        <div className="h-full w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {!isSelfVerified ? (
              <motion.div
                key="qrcode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QRCodeSelf
                  onSuccess={
                    isManualToggle ? () => {} : handleSelfVerificationSuccess
                  }
                />
              </motion.div>
            ) : (
              <motion.div
                key="connectButton"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center"
              >
                {/* <ConnectButton label="Connect Wallet" /> */}
                <button
                  onClick={openConnectModal}
                  className="px-4 py-2"
                >
                  Connect Wallet
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
