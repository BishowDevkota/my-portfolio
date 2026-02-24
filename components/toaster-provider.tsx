"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid #333",
        },
      }}
    />
  );
}
