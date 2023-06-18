import React, { useEffect, useState } from "react";
import KakaoMap from "./Component/Map/KakaoMap";
import ChargerList from "./Component/Charger/ChargerList";

function App() {
  const [chargerInfo, setChargerInfo] = useState([]);

  // const seoul = [
  //   "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC",
  //   "\uC11C\uC6B8",
  //   "\uC11C\uC6B8\uC2DC",
  // ];

  const seoul = "\uC11C\uC6B8\uC2DC";

  const endPoint =
    "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList";
  const addr = seoul;
  const pageNo = 1;
  const perPage = 10;
  const returnType = "JSON";
  const serviceKey =
    "0D2g1SK%2BiKevG%2FPcWEJ%2FYpST4B82lAizBMQ%2B%2BZsKNjcFZqeiqHddHMUshTHRgaaaVqhk8PwdVECW2l6%2B2pqBmg%3D%3D";
  console.log(addr);
  async function getData() {
    const response = await fetch(
      `${endPoint}?page=${pageNo}&perPage=${perPage}&returnType=${returnType}&cond%5Baddr%3A%3ALIKE%5D=${addr}&serviceKey=${serviceKey}`
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
