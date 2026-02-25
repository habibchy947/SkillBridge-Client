import { ArrowDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const Banner = ({
  heading = "Turn Ambition Into Achievement",
  description = "Discover your strengths, explore the right opportunities, and receive expert mentorship tailored to your goals. Build clarity, confidence, and a roadmap toward long-term success.",
  buttons = {
    primary: {
      text: "Sign Up",
      url: "/register",
    },
    secondary: {
      text: "Get Started",
      url: "/tutors",
    },
  },
  className,
}: Hero3Props) => {
  return (
    <section className={cn("py-10", className)}>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>

          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline">
                <Link href={buttons.secondary.url}>
                  {buttons.secondary.text}
                  <ArrowDownRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex relative w-full mt-10 h-96">
          <Image
            src="https://plus.unsplash.com/premium_photo-1675644727129-9e2fbc03c500?q=80&w=1644&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            priority
            alt="Hero"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export { Banner };
