import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  showSocial: boolean;
}
export default function CardWrapper({
  children,
  headerLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col space-y-4">
          <Social />
        </CardFooter>
      )}
    </Card>
  );
}
