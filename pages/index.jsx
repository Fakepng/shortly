import Head from 'next/head'
import Header from '../components/Header';
import Main from '../components/Main';

export default function Home() {
  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>URL Shorrtner</title>
        <meta name="description" content="URL Shorrtner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header />
      </header>

      <main className='flex flex-grow bg-slate-900'>
        <Main />
      </main>
    </div>
  )
}
