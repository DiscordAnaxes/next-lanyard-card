import React, { useEffect, useState } from 'react';
import { useLanyard } from 'use-lanyard';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import Progress from '../components/Progress';
import useSWR from 'swr';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTvFill } from "react-icons/bs";

export default function Lanyard() {
	const [snowflake, setSnowflake] = useState('');
	const { data: lanyard } = useSWR(snowflake ? `lanyard?id=${snowflake}` : null);

	const activity = lanyard?.activities[0]?.type === 4 ? lanyard?.activities[1] : lanyard?.activities[0];

	const timestamp = moment(activity?.timestamps?.start);

	const getActivityTypeText = (activity: { type: number, name: string }) => {
		switch (activity?.type) {
			case 0:
				return `Playing ${activity?.name}`;
			case 2:
				return `Listening to ${activity?.name}`;
			case 3:
				return `Watching ${activity?.name}`;
			case 5:
				return `Competing in ${activity?.name}`;
			default:
				return "";
		}
	};

	const getActivityTypeIcon = (activity: { type: number }) => {
		switch (activity?.type) {
			case 0:
				return <IoLogoGameControllerB className="inline" />;
			case 3:
				return <BsTvFill className="inline" />;
			default:
				return null;
		}
	};

	const handleInputChange = (e: { target: { value: string; }; }) => {
		const value = e.target.value;
		if (/^\d{0,19}$/.test(value)) {
			setSnowflake(value);
		}
	};

	const [currentDate, setCurrentDate] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(Date.now());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (timestamp: number) => {
		const minutes = Math.floor(timestamp / 60000);
		const seconds = Math.floor((timestamp % 60000) / 1000).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const formatElapsedTime = (timestamp: number) => {
		const hours = Math.floor(timestamp / 3600000);
		const minutes = Math.floor((timestamp % 3600000) / 60000).toString().padStart(2, '0');
		const seconds = Math.floor((timestamp % 60000) / 1000).toString().padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	};

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
				<div className="my-auto">
					<div className="w-full h-auto bg-transparent border rounded-lg peer border-slate-800 first:p-5 card">
						<SkeletonTheme baseColor="#111827" highlightColor="#1F2937">
							<div className="flex items-center">
								<Image src={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? `${lanyard?.spotify.album_art_url}` : lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 0 || null ? `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.large_image}.png` : "https://i.stack.imgur.com/y9DpT.jpg"} alt={activity?.assets?.large_text || "Placeholder"} className="rounded-md" draggable="false" width={96} height={96} />
								{activity?.assets?.small_image || lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? <ActivitySecondaryImage src={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? "https://cnrad.dev/assets/spotify-logo.svg" : `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.small_image}.png`} alt={activity?.assets?.small_text || "Placeholder"} className={activity?.assets?.small_image ? "rounded-full" : ""} draggable="false" width="30px" height="30px" /> : ""}
								<p className="flex flex-col justify-between ml-4 leading-snug">
									<span className="text-xl font-bold text-left text-white">{getActivityTypeText(activity)}</span>
									<span className="text-left text-white">{activity?.details}</span>
									<span className="text-left text-white">{activity?.state}</span>
									<span className="text-left text-white">
										{lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? (
											<>
												<Progress percentage={100 * (currentDate - lanyard?.spotify.timestamps.start) / (lanyard?.spotify.timestamps.end - lanyard?.spotify.timestamps.start)} />
												<span className="ml-2">
													{formatTime(currentDate - lanyard?.spotify.timestamps.start)} / {formatTime(lanyard?.spotify.timestamps.end - lanyard?.spotify.timestamps.start)}
												</span>
											</>
										) : (
											<span className="font-bold text-green-500" >
												{getActivityTypeIcon(activity)} <span>{formatElapsedTime(currentDate - timestamp.valueOf())}</span>
											</span>
										)}
									</span>
								</p>
							</div>
						</SkeletonTheme>
					</div>
				</div>
			</div>
		</div>
	);
}



const ActivitySecondaryImage = styled.img`
  position: fixed;
  bottom: 15px;
  right: 495px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #232528;
  border: 2px solid #232528;
`;
