import Image from "next/image";
import Link from "next/link";
import { Play, Clock, FileText, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/data/resources";

interface ResourceCardProps {
  resource: Resource;
}

const typeIcons = {
  article: FileText,
  video: Play,
  tip: Lightbulb,
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const TypeIcon = typeIcons[resource.type];

  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={resource.image || "/placeholder.svg"}
          alt={resource.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {resource.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Play className="ml-1 h-6 w-6" />
            </div>
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            <TypeIcon className="mr-1 h-3 w-3" />
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {resource.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-serif text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {resource.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {resource.excerpt}
        </p>

        {resource.readTime && (
          <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {resource.readTime}
          </div>
        )}
      </div>
    </Link>
  );
}
