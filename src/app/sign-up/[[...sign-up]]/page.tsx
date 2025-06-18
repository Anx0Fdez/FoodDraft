// Página de registro de usuario. Muestra el formulario de registro de Clerk centrado en pantalla.
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen ">
            <SignUp />
        </div>
    )
}