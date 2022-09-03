import Link from "next/link";
import Image from "next/image";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
	return (
		<Navbar bg='dark'>
			<Container>
				<Navbar.Brand as={Link} href='/'>
					<>
						<Image
							src='/logo192.png'
							width='30'
							height='30'
							className='d-inline-block align-top'
							alt='Fakepng Logo'
						/>{" "}
						URL Shortner
					</>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default Header;
