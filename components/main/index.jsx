import { useRef } from "react";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";

function main() {
	const inputRef = useRef(null);
	const router = useRouter();

	const getId = (event) => {
		event.preventDefault();
		if (!inputRef.current.value) return;

		const id = inputRef.current.value
			.split("/")
			.slice(-1)
			.join("")
			.split("-")
			.join("")
			.match(/.{1,4}/g)
			.join("-");

		router.push(`/go/${id}`);

		inputRef.current.value = "";
	};

	return (
		<Container className='h-screen'>
			<div className='flex flex-col h-screen items-center justify-center'>
				<h1 className='text-4xl'>URL Shortener</h1>
				<p className='text-xl'>URL Shortener</p>
				<form>
					<input
						className='hidden md:inline-flex flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink text-center'
						type='text'
						ref={inputRef}
						placeholder='ABCD-EFGH-IJKL'
					/>
					<button hidden type='submit' onClick={getId}>
						Submit
					</button>
				</form>
			</div>
		</Container>
	);
}

export default main;
