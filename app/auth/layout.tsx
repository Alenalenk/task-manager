export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <div className="container">
                {children}
            </div>
        </main>
    )
}