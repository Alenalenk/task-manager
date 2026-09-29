export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex justify-center items-center min-h-screen min-w-full px-5">
            <div className="container py-2 px-2">
                {children}
            </div>
        </main>
    )
}