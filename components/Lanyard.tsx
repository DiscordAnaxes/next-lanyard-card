import React from 'react';
import { useLanyard } from 'use-lanyard';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import Progress from '../components/Progress';

export default function Lanyard() {
	const router = useRouter()
	const { id } = router.query

	const DISCORD_ID = id ? id?.toString() : "567885938160697377";

	const { data: lanyard } = useLanyard(DISCORD_ID);

	const activity = lanyard?.activities.find(activity => activity.type === 0);

	const timestamp = moment(activity?.timestamps?.start);

	const currentDate: any = new Date();

	const isGitHub = activity?.name === 'GitHub' ? <span>Playing{' '}<i className="fab fa-github"></i>{' '}GitHub</span> : activity?.name === "Visual Studio Code" ? <span>Playing{' '}<i className="fad fa-code text-blue-500"></i>{' '}Visual Studio Code</span> : lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? <span>Listening to{' '}<i className="fab fa-spotify text-green-500"></i>{' '}Spotify</span> : lanyard?.activities[lanyard?.activities[0] && lanyard?.activities[1] ? 0 : 1] ? `Playing ${activity?.name}` : <Skeleton />;
	

	return (
		<>
			<div className="my-auto lg:ml-5 md:ml-5 sm:ml-5 xs:ml-3 ml-5 md:w-auto">
				<div className="rounded-md h-auto w-96 bg-gray-800 first:p-5 card">
					<SkeletonTheme color="#111827" highlightColor="#1F2937">
						<div className="flex items-center">
							<Image src={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? `${lanyard?.spotify.album_art_url}` : lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 0 || null ? `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.large_image}.png` : "https://i.stack.imgur.com/y9DpT.jpg"} alt={activity?.assets?.large_text || "Placeholder"} className="rounded-md" draggable="false" width="96px" height="96px" />
							{activity?.assets?.small_image || lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? <ActivitySecondaryImage src={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? "https://cnrad.dev/assets/spotify-logo.svg" : `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.small_image}.png`} alt={activity?.assets?.small_text || "Placeholder"} className={activity?.assets?.small_image ? "rounded-full" : ""} draggable="false" width="30px" height="30px" /> : ""}
							<p className="ml-4 leading-snug flex flex-col justify-between">
								<span className="text-white text-xl font-bold">{isGitHub}</span>
								<span className="text-white"><a className={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? "hover:text-green-500" : ""} href={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? `https://open.spotify.com/track/${lanyard?.spotify.track_id}` : ""} target={lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? "_blank" : ""}>{lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? `🎶 ${lanyard?.spotify.song.split('', 30).reduce((o, c) => o.length === 29 ? `${o}${c}...` : `${o}${c}`, '')}` : activity?.details?.split('', 35).reduce((o, c) => o.length === 34 ? `${o}${c}...` : `${o}${c}`, '') || <Skeleton />}</a></span>
								<span className="text-white">{lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? `🍧 ${lanyard?.spotify.artist.split('', 30).reduce((o, c) => o.length === 29 ? `${o}${c}...` : `${o}${c}`, '')}` : activity?.state?.split('', 35).reduce((o, c) => o.length === 34 ? `${o}${c}...` : `${o}${c}`, '') || <Skeleton />}</span>
								<span className="text-white">{lanyard?.listening_to_spotify && lanyard?.activities[lanyard?.activities[1] ? 1 : 0]?.type === 2 ? <Progress percentage={100 * (currentDate - lanyard?.spotify.timestamps.start) / (lanyard?.spotify.timestamps.end - lanyard?.spotify.timestamps.start)} /> : `⏰ ${timestamp.fromNow().split('ago')[0] || "0 minutes"} elapsed`}</span>
							</p>
						</div>
					</SkeletonTheme>
				</div>
				{/* <br />
				<div className="flex items-center justify-center">
					<h1 className="text-white font-semibold">Please input a Discord Snowflake id in the url. i.e <span className="focus:outline-none bg-none bg-gray-800 rounded-lg p-3 h-4 w-4">?id=567885938160697377</span></h1>
				</div> */}
			</div>
		</>
	);
}



const ActivitySecondaryImage = styled.img`
  position: fixed;
  bottom: 15px;
  right: 325px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1F2937;
  border: 2px solid #1F2937;
`;
