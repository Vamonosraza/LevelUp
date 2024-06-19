import Image from "next/image";
import {Button} from "@/components/ui/button";
import jobOffer from "../images/jobOffers.svg"
import jobCase from "../images/jobCase.svg"
import Link from "next/link";

export default function Home() {
  return (
    <main>
        <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
            <Image src={jobCase} alt={"logo"} className={"w-24 h-16"} />
        </header>
        <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
            <div>
                <h1 className="capitalize text-4xl font-bold text-gray-900 mid:text-7xl">
                    Job <span className={"text-primary"}>tracking</span> app
                </h1>
                <p className="leading-loose max-w-md mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dignissimos dolorum, explicabo iusto libero minima molestiae odio optio provident qui, ratione suscipit veniam. Eos fugiat illo libero nobis unde voluptate.
                </p>
                <Button asChild className={"mt-4"}>
                    <Link href={'/add-job'}>
                        Get Started
                    </Link>
                </Button>
            </div>
            <Image src={jobOffer} alt={'landing'} className="hidden lg:block" />
        </section>
    </main>
  );
}
