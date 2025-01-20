import { redirect } from "react-router";

export async function authLoader() {
 if (localStorage.getItem("token")) {
  return redirect("/");
 }
 return {};
}
