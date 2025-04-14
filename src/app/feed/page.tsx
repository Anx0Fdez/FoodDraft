import { SignIn, UserButton } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'
import { User } from 'lucide-react'
import { ProjectStatusCard } from '@/components/ui/expandable-card'

export default function Page() {
    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex justify-center">
                <ProjectStatusCard 
                    title="Proyecto Ejemplo"
                    progress={75}
                    dueDate="2024-04-30"
                    contributors={[
                        { name: "Usuario 1" },
                        { name: "Usuario 2" }
                    ]}
                    tasks={[
                        { title: "Tarea 1", completed: true },
                        { title: "Tarea 2", completed: false }
                    ]}
                    githubStars={42}
                    openIssues={5}
                />
            </div>

            <div className="flex justify-center">
                <DockDemo />
            </div>
        </div>
    )
}