import React from "react";
import "./ChargerList.css";

const ChargerList = (props) => {
  return (
    <nav>
      <header>
        <div className="charger-list">
          {props.items.map((info, index) => {
            return (
              <ul className="charger-list__list" key={index}>
                <li>충전소 이름:{info.csNm}</li>
                <li>주소 :{info.addr}</li>
                <li>충전상태 :{info.cpStat}</li>
              </ul>
            );
          })}
        </div>
      </header>
    </nav>
  );
};
export default ChargerList;
