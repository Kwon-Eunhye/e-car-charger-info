const ChargerState = ({ cpStat }) => {
  let state;
  switch (cpStat) {
    case "1":
      state = "충전 가능";
      break;
    case "2":
      state = "충전기 사용중";
      break;
    case "3":
      state = "고장 또는 잠김";
      break;
    case "4":
      state = "통신 장애";
      break;
    case "5":
      state = "통신 미연결";
      break;
    case "9":
      state = "충전 예약";
      break;
    default:
      state = "상태 확인 불가";
      break;
  }
  return <p>상태: {state}</p>;
};
export default ChargerState;
