import { useRouter } from "next/router";
import axios from "axios";
import style from "../../styles/go.module.css";
import { useEffect, useState } from "react";

function go() {
	const router = useRouter();
	const { id } = router.query;
	const [countdown, setCountdown] = useState(3);
	const [web, setWeb] = useState(undefined);

	useEffect(() => {
		setInterval(() => {
			if (countdown > 0) {
				setCountdown(countdown - 1);
				axios.get(`/api/getUrl/${id}`).then((res) => {
					if (res.data === "Url not found") {
						router.replace("/");
					} else {
						setWeb(res.data);
					}
				});
			} else {
				window.location.assign(web);
				console.log("redirecting");
			}
		}, 1000);
	}, [countdown]);

	return (
		<div className='flex flex-col h-screen m-auto justify-center  items-center'>
			<div className={style.ldsripple}>
				<div></div>
				<div></div>
			</div>
			<p>Redirecting in {countdown}</p>
		</div>
	);
}
export default go;
