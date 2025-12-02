import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { login, logout } from '@/routes';
import { edit } from '@/routes/profile';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import {
    Clock,
    Heart,
    LogOut,
    Settings,
    ShieldCheck,
    ShoppingBag,
} from 'lucide-react';

interface GuestMenuContentProps {
    user?: User;
}

export function GuestMenuContent({ user }: GuestMenuContentProps) {
    const handleLogout = () => {
        router.post(
            logout.url(),
            {},
            {
                onFinish: () => {
                    router.flushAll();
                },
            },
        );
    };

    return (
        <>
            <DropdownMenuLabel>
                {user ? (
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                ) : (
                    'My Account'
                )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!user && (
                <>
                    <DropdownMenuItem asChild>
                        <Link
                            href={login()}
                            className="flex items-center gap-2"
                        >
                            <ShieldCheck className="h-4 w-4" />
                            Login as Admin
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </>
            )}
            {user && (
                <DropdownMenuItem asChild>
                    <Link
                        href={edit()}
                        className="flex items-center gap-2"
                        prefetch
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile Settings
                    </Link>
                </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
                <Link href="/cart" className="flex items-center gap-2">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Shopping Cart
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                Order History
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                Favorites
            </DropdownMenuItem>
            {user && (
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </>
            )}
        </>
    );
}
