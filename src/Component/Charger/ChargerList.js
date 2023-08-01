import React, { useEffect, useRef, useState } from "react";
import "./ChargerList.css";
import { useInView } from "react-intersection-observer";

const ChargerList = (props) => {
  const { chargerInfo, setChargerInfo, center, setCenter, setLevel } = props;
  const [searchAddr, setSearchAddr] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchPageNo, setSearchPageNo] = useState(1);

  const getData = async (pageNo, addr) => {
    const endPoint =
      "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList";
    const perPage = 20;
    const returnType = "JSON";
    const serviceKey = process.env.REACT_APP_SERVICE_KEY;
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
      console.log(center);

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

  const onClickChargerLocation = (info) => {
    setCenter({ lat: info.lat, lng: info.longi });
    setLevel(3);
  };

  const onClickShowBtn = () => {
    if (showNavbar) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    console.log(navRef.current.offsetWidth);
    navRef.current.style.backgroundPositionX = "-400px";
  };

  const navRef = useRef(null);

  return (
    <nav ref={navRef}>
      <div className="container">
        <header>
          <img
            alt="Electric-Charging-Station"
            src="https://cdn-icons-png.flaticon.com/512/4879/4879897.png"
          />
          <h1>전기차 충전소 운영정보</h1>
        </header>
        <div className="searchbar">
          <form onSubmit={submitHandler}>
            <button type="submit">
              <img
                src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
                alt="searchimage"
              />
            </button>
            <input
              type="text"
              name="serch"
              placeholder="ex) 서울특별시 중구 or 인천광역시 중구"
              onChange={searchChangeHandler}
            />
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
              <ul
                className="searchlist__list"
                key={index}
                onClick={() => onClickChargerLocation(info)}
              >
                <li
                  style={{
                    background: "#f4f7f8",
                    color: "#0068c3",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  {info.csNm}
                </li>
                <li
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {info.addr}
                </li>
                <li
                  style={{
                    fontSize: "13px",
                  }}
                >
                  충전기 ID : {info.cpId}
                </li>
                <li
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {info.cpStat === "1" ? (
                    <p className="searchlist__statblue">충전기 상태 : 가능</p>
                  ) : (
                    <p className="searchlist__statred">충전기 상태 : 불가능</p>
                  )}
                </li>
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
