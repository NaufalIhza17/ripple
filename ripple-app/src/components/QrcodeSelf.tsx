"use client";

import React, { useState, useEffect } from "react";
import SelfQRcodeWrapper, { SelfAppBuilder } from "@selfxyz/qrcode";
import { v4 as uuidv4 } from "uuid";

function QRCodeSelf() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a user ID when the component mounts
    setUserId(uuidv4());
  }, []);

  if (!userId) return null;

  // Create the SelfApp configuration
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
          // Handle successful verification
          console.log("Verification successful!");
          // Redirect or update UI
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
