"use client";

import Image from "next/image";
import clsx from "clsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "@/store/room";
import Stories from "@/app/room/stories";
import Participants from "@/app/room/participants";

export default function Planner({ data }) {
  const dispatch = useDispatch();

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
        <Stories />
        <Participants />
      </main>
    </>
  );
}
