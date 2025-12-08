import CountUp from '@/components/count-up';
import { Footer } from '@/components/footer';
import { GuestSidebar } from '@/components/guest-sidebar';
import { Header } from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About Us - Cafe Rencontre" />
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
                <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F5F1E8]">
                    {/* Coffee bean pattern background */}
                    <div
                        className="pointer-events-none fixed inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z' fill='%23593A2F' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Subtle gradient overlay */}
                    <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-[#E8DCC8]/30 via-transparent to-[#D4C4A8]/20" />

                    <Header variant="solid" />

                    {/* Hero Section with Brand Story */}
                    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20">
                        <div className="relative z-10 mx-auto w-full max-w-6xl">
                            {/* Main Heading */}
                            <div className="mb-12 text-center">
                                <h1 className="mb-4 text-5xl leading-tight font-black text-coffee-primary uppercase md:text-7xl lg:text-8xl">
                                    Our Story
                                </h1>
                                <div className="mx-auto h-1 w-32 bg-[#8B7355]" />
                            </div>

                            {/* Content Grid */}
                            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                                {/* Image */}
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                                        alt="Coffee artisan at work"
                                        className="h-[500px] w-full object-cover lg:h-[600px]"
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#593A2F]/20 to-transparent" />
                                </div>

                                {/* Story Text */}
                                <div className="space-y-6">
                                    <div className="space-y-4 font-poppins text-lg leading-relaxed text-[#593A2F] md:text-xl">
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
                                        <p className="font-semibold italic text-[#8B7355]">
                                            "Coffee isn't just what we do—it's
                                            who we are."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#593A2F] to-[#8B7355] p-8 shadow-2xl md:p-12">
                                <h2 className="mb-12 text-center text-3xl font-bold text-[#F5F1E8] md:text-4xl">
                                    Our Journey in Numbers
                                </h2>
                                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                                    {/* Years of Experience */}
                                    <div className="text-center">
                                        <div className="mb-2 text-5xl font-black text-[#F5F1E8] md:text-6xl">
                                            <CountUp
                                                to={15}
                                                duration={2.5}
                                                delay={0.2}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-sm font-medium uppercase tracking-wider text-[#E8DCC8] md:text-base">
                                            Years of
                                            <br />
                                            Experience
                                        </p>
                                    </div>

                                    {/* Coffee Varieties */}
                                    <div className="text-center">
                                        <div className="mb-2 text-5xl font-black text-[#F5F1E8] md:text-6xl">
                                            <CountUp
                                                to={50}
                                                duration={2.5}
                                                delay={0.4}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-sm font-medium uppercase tracking-wider text-[#E8DCC8] md:text-base">
                                            Coffee
                                            <br />
                                            Varieties
                                        </p>
                                    </div>

                                    {/* Daily Cups Served */}
                                    <div className="text-center">
                                        <div className="mb-2 text-5xl font-black text-[#F5F1E8] md:text-6xl">
                                            <CountUp
                                                to={500}
                                                duration={2.5}
                                                delay={0.6}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-sm font-medium uppercase tracking-wider text-[#E8DCC8] md:text-base">
                                            Daily Cups
                                            <br />
                                            Served
                                        </p>
                                    </div>

                                    {/* Partner Farms */}
                                    <div className="text-center">
                                        <div className="mb-2 text-5xl font-black text-[#F5F1E8] md:text-6xl">
                                            <CountUp
                                                to={20}
                                                duration={2.5}
                                                delay={0.8}
                                            />
                                            <span>+</span>
                                        </div>
                                        <p className="font-poppins text-sm font-medium uppercase tracking-wider text-[#E8DCC8] md:text-base">
                                            Partner
                                            <br />
                                            Farms
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer variant="solid" />
                </div>
            </SidebarProvider>
        </>
    );
}
