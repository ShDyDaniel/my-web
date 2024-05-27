import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <UserIcon className="h-6 w-6" />
          <span className="sr-only">Daniel Shalts</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 scroll-smooth">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about"
          >
            מידע
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#work"
          >
            עבודות
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            יצירת קשר
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section
          className="w-full py-12 md:py-24 lg:py-0 border-y bg-cover bg-center bg-no-repeat text-white flex items-center justify-end"
          id="hero"
          style={{ backgroundImage: "url(/assets/videography.jpg)" }}
        >
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16 bg-black/50 backdrop-blur-sm py-12 md:py-24 lg:py-64 rounded-md">
            <div className="px-4 sm:px-6 md:px-10 text-right">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]" style={{ direction: "rtl" }}>
                  דניאל שלץ
                </h1>
                <p className="mx-auto text-gray-200 md:text-xl" style={{ direction: "rtl" }}>
                  צלם ועורך וידאו מקצועי
                </p>
                <div className="space-x-4 mt-6" style={{ direction: "rtl" }}>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors duration-300 motion-reduce:transition-none motion-reduce:duration-0 hover:bg-gray-600/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-40/90 dark:focus-visible:ring-gray-300"
                    href="#contact"
                  >
                    צרו קשר
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="about">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  קצת עליי
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  style={{ direction: "rtl" }}
                >
                  מי אני?
                </h2>
                <p
                  className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  style={{ direction: "rtl" }}
                >
                  אני צלם ועורך סרטים מקצועי בעל ניסיון בתחום.
                  <br />
                  אני עבדתי עם הרבה חברות ויצרתי מלא פרויקטים.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="work">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div
                  className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
                  style={{ direction: "rtl" }}
                >
                  על מה עבדתי
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  style={{ direction: "rtl" }}
                >
                  הפרויקטים שלי
                </h2>
                <p
                  className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  style={{ direction: "rtl" }}
                >
                  :קצת מהפרויקטים שעבדתי עליהם
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <Image
                  alt="Project 1"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/assets/project1.png"
                  width="550"
                />
                <h3 className="text-lg font-bold" style={{ direction: "rtl" }}>
                  פרויקט 1
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
              <div className="grid gap-1">
                <Image
                  alt="Project 2"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/assets/project2.png"
                  width="550"
                />
                <h3 className="text-lg font-bold" style={{ direction: "rtl" }}>
                  פרויקט 2
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
              <div className="grid gap-1">
                <Image
                  alt="Project 3"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/assets/project3.png"
                  width="550"
                />
                <h3 className="text-lg font-bold" style={{ direction: "rtl" }}>
                  פרויקט 3
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
              <div className="grid gap-1">
                <Image
                  alt="Project 4"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/assets/project4.png"
                  width="550"
                />
                <h3 className="text-lg font-bold" style={{ direction: "rtl" }}>
                  פרויקט 4
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
              <div className="grid gap-1">
                <Image
                  alt="Project 5"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/assets/project4.png"
                  width="550"
                />
                <h3 className="text-lg font-bold" style={{ direction: "rtl" }}>
                  פרויקט 5
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
              <div className="grid gap-1">
                <Image
                  alt="Project 6"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="/assets/project4.png"
                  width="550"
                />
                <h3 className="text-lg font-bold" style={{ direction: "rtl" }}>
                  פרויקט 6
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
          id="contact"
        >
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  בואו נדבר
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  style={{ direction: "rtl" }}
                >
                  צרו איתי קשר
                </h2>
                <p
                  className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  style={{ direction: "rtl" }}
                >
                  :רוצים לשאול שאלה או להתחיל פרויקט?
                  <br />
                  צרו קשר ואחזור אליכם בהקדם
                </p>
              </div>
            </div>
            <form
              className="mx-auto grid w-full max-w-[48rem] gap-6"
              style={{ direction: "rtl" }}
            >
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  שם
                </label>
                <Input id="name" placeholder="שם" type="text" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="email">
                  אימייל
                </label>
                <Input id="email" placeholder="אימייל" type="email" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="message">
                  הודעה
                </label>
                <Input
                  id="message"
                  placeholder="ההודעה שלך"
                  type="text"
                />
              </div>
              <Button className="w-full bg-black text-white" type="submit">
                שלח הודעה
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-50 dark:bg-gray-950">
        <div className="container px-4 py-8 md:px-6 lg:flex lg:items-center lg:justify-between">
          <div className="space-y-4 text-center lg:text-right">
            <Link
              className="inline-block text-xl font-bold text-gray-900 dark:text-white"
              href="#"
            >
              Daniel Shalts
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 All rights reserved.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-6 lg:mt-0 lg:justify-end">
            <Link
              aria-label="Phone"
              className="text-gray-600 transition dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              href="tel:+1234567890"
            >
              <FaPhone />
            </Link>
            <Link
              aria-label="Email"
              className="text-gray-600 transition dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              href="mailto:example@example.com"
            >
              <MdEmail />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const UserIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

