import { useRouter } from "next/router";
import axios from "axios";
import style from "../../styles/go.module.css";
import { useEffect, useState } from "react";

function Go() {
	const router = useRouter();
	const { id } = router.query;
	const [countdown, setCountdown] = useState(3);
	const [web, setWeb] = useState(undefined);

	useEffect(() => {
		const getWeb = () => {
			if (web) return;
			axios.get(`/api/getUrl/${id}`).then((res) => {
				if (res.data === "Url not found") {
					console.warn(res.data);
				} else {
					setWeb(res.data);
				}
			});
		};
		setInterval(() => {
			if (countdown > 0) {
				setCountdown(countdown - 1);
				getWeb();
			} else {
				if (!web) {
					router.replace("/");
				} else {
					axios.get(`/api/addVisited/${id}`);
					window.location.assign(web);
					console.log("redirecting");
				}
			}
		}, 1000);
	}, [countdown]);

	return (
		<div className='flex flex-col h-screen m-auto justify-center items-center bg-slate-900'>
			<div className={style.ldsripple}>
				<div></div>
				<div></div>
			</div>
			<p className='text-gray-300 font-bold'>Redirecting in {countdown}</p>
		</div>
	);
}
export default Go;
