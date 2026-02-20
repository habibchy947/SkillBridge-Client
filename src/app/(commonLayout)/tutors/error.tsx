"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function TutorError({ error, reset } : { error: Error & { digest?: string }; reset: () => void; }) {
    useEffect(() => {
        // * We can pass this error to a logger 
        console.log(error);
    },[]);
  return (
    <div>
      <h1>Something Went Wrong.Please try again</h1>
      <Button onClick={() => reset()}>Retry</Button>
    </div>
  )
}
