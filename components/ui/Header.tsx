import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center w-full px-4 py-4 bg-background">
      <div className="header-wrapper w-full max-w-7xl">
        <header className="w-full h-16 bg-card/50  border border-border rounded-full flex items-center px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div>
              <span
                className="text-2xl font-bold text-blue-800"
                style={{ fontFamily: "Rubik Iso, sans-serif" }}
              >
                ROSALINA
              </span>
            </div>
            {/* Links */}
            <div className="flex items-center relative">
              <Link
                href="https://join.slack.com/t/rosalinaz/shared_invite/zt-2x6bu1ybo-h_LTYK6RYukDl89aP7pLug"
                className="text-lg text-gray-400 mr-2 z-10 px-4 py-2 hover:text-black"
              >
                join slack
              </Link>
              <Link
                href="https://github.com/hirotaka06/todo-slack"
                className="text-lg text-gray-400 z-10 px-4 py-2 -ml-4 hover:text-black"
              >
                view code
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
