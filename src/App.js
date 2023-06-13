import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [chargerInfo, setChargerInfo] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.odcloud.kr/api/EvInfoServiceV2/v1/getEvSearchList?page=1&perPage=10&returnType=JSON&serviceKey=0D2g1SK%2BiKevG%2FPcWEJ%2FYpST4B82lAizBMQ%2B%2BZsKNjcFZqeiqHddHMUshTHRgaaaVqhk8PwdVECW2l6%2B2pqBmg%3D%3D"
    )
      .then((response) => response.json())
      .then((data) => setChargerInfo(data));
  }, []);
  console.log(chargerInfo.data);

  return (
    <div>
      {chargerInfo.data.map((info) => (
        <ul key={info.csId}>
          <li>{info.csNm}</li>
        </ul>
      ))}
    </div>
  );
}

export default App;
