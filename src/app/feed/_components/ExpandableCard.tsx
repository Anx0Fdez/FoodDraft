"use client";

import { ProjectStatusCard } from "@/components/ui/expandable-card"

export default function ExpandableCardBasic() {
  return (
    <ProjectStatusCard
      title="UI Component Library"
      progress={75}
      dueDate="Jan 15, 2024"
      contributors={[
        { name: "Sarah" },
        { name: "Mike" },
        { name: "Alex" }
      ]}
      tasks={[
        { title: "Update Button Components", completed: true },
        { title: "Add Dark Mode Support", completed: true },
        { title: "Write Documentation", completed: false }
      ]}
      githubStars={128}
      openIssues={5}
    />
  )
}