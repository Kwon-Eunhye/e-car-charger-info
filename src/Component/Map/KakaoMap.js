/* eslint-disable react/jsx-no-undef */
import React, { useState, useRef, useEffect } from "react";
import ChargerType from "./ChargerType";
import ChargerState from "./ChargerState";

import nouse_Marker from "../../image/nouse-marker.png"; // 마커이미지
import inuse_Marker from "../../image/inuse-marker.png"; // 마커이미지

import "./KakaoMap.css";

import {
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";

const KakaoMap = ({ items }) => {
  const mapRef = useRef();
  const [positions, setPositions] = useState([]);
  const [level, setLevel] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  useEffect(() => {
    setPositions(items.positions);
  }, []);

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    <div className="kakaomap">
      <Map
        center={state.center}
        style={{ width: "100%", height: "100vh", overflowY: "hidden" }}
        level={3}
        ref={mapRef}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <ZoomControl />
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
          disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
          // 마커 클러스터러에 클릭이벤트를 등록합니다
          // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
          // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
          onClusterclick={onClusterclick}
        >
          {items.map((info, index) => {
            return (
              <MapMarker
                key={`${info.cpId}`}
                position={{ lat: info.lat, lng: info.longi }}
                image={{
                  src: info.cpStat === "1" ? nouse_Marker : inuse_Marker, // 마커이미지의 주소입니다
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
                // 마커에 마우스오버 이벤트를 등록합니다
                onClick={
                  // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                  () => setIsOpen(true)
                }
                // 마커에 마우스아웃 이벤트를 등록합니다
              >
                {isOpen && (
                  <div
                    style={{
                      cursor: "pointer",
                      padding: "5px",
                      backgroundColor: "#fff",
                      color: "#000",
                      width: "150px",
                      height: "40px",
                      textAlign: "center",
                      border: "0",
                      fontSize: "15px",
                      position: "relative",
                    }}
                    onClick={
                      // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                      () => setIsOpen(false)
                    }
                  >
                    <ChargerState cpStat={info.cpStat} />
                    <ChargerType cpTp={info.cpTp} />
                    <div
                      style={{
                        width: "150px",
                        position: "absolute",
                        top: "100px",
                        fontWeight: "bold",
                      }}
                    >
                      {info.csNm}
                    </div>
                  </div>
                )}
              </MapMarker>
            );
          })}
        </MarkerClusterer>
        <button
          onClick={() =>
            setState({
              center: { lat: 33.45058, lng: 126.574942 },
              isPanto: true,
            })
          }
        >
          버튼
        </button>
      </Map>
    </div>
  );
};

export default KakaoMap;
