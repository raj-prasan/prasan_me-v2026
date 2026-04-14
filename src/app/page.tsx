import Image from "next/image";
import { ProfileHeader } from "@/components/sections/profile-header";
import { AboutMe } from "@/components/sections/about-me";
import { Skills } from "@/components/sections/skills";
export default function Home() {
  return (
    <section className="items-center gap-8 container py-3 md:py-4 space-y-12">
      <ProfileHeader isActive={false} />
      <AboutMe/>
      <Skills/>
    </section>
  );
}
