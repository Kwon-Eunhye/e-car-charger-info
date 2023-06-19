import React from "react";
import "./ChargerList.css";

const ChargerList = (props) => {
  const searchChangeHandler = (e) => {
    console.log(e.target.value);
  };

  return (
    <nav>
      <header>
        <img
          alt="Electric-Charging-Station"
          src="https://cdn-icons-png.flaticon.com/512/4879/4879897.png"
        />
        <h1>전기차 충전소 운영정보</h1>
      </header>
      <div className="searchbar">
        <form>
          <button type="submit">
            <img
              src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
              alt="searchimage"
            />
          </button>
          <input
            type="text"
            name="serch"
            placeholder="지역명 검색"
            onChange={searchChangeHandler}
          />
        </form>
      </div>
      <div className="searchlist">
        {props.items.map((info, index) => {
          return (
            <ul className="searchlist__list" key={index}>
              <li>충전소 이름 : {info.csNm}</li>
              <li>주소 : {info.addr}</li>
              <li>충전기 상태 : {info.cpStat === "1" ? "가능" : "불가능"}</li>
            </ul>
          );
        })}
      </div>
    </nav>
  );
};
export default ChargerList;
