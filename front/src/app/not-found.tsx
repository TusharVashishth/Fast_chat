import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <Image
        src="/images/not_found.svg"
        width={500}
        height={500}
        alt="not_found"
      />
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
