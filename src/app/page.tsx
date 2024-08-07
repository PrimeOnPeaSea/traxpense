import Link from "next/link";
import { FaWallet, FaChevronRight } from "react-icons/fa";
import RetroGrid from "@/components/magicui/retro-grid";
import ProfileButton from "@/components/global/profileButton";
import { signIn, auth } from "@/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { Footer } from "@/components/admin-panel/footer";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <FaWallet className="w-6 h-6 mr-3" />
            <span className="font-bold">Traxpense</span>
            <span className="sr-only">Traxpense</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <ModeToggle />
            <ProfileButton />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="relative">
          <div className="absolute top-0 z-[0] h-screen w-screen bg-white dark:bg-black bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
          <section className="relative max-w-full mx-auto z-1">
            <RetroGrid />

            <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 text-gray-600 dark:text-gray-300 md:px-8">
              <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
                <Link href="/dashboard">
                  <h1 className="text-sm text-black/40 dark:text-gray-500 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-900/5 via-gray-950/5 dark:from-zinc-300/5 dark:via-gray-400/5 to-transparent border-[2px] border-white/5 dark:border-gray-700/5 rounded-3xl w-fit">
                    Manage your expenses now
                    <FaChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
                  </h1>
                </Link>

                <h2 className="text-4xl tracking-tighter font-geist bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-black/90 dark:text-transparent mx-auto md:text-6xl dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                  Managing your Expenses made easy with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 dark:from-purple-400 dark:to-orange-300">
                    Traxpense
                  </span>
                </h2>

                <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
                  Traxpense is a simple and easy-to-use expense tracker that
                  helps you manage your expenses and income. It&apos;s designed
                  to help you keep track of your expenses and income, so you can
                  stay on top of your finances.
                </p>
                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                  <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#D1B3FF_0%,#2E2E98_50%,#D1B3FF_100%)]" />
                    <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 dark:bg-gray-800 text-xs font-medium text-gray-50 backdrop-blur-3xl">
                      {session?.user ? (
                        <Link
                          href="/dashboard"
                          className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/5 via-purple-400/20 to-transparent text-white dark:text-gray-200 border-input border-[1px] hover:bg-transparent/90 transition-colors sm:w-auto py-4 px-10"
                        >
                          Go to Dashboard
                        </Link>
                      ) : (
                        <form
                          action={async () => {
                            "use server";
                            await signIn("google", {
                              redirectTo: "/dashboard",
                            });
                          }}
                        >
                          <button className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/5 via-purple-400/20 to-transparent text-white dark:text-gray-200 border-input border-[1px] hover:bg-transparent/90 transition-colors sm:w-auto py-4 px-10">
                            Sign Up for Free
                          </button>
                        </form>
                      )}
                    </div>
                  </span>
                </div>
              </div>
              <div className="mt-32 mx-10 hidden dark:block">
                <Image
                  src="/screenshot.png"
                  className="w-full shadow-lg rounded-lg border dark:border-gray-700 z-[1000]"
                  alt="screenshot"
                  priority
                  width={1200}
                  height={800}
                />
              </div>
              <div className="mt-32 mx-10 dark:hidden">
                <Image
                  src="/screenshot2.png"
                  className="w-full shadow-lg rounded-lg border dark:border-gray-700 z-[1000]"
                  alt="screenshot"
                  priority
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
