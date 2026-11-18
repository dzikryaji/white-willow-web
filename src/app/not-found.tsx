import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mt-4 font-display text-5xl text-forest sm:text-6xl">A missing page</h1>
        <p className="mt-5 leading-8 text-ink/85">
          The page you were looking for is not here. You can return to the story of White Willow from the home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center border border-[rgba(61,46,34,0.45)] bg-[rgba(61,46,34,0.08)] px-6 py-3 text-sm font-medium tracking-[0.08em] text-forest no-underline transition-colors hover:bg-[rgba(61,46,34,0.14)]"
        >
          Return home
        </Link>
      </div>
    </Container>
  );
}
