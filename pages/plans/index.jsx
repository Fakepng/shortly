import Head from "next/head";
import Header from "../../components/Header";
import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";

function Plans() {
	return (
		<>
			<Head>
				<title>Plans</title>
				<meta name='description' content='URL Shortener' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header>
				<Header />
			</header>

			<main className='flex flex-col flex-grow'>
				<PricingTable highlightColor='#a855f7'>
					<PricingSlot title='FREE' priceText='FREE'>
						<PricingDetail>
							{" "}
							<b>10</b> urls
						</PricingDetail>
					</PricingSlot>
					<PricingSlot highlighted title='PRO' priceText='CONTACT'>
						<PricingDetail>
							{" "}
							<b>UNLIMITED</b> url
						</PricingDetail>
					</PricingSlot>
					<PricingSlot title='OWNER' priceText='CONTACT'>
						<PricingDetail>
							{" "}
							<b>UNLIMITED</b> url
						</PricingDetail>
					</PricingSlot>
				</PricingTable>
			</main>
		</>
	);
}
export default Plans;
