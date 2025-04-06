"use client";

import React, { useState, useEffect } from "react";
import SelfQRcodeWrapper, { SelfAppBuilder } from "@selfxyz/qrcode";
import { v4 as uuidv4 } from "uuid";

interface QRCodeSelfProps {
  onSuccess: (isVerified: boolean) => void; // Add onSuccess prop
}

function QRCodeSelf({ onSuccess }: QRCodeSelfProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  if (!userId) return null;

  const selfApp = new SelfAppBuilder({
    appName: "ripple",
    scope: "ripple-scope",
    endpoint: `https://f479-111-235-226-130.ngrok-free.app/api/verify`,
    userId,
  }).build();

  return (
    <div className="verification-container">
      <SelfQRcodeWrapper
        selfApp={selfApp}
        onSuccess={() => {
          console.log("Verification successful!");
          onSuccess(true);
        }}
        size={300}
      />

      <p className="text-sm text-gray-500">
        User ID: {userId.substring(0, 8)}...
      </p>
    </div>
  );
}

export default QRCodeSelf;
