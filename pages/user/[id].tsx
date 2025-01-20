import moment from "moment";
import useSWR from "swr";
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTvFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import Progress from "../../components/Progress";
import { useRouter } from "next/router";

export default function LanyardCard() {
    let slug;

    const router = useRouter();
    const { theme } = router.query;

    if (typeof window !== "undefined") {
        slug = document.location.pathname.split("/")[2];
    }

    const { data: lanyard } = useSWR(slug ? `lanyard?id=${slug}` : null);

    const activity = lanyard?.activities[0]?.type === 4 ? lanyard?.activities[1] : lanyard?.activities[0];

    const timestamp = moment(activity?.timestamps?.start);

    const getActivityTypeText = (activity: { type: number, name: string }) => {
        switch (activity?.type) {
            // Case 4 is for custom status.

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

    return (
        <div className={`w-full mt-2 rounded-lg first:p-5 card bg-transparent`}>
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
                        onError={(e) => e.currentTarget.src = '/error.jpg'}
                    />
                    {activity?.assets?.small_image && (
                        <img
                            src={getSmallImage(activity)}
                            alt={activity?.assets?.small_text || "Placeholder"}
                            className={`absolute bottom-0 right-0 translate-x-2 translate-y-1 bg-[#232528] border-2 border-[#232528] ${activity?.assets?.small_image ? "rounded-full" : ""}`}
                            draggable="false"
                            width={30}
                            height={30}
                            onError={(e) => e.currentTarget.src = '/error.jpg'}
                        />
                    )}
                </div>
                <p className={`flex flex-col justify-between ml-4 leading-snug ${theme}`}>
                    <span className="text-xl font-bold text-left">{getActivityTypeText(activity)}</span>
                    <span className="text-left">{activity?.details}</span>
                    <span className="text-left">{activity?.state}</span>
                    <span className="text-left">
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
    )
}