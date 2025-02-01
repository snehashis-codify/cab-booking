import { Car } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

interface HeaderProps {
  label: string;
}
export default function Header({ label }: HeaderProps) {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center mb-4">
        <Car size={32} className="mr-2 text-yellow-500" />
        <CardTitle className="text-3xl font-bold">CabEase</CardTitle>
      </div>
      <CardDescription className="text-center">{label}</CardDescription>
    </React.Fragment>
  );
}
