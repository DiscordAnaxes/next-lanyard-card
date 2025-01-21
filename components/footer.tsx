import { faCheckCircle, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { GoGitCommit } from "react-icons/go";
import { SiVercel, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { FooterProps } from "../types/general";
import Image from "next/image";

export default function Footer({ version, environment }: FooterProps) {
    return (
        <footer className="w-full text-gray-600 dark:text-gray-500">
            <div
                className="container flex flex-col items-center py-8 mx-auto sm:flex-row"
            >
                <span className="ml-3 font-bold"><SiNextdotjs className="inline mr-1" /> Lanyard Card</span>
                <span className="ml-2">
                    <GoGitCommit className="inline" /> v{version}
                    {environment === 'production' ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-green-500" title="Running" />
                    ) : (
                        <FontAwesomeIcon icon={faTimesCircle} className="ml-2 text-red-500" title="Not Running" />
                    )}
                </span>
                <span className="inline-flex justify-center mt-4 space-x-3 text-lg sm:ml-auto sm:mt-0 sm:justify-start">
                    <Link href="https://vercel.com" target="_blank" rel="noopener noreffer">
                        <SiVercel />
                    </Link>
                    <Link href="https://tailwindcss.com/" target="_blank" rel="noopener noreffer">
                        <SiTailwindcss />
                    </Link>
                </span>
                <p className="mt-4 text-sm border-gray-200 dark:border-[#0F1A27] sm:ml-4 sm:pl-4 sm:border-l sm:py-2 sm:mt-0">
                    © 2021 - {new Date().getFullYear()}
                    <Link href={"https://anaxes.vercel.app"} target="_blank" rel="noopener noreferrer" className="font-bold">
                        <Image src={"/anaxes.png"} height={20} width={20} className="inline-flex w-auto h-5 ml-2 mr-1 rounded-full" draggable={false} alt={"Anaxes PFP"} />
                        Anaxes
                    </Link>. All rights reserved.
                </p>
            </div>
        </footer>
    );
}