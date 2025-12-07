import { GuestSidebar } from '@/components/guest-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { login } from '@/routes';
import { type SharedData } from '@/types';
import { useGSAP } from '@gsap/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { MeshGradient } from '@paper-design/shaders-react';
import { gsap } from 'gsap';
import { SlowMo } from 'gsap/EasePack';
import { useRef, useState } from 'react';
import cafeLogo from '../../assets/images/cafe-logo.png';

gsap.registerPlugin(useGSAP, SlowMo);

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [speed, setSpeed] = useState(1);

    // Refs for GSAP animation targets
    const bigTextRef = useRef<HTMLHeadingElement>(null);
    const bigBgRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const heroSubtext1Ref = useRef<HTMLHeadingElement>(null);
    const heroSubtext2Ref = useRef<HTMLHeadingElement>(null);
    const heroTitleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // GSAP Timeline for smooth intro animation
        const tl = gsap.timeline({
            // defaults: { ease: 'power1.inOut' },
        });

        // Initial states
        gsap.set(bigBgRef.current, { opacity: 1, yPercent: 0 });
        gsap.set(bigTextRef.current, { yPercent: 360, opacity: 0 });
        gsap.set(headerRef.current, { y: -100, opacity: 0 });
        // Start hero subtexts hidden (opacity 0) and translated down
        gsap.set(heroSubtext1Ref.current, { y: 200, opacity: 0 });
        gsap.set(heroSubtext2Ref.current, { y: 200, opacity: 0 });
        gsap.set(heroTitleRef.current, { opacity: 0, y: 20 });
        gsap.set(contentRef.current, { opacity: 0, y: 50 });
        // gsap.set(bgRef.current, { backgroundColor: '#000' });

        // Animation sequence
        tl.to(bigTextRef.current, {
            yPercent: 0, // Land perfectly centered
            duration: 3,
            ease: 'power2.inOut',
            opacity: 1,
        })
            // Group B: slide everything up and off screen
            .to(bigTextRef.current, {
                yPercent: -320, // Disappear off the top more aggressively
                duration: 1.4,
                ease: 'power2.inOut',
            })
            .to(
                bigBgRef.current,
                {
                    yPercent: -150,
                    duration: 2,
                    ease: 'power2.inOut',
                },
                '<', // start at same time
            )
            // place the label slightly before Group B finishes so
            // header + hero subtexts can start overlapping with the last
            // big-hero movement (start 'heroReady' 1.2s early)
            .addLabel('heroReady', '-=0.5')
            .to(
                headerRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                },
                'heroReady', // start 1.8s after previous tween
            )
            .to(
                heroSubtext1Ref.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power2.out',
                },
                '-=1.0', // overlap with header
            )
            .to(
                heroSubtext2Ref.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.37,
                    ease: 'power2.out',
                },
                '-=1.3', // overlap with heroSubtext1 for simultaneous effect
            )
            .to(
                heroTitleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=1.2', // start after subtexts
            )
            .to(
                contentRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                },
                '-=1.2', // start after title
            )
            .set(bigTextRef.current, { opacity: 0 })
            .set(bigBgRef.current, { opacity: 0 });
    }, []);

    return (
        <>
            <Head title="Welcome to Cafe Rencontre" />
            {/* Hide scrollbar for all browsers */}
            <style>{`
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    /* Hide scrollbar for IE, Edge and Firefox */
                    body {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;     /* Firefox */
                    }
                `}</style>
            <SidebarProvider>
                <div className="lg:hidden">
                    <GuestSidebar />
                </div>
                <div
                    ref={bgRef}
                    className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden"
                >
                    {/* Big Text Background (dark, moves with text) */}
                    <div
                        ref={bigBgRef}
                        className="pointer-events-none fixed top-0 right-0 left-0 z-30 h-[200vh]"
                        style={{ background: '#F5F1E8' }}
                    />

                    {/* Header/Navigation - Hidden during intro, fades in after animation */}
                    <header
                        ref={headerRef}
                        className="fixed top-0 right-0 left-0 z-50 w-full border-b border-[#593A2F] bg-[rgba(245,241,232,0.25)] font-poppins shadow-[0_8px_30px_rgba(89,58,47,0.05)] backdrop-blur-xl"
                    >
                        <div className="mx-auto w-full px-4 py-5 sm:px-8 md:px-20">
                            <div className="flex items-center justify-between">
                                {/* Desktop Centered Navigation */}
                                <nav className="hidden items-center gap-4 lg:flex lg:flex-1 lg:justify-start lg:gap-8">
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
                                        href="#collaborations"
                                        className="text-lg font-medium text-coffee-primary hover:text-[#6B5444]"
                                    >
                                        Collaborations
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

                    {/* Background Shader - Full page coverage */}
                    <div className="fixed inset-0 z-0 h-full w-full">
                        <MeshGradient
                            className="h-full w-full"
                            colors={[
                                '#F5F1E8',
                                '#E8DCC8',
                                '#D4C4A8',
                                '#8B7355',
                            ]}
                            speed={speed}
                        />
                        {/* Lighting overlay effects */}
                        <div className="pointer-events-none absolute inset-0">
                            <div
                                className="absolute top-1/4 left-1/3 h-32 w-32 animate-pulse rounded-full bg-[#593A2F]/5 blur-3xl"
                                style={{
                                    animationDuration: `${3 / speed}s`,
                                }}
                            />
                            <div
                                className="absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-full bg-[#8B7355]/10 blur-2xl"
                                style={{
                                    animationDuration: `${2 / speed}s`,
                                    animationDelay: '1s',
                                }}
                            />
                            <div
                                className="absolute top-1/2 right-1/3 h-20 w-20 animate-pulse rounded-full bg-[#593A2F]/8 blur-xl"
                                style={{
                                    animationDuration: `${4 / speed}s`,
                                    animationDelay: '0.5s',
                                }}
                            />
                        </div>
                    </div>

                    {/* Auto-Scrolling Parallax Hero Section */}
                    <section className="relative min-h-screen">
                        {/* Big "Rencontre" Text - Animated by GSAP, moves with its own background */}
                        <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex h-screen items-center justify-center">
                            <h1
                                ref={bigTextRef}
                                className="text-[7rem] font-bold text-[#8B7355] select-none md:text-[10rem] lg:text-[14rem]"
                                style={{
                                    fontFamily: "'Dancing Script', cursive",
                                    lineHeight: '1',
                                }}
                            >
                                Cafe Rencontre
                            </h1>
                        </div>

                        {/* Main Hero Content - New layout with logo/title and big subtext */}
                        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20">
                            {/* Centered Logo Placeholder */}
                            <div className="mb-2 flex items-center justify-center">
                                <img
                                    src={cafeLogo}
                                    alt="Cafe Logo Centered"
                                    className="h-16 w-16 rounded-full object-cover sm:h-40 sm:w-40 md:h-24 md:w-24"
                                />
                            </div>

                            {/* Big Bold Subtext - Main Focus with overflow hidden for reveal effect */}
                            <div className="w-full overflow-hidden">
                                <h1
                                    ref={heroSubtext1Ref}
                                    className="text-center text-3xl leading-tight font-black text-coffee-primary uppercase sm:text-5xl md:text-7xl lg:text-8xl xl:text-[9.5rem]"
                                >
                                    Coffee Roasted
                                </h1>
                            </div>
                            <div className="w-full overflow-hidden">
                                <h1
                                    ref={heroSubtext2Ref}
                                    className="text-center text-3xl leading-tight font-black text-coffee-primary uppercase sm:text-5xl md:text-7xl lg:text-8xl xl:text-[9.5rem]"
                                >
                                    With Perfection
                                </h1>
                            </div>

                            {/* Additional Content */}
                            <div
                                ref={contentRef}
                                className="mt-8 w-full max-w-xl space-y-6 text-center sm:mt-10 sm:max-w-3xl"
                            >
                                <p className="text-lg leading-relaxed font-semibold text-[#6B5444] sm:text-2xl md:text-3xl">
                                    Precision in every pour. Passion in every
                                    sip.{' '}
                                    <span className="whitespace-nowrap">
                                        No shortcuts.
                                    </span>{' '}
                                    Just coffee done right.
                                </p>
                                <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:flex-wrap sm:justify-center">
                                    {!auth.user && (
                                        <>
                                            <Link
                                                href="/shop"
                                                className="rounded-full bg-coffee-primary px-8 py-3 text-base font-medium text-[#F5F1E8] transition-colors hover:bg-coffee-dark hover:text-white sm:px-10 sm:py-4 sm:text-lg"
                                            >
                                                View Store
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-[#593A2F] bg-[rgba(245,241,232,0.25)] px-6 py-6 text-center text-coffee-primary shadow-[0_-8px_30px_rgba(89,58,47,0.05)] backdrop-blur-xl">
                        <p className="font-poppins text-sm">
                            &copy; {new Date().getFullYear()} Cafe Rencontre.
                            All rights reserved.
                        </p>
                    </footer>
                </div>
            </SidebarProvider>
        </>
    );
}
