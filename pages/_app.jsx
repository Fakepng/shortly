import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>

			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
