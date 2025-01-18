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
		return activity ? hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}` : "Nothing to display";
	};

	const getLargeImage = (activity: { assets: { large_image: any; }; application_id: any; }) => {
		const largeImage = activity?.assets?.large_image;
		if (!largeImage) return "error.jpg";

		// Check if the largeImage is a number (Discord ID)
		if (/^\d+$/.test(largeImage)) {
			return `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${largeImage}.png`;
		}

		if (largeImage.startsWith("mp:external")) {
			const urlParts = largeImage.split("/https/");
			return `https://${urlParts[1]}`;
		}

		return largeImage;
	};


	const getSmallImage = (activity: { assets: { small_image: string; }; application_id: string; }) => {
		const smallImage = activity?.assets?.small_image;
		if (!smallImage) return "error.jpg";

		// Check if the largeImage is a number (Discord ID)
		if (/^\d+$/.test(smallImage)) {
			return `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${smallImage}.png?size=96`;
		}

		if (smallImage.startsWith("mp:external")) {
			const urlParts = smallImage.split("/https/");
			return `https://${urlParts[1]}`;
		}

		return smallImage;
	};


	const handleCopy = () => {
		const textToCopy = `<div className="my-auto">
        <div className="w-full h-auto bg-transparent border rounded-lg peer border-slate-800 first:p-5 card">
            <SkeletonTheme baseColor="#111827" highlightColor="#1F2937">
                <div className="flex items-center">
                    <Image
                        src={
                            lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2
                                ? \`\${lanyard?.spotify.album_art_url}\`
                                : getAvatarUrl(activity)
                        }
                        alt={activity?.assets?.large_text || "Placeholder"}
                        className="rounded-md"
                        draggable="false"
                        width={96}
                        height={96}
                    />
                    {activity?.assets?.small_image || lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? <ActivitySecondaryImage src={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? "https://cnrad.dev/assets/spotify-logo.svg" : \`https://cdn.discordapp.com/app-assets/\${activity?.application_id}/\${activity?.assets?.small_image}.png\`} alt={activity?.assets?.small_text || "Placeholder"} className={activity?.assets?.small_image ? "rounded-full" : ""} draggable="false" width="30px" height="30px" /> : ""}
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
    </div>`;
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				console.log('Text copied to clipboard');
			})
			.catch(err => {
				console.error('Failed to copy text: ', err);
			});
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
						<div className="flex items-center">
							<div className="relative">
								<img
									src={
										lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2
											? `${lanyard?.spotify.album_art_url}`
											: getLargeImage(activity)
									}
									alt={activity?.assets?.large_text || "Placeholder"}
									className="rounded-md"
									draggable="false"
									width={96}
									height={96}
									onError={(e) => e.currentTarget.src = 'error.jpg'}
								/>
								{activity?.assets?.small_image && (
									<img
										src={getSmallImage(activity)}
										alt={activity?.assets?.small_text || "Placeholder"}
										className={`absolute bottom-0 right-0 translate-x-2 translate-y-1 bg-[#232528] border-2 border-[#232528] ${activity?.assets?.small_image ? "rounded-full" : ""}`}
										draggable="false"
										width={30}
										height={30}
										onError={(e) => e.currentTarget.src = 'error.jpg'}
									/>
								)}
							</div>
							<p className="flex flex-col justify-between ml-4 leading-snug">
								<span className="text-xl font-bold text-left text-white">{getActivityTypeText(activity)}</span>
								<span className="text-left text-white">{activity?.details}</span>
								<span className="text-left text-white">{activity?.state}</span>
								<span className="text-left text-white">
									{lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? (
										<>
											<Progress
												percentage={100 * (currentDate - lanyard?.spotify.timestamps.start) / (lanyard?.spotify.timestamps.end - lanyard?.spotify.timestamps.start)}
												timeStart={formatTime(currentDate - lanyard?.spotify.timestamps.start)}
												timeEnd={formatTime(lanyard?.spotify.timestamps.end - lanyard?.spotify.timestamps.start)}
											/>
										</>
									) : (
										<span className="font-bold text-green-500" >
											{getActivityTypeIcon(activity)} <span>{formatElapsedTime(currentDate - timestamp.valueOf())}</span>
										</span>
									)}
								</span>
							</p>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<h1 className="flex mb-5 text-sm font-semibold md:text-left md:text-base"><span className="flex items-center justify-center w-6 h-6 p-2 mr-2 rounded-md bg-slate-800 ">3</span>Final step <span className="ml-1 text-slate-600">(Uses <SiTailwindcss className="inline" /> Tailwind CSS and react-skeleton-loading.)</span></h1>
					{/* <button type="submit" onClick={handleCopy} className="relative w-full px-4 py-3 font-semibold bg-transparent border rounded-lg button border-slate-800">Copy <SiNextdotjs className="inline" /> Next.js code</button> */}
					<Link href={"https://github.com/DiscordAnaxes/next-lanyard-card/blob/master/components/Lanyard.tsx"} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-3 font-semibold bg-transparent border rounded-lg button border-slate-800">Copy <SiNextdotjs className="inline" /> Next.js code</Link>
				</div>
				<div className="mt-4 text-sm text-center text-slate-600">
					If you have any better suggestions on how to implement this, please message me on <Link href={"https://discord.com/users/567885938160697377"} target="_blank" rel="noopener noreferrer" className="font-bold">Discord <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></Link>
				</div>
			</div>
		</div>
	);
}

// width: 30px;
// height: 30px;
// border - radius: 50 %;
// background - color: #232528;
// border: 2px solid #232528;