// Página de inicio de sesión. Muestra el formulario de inicio de sesión de Clerk centrado en pantalla.
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    )
}