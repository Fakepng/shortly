import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
	const { data: session } = useSession();

	return (
		<Navbar className='bg-slate-800 sticky top-0 z-50 p-2 shadow-xl'>
			<Container>
				<Navbar.Brand href='/'>
					<>
						<Image
							src='/logo192.png'
							width='30'
							height='30'
							className='d-inline-block align-top'
							alt='Fakepng Logo'
						/>
					</>
				</Navbar.Brand>
				<Navbar.Toggle />
				{session ? (
					<>
						<Link href='/link'>
							<h1 className='justify-center text-xl text-gray-300 hover:text-gray-400 cursor-pointer'>
								Link
							</h1>
						</Link>
						<div className='justify-end grid grid-flow-col h-max'>
							<Image
								src={session.user.image}
								width='30'
								height='30'
								layout='fixed'
								className='aspect-square rounded-full align-middle'
								alt={session.user.name}
							/>
							<Navbar.Text className='text-gray-300'>
								Signed in as{" "}
								<p
									className='cursor-pointer text-gray-300 hover:text-gray-400'
									onClick={() => signOut()}
								>
									{session.user.name}
								</p>
							</Navbar.Text>
						</div>
					</>
				) : (
					<Navbar.Text className=''>
						<p
							className='cursor-pointer text-gray-300'
							onClick={() => signIn()}
						>
							Sign in
						</p>
					</Navbar.Text>
				)}
			</Container>
		</Navbar>
	);
}

export default Header;
