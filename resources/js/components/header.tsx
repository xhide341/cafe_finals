import { SidebarTrigger } from '@/components/ui/sidebar';
import { login } from '@/routes';
import { Link } from '@inertiajs/react';

interface HeaderProps {
    variant?: 'glassy' | 'solid';
}

export function Header({ variant = 'glassy' }: HeaderProps) {
    const baseClasses =
        'fixed top-0 right-0 left-0 z-50 w-full border-b border-[#593A2F] font-poppins shadow-[0_8px_30px_rgba(89,58,47,0.05)]';
    const variantClasses =
        variant === 'glassy'
            ? 'bg-[rgba(245,241,232,0.25)] backdrop-blur-xl'
            : 'bg-[#F5F1E8]';

    return (
        <header className={`${baseClasses} ${variantClasses}`}>
            <div className="mx-auto w-full px-4 py-5 sm:px-8 md:px-20">
                <div className="flex items-center justify-between">
                    {/* Desktop Centered Navigation */}
                    <nav className="hidden items-center gap-4 lg:flex lg:flex-1 lg:justify-start lg:gap-8">
                        <Link
                            href="/"
                            className="text-lg font-medium text-coffee-primary hover:text-[#6B5444]"
                        >
                            Home
                        </Link>
                        <Link
                            href="#about"
                            className="text-lg font-medium text-coffee-primary hover:text-[#6B5444]"
                        >
                            About
                        </Link>
                        <Link
                            href="#stores"
                            className="text-lg font-medium text-coffee-primary hover:text-[#6B5444]"
                        >
                            Stores
                        </Link>
                        <Link
                            href="#contact"
                            className="text-lg font-medium text-coffee-primary hover:text-[#6B5444]"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right side: Auth links - Desktop only */}
                    <div className="ml-auto hidden items-center gap-4 lg:flex">
                        <span className="text-sm font-medium text-coffee-primary sm:text-base">
                            Store admin?{' '}
                            <Link
                                href={login()}
                                className="text-blue-600 underline hover:text-blue-700"
                            >
                                Login
                            </Link>
                        </span>
                    </div>

                    {/* Mobile Sidebar Trigger - Right side */}
                    <div className="ml-auto lg:hidden">
                        <SidebarTrigger className="h-10 w-10 text-coffee-primary hover:bg-[#E8DCC8]" />
                    </div>
                </div>
            </div>
        </header>
    );
}
