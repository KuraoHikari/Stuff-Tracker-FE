import { redirect } from "react-router";

export async function dashboardLoader() {
 if (!localStorage.getItem("token")) {
  return redirect("/auth");
 }
 return {};
}
