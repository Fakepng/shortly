import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/main";

export default function Home() {
	return (
		<div className='flex flex-col h-screen'>
			<Head>
				<title>URL Shortener</title>
				<meta name='description' content='URL Shortener' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header>
				<Header />
			</header>

			<main className='flex flex-grow bg-slate-900'>
				<Main />
			</main>
		</div>
	);
}
