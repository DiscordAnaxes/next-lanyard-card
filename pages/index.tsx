import React from 'react';
import Lanyard from '../components/Lanyard';
import Head from 'next/head';

export default function Home() {
	return (
		<html lang="en">
			<body className="bg-gray-900">
				<Head>
					<title>Next.js TypeScript Lanyard Card example.</title>
					<link rel="icon" type="image/png" href="/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://pro.fontawesome.com/releases/v5.14.0/css/all.css"
						integrity="sha384-VhBcF/php0Z/P5ZxlxaEx1GwqTQVIBu4G4giRWxTKOCjTxsPFETUDdVL5B6vYvOt"
						crossOrigin="anonymous"
					/>
				</Head>

				<div className="flex justify-center h-screen">
					<Lanyard />
				</div>
			</body>
		</html>
	);
}
