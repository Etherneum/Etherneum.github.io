import { redirect } from "next/navigation";

export default function SecretsRedirect() {
  redirect("/admin");
}
