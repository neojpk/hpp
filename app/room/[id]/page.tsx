"use client";
import { FormEvent } from "react";
import Image from "next/image";
import clsx from "clsx";
import { MdSchedule, MdRocketLaunch, MdLink } from "react-icons/md";
import { useRoom } from "@/lib/room/context";
import { Rooms, RoomEvents, UserEvents, RoomRoles } from "@/lib/room/constants";
import styles from "./../room.module.css";
import { Message } from "@/types/socket";

function Participant({ user }) {
  return (
    <li className={styles.participant_item}>
      <div className={styles.profile_pic_container}>
        <Image
          width={72}
          height={72}
          src="/images/owner-picture.png"
          alt="Owner's Profile Picture"
        />
        <Image
          width={15}
          height={13}
          src="/images/owner-icon.svg"
          alt="Owner Icon"
          className={styles.owner_icon}
        />
      </div>

      <div className={styles.participant_name_votes}>
        <div className={styles.participant_name_role}>
          <h6 className="participant-name">{user.username}</h6>
          <p className="participant-role">{user.role}</p>
        </div>
        <div className={styles.participant_votes}>99</div>
      </div>
    </li>
  );
}

export default function Page() {
  const { state, dispatch, send } = useRoom();

  const message: Message = {
    to: Rooms.PARTICIPANTS,
    data: {
      val: true,
    },
  };

  return (
    <main className={styles.main}>
      <div className={styles.stories_container}>
        <div className={styles.current_stories}>
          <div className={styles.current_stories_heading}>
            <div className={styles.current_stories_headers}>
              <h2>Voting: Story Name 2</h2>
              <h4>Story description (just in case)</h4>
            </div>

            <div id="timer">
              <Image
                src="/images/round-timer.png"
                width={72}
                height={72}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className={styles.card_container}>
          <div className={clsx([styles.cards, styles.active_card])}>
            <div className={styles.card_heading}>
              <h3>Story Name 2</h3>
              <div className={styles.current_card_icon}>
                <MdRocketLaunch size={24} />
              </div>
            </div>
            <h4 className={styles.card_description}>Short description</h4>
            <div className={styles.cards_points}>
              <div className={styles.story_points}>
                <p className={styles.points_upper_left}>1</p>
                <h3 className={styles.points_center}>1</h3>
                <p className={styles.points_bottom_right}>1</p>
              </div>
            </div>
            <a href="#" className={styles.check_story}>
              Check Story <MdLink size={24} />
            </a>
          </div>

          <div className={clsx([styles.cards, styles.inactive_cards])}>
            <div className={styles.card_heading}>
              <h3>Story Name 3</h3>
              <div className={styles.inactive_card_icon}>
                <MdSchedule size={24} />
              </div>
            </div>
            <h4 className={styles.card_description}>Short description</h4>
            <div className={styles.btn_container}>
              <div className={styles.btn_boolean}>Approved</div>
              <div className={styles.btn_boolean}>Not approved</div>
            </div>

            <a href="#" className={styles.check_story}>
              Check Story <MdLink size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.participants_container}>
        <div className={styles.participants_headings}>
          <h4>Participants: 11</h4>
          <h4>Votes</h4>
        </div>

        <ul className={styles.participants}>
          {/**<Participant user={state.user} />¨**/}
          {state.room.participants.map((user, idx) => (
            <Participant key={idx} user={user} />
          ))}
        </ul>
      </div>
    </main>
  );
}
