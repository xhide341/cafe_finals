import { Facebook, Instagram, X, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative z-50 border-t border-coffee-accent/30 bg-[#a58674] px-6 py-12 shadow-[0_-8px_30px_rgba(89,58,47,0.05)]">
            <div className="container mx-auto flex items-center justify-between">
                <p className="font-poppins text-sm text-coffee-dark">
                    &copy; {new Date().getFullYear()} Cafe Rencontre. All rights
                    reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coffee-primary transition-colors hover:text-coffee-accent"
                        aria-label="Facebook"
                    >
                        <Facebook className="h-5 w-5" />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coffee-primary transition-colors hover:text-coffee-accent"
                        aria-label="Instagram"
                    >
                        <Instagram className="h-5 w-5" />
                    </a>
                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coffee-primary transition-colors hover:text-coffee-accent"
                        aria-label="X"
                    >
                        <X className="h-5 w-5" />
                    </a>
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coffee-primary transition-colors hover:text-coffee-accent"
                        aria-label="YouTube"
                    >
                        <Youtube className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
