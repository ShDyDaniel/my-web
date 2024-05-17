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
          className="w-full py-12 md:py-24 lg:py-0 border-y bg-cover bg-center bg-no-repeat text-white"
          id="hero"
          style={{ backgroundImage: "url(/assets/videography.jpg)" }}
        >
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16 bg-black/50 backdrop-blur-sm py-12 md:py-24 lg:py-64 rounded-md">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]" style={{ direction: "rtl" }}>
                  דניאל שלץ
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl" style={{ direction: "rtl" }}>
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
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 scroll-smooth"
          id="contact"
        >
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div
                  className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
                  style={{ direction: "rtl" }}
                >
                  צרו קשר
                </div>
                <h2
                  className="text-3xl font-bold tracking-tighter sm:text-5xl"
                  style={{ direction: "rtl" }}
                >
                  צרו קשר
                </h2>
                <p
                  className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                  style={{ direction: "rtl" }}
                >
                  אתם יותר ממוזמנים ליצור איתי קשר אם יש לכם פניות או שאלות :)
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2 text-xl">
                <Link type="email" href="mailto:dyshalts@gmail.com">
                  <span className="inline-flex items-center">
                    <MdEmail className="ml-2 mr-2" /> dyshalts@gmail.com
                  </span>
                </Link>
                <br className="select-none" />
                <br className="select-none" />
                <Link type="tel" href="tel:0515227660">
                  <span className="inline-flex items-center">
                    <FaPhone className="ml-2 mr-2" /> 051-522-7660
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800 flex justify-center items-center">
        <div className="container max-w-xl grid grid-cols-2 gap-2 text-sm text-center">
          <div className="grid gap-1">
            <h3 className="font-semibold">עליי</h3>
            <Link href="#about">מי אני</Link>
            <Link href="#work">הפרויקטים שלי</Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">צרו קשר</h3>
            <Link type="email" href="mailto:dyshalts@gmail.com">
              אימייל
            </Link>
            <Link type="tel" href="tel:0515227660">
              טלפון
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <Image src="/assets/danielmovie.svg" alt="logo" height={50} width={50} />
  );

  //
}
