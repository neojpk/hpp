import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card";
import Story from "./story";

function Stories() {
  const { stories, story } = useSelector((state) => state.room);

  const remaining = useMemo(
    () => stories.slice(story, stories.length),
    [stories, story]
  );
  const approved = useMemo(() => stories.slice(0, story), [stories, story]);

  return (
    <div className="stories_container">
      <Story />
      <div className="cards-container">
        {remaining.map((item, idx) => (
          <Card active={idx === 0} item={item} key={idx} />
        ))}
      </div>

      <div className="approved-stories_container">
        <div className="approved-stories">
          <h3>Approved Stories</h3>
          <div className="icon-placeholder"></div>
        </div>
        <div className="cards-container">
          {approved.map((item, idx) => (
            <Card active={false} item={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stories;
