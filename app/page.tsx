import { Animation } from "@/components/landing-page/animation";
import { Bento } from "@/components/landing-page/bento";
import BentoAnimation from "@/components/landing-page/bento-animation";
import { Button } from "@/components/ui/button";

import React from "react";

export default function Page() {
  return (
    <div className="bg-background">
      <div className="px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <Animation />
          </div>
        </div>
        <BentoAnimation />
      </div>
    </div>
  );
}
