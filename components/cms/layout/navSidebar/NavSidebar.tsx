import Section from "./Section";

import { SECTIONS } from "@/constants/cms/navSidebar";

export default function NavSidebar({
  isSidebarOpen
}: {
  isSidebarOpen: boolean;
}) {
  return (
    <aside
      className={`flex flex-col items-start justify-stretch`}
    >
      <nav
        className={`flex flex-col items-stretch justify-start pb-16 self-stretch`}
      >
        {SECTIONS.map((section, index) => (
          <Section
            icon={section.icon}
            heading={section.heading}
            headingLinkPath={
              section.headingLinkPath
            }
            links={section.links}
            isSidebarOpen={isSidebarOpen}
            key={index}
          />
        ))}
      </nav>
    </aside>
  );
}
