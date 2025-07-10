"use client"

import dynamic from "next/dynamic";

const ChallengeClient = dynamic(() => import("./ChallengeClient"), {
  ssr: false,
});

export default function Page() {
  return <ChallengeClient />;
}
