import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Planner from "./planner";

export default function Page() {
  const registered = cookies().get("registered");
  const data = Object.fromEntries(
    cookies()
      .getAll()
      .map((item) => [item.name, item.value])
  );

  if (!registered) {
    return redirect("/id");
  }

  return <Planner data={data} />;
}
