const ChargerType = ({ cpTp }) => {
  let type;
  switch (cpTp) {
    case "1":
      type = "B타입(5핀)";
      break;
    case "2":
      type = "C타입(5핀)";
      break;
    case "3":
      type = "BC타입(5핀)";
      break;
    case "4":
      type = "BC타입(7핀)";
      break;
    case "5":
      type = "DC차 데모";
      break;
    case "type6":
      type = "AC 3상";
      break;
    case "7":
      type = "DC콤보";
      break;
    case "8":
      type = "DC차데모+DC콤보";
      break;
    case "9":
      type = "DC차데모+AC3상";
      break;
    case "10":
      type = "DC차데모+DC콤보, AC3상";
      break;
    default:
      type = "타입 미확인";
      break;
  }
  return <p style={{ fontWeight: "600" }}>충전 타입: {type}</p>;
};

export default ChargerType;
