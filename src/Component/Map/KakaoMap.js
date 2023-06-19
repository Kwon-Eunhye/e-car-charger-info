import React, { useState } from "react";
import "./KakaoMap.css";

import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.5542, lng: 126.971 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  console.log(props.items);
  return (
    <div className="kakaomap">
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "100vh", overflowY: "hidden" }}
        level={5}
      >
        {props.items.map((info, index) => {
          return (
            <MapMarker
              key={info.cpId}
              position={{ lat: info.lat, lng: info.longi }}
              image={{
                src: "https://icons-for-free.com/iconfiles/png/512/map+marker+icon-1320166582858325800.png", // 마커이미지의 주소입니다
                size: {
                  width: 40,
                  height: 40,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 20,
                    y: 72,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
              onClick={() => setIsOpen(true)}
            >
              {isOpen && (
                <div style={{ minWidth: "150px" }}>
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpen(false)}
                  />
                  <div style={{ padding: "5px", color: "#000" }}>
                    Hello World!
                  </div>
                </div>
              )}
              <div
                className="kakaomap___listitem"
                // style={{ padding: "5px", color: "#000", textAlign: "center" }}
              >
                {info.csNm}
              </div>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
};

export default KakaoMap;
