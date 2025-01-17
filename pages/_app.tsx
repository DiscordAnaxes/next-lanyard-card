import React from 'react';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { SWRConfig } from "swr";
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (url: string) =>
					fetch(`/api/${url}`).then((res) => res.json()),
			}}
		>
			<Component {...pageProps} />
		</SWRConfig>
	)
}
