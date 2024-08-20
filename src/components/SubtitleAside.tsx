"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";

type LinkData = {
  id: string;
  href: string;
  text: string;
  second: boolean;
};

export const SubtitleAside: React.FC = () => {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const titles = document.querySelectorAll("h2, h3");

    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLinkId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observerRef.current = observer;

    const newLinks: LinkData[] = [];
    titles.forEach((title) => {
      observer.observe(title);

      newLinks.push({
        id: title.id,
        href: `#${title.id}`,
        text: title.textContent || "",
        second: title.tagName === "H3",
      });
    });

    setLinks(newLinks);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-full border-r border-r-border relative overflow-hidden shrink-0 w-1/6">
      <div className="fixed overflow-scroll w-1/6">
        {links.map((link, index) => (
          <li
            key={index}
            className={link.second ? "ml-4 list-none py-0" : "list-none py-0"}
          >
            <Link
              href={link.href}
              passHref
              className={
                activeLinkId === link.id
                  ? buttonVariants({ variant: "navActive" }) + "py-0 link"
                  : buttonVariants({ variant: "nav" }) + "py-0 link"
              }
            >
              {link.text}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};
