import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { roles } from "@/lib/room/constants";

export default function Page() {
  async function submit(data) {
    "use server";

    const username = data.get("username");
    const role = data.get("role");
    const room = data.get("room");
    const uuid = uuidv4();

    if (username && role) {
      cookies().set("username", username.toString());
      cookies().set("role", role.toString());
      cookies().set("room", room.toString());
      cookies().set("uuid", uuid);
      cookies().set("registered", true);

      redirect("/room");
    }
  }

  return (
    <main>
      <form action={submit}>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required autoFocus />
        </fieldset>

        <fieldset>
          <label htmlFor="role">Role</label>
          <select name="role" id="role" required>
            {Object.entries(roles).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="room">Room</label>
          <input type="text" id="room" name="room" required autoFocus />
        </fieldset>

        <button type="submit">Continue</button>
      </form>
    </main>
  );
}
