import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { GuestMenuContent } from '@/components/guest-menu-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { ShoppingCart, User } from 'lucide-react';

interface ShopHeaderProps {
    cafeLogo: string;
    language: 'EN' | 'PH';
    setLanguage: (lang: 'EN' | 'PH') => void;
    getTotalItems: () => number;
    auth: any;
}

export function ShopHeader({
    cafeLogo,
    language,
    setLanguage,
    getTotalItems,
    auth,
}: ShopHeaderProps) {
    return (
        <header className="max-w-8xl sticky top-0 z-50 mx-auto w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src={cafeLogo}
                        alt="Cafe Logo"
                        className="h-10 w-10 rounded-full"
                    />
                    <span className="font-cursive text-xl font-bold text-coffee-primary">
                        Cafe Rencontre
                    </span>
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <AppearanceToggleDropdown />

                    {/* Language Selector */}
                    <div className="flex items-center gap-1 rounded-lg border bg-muted p-1">
                        <Button
                            variant={language === 'EN' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setLanguage('EN')}
                            disabled={language === 'EN'}
                            className="h-8 px-3"
                        >
                            EN
                        </Button>
                        <Button
                            variant={language === 'PH' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setLanguage('PH')}
                            disabled={language === 'PH'}
                            className="h-8 px-3"
                        >
                            PH
                        </Button>
                    </div>

                    {/* Cart */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="relative"
                        asChild
                    >
                        <Link href="/cart">
                            <ShoppingCart className="h-5 w-5 text-coffee-primary dark:text-primary" />
                            {getTotalItems() > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                                >
                                    {getTotalItems()}
                                </Badge>
                            )}
                        </Link>
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <User className="h-5 w-5 text-coffee-primary dark:text-primary" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <GuestMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
