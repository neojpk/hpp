import { FormEvent } from "react";
import { RoomRoles } from "@/lib/room/constants";
import styles from "./room.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  //const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
  //  ev.preventDefault();
  //  const data = new FormData(ev.currentTarget);
  //};

  async function submit(data: FormData) {
    "use server";

    const username = data.get("username");
    const role = data.get("role");

    if (username && role) {
      cookies().set("username", username.toString());
      cookies().set("role", role.toString());

      redirect("/room/100");
    }
  }

  return (
    <main className={styles.form_wrapper}>
      <form action={submit} className={styles.form}>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required autoFocus />
        </fieldset>

        <fieldset>
          <label htmlFor="role">Role</label>
          <select name="role" id="role" required>
            {Object.entries(RoomRoles).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </fieldset>

        <button type="submit">Continue</button>
      </form>
    </main>
  );
}
