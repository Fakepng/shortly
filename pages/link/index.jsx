import { getSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Header from "../../components/Header";

function link({ session }) {
	const [userId, setUserId] = useState(undefined);
	const [urls, setUrls] = useState([]);
	const [show, setShow] = useState(false);
	const nameRef = useRef(null);
	const urlRef = useRef("https://");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const urlsMap = urls.map((url) => {
		return (
			<div className='flex flex-col items-center justify-center text-gray-300'>
				<h1>
					{url.name} | {url.code.match(/.{1,4}/g).join("-")}
				</h1>
				<p>{url.url}</p>
			</div>
		);
	});

	const submitUrl = (event) => {
		event.preventDefault();
		if (!nameRef.current.value || !urlRef.current.value) return;

		const name = nameRef.current.value;
		const url = urlRef.current.value;

		axios
			.post("/api/newUrl", { name, url, id: userId })
			.then((res) => {
				handleClose();
				router.reload();
			})
			.catch((err) => console.log(err));

		nameRef.current.value = "";
		urlRef.current.value = "";
	};

	useEffect(() => {
		axios.post("/api/getUser", { email: session.user.email }).then((res) => {
			if (res.data.message === "User not found") {
				console.warn(res.data.message);
				router.replace("/");
			} else {
				setUserId(res.data.id);
				setUrls(res.data.urls);
				console.log(res.data.urls);
			}
		});
	}, []);

	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<div className='flex flex-grow bg-slate-900'>
				<Icon
					path={mdiPlusCircle}
					size={2}
					color='white'
					className='absolute top-0 right-0 mt-20 cursor-pointer'
					onClick={handleShow}
				/>
				<Container>{urlsMap}</Container>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>New URL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<label for='fname'>Name:</label>
						<input
							type='text'
							id='fname'
							name='fname'
							placeholder='name'
							ref={nameRef}
						/>
						<label for='lname'>Url:</label>
						<input type='text' id='lname' name='lname' ref={urlRef} />
						<input type='submit' value='Submit' onClick={submitUrl} />
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

export default link;
