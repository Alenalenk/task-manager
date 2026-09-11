export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex justify-center items-center min-h-screen min-w-full py-5">
            <div className="container">
                {children}
            </div>
        </main>
    )
}