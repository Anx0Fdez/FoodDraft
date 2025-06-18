// Layout general para la sección de recetario. Envuelve el contenido de la ruta recetario.
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full">
            {children}
        </main>
    )
}