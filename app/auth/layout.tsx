export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex justify-center items-center min-h-screen py-5">
            <div className="container">
                {children}
            </div>
        </main>
    )
}