import React from 'react';
import { useLanyard } from 'use-lanyard';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';

export default function Lanyard() {
	const router = useRouter()
	const { id } = router.query

	const DISCORD_ID = id?.toString() || "567885938160697377"; // Change with your Discord ID. E.G 567885938160697377

	const { data: lanyard } = useLanyard(DISCORD_ID);

	const activity = lanyard?.activities.find(activity => activity.type === 0);

	const timestamp = moment(activity?.timestamps?.start);

	const isGitHub = activity?.name === 'GitHub' ? <span><i className="fab fa-github"></i>{' '}GitHub</span> : activity?.name === "Visual Studio Code" ? <span><i className="fad fa-code text-blue-500"></i>{' '}Visual Studio Code</span> : activity?.name;

	return (
		<div>
			<div className="rounded-md h-auto w-96 bg-gray-800 first:p-5 card">
				<SkeletonTheme color="#111827" highlightColor="#1F2937">
					<div className="flex items-center">
						<Image src={activity ? `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.large_image}.png` : "https://i.stack.imgur.com/y9DpT.jpg"} alt={activity?.assets?.large_text || "Placeholder"} className="rounded-md" draggable="false" width="96px" height="96px" />
						<ActivitySecondaryImage src={activity?.assets?.small_image ? `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets?.small_image}.png` : "https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg"} alt={activity?.assets?.small_text || "Placeholder"} className={activity?.assets?.small_image ? "rounded-full" : ""} draggable="false" width="30px" height="30px" />
						<p className="ml-4 leading-snug flex flex-col justify-between">
							<span className="text-white text-xl font-bold">Playing {isGitHub || <Skeleton />}</span>
							<span className="text-white">{activity?.details?.split('', 35).reduce((o, c) => o.length === 34 ? `${o}${c}...` : `${o}${c}`, '') || <Skeleton />}</span>
							<span className="text-white">{activity?.state?.split('', 35).reduce((o, c) => o.length === 34 ? `${o}${c}...` : `${o}${c}`, '') || <Skeleton />}</span>
							<span className="text-white">⏰ {timestamp.fromNow().split('ago')[0] || "0 minutes"} elapsed</span>
						</p>
					</div>
				</SkeletonTheme>
			</div>
			<br />
			<div className="flex items-center justify-center">
				<h1 className="text-white font-semibold">Please input a Discord Snowflake id in the url. i.e <span className="focus:outline-none bg-none bg-gray-800 rounded-lg p-3 h-4 w-4">?id=567885938160697377</span></h1>
			</div>
		</div>
	);
}



const ActivitySecondaryImage = styled.img`
  position: absolute;
  bottom: 15px;
  right: 325px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1F2937;
  border: 2px solid #1F2937;
`;