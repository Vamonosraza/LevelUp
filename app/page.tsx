import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Camera} from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center min-h-screen">
      <Button>Default Button</Button>
        <Button variant="outline" size={"icon"}>
            <Camera/>
        </Button>
      <h1>Home</h1>
    </div>
  );
}
