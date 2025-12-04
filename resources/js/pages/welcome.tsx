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
import bigImg from '../../assets/images/coffee-bg.png';

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
    const bigImgRef = useRef<HTMLDivElement>(null); // New: big image ref
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
        gsap.set(bigTextRef.current, { yPercent: 400, opacity: 1 });
        gsap.set(bigImgRef.current, { yPercent: 400, opacity: 0 }); // Start hidden
        gsap.set(headerRef.current, { y: -100, opacity: 0 });
        // Start hero subtexts hidden (opacity 0) and translated down
        gsap.set(heroSubtext1Ref.current, { y: 200, opacity: 0 });
        gsap.set(heroSubtext2Ref.current, { y: 200, opacity: 0 });
        gsap.set(heroTitleRef.current, { opacity: 0, y: 20 });
        gsap.set(contentRef.current, { opacity: 0, y: 50 });
        // gsap.set(bgRef.current, { backgroundColor: '#000' });

        // Animation sequence
        tl.to(bigTextRef.current, {
            yPercent: -60, // Scroll to center
            duration: 3,
            ease: 'power3.inOut',
        })
            .to(
                bigImgRef.current,
                {
                    yPercent: 30, // Parallax: slightly slower than text
                    duration: 3, // Slightly slower for parallax
                    ease: 'power3.inOut',
                    opacity: 1, // Fade in as it moves
                },
                '<',
            )
            // .to(
            //     bigImgRef.current,
            //     {
            //         yPercent: 30, // Slightly below center during pause
            //         duration: 0.5,
            //         ease: 'none',
            //     },
            //     '<',
            // )
            // Group B: slide everything up and off screen
            .to(bigTextRef.current, {
                yPercent: -400, // Disappear off the top
                duration: 1.4,
                ease: 'power2.inOut',
            })
            .to(
                bigImgRef.current,
                {
                    yPercent: -180, // slide up with the text
                    duration: 2.0,
                    ease: 'power2.inOut',
                },
                '<', // start at same time as text
            )
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
            .set(bigImgRef.current, { opacity: 0 })
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
                    {/* Big Image Behind BigText (parallax, eaten by bigBg) */}
                    <div
                        ref={bigImgRef}
                        className="pointer-events-none fixed top-0 left-1/2 z-35 flex items-center justify-center overflow-clip"
                        style={{
                            transform: 'translateX(-50%)',
                            width: '80vw',
                            height: '100vh',
                            top: '10vh',
                            opacity: 1,
                            overflow: 'hidden',
                            position: 'fixed',
                        }}
                    >
                        {/* Image */}
                        <img
                            src={bigImg}
                            alt="Cafe Parallax"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '1rem',
                                boxShadow: '0 8px 32px rgba(45,34,23,0.15)',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        />

                        {/* Coffee-colored Overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '1rem',
                                background: 'rgba(70, 45, 25, 0.35)', // warm coffee tint
                                mixBlendMode: 'multiply', // blends naturally with photo
                                zIndex: 2,
                            }}
                        ></div>
                    </div>

                    {/* Big Text Background (dark, moves with text) */}
                    <div
                        ref={bigBgRef}
                        className="pointer-events-none fixed top-0 right-0 left-0 z-30 h-[200vh]"
                        style={{ background: '#F5F1E8' }}
                    />

                    {/* Header/Navigation - Hidden during intro, fades in after animation */}
                    <header
                        ref={headerRef}
                        className="fixed top-0 right-0 left-0 z-50 w-full border-b-1 border-[#593A2F] bg-[#F5F1E8]"
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
                                            className="text-coffee-primary underline hover:text-[#6B5444]"
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

                    {/* Auto-Scrolling Parallax Hero Section */}
                    <section className="relative min-h-screen">
                        {/* Background Shader */}
                        <div className="absolute inset-0 z-0 h-full w-full">
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
                                Rencontre
                            </h1>
                        </div>

                        {/* Main Hero Content - New layout with logo/title and big subtext */}
                        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
                            {/* Centered Logo Placeholder */}
                            <div className="mb-8 flex items-center justify-center">
                                <img
                                    src="https://placehold.co/120x120/8B7355/F5F1E8?text=Logo"
                                    alt="Cafe Logo Centered"
                                    className="h-20 w-20 rounded-full border-4 border-[#593A2F] shadow-lg sm:h-28 sm:w-28"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Big Bold Subtext - Main Focus with overflow hidden for reveal effect */}
                            <div className="w-full overflow-hidden">
                                <h1
                                    ref={heroSubtext1Ref}
                                    className="text-center text-3xl leading-tight font-black text-coffee-primary uppercase sm:text-5xl md:text-7xl lg:text-8xl"
                                >
                                    Coffee Roasted
                                </h1>
                            </div>
                            <div className="w-full overflow-hidden">
                                <h1
                                    ref={heroSubtext2Ref}
                                    className="text-center text-3xl leading-tight font-black text-coffee-primary uppercase sm:text-5xl md:text-7xl lg:text-8xl"
                                >
                                    With Perfection
                                </h1>
                            </div>

                            {/* Additional Content */}
                            <div
                                ref={contentRef}
                                className="mt-10 w-full max-w-xl space-y-6 text-center sm:mt-16 sm:max-w-3xl"
                            >
                                <p className="text-lg leading-relaxed font-semibold text-[#6B5444] sm:text-2xl md:text-3xl">
                                    Precision in every pour. Passion in every
                                    sip. No shortcuts. Just coffee done right.
                                </p>
                                <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:flex-wrap sm:justify-center">
                                    {!auth.user && (
                                        <>
                                            <Link
                                                href="/shop"
                                                className="rounded-full border-2 border-[#593A2F] bg-[#593A2F] px-8 py-3 text-base font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8] hover:text-coffee-primary sm:px-10 sm:py-4 sm:text-lg"
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
                    <footer className="border-t-2 border-[#593A2F] bg-[#F5F1E8] px-6 py-8 text-center text-coffee-primary">
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} Cafe Rencontre.
                            All rights reserved.
                        </p>
                    </footer>
                </div>
            </SidebarProvider>
        </>
    );
}
