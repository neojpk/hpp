import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS, controlAction, prevStory, nextStory } from "@/store/story";
import { isOwner } from "@/store/user";

import Controls from "@/components/Controls";
import { useMemo, useState } from "react";

const Story = () => {
  const dispatch = useDispatch();
  const onAction = (action) => dispatch(controlAction(action));
  const owner = useSelector(isOwner);
  const { duration, currentStory, action, key } = useSelector(
    (state) => state.story
  );

  const playing = useMemo(() => action === ACTIONS.PLAY, [action]);

  return (
    <div className="current-stories">
      <div className="current-stories_heading" style={{ gap: 32 }}>
        <div className="current-stories_headers">
          <h2>Voting: {currentStory.title}</h2>
          <h4>{currentStory.description}</h4>
        </div>
        {owner && <Controls currentAction={action} onAction={onAction} />}
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
            onComplete={() => {
              dispatch(controlAction(ACTIONS.STOP));
            }}
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
