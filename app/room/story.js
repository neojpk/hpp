import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { isOwner } from "@/store/user";
import { ACTIONS, currentStory, action } from "@/store/room";
import Player from "@/app/room/player";

const Story = () => {
  const dispatch = useDispatch();
  const onAction = (acc) => dispatch(action(acc));
  const owner = useSelector(isOwner);
  const story = useSelector(currentStory);
  const { duration, key, currentAction } = useSelector((state) => state.room);

  const playing = useMemo(
    () => currentAction === ACTIONS.PLAY,
    [currentAction]
  );

  return (
    <div className="current-stories">
      <div className="current-stories_heading" style={{ gap: 32 }}>
        <div className="current-stories_headers">
          <h2>Voting: {story?.title}</h2>
          <h4>{story?.description}</h4>
        </div>
        {owner && <Player onAction={onAction} />}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CountdownCircleTimer
            key={key}
            size={48}
            trailStrokeWidth={0}
            strokeWidth={6}
            isPlaying={playing}
            duration={duration}
            colors={[["#93cbb4"]]}
            onComplete={() => dispatch(action(ACTIONS.STOP))}
            onUpdate={(remainingTime) => {
              console.log("Remaining time is ", remainingTime);
            }}
          >
            {({ remainingTime }) => (
              <div className="timer">
                <div className="timer-text">{remainingTime}</div>
                <div className="timer-progress-bar">
                  <div
                    className="timer-progress"
                    style={{
                      strokeDashoffset: `calc(100 - ${
                        remainingTime / (duration / 100)
                      }% * 100)`,
                    }}
                  />
                </div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
};

export default Story;
