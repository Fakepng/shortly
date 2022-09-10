import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
	const { data: session } = useSession();
	const [role, setRole] = useState("FREE");

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
						<Link href='/plans'>
							<h1 className='justify-center text-xl text-gray-300 hover:text-gray-400 cursor-pointer'>
								Plans
							</h1>
						</Link>
						<div className='justify-end grid grid-cols-3 gap-2'>
							<div className='row-span-2'>
								<Image
									src={session.user.image}
									width={60}
									height={60}
									layout='intrinsic'
									className='aspect-square rounded-full'
									alt={session.user.name}
								/>
							</div>
							<Navbar.Text className='text-gray-300'>
								<p>Signed in as</p>
								<p
									className='cursor-pointer text-gray-300 hover:text-gray-400'
									onClick={() => signOut()}
								>
									{session.user.name}
								</p>
							</Navbar.Text>
							{session.user.role === "OWNER" && (
								<button className='row-span-2 text-yellow-400 self-center border-2 border-yellow-400 rounded-full w-max px-2'>
									{session.user.role}
								</button>
							)}
							{session.user.role === "PRO" && (
								<button className='row-span-2 text-purple-500 self-center border-2 border-purple-500 rounded-full w-max px-2'>
									{session.user.role}
								</button>
							)}
						</div>
					</>
				) : (
					<>
						<Link href='/plans'>
							<h1 className='justify-center text-xl text-gray-300 hover:text-gray-400 cursor-pointer'>
								Plans
							</h1>
						</Link>
						<Navbar.Text className=''>
							<p
								className='cursor-pointer text-gray-300'
								onClick={() => signIn()}
							>
								Sign in
							</p>
						</Navbar.Text>
					</>
				)}
			</Container>
		</Navbar>
	);
}

export default Header;
