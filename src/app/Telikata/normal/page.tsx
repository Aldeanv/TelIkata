"use client"

import dynamic from "next/dynamic";

const NormalClient = dynamic(() => import("./NormalClient"), {
  ssr: false,
});

export default function Page() {
  return <NormalClient />;
}
