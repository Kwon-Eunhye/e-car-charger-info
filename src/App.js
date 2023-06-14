import React, { useEffect, useState } from "react";
import KakaoMap from "./Component/Map/KakaoMap";
import ChargerList from "./Component/Charger/ChargerList";

function App() {
  const [chargerInfo, setChargerInfo] = useState([]);
  async function getData() {
    const response = await fetch(
      "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?page=1&perPage=10&returnType=JSON&cond%5Baddr%3A%3ALIKE%5D=%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C&serviceKey=0D2g1SK%2BiKevG%2FPcWEJ%2FYpST4B82lAizBMQ%2B%2BZsKNjcFZqeiqHddHMUshTHRgaaaVqhk8PwdVECW2l6%2B2pqBmg%3D%3D"
    );

    return response;
  }
  useEffect(() => {
    getData()
      .then((res) => res.json())
      .then((json) => setChargerInfo(json));
  }, []);
  console.log(chargerInfo, "dd");

  return (
    <div>
      <KakaoMap />
      <ChargerList item={chargerInfo.data} />

      {/* <div>
        {chargerInfo.map((info, index) => (
          <ul key={index}>
            <li>충전소 이름:{info.csNm}</li>
            <li>주소 :{info.addr}</li>
            <li>충전상태 :{info.cpStat}</li>
          </ul>
        ))}
      </div> */}
    </div>
  );
}

export default App;
