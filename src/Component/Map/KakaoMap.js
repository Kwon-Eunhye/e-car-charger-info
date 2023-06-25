/* eslint-disable react/jsx-no-undef */
import React, { useState, useRef, useEffect } from "react";
import "./KakaoMap.css";
import nouse_Marker from "../../image/nouse-marker.png"; // 마커이미지
import inuse_Marker from "../../image/inuse-marker.png"; // 마커이미지

import {
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";

const KakaoMap = (props) => {
  // const [location, setLocation] = useState();

  // const myLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLocation({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //   });
  // };
  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log(position.coords.latitude, position.coords.longitude);
  // });

  const mapRef = useRef();
  const [positions, setPositions] = useState([]);
  const [level, setLevel] = useState();

  useEffect(() => {
    setPositions(props.items.positions);
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
        center={{ lat: 36.2683, lng: 127.6358 }}
        style={{ width: "100%", height: "100vh", overflowY: "hidden" }}
        level={13}
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
          {props.items.map((info, index) => {
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
              >
                {/* <div>
                  <div>{info.csNm}</div>
                  <div>
                  {info.cpStat === "1" ? (
                    <p>충전기 상태 : 가능</p>
                  ) : (
                    <p>충전기 상태 : 불가능</p>
                  )}
                </div>
                </div> */}
              </MapMarker>
            );
          })}
        </MarkerClusterer>
      </Map>
    </div>
  );
};

export default KakaoMap;
