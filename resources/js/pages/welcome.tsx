import CountUp from '@/components/count-up';
import { Footer } from '@/components/footer';
import { Gallery4 } from '@/components/gallery4';
import { GuestSidebar } from '@/components/guest-sidebar';
import { Header } from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { stores } from '@/data/stores';
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
    const [hasAnimated, setHasAnimated] = useState(false);

    // Refs for GSAP animation targets
    const bigTextRef = useRef<HTMLHeadingElement>(null);
    const bigBgRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const heroSubtext1Ref = useRef<HTMLHeadingElement>(null);
    const heroSubtext2Ref = useRef<HTMLHeadingElement>(null);
    const heroTitleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Always force light mode on mount
    useGSAP(() => {
        // Check if animation has already been played in this session
        // const animationPlayed = sessionStorage.getItem(
        //     'welcomeAnimationPlayed',
        // );
        const animationPlayed = String(false);

        if (animationPlayed === 'true') {
            // Skip animation, show everything immediately
            gsap.set(bigBgRef.current, { opacity: 0 });
            gsap.set(bigTextRef.current, { opacity: 0 });
            gsap.set(headerRef.current, { y: 0, opacity: 1 });
            gsap.set(heroSubtext1Ref.current, { y: 0, opacity: 1 });
            gsap.set(heroSubtext2Ref.current, { y: 0, opacity: 1 });
            gsap.set(heroTitleRef.current, { opacity: 1, y: 0 });
            gsap.set(contentRef.current, { opacity: 1, y: 0 });
            setHasAnimated(true);
            return;
        }

        // GSAP Timeline for smooth intro animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Mark animation as played in session storage
                // sessionStorage.setItem('welcomeAnimationPlayed', 'true');
                setHasAnimated(true);
            },
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
            // big-hero movement (start 'heroReady' 0.5s early)
            .addLabel('heroReady', '-=0.5')
            .to(
                headerRef.current,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                },
                'heroReady',
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
                    /* Smooth scroll behavior */
                    html {
                        scroll-behavior: smooth;
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

                    {/* Header/Navigation - Animated wrapper */}
                    <div ref={headerRef} className="relative z-50">
                        <Header variant="glassy" />
                    </div>

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
                                <p className="text-lg leading-relaxed font-semibold text-coffee-dark sm:text-2xl md:text-3xl">
                                    Precision in every pour. Passion in every
                                    sip.{' '}
                                    <span className="whitespace-nowrap">
                                        No shortcuts.
                                    </span>{' '}
                                    Just coffee done right.
                                </p>
                                <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:flex-wrap sm:justify-center">
                                    <Link
                                        href="/shop"
                                        className="rounded-full bg-coffee-primary px-8 py-3 text-base font-medium text-[#F5F1E8] transition-colors hover:bg-coffee-dark hover:text-white sm:px-10 sm:py-4 sm:text-lg"
                                    >
                                        View Store
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section
                        id="about"
                        className="relative min-h-screen bg-[#F5F1E8] px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-24"
                    >
                        {/* Coffee bean pattern background */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z' fill='%23593A2F' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                backgroundSize: '60px 60px',
                            }}
                        />

                        {/* Subtle gradient overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#E8DCC8]/30 via-transparent to-[#D4C4A8]/20" />

                        <div className="relative z-10 mx-auto w-full max-w-6xl">
                            {/* Main Heading */}
                            <div className="mb-8 text-center sm:mb-10 md:mb-12">
                                <h2 className="mb-3 text-3xl leading-tight font-black text-coffee-primary uppercase sm:mb-4 sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
                                    Our Story
                                </h2>
                                <div className="mx-auto h-0.5 w-20 bg-[#8B7355] sm:h-1 sm:w-24 md:w-32" />
                            </div>

                            {/* Content Grid */}
                            <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-lg shadow-xl sm:rounded-xl sm:shadow-2xl md:rounded-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                                        alt="Coffee artisan at work"
                                        className="h-[300px] w-full object-cover sm:h-[400px] md:h-[500px] lg:h-[600px]"
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#593A2F]/20 to-transparent" />
                                </div>

                                {/* Story Text */}
                                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                    <div className="space-y-3 font-poppins text-base leading-relaxed text-[#593A2F] sm:space-y-4 sm:text-lg md:text-xl">
                                        <p className="font-semibold">
                                            Born from a lifelong passion for the
                                            perfect cup, Cafe Rencontre was
                                            founded by coffee connoisseurs who
                                            have been obsessed with the craft
                                            since childhood.
                                        </p>
                                        <p>
                                            What started as two young friends
                                            experimenting with their parents'
                                            French press evolved into a
                                            relentless pursuit of coffee
                                            perfection. We traveled the world,
                                            studied under master roasters, and
                                            forged relationships with farmers
                                            who share our commitment to quality.
                                        </p>
                                        <p>
                                            Today, we bring that same dedication
                                            to every bean we roast and every cup
                                            we serve. Our mission is simple: to
                                            create moments of connection through
                                            exceptional coffee.
                                        </p>
                                        <p className="font-semibold text-[#8B7355] italic">
                                            "Coffee isn't just what we do—it's
                                            who we are."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#593A2F] to-[#8B7355] p-6 shadow-xl sm:mt-16 sm:rounded-3xl sm:p-8 md:mt-20 md:shadow-2xl lg:p-12">
                                <h3 className="mb-8 text-center text-2xl font-bold text-[#F5F1E8] sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl">
                                    Our Journey in Numbers
                                </h3>
                                <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-12">
                                    {/* Years of Experience */}
                                    <div className="text-center">
                                        <div className="mb-1 text-3xl font-black text-[#F5F1E8] sm:mb-2 sm:text-4xl md:text-5xl lg:text-6xl">
                                            <CountUp
                                                to={15}
                                                duration={2.5}
                                                delay={0.2}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-xs font-medium tracking-wider text-[#E8DCC8] uppercase sm:text-sm md:text-base">
                                            Years of
                                            <br />
                                            Experience
                                        </p>
                                    </div>

                                    {/* Coffee Varieties */}
                                    <div className="text-center">
                                        <div className="mb-1 text-3xl font-black text-[#F5F1E8] sm:mb-2 sm:text-4xl md:text-5xl lg:text-6xl">
                                            <CountUp
                                                to={50}
                                                duration={2.5}
                                                delay={0.4}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-xs font-medium tracking-wider text-[#E8DCC8] uppercase sm:text-sm md:text-base">
                                            Coffee
                                            <br />
                                            Varieties
                                        </p>
                                    </div>

                                    {/* Daily Cups Served */}
                                    <div className="text-center">
                                        <div className="mb-1 text-3xl font-black text-[#F5F1E8] sm:mb-2 sm:text-4xl md:text-5xl lg:text-6xl">
                                            <CountUp
                                                to={500}
                                                duration={2.5}
                                                delay={0.6}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-xs font-medium tracking-wider text-[#E8DCC8] uppercase sm:text-sm md:text-base">
                                            Daily Cups
                                            <br />
                                            Served
                                        </p>
                                    </div>

                                    {/* Partner Farms */}
                                    <div className="text-center">
                                        <div className="mb-1 text-3xl font-black text-[#F5F1E8] sm:mb-2 sm:text-4xl md:text-5xl lg:text-6xl">
                                            <CountUp
                                                to={20}
                                                duration={2.5}
                                                delay={0.8}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-xs font-medium tracking-wider text-[#E8DCC8] uppercase sm:text-sm md:text-base">
                                            Partner
                                            <br />
                                            Farms
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stores Section */}
                    <div id="stores" className="relative bg-[#E8DCC8]">
                        {/* Coffee bean pattern background */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z' fill='%23593A2F' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                backgroundSize: '60px 60px',
                            }}
                        />

                        {/* Subtle gradient overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#D4C4A8]/30 via-transparent to-[#F5F1E8]/20" />

                        <div className="relative z-10">
                            {/* Gallery4 Carousel - Has its own section wrapper and spacing */}
                            <Gallery4
                                title="Our Locations"
                                description="Each location is thoughtfully designed to create welcoming spaces where communities gather and exceptional coffee brings people together. We're committed to delivering unwavering quality across every branch."
                                items={stores.map((store) => ({
                                    id: store.id,
                                    title: store.name,
                                    description: store.description,
                                    href: store.mapLink,
                                    image: store.image,
                                }))}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </SidebarProvider>
        </>
    );
}
