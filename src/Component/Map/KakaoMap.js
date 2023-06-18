import React, { useState } from "react";
import "./KakaoMap.css";

import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.4566, lng: 126.7051 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

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
