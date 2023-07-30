import { MdSchedule, MdRocketLaunch, MdLink } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { vote } from "@/store/room";
const Card = ({ active, item }) => {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.room.points);
  const cardClassName = active ? "cards active-card" : "cards inactive-card";

  return (
    <div className={cardClassName}>
      <div className="cards-heading">
        <h3>{item?.title}</h3>
        {active ? (
          <div id="current-card-icon">
            <MdRocketLaunch size={24} />
          </div>
        ) : (
          <div className="inactive-card-icon">
            <MdSchedule size={24} />
          </div>
        )}
      </div>

      <h4 className="card-description">{item?.description}</h4>

      <div className="cards-points">
        {points.map((number) => (
          <div
            key={number}
            className="story-points"
            onClick={() => dispatch(vote(number))}
          >
            <p className="points_upper-left">{number}</p>
            <h3 className="points_center">{number}</h3>
            <p className="points_bottom-right">{number}</p>
          </div>
        ))}
      </div>

      <a href="#" className="check-story">
        Check Story
        <MdLink size={24} />
      </a>
    </div>
  );
};

export default Card;
