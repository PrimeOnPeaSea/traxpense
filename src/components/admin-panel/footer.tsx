import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-5 border-t border-border/40">
      <div className="container flex items-center justify-between gap-4">
        <span className="text-sm font-light text-foreground">
          &copy; {new Date().getFullYear()} Traxpense. All rights reserved.
        </span>
        <nav className="flex items-center gap-2">
          {/* <Link href="#" className="text-sm font-light text-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm font-light text-foreground">
            Privacy Policy
          </Link> */}
          <p className="text-sm font-light text-foreground">
            Made by Parth Singh
          </p>
        </nav>
      </div>
    </footer>
  );
}
