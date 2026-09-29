export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex justify-center items-center min-h-screen py-5">
            <div className="container px-5">
                {children}
            </div>
        </main>
    )
}