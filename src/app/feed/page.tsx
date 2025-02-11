import { SignIn, UserButton } from '@clerk/nextjs'
import { DockDemo } from './_components/InteractiveDock'

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <DockDemo />
        </div>
    )
}