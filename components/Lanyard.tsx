import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Progress from '../components/Progress';
import useSWR from 'swr';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTvFill } from "react-icons/bs";
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';

export default function Lanyard() {
	const [snowflake, setSnowflake] = useState('');
	const { data: lanyard } = useSWR(snowflake ? `lanyard?id=${snowflake}` : null);
	const [colour, setColour] = useState('text-white');

	const handleColourChange = (e: { target: { value: string; }; }) => {
		setColour(e.target.value);
	};

	const handleInputChange = (e: { target: { value: string; }; }) => {
		const value = e.target.value;
		if (/^\d{0,19}$/.test(value)) {
			setSnowflake(value);
		}
	};

	const handleCopy = () => {
		const textToCopy = `<iframe title="Next.js Lanyard Card" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" src="https://next-lanyard-card.vercel.app/user/${lanyard?.discord_user.id}?theme=${colour}" className="mx-auto rounded-md" />`;
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				console.log('Text copied to clipboard');
			})
			.catch(err => {
				console.error('Failed to copy text: ', err);
			});
	}

	return (
		<div className="w-auto rounded-lg border-2 border-slate-800 p-6 transition duration-300 ease-in-out hover:border-slate-700 md:w-[60%]">
			<div className="mt-6">
				<h1 className="flex mb-5 text-sm font-semibold md:text-left md:text-base">
					<span className="flex items-center justify-center w-6 h-6 p-2 mr-2 rounded-md bg-slate-800 ">1</span>
					<span className="text-left">Enter your <FontAwesomeIcon icon={faDiscord} /> Discord ID <span className="text-slate-600">(You must be in the <Link href="https://discord.gg/lanyard" target="_blank" rel="noopener noreferrer" className="font-bold">🏷️ Lanyard <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></Link> Discord.)</span></span>
				</h1>
				<label htmlFor="idinput">
					<input
						type="text"
						id="idinput"
						title="InputID"
						value={snowflake}
						onChange={handleInputChange}
						placeholder="Enter your 18 or 19 digit snowflake"
						className="w-full px-4 py-2 my-auto text-sm bg-transparent border rounded-lg peer border-slate-800 focus:outline-none enabled:cursor-auto disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
					/>
				</label>
			</div>
			<div className="mt-6">
				<h1 className="flex mb-5 text-sm font-semibold md:text-left md:text-base">
					<span className="flex items-center justify-center w-6 h-6 p-2 mr-2 rounded-md bg-slate-800 ">2</span>
					<span className="text-left">Enter text colour <span className="text-slate-600">(You must use <Link href="https://tailwindcss.com/docs/text-color" target="_blank" rel="noopener noreferrer" className="font-bold"><SiTailwindcss className="inline" /> Tailwind CSS colour classes</Link>)</span></span>
				</h1>
				<label htmlFor="colourText">
					<input
						type="text"
						id="colourText"
						title="colourText"
						value={colour}
						onChange={handleColourChange}
						placeholder="Enter text colour using Tailwind CSS"
						className="w-full px-4 py-2 my-auto text-sm bg-transparent border rounded-lg peer border-slate-800 focus:outline-none enabled:cursor-auto disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
					/>
				</label>
			</div>
			<div className="mt-6">
				<h1 className="flex mb-5 text-sm font-semibold md:text-left md:text-base">
					<span className="flex items-center justify-center w-6 h-6 p-2 mr-2 rounded-md bg-slate-800 ">3</span>
					<p className="text-left">
						Visualising
						{lanyard && (
							<span>
								<Image src={`https://cdn.discordapp.com/avatars/${lanyard?.discord_user.id}/${lanyard?.discord_user.avatar}?size=512`} height={20} width={20} className="inline-flex w-auto h-5 ml-1 mr-1 rounded-full" draggable={false} alt={`${lanyard?.discord_user.username} PFP`} />
								{lanyard?.discord_user.display_name}
							</span>
						)}
					</p>
				</h1>
				<div className="">
					<iframe
						title="Next.js Lanyard Card"
						sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
						src={`/user/${snowflake}?theme=${colour}`}
						className="w-[80%] mx-auto rounded-md border border-slate-800"
					/>
				</div>
				<div className="mt-6">
					<h1 className="flex mb-5 text-sm font-semibold md:text-left md:text-base"><span className="flex items-center justify-center w-6 h-6 p-2 mr-2 rounded-md bg-slate-800 ">4</span>Final step</h1>
					<button disabled={!snowflake} onClick={handleCopy} className="mr-2">
						<span className={`w-full px-4 py-3 font-semibold bg-transparent border rounded-lg button border-slate-800 ${!snowflake ? 'pointer-events-none opacity-50' : ''}`}>
							Copy <SiNextdotjs className="inline" /> Lanyard Card iFrame
						</span>
					</button>
					<Link href={"https://github.com/DiscordAnaxes/next-lanyard-card/blob/master/pages/user/%5Bid%5D.tsx"} target="_blank" rel="noopener noreferrer">
						<span className={`w-full px-4 py-3 font-semibold bg-transparent border rounded-lg button border-slate-800 ${!snowflake ? 'pointer-events-none opacity-50' : ''}`}>
							View <SiNextdotjs className="inline" /> Source code
						</span>
					</Link>
				</div>
				<div className="mt-4 text-sm text-center text-slate-600">
					You will be able to add your own background colours and customise the iFrame.
				</div>
			</div>
		</div>
	);
}