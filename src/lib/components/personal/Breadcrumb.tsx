"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface BreadcrumbProps {
  className?: string;
}

export default function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav
      className={cn("flex items-center text-sm text-gray-500 mx-6 ", className)}
      aria-label="Breadcrumb"
    >
      <Link href="/" className="hover:text-gray-700">
        Accueil
      </Link>
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        return (
          <span key={href} className="flex items-center">
            <ChevronRight className="mx-2 h-4 w-4" />
            {isLast ? (
              <span className="text-gray-700 font-medium">
                {decodeURIComponent(segment)}
              </span>
            ) : (
              <Link href={href} className="hover:text-gray-700">
                {decodeURIComponent(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
