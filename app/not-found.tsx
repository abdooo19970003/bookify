"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const notfound = () => {
  return (
    <div className="root-container flex items-center justify-center flex-col bg-slate-100 min-h-screen">
      <h1 className="font-extrabold text-8xl  tracking-widest opacity-70">
        404
      </h1>
      <p className="text-2xl font-semibold">Page not found</p>
      <div className="flex gap-9 my-20">
        <Button
          className=" text-base"
          size={"lg"}
          variant={"outline"}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
        <Button className=" text-base" size={"lg"} variant={"destructive"}>
          {" "}
          <Link href="/">Go Home</Link>{" "}
        </Button>
      </div>
    </div>
  );
};

export default notfound;
