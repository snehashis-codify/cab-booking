import { Car, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 px-2 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center">
            <Car size={32} className="mr-2 text-yellow-500" />
            <p className="text-xl font-bold leading-none tracking-tight">
              CabEase
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex space-x-8">
            {["Home", "History", "Help"].map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <img
              src="/placeholder.svg"
              alt="User Profile"
              className="object-cover"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="ml-2 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              {["Home", "History", "Help"].map((item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
