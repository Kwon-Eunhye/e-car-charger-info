import React, { useState } from "react";
import KakaoMap from "./Component/Map/KakaoMap";
import ChargerList from "./Component/Charger/ChargerList";

function App() {
  const [chargerInfo, setChargerInfo] = useState([]);

  return (
    <div>
      <KakaoMap items={chargerInfo} />
      <ChargerList chargerInfo={chargerInfo} setChargerInfo={setChargerInfo} />
    </div>
  );
}

export default App;
