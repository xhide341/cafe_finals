import { GuestNav } from '@/components/guest-nav';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { login } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Coffee, Home, Mail, MapPin, ShoppingBag } from 'lucide-react';

const guestNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'About',
        href: '#about',
        icon: Coffee,
    },
    {
        title: 'Stores',
        href: '#stores',
        icon: MapPin,
    },
    {
        title: 'Shop',
        href: '/shop',
        icon: ShoppingBag,
    },
    {
        title: 'Contact',
        href: '#contact',
        icon: Mail,
    },
];

export function GuestSidebar() {
    return (
        <Sidebar
            collapsible="offcanvas"
            side="right"
            className="border-l-2 border-[#593A2F] bg-[#F5F1E8]"
        >
            <SidebarHeader className="border-b border-[#593A2F]/20">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="hover:bg-[#E8DCC8]"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://placehold.co/48x48/8B7355/F5F1E8?text=Logo"
                                    alt="Cafe Logo"
                                    className="h-10 w-10 rounded-full border-2 border-[#593A2F]"
                                />
                                <span
                                    className="text-xl font-bold text-[#593A2F]"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                    }}
                                >
                                    Cafe Rencontre
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <GuestNav items={guestNavItems} />
            </SidebarContent>

            <SidebarFooter className="mt-auto border-t border-[#593A2F]/20 pt-4">
                <div className="px-4 pb-2">
                    <p className="mb-3 text-sm font-medium text-[#6B5444]">
                        Store admin?
                    </p>
                    <Link
                        href={login()}
                        className="block rounded-md bg-[#593A2F] px-4 py-3 text-center text-base font-semibold text-[#F5F1E8] transition-colors hover:bg-[#6B5444]"
                    >
                        Login
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
