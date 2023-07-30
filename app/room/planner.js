"use client";

import Image from "next/image";
import clsx from "clsx";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "@/store/room";
import Story from "./story";

import Card from "@/components/Card";
import Avatar from "@/components/Avatar";

export default function Planner({ data }) {
  const dispatch = useDispatch();
  const { participants, stories, points } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(initialize(data));
  }, [dispatch, data]);

  return (
    <>
      <header>
        <div className="logo_container">
          <img
            src="images/planner-ico.svg"
            alt="Poker Planner Logo"
            srcset=""
          />
          <h1>Planing Poker</h1>
        </div>
        <div>
          <img
            src="images/profile-picture.png"
            alt="User's Profile Picture"
            className="profile_menu"
          />
        </div>
      </header>

      <main>
        <div className="stories_container">
          <Story />
          <div className="cards-container">
            {stories.map((item, idx) => (
              <Card active={idx === 0} item={item} key={idx} />
            ))}
          </div>

          <div className="approved-stories_container">
            <div className="approved-stories">
              <h3>Approved Stories</h3>
              <div className="icon-placeholder"></div>
            </div>

            <Card active={false} item={stories[0]} key={"lll"} />
          </div>
        </div>
        <div className="participants_container">
          <div className="participants-headings">
            <h4>Participants: 11</h4>
            <h4>Votes</h4>
          </div>
          <ul>
            {participants.map((item, index) => (
              <Avatar
                name={item.username}
                role={item.role}
                votes={1}
                key={index}
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
