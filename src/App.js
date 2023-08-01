import React, { useEffect, useState } from "react";
import KakaoMap from "./Component/Map/KakaoMap";
import ChargerList from "./Component/Charger/ChargerList";

function App() {
  const [chargerInfo, setChargerInfo] = useState([]);
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 }); //맵 중앙 위치 변경

  useEffect(() => {
    console.log(center);
  }, [center]);

  return (
    <div style={{ display: "flex" }}>
      <ChargerList
        chargerInfo={chargerInfo}
        setChargerInfo={setChargerInfo}
        setCenter={setCenter}
      />
      <KakaoMap items={chargerInfo} center={center} />
    </div>
  );
}

export default App;
