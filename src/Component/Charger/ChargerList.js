import React, { useEffect, useState } from "react";
import "./ChargerList.css";
import { useInView } from "react-intersection-observer";

const ChargerList = (props) => {
	const { chargerInfo, setChargerInfo } = props;
	const [searchAddr, setSearchAddr] = useState("");
	const [searchPageNo, setSearchPageNo] = useState(1);

	const getData = async (pageNo, addr) => {
		const endPoint = "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList";
		const perPage = 20;
		const returnType = "JSON";
		const serviceKey = "0D2g1SK%2BiKevG%2FPcWEJ%2FYpST4B82lAizBMQ%2B%2BZsKNjcFZqeiqHddHMUshTHRgaaaVqhk8PwdVECW2l6%2B2pqBmg%3D%3D";
		const response = await fetch(
			`${endPoint}?page=${pageNo}&perPage=${perPage}&returnType=${returnType}&cond%5Baddr%3A%3ALIKE%5D=${addr}&serviceKey=${serviceKey}`
		);

		return response;
	};

	const [ScrollBottomrRef, inView] = useInView();
	const searchChangeHandler = (e) => {
		setSearchAddr(e.target.value);
		if (searchPageNo === 1) return;
		setSearchPageNo(1);
	};
	const submitHandler = (event) => {
		event.preventDefault();
	};
	const onClickChargerInfoView = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		getData(1, searchAddr)
			.then((res) => res.json())
			.then((json) => {
				console.log("data", json.data);
				setChargerInfo(json.data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchAddr]);

	useEffect(() => {
		if (inView) {
			console.log(inView, "무한 스크롤 요청 🎃");
			console.log(searchPageNo);

			// 실행할 함수
			getData(searchPageNo + 1, searchAddr)
				.then((res) => res.json())
				.then((json) => {
					console.log("data", json.data);
					setChargerInfo((cur) => [...cur, ...json.data]);
				});
		}
		setSearchPageNo((current) => current + 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<nav>
			<div className="container">
				<header>
					<img alt="Electric-Charging-Station" src="https://cdn-icons-png.flaticon.com/512/4879/4879897.png" />
					<h1>전기차 충전소 운영정보</h1>
				</header>
				<div className="searchbar">
					<form onSubmit={submitHandler}>
						<button type="submit">
							<img src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png" alt="searchimage" />
						</button>
						<input type="text" name="serch" placeholder="ex) 서울특별시 중구 or 인천광역시 중구" onChange={searchChangeHandler} />
					</form>
				</div>
			</div>
			<div className="searchlist">
				{chargerInfo.length === 0 ? (
					<div className="empty">
						<h2>Found not Result.</h2>
					</div>
				) : (
					chargerInfo.map((info, index) => {
						return (
							<ul className="searchlist__list" key={index} onClick={onClickChargerInfoView}>
								<li>충전소 이름 : {info.csNm}</li>
								<li>주소 : {info.addr}</li>
								<li>충전기 상태 : {info.cpStat === "1" ? "가능" : "불가능"}</li>
							</ul>
						);
					})
				)}
				{chargerInfo.length === 0 ? null : <div ref={ScrollBottomrRef}></div>}
			</div>
		</nav>
	);
};
export default ChargerList;
