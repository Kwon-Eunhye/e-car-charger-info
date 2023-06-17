import React, { useEffect, useState } from "react";
import KakaoMap from "./Component/Map/KakaoMap";
import ChargerList from "./Component/Charger/ChargerList";

function App() {
  const [chargerInfo, setChargerInfo] = useState([]);
  async function getData() {
    const response = await fetch(
      "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?page=1&perPage=10&returnType=JSON&cond%5Baddr%3A%3ALIKE%5D=\uc804\ub77c\ub0a8\ub3c4\u0020\ub098\uc8fc\uc2dc\u0020\uc804\ub825\ub85c\u0020\u0035\u0035&serviceKey=0D2g1SK%2BiKevG%2FPcWEJ%2FYpST4B82lAizBMQ%2B%2BZsKNjcFZqeiqHddHMUshTHRgaaaVqhk8PwdVECW2l6%2B2pqBmg%3D%3D"
    );

    return response;
  }
  useEffect(() => {
    getData()
      .then((res) => res.json())
      .then((json) => setChargerInfo(json.data));
  }, []);

  return (
    <div>
      <KakaoMap items={chargerInfo} />
      <ChargerList items={chargerInfo} />
    </div>
  );
}

export default App;
