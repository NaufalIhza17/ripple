"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProgressIndicator({
  isSelfVerified,
}: {
  isSelfVerified: boolean;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isSelfVerified) {
      // Animate progress from 0 to 100% over 0.5 seconds
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isSelfVerified]);

  return (
    <div className="flex gap-2 w-full justify-between items-center">
      {/* First circle - turns green immediately */}
      <motion.div
        className={`px-2 rounded-full border ${
          isSelfVerified ? "bg-green-500 text-white" : "bg-black text-white"
        }`}
        initial={false}
        animate={{
          backgroundColor: isSelfVerified ? "#10B981" : "#000000",
        }}
        transition={{ duration: 0.3 }}
      >
        1
      </motion.div>

      {/* Animated dashed line */}
      <div className="flex-1 relative h-1">
        {/* Static dashed line */}
        <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-300"></div>
        {/* Progress bar that grows */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </div>

      {/* Second circle - turns green when progress completes */}
      <motion.div
        className={`px-2 rounded-full border ${
          progress === 100 ? "bg-green-500 text-white" : "bg-black text-white"
        }`}
        initial={false}
        animate={{
          backgroundColor: progress === 100 ? "#10B981" : "#000000",
        }}
        transition={{ duration: 0.3, delay: progress === 100 ? 0.2 : 0 }}
      >
        2
      </motion.div>
    </div>
  );
}
