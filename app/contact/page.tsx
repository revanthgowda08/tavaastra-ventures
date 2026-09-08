import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your interior design or fit-out project with Tavaastra Ventures in Bengaluru. Call, email, or share your project brief with our team.",
};

export default function ContactPage() {
  return <Contact />;
}
