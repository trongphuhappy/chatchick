'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

export default function HomePage() {
  const router = useRouter();

  const handleNavigateLogin = () => {
    router.push("/login");
  }

  const handleNavigateSignUp = () => {
    router.push("/signup");
  }

  return (
    <main className="w-full h-full py-6">
      <section>
        <Toaster
          position="top-right"
          richColors
          expand={true}
          style={{ marginRight: 28 }}
        />
      </section>
      <header className="px-20 flex justify-between">
        <Link href="/">
          <section>
            <h1 className="text-3xl font-matemasie font-mono font-normal text-blue-500">ChatChick</h1>
          </section>
        </Link>
        <section className="flex items-center gap-x-8">
          <ul className="flex gap-x-10">
            <li>
              <Link href="#!" className="text-base font-medium text-gray-900 relative after:content-[''] after:absolute after:bg-blue-500 after:w-0 after:h-1 after:left-0 after:-bottom-1 after:rounded-md hover:after:w-full">Option</Link>
            </li>
            <li>
              <Link href="#!" className="text-base font-medium text-gray-900 relative after:content-[''] after:absolute after:bg-blue-500 after:w-0 after:h-1 after:left-0 after:-bottom-1 after:rounded-md hover:after:w-full">Option</Link>
            </li>
            <li>
              <Link href="#!" className="text-base font-medium text-gray-900 relative after:content-[''] after:absolute after:bg-blue-500 after:w-0 after:h-1 after:left-0 after:-bottom-1 after:rounded-md hover:after:w-full">Option</Link>
            </li>
            <li>
              <Link href="#!" className="text-base font-medium text-gray-900 relative after:content-[''] after:absolute after:bg-blue-500 after:w-0 after:h-1 after:left-0 after:-bottom-1 after:rounded-md hover:after:w-full">Option</Link>
            </li>
          </ul>
          <div className="actions flex gap-x-4">
            <button className="group w-[80px] h-14 bg-blue-200 rounded-full hover:bg-blue-400 transition-colors duration-300" onClick={handleNavigateLogin}>
              <span className="text-base font-medium text-gray-600 group-hover:text-gray-900">
                Log in
              </span>
            </button>
            <button className="group w-[80px] h-14 bg-gray-200 rounded-full hover:bg-gray-400 transition-colors duration-300" onClick={handleNavigateSignUp}>
              <span className="text-base font-medium text-gray-600 group-hover:text-gray-900">Sign up</span>
            </button>
          </div>
        </section>
      </header>
      <main className="pt-32 pb-10 px-20 py-8">
        <div className="flex flex-wrap items-start gap-x-3">
          <div className="w-[50%]">
            <h1 className="text-6xl font-normal -tracking-tighter bg-logan-text bg-cover text-gradient marqueear">
              Chat anywhere,
              <br />
              Make friends worldwide,
              <br />
              Share memorable moments</h1>
          </div>
          <div className="flex-1 flex gap-x-3">
            <Image src="/home.jpg" alt="123" width={200} height={200} quality={100} className="rounded-full h-full" />
            <Image src="/home2.jpg" alt="123" width={200} height={200} quality={100} className="rounded-full -translate-y-16" />
            <Image src="/home3.jpg" alt="123" width={200} height={200} quality={100} className="rounded-full" />
          </div>
        </div>
      </main>
    </main>
  );
}
