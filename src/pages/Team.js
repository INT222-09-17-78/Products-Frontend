import student017 from "../images/017.png";
import student078 from "../images/078.jpg";
import student009 from "../images/009.png";
const Team = () => {
  const members = [
    {
      image: student009,
      id: "62130500009",
      name: "Kampol Thaiprecha",
      positions: ["Back-End", "Dev-ops"],
    },
    {
      image: student017,
      id: "62130500017",
      name: "Jirawath Anantheerathat",
      positions: ["Front-End"],
    },
    {
      image: student078,
      id: "62130500078",
      name: "Wajanaporn Yontrachiwa",
      positions: ["Database", "Dev-ops", "UX/UI"],
    },
  ];
  return (
    <div className="font-kanit text-gray-700">
      <span className="flex justify-center mt-10 text-3xl">&#128545; Developer &#128545;</span>
      <div className="md:flex-row md:flex md:justify-center">
        {members.map((member, i) => (
          <div key={i} className="Team flex flex-col text-lg mb-10">
            <img
              src={member.image}
              alt="NOT LOADED"
              className="mx-10 mt-10 mb-2 md:mx-2"
            />
            <div className="flex flex-col justify-center">
              <span>{member.name}</span>
              <span>{member.id}</span>
              <div className="flex flex-row justify-center">
                {member.positions.map((position, i) => (
                  <span key={i}>{position}&nbsp;&nbsp;</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Team;
