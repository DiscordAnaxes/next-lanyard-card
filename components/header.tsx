import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import useSWR from 'swr';
import { SiNextdotjs } from "react-icons/si";

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full px-6 mt-5 pb-7 sm:px-4">
            <Link href="/" className="flex space-x-2">
                <h1 className="ml-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    <SiNextdotjs className="inline mr-1" /> Lanyard Card
                </h1>
            </Link>
            <div>
                <Link href={"https://github.com/DiscordAnaxes/next-lanyard-card"} target="_blank" rel="noopener noreferrer" className={`border border-slate-700 relative m-auto rounded-lg p-2 text-lg`}>
                    <span className="hidden sm:contents ">Open source on</span> <FontAwesomeIcon icon={faGithub} />
                </Link>
            </div>
        </header>
    );
}