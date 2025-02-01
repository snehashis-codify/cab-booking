import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Social() {
  return (
    <React.Fragment>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className=" px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="flex space-x-4">
        <Button size="lg" variant="outline" className="w-full">
          <FcGoogle className="h-8 w-8" />
        </Button>
        <Button size="lg" variant="outline" className="w-full">
          <FaGithub className="h-8 w-8" />
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Social;
