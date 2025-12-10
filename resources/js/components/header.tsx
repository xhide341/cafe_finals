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
            {/* Custom underline animation styles */}
            <style>{`
                .nav-underline {
                    position: relative;
                    overflow: visible;
                }
                .nav-underline::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: -2px;
                    width: 0;
                    height: 2px;
                    background: #8B7355;
                    transition: width 0.35s cubic-bezier(.4,0,.2,1), left 0.35s cubic-bezier(.4,0,.2,1);
                    z-index: 1;
                }
                .nav-underline:hover::after {
                    width: 100%;
                    left: 0;
                }
            `}</style>
            <div className="mx-auto w-full px-4 py-5 sm:px-8 md:px-20">
                <div className="flex items-center justify-between">
                    {/* Desktop Centered Navigation */}
                    <nav className="hidden items-center gap-4 lg:flex lg:flex-1 lg:justify-start lg:gap-8">
                        <Link
                            href="/"
                            className="nav-underline text-lg font-medium text-coffee-primary hover:text-coffee-dark"
                        >
                            Home
                        </Link>
                        <Link
                            href="#about"
                            className="nav-underline text-lg font-medium text-coffee-primary hover:text-coffee-dark"
                        >
                            About
                        </Link>
                        <Link
                            href="#stores"
                            className="nav-underline text-lg font-medium text-coffee-primary hover:text-coffee-dark"
                        >
                            Stores
                        </Link>
                        <Link
                            href="#contact"
                            className="nav-underline text-lg font-medium text-coffee-primary hover:text-coffee-dark"
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
                                className="text-blue-700 underline hover:text-blue-800"
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
