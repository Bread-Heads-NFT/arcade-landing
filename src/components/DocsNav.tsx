import Link from 'next/link'

export default function DocsNav() {
    return (
        <nav className="w-64 p-4 border-r border-gray-200">
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">Getting Started</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/docs/quickstart" className="text-blue-600 hover:text-blue-800">
                                Quick Start Guide
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/features" className="text-blue-600 hover:text-blue-800">
                                Features Overview
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">User Guide</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/docs/user-guide" className="text-blue-600 hover:text-blue-800">
                                User Guide
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/support" className="text-blue-600 hover:text-blue-800">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
} 