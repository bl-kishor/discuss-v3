import Link from "next/link";
import HeaderAuth from "./header-auth";

export default async function Header() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold">
            Discuss
          </Link>
        </div>
        <div className="justify-center">
          <input />
        </div>
        <div className="justify-end pr-4">
          <HeaderAuth />
        </div>
      </header>
    </nav>
  );
}
