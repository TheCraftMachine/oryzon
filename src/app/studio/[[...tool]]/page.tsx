"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return (
    <div style={{ paddingTop: "68px", height: "100dvh", display: "flex", flexDirection: "column" }}>
      <NextStudio config={config} />
    </div>
  );
}
