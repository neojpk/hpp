import { useSelector } from "react-redux";
import Avatar from "@/components/Avatar";

function Participants() {
  const { participants } = useSelector((state) => state.room);
  return (
    <div className="participants_container">
      <div className="participants-headings">
        <h4>Participants: {participants.length}</h4>
        <h4>Votes</h4>
      </div>
      <ul>
        {participants.map((item, index) => (
          <Avatar name={item.username} role={item.role} votes={1} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default Participants;
