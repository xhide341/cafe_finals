import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { useGSAP } from '@gsap/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';
import { SlowMo } from 'gsap/EasePack';
import { Award } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, SlowMo);

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

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
                    duration: 2.7, // Slightly slower for parallax
                    ease: 'power3.inOut',
                    opacity: 1, // Fade in as it moves
                },
                '<',
            )
            .to(
                bigImgRef.current,
                {
                    yPercent: 30, // Slightly below center during pause
                    duration: 0.5,
                    ease: 'none',
                },
                '<',
            )
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
                    ease: 'power4.out',
                },
                '-=1.0', // overlap with header
            )
            .to(
                heroSubtext2Ref.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.37,
                    ease: 'power4.out',
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
            );
    }, []);

    return (
        <>
            <Head title="Welcome to Cafe Rencontre" />
            <div
                ref={bgRef}
                className="relative min-h-screen overflow-x-hidden"
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
                    }}
                >
                    <img
                        src="https://placehold.co/1200x400/027373/F5F1E8?text=Cafe+Big+Image"
                        alt="Cafe Parallax"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '1rem 1rem 1rem 1rem',
                            boxShadow: '0 8px 32px rgba(45,34,23,0.15)',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    />
                </div>

                {/* Big Text Background (dark, moves with text) */}
                <div
                    ref={bigBgRef}
                    className="pointer-events-none fixed top-0 right-0 left-0 z-30 h-[200vh]"
                    style={{ background: '#000' }}
                />

                {/* Header/Navigation - Hidden during intro, fades in after animation */}
                <header
                    ref={headerRef}
                    className="fixed top-0 right-0 left-0 z-50 w-full border-b-2 border-primary bg-[#F5F1E8]"
                >
                    <div className="mx-auto w-full px-20 py-5">
                        <div className="flex items-center justify-between">
                            {/* Logo on the left */}
                            <div className="flex items-center">
                                <img
                                    src="https://placehold.co/60x60/8B7355/F5F1E8?text=Logo"
                                    alt="Cafe Logo"
                                    className="h-12 w-12 rounded-full border-2 border-primary shadow-md"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Centered Navigation */}
                            <nav className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6">
                                <Link
                                    href="#about"
                                    className="text-lg font-medium text-primary hover:text-[#6B5444]"
                                >
                                    About
                                </Link>
                                <Link
                                    href="#stores"
                                    className="text-lg font-medium text-primary hover:text-[#6B5444]"
                                >
                                    Stores
                                </Link>
                                <Link
                                    href="#collaborations"
                                    className="text-lg font-medium text-primary hover:text-[#6B5444]"
                                >
                                    Collaborations
                                </Link>
                                <Link
                                    href="#contact"
                                    className="text-lg font-medium text-primary hover:text-[#6B5444]"
                                >
                                    Contact
                                </Link>
                            </nav>

                            <nav className="ml-auto flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-full border-2 border-primary bg-primary px-6 py-2 font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8] hover:text-primary"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="px-6 py-2 font-medium text-primary transition-colors hover:text-[#6B5444]"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="rounded-full border-2 border-primary bg-primary px-6 py-2 font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8] hover:text-primary"
                                            >
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

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
                            Rencontre
                        </h1>
                    </div>

                    {/* Main Hero Content - New layout with logo/title and big subtext */}
                    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
                        {/* Logo and Title at Top */}

                        {/* Hero Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-primary/50 bg-primary/10 px-4 py-2">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="text-sm font-semibold tracking-wide text-primary uppercase">
                                Award-Winning Specialty Coffee
                            </span>
                        </div>

                        {/* Big Bold Subtext - Main Focus with overflow hidden for reveal effect */}
                        <div className="overflow-hidden">
                            <h1
                                ref={heroSubtext1Ref}
                                className="text-center text-5xl leading-tight font-black text-primary uppercase md:text-7xl lg:text-9xl"
                            >
                                Coffee Roasted
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                ref={heroSubtext2Ref}
                                className="text-center text-5xl leading-tight font-black text-primary uppercase md:text-7xl lg:text-9xl"
                            >
                                With Perfection
                            </h1>
                        </div>

                        {/* Additional Content */}
                        <div
                            ref={contentRef}
                            className="mt-16 max-w-3xl space-y-6 text-center"
                        >
                            <p className="text-3xl leading-relaxed font-semibold text-[#6B5444]">
                                Precision in every pour. Passion in every sip.
                                No shortcuts. Just coffee done right.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 pt-4">
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={register()}
                                            className="rounded-full border-2 border-primary bg-primary px-10 py-4 text-lg font-medium text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8] hover:text-primary"
                                        >
                                            Join Us Today
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="rounded-full border-2 border-primary px-10 py-4 text-lg font-medium text-primary transition-colors hover:bg-primary hover:text-[#F5F1E8]"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="border-t-2 border-primary bg-[#F5F1E8] px-6 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <h3
                            className="mb-12 text-center text-4xl font-bold text-[#6B5444]"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Why Choose Cafe Rencontre?
                        </h3>
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="space-y-4 p-6 text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-[#F5F1E8]">
                                    <img
                                        src="https://placehold.co/50x50/F5F1E8/8B7355?text=☕"
                                        alt="Coffee"
                                        className="h-12 w-12"
                                    />
                                </div>
                                <h4
                                    className="text-2xl font-bold text-[#6B5444]"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                    }}
                                >
                                    Premium Coffee
                                </h4>
                                <p className="text-[#8B7355]">
                                    Sourced from the finest beans around the
                                    world, our coffee is expertly brewed to
                                    perfection.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="space-y-4 p-6 text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-[#F5F1E8]">
                                    <img
                                        src="https://placehold.co/50x50/F5F1E8/8B7355?text=🥐"
                                        alt="Pastries"
                                        className="h-12 w-12"
                                    />
                                </div>
                                <h4
                                    className="text-2xl font-bold text-[#6B5444]"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                    }}
                                >
                                    Fresh Pastries
                                </h4>
                                <p className="text-[#8B7355]">
                                    Handcrafted pastries and treats baked fresh
                                    every morning by our artisan bakers.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="space-y-4 p-6 text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-[#F5F1E8]">
                                    <img
                                        src="https://placehold.co/50x50/F5F1E8/8B7355?text=🏡"
                                        alt="Ambiance"
                                        className="h-12 w-12"
                                    />
                                </div>
                                <h4
                                    className="text-2xl font-bold text-[#6B5444]"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                    }}
                                >
                                    Cozy Ambiance
                                </h4>
                                <p className="text-[#8B7355]">
                                    A warm, inviting space perfect for work,
                                    meetings, or catching up with friends.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="border-t-2 border-primary bg-[#F5F1E8] px-6 py-20">
                    <div className="container mx-auto max-w-4xl space-y-6 text-center">
                        <h3
                            className="text-4xl font-bold text-primary md:text-5xl"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Ready to Experience the Magic?
                        </h3>
                        <p className="text-lg text-[#6B5444]">
                            Join our community of coffee lovers and be part of
                            something special.
                        </p>
                        {!auth.user && (
                            <div className="pt-4">
                                <Link
                                    href={register()}
                                    className="inline-block rounded-full border-2 border-primary bg-primary px-10 py-4 text-lg font-bold text-[#F5F1E8] transition-colors hover:bg-[#F5F1E8] hover:text-primary"
                                >
                                    Get Started Now
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t-2 border-primary bg-[#F5F1E8] px-6 py-8 text-center text-primary">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Cafe Rencontre. All
                        rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}
