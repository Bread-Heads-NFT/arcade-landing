// import DocsNav from '@/components/DocsNav'

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* <DocsNav /> */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
} 