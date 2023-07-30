import {
  MdPlayCircle,
  MdPauseCircle,
  MdSkipPrevious,
  MdSkipNext,
  MdReplayCircleFilled,
} from "react-icons/md";
import { ACTIONS, prevStory, nextStory } from "@/store/story";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ActionButton({ icon, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
}

function Controls({ currentAction, onAction }) {
  const BaseControls = ({ children }) => (
    <>
      <ActionButton
        onClick={() => onAction(ACTIONS.BACK)}
        icon={<MdSkipPrevious size={24} />}
      />
      {children}
      <ActionButton
        onClick={() => onAction(ACTIONS.NEXT)}
        icon={<MdSkipNext size={24} />}
      />
    </>
  );

  const render = () => {
    switch (currentAction) {
      case ACTIONS.PAUSE:
        return (
          <ActionButton
            onClick={() => onAction(ACTIONS.PLAY)}
            icon={<MdPlayCircle size={24} />}
          />
        );
      case ACTIONS.PLAY:
        return (
          <ActionButton
            onClick={() => onAction(ACTIONS.PAUSE)}
            icon={<MdPauseCircle size={24} />}
          />
        );
      case ACTIONS.STOP:
        return (
          <ActionButton
            onClick={() => onAction(ACTIONS.REPLAY)}
            icon={<MdReplayCircleFilled size={24} />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      className="current-stories_controls"
    >
      <BaseControls>{render()}</BaseControls>
    </div>
  );
}

export default Controls;
