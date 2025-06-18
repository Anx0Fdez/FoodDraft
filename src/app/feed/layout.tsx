// Layout general para la sección de feed. Envuelve el contenido de la ruta feed.
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full">
            {children}
        </main>
    )
}