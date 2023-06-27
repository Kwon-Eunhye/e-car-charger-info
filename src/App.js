import React, { useState } from "react";
import KakaoMap from "./Component/Map/KakaoMap";
import ChargerList from "./Component/Charger/ChargerList";

function App() {
  const [chargerInfo, setChargerInfo] = useState([]);
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 }); //맵 중앙 위치 변경

  return (
    <div>
      <KakaoMap items={chargerInfo} center={center} />
      <ChargerList chargerInfo={chargerInfo} setChargerInfo={setChargerInfo} />
    </div>
  );
}

export default App;
