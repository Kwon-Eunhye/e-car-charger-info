import React, { useState } from "react";
import "./ChargerList";

const ChargerList = (item) => {
  console.log(item.info);

  // <div>
  //   {item.map((info, index) => {
  //     return (
  //       <ul key={index}>
  //         <li>충전소 이름:{info.csNm}</li>
  //         <li>주소 :{info.addr}</li>
  //         <li>충전상태 :{info.cpStat}</li>
  //       </ul>
  //     );
  //   })}
  // </div>;
};
export default ChargerList;
