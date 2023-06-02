import { RoomProvider } from "@/lib/room/context";
import styles from "./../room.module.css";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({
  children,
  params, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies();

  if (!cookie.has("username") && !cookie.has("role")) {
    redirect("/room");
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo_container}>
          <Image
            width={44}
            height={44}
            src="/images/planner-ico.svg"
            alt="Poker Planner Logo"
          />
          <h1>Planing Poker</h1>
        </div>
        <div>
          <Image
            src="/images/profile-picture.png"
            alt="User's Profile Picture"
            width={55}
            height={55}
            className={styles.profile_menu}
          />
        </div>
      </header>
      <RoomProvider
        id={params.id}
        username={cookie.get("username")?.value}
        role={cookie.get("role")?.value}
      >
        {children}
      </RoomProvider>
      ;
    </>
  );
}
