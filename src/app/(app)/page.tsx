import getRoutes from "@/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(getRoutes().home.path());
}
