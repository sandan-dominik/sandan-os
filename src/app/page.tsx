import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <Image
          className="invert dark:invert-0"
          src="/sandan-logo.png"
          alt="Next.js logo"
          width={300}
          height={100}
          priority
        />
        
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <a
            className="flex justify-center items-center gap-2 bg-foreground hover:bg-[#383838] dark:hover:bg-[#ccc] px-4 sm:px-5 border border-transparent border-solid rounded-full sm:w-auto h-10 sm:h-12 font-medium text-background text-sm sm:text-base transition-colors"
            href="/dashboard"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Launch
          </a>
          <Link
            className="flex justify-center items-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] px-4 sm:px-5 border dark:border-white/[.145] hover:border-transparent border-black/[.08] border-solid rounded-full w-full sm:w-auto md:w-[158px] h-10 sm:h-12 font-medium text-sm sm:text-base transition-colors"
            href="/"
            rel="noopener noreferrer"
          >
            Register
          </Link>
        </div>
      </main>
      <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Academy
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Enterprise
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to sandan.ai →
        </a>
      </footer>
    </div>
  );
}
