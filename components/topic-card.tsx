// components/topic-card.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type TopicCardProps = {
  title: string;
  description: string;
  slug: string;
  image?: string;
};

export function TopicCard({
  title,
  description,
  slug,
  image,
}: TopicCardProps) {
  return (
    <Link
      href={`/resources/${slug}`}
      className="group relative overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
    >
      <div className="relative h-56">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold">
          {title}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {description}
        </p>

        <span className="mt-4 inline-flex items-center text-primary font-medium">
          Explore topic
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
