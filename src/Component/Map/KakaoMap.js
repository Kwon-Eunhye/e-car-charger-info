import React, { useState } from "react";
import "./KakaoMap.css";

import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });
  console.log(props.items);

  return (
    <div className="kakaomp">
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "100vh" }}
      >
        {props.items.map((info, index) => {
          return (
            <MapMarker position={{ lat: info.lat, lng: info.longi }}>
              <div style={{ color: "#000" }}>{info.csNm}</div>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
};
export default KakaoMap;
