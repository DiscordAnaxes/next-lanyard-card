import React from "react";
import Lanyard from "../components/Lanyard";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import { promises as fs } from 'fs';
import path from 'path';
import { FooterProps } from "../types/general";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SiNextdotjs, SiSpotify } from "react-icons/si";

export default function Home({ version, environment }: FooterProps) {
	return (
		<div className="flex flex-col items-center justify-center max-w-6xl py-2 mx-auto text-white">
			<Head>
				<title>Djenie | Discover the perfect tune.</title>
			</Head>
			<Header />
			<main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-20 text-center">
				<Link
					href="/"
					className="mb-5 rounded-2xl border border-slate-800 bg-transparent py-1 px-4 text-sm text-[#3290EE] transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-200"
				>
					<FontAwesomeIcon icon={faTwitter} /> Re-introducing <SiNextdotjs className="inline" /> Lanyard Card
				</Link>
				<h1 className="max-w-4xl mx-auto text-5xl font-bold text-white sm:text-5xl">
					Lanyard visualiser <span className="font-handwriting highlight">optimised</span> for <SiNextdotjs className="inline" />
				</h1>
				<div className="flex flex-col items-center justify-between w-full mt-16 mb-16">
					<Lanyard />
				</div>
			</main>
			<Footer version={version} environment={environment} />
		</div>
	);
};

export async function getStaticProps() {
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
	const version = packageJson.version;
	const environment = process.env.VERCEL_ENV || 'local';

	return {
		props: { version, environment },
		revalidate: 3600,
	};
}