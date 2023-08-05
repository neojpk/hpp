import {
  MdPlayCircle,
  MdStopCircle,
  MdPauseCircle,
  MdSkipPrevious,
  MdSkipNext,
  MdReplayCircleFilled,
} from "react-icons/md";
import { ACTIONS, currentEnabledActions } from "@/store/room";
import { useSelector } from "react-redux";

const BaseButton = ({ action, onAction, icon }) => (
  <button className="player-controls_button" onClick={() => onAction(action)}>
    {icon}
  </button>
);

export const Player = ({ onAction }) => {
  const enabledActions = useSelector(currentEnabledActions);

  const ActionsMap = {
    [ACTIONS.BACK]: (
      <BaseButton
        action={ACTIONS.BACK}
        onAction={onAction}
        icon={<MdSkipPrevious size={24} />}
      />
    ),
    [ACTIONS.PAUSE]: (
      <BaseButton
        action={ACTIONS.PAUSE}
        onAction={onAction}
        icon={<MdPauseCircle size={24} />}
      />
    ),
    [ACTIONS.PLAY]: (
      <BaseButton
        action={ACTIONS.PLAY}
        onAction={onAction}
        icon={<MdPlayCircle size={24} />}
      />
    ),
    [ACTIONS.STOP]: (
      <BaseButton
        action={ACTIONS.STOP}
        onAction={onAction}
        icon={<MdStopCircle size={24} />}
      />
    ),
    [ACTIONS.REPLAY]: (
      <BaseButton
        action={ACTIONS.REPLAY}
        onAction={onAction}
        icon={<MdReplayCircleFilled size={24} />}
      />
    ),
    [ACTIONS.NEXT]: (
      <BaseButton
        action={ACTIONS.NEXT}
        onAction={onAction}
        icon={<MdSkipNext size={24} />}
      />
    ),
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      className="player-controls"
    >
      {enabledActions.map((action) => ActionsMap[action])}
    </div>
  );
};

export default Player;
