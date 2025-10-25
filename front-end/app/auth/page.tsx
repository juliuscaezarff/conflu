"use client";

import Link from "next/link";
import { AuthForm } from "./_components/auth-form";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
import { Warp } from "@paper-design/shaders-react";
import { useContainerDimensions } from "@/hooks/use-container-dimensions";

export default function Page() {
  const { ref, dimensions } = useContainerDimensions();

  return (
    <main className="relative">
      <Link
        href="/"
        className="fixed top-4 left-4 text-base font-semibold z-50 text-primary transition-colors flex items-center gap-2 py-2"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar
      </Link>
      <div className="min-h-screen flex px-3 py-3">
        <div
          ref={ref}
          className="relative hidden w-1/2 lg:block overflow-hidden rounded-lg"
        >
          <div className="absolute inset-0">
            <Warp
              width={dimensions.width}
              height={dimensions.height}
              colors={["#161f36", "#c3a169", "#101c3d"]}
              proportion={0.45}
              softness={1}
              distortion={0.25}
              swirl={0.8}
              swirlIterations={10}
              shape="checks"
              shapeScale={0.1}
              speed={1}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image
              src="/conflu-white.png"
              alt="Conflu"
              width={350}
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
