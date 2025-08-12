"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import puppy1 from "@/assets/puppy1.png";
import puppy2 from "@/assets/puppy2.png";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
}

export default function TableOfContents({ contentHtml }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse HTML to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const headings = doc.querySelectorAll("h1, h2");

    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || "";
      // Create slug-like ID from text
      const id =
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "") // Remove special characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .trim() || `heading-${index}`;

      return { id, text, level };
    });

    setTocItems(items);
  }, [contentHtml]);

  useEffect(() => {
    // Add IDs to actual headings in the DOM that match our TOC items
    const addIdsToHeadings = () => {
      const headings = document.querySelectorAll(
        ".article-content h1, .article-content h2"
      );

      console.log("Found headings:", headings.length);

      headings.forEach((heading, index) => {
        const text = heading.textContent || "";
        // Generate the same ID as in tocItems
        const id =
          text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .trim() || `heading-${index}`;

        heading.id = id;
        console.log(`Added ID "${id}" to heading: "${text}"`);
      });

      // Intersection Observer for active section highlighting
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          // Account for the fixed navigation bar dynamically
          rootMargin: "-84px 0% -35% 0%", // Will be adjusted if nav height changes
          threshold: 0.1,
        }
      );

      headings.forEach((heading) => {
        observer.observe(heading);
      });

      return observer;
    };

    // Initial setup with a small delay to ensure content is rendered
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
      }
      observer = addIdsToHeadings();
    };

    // Initial setup with delay
    setTimeout(setupObserver, 100);

    // Set up a MutationObserver to handle dynamic content changes
    const mutationObserver = new MutationObserver(() => {
      setTimeout(setupObserver, 50);
    });

    // Observe changes to the article content
    const articleContent = document.querySelector(".article-content");
    if (articleContent) {
      mutationObserver.observe(articleContent, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    console.log("Attempting to scroll to section with ID:", id);

    // First try to find by ID
    let element = document.getElementById(id);

    // If not found by ID, try to find by text content
    if (!element) {
      console.log("Element not found by ID, searching by text content...");
      const headings = document.querySelectorAll(
        ".article-content h1, .article-content h2"
      );
      for (const heading of headings) {
        const text = heading.textContent || "";
        const headingId = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim();

        if (headingId === id) {
          element = heading as HTMLElement;
          console.log("Found element by text content:", text);
          break;
        }
      }
    }

    if (element) {
      console.log("Scrolling to element:", element);

      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Calculate the target scroll position
      // Dynamically detect navigation height or use fallback
      const navElement = document.querySelector("nav");
      const navHeight = navElement ? navElement.offsetHeight : 64;
      const padding = 20; // Additional padding for better visibility

      // Calculate the target position so the header is visible at the top
      const targetScrollTop = scrollTop + rect.top - navHeight - padding;

      // Ensure we don't scroll past the top of the page
      const finalScrollTop = Math.max(0, targetScrollTop);

      console.log(
        `Scrolling to position: ${finalScrollTop}px (nav height: ${navHeight}px)`
      );

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: finalScrollTop,
        behavior: "smooth",
      });
    } else {
      console.error("Could not find element with ID:", id);
      console.log(
        "Available headings:",
        Array.from(
          document.querySelectorAll(".article-content h1, .article-content h2")
        ).map((h) => ({ text: h.textContent, id: h.id }))
      );
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-sm">
      {/* Decorative Characters */}
      <div className="absolute -top-18 left-2 z-0">
        <div className="w-18 h-22 rounded-full transform -rotate-12 flex items-center justify-center text-2xl">
          <Image src={puppy1} alt="Puppy 1" width={100} height={100} />
        </div>
      </div>
      <div className="absolute -top-18 right-2 z-0">
        <div className="w-18 h-22 rounded-full transform rotate-12 flex items-center justify-center text-2xl">
          <Image src={puppy2} alt="Puppy 2" width={80} height={80} />
        </div>
      </div>

      {/* Main TOC Content */}
      <div className="relative z-10 bg-slate-600 rounded-2xl p-5 pt-12 text-white">
        <h3 className="text-center text-lg font-semibold mb-5 underline underline-offset-4 decoration-white/50">
          Table of Contents
        </h3>

        {/* Navigation Links */}
        <nav className="mb-8">
          <ul className="list-none p-0 m-0">
            {tocItems.map((item) => (
              <li
                key={item.id}
                className={`mb-3 ${item.level === 2 ? "ml-5" : ""}`}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left block p-2 text-sm font-medium transition-all duration-200
                    border-l-3 border-transparent pl-3 hover:border-l-orange-400 hover:bg-white/10 hover:pl-4
                    ${
                      activeId === item.id
                        ? "border-l-orange-400 bg-white/10"
                        : ""
                    }
                    ${
                      item.level === 2
                        ? "text-white/80 text-xs font-normal"
                        : "text-white"
                    }
                  `}
                >
                  {item.level === 2 && (
                    <span className="text-orange-400 mr-2">
                      {
                        tocItems.filter(
                          (t) =>
                            t.level === 2 &&
                            tocItems.indexOf(t) <= tocItems.indexOf(item)
                        ).length
                      }
                      .
                    </span>
                  )}
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Section */}
        <div className="border-t border-white/20 pt-5 text-center">
          <h4 className="text-lg font-semibold text-[#FF9C00] mb-4">
            Still Haven't Tried Ord-X?
          </h4>
          <ol className="list-decimal list-inside mb-5 space-y-2 text-sm">
            <li>
              <a
                href="#connect"
                className="text-white/90 decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300"
              >
                Connect a wallet
              </a>
            </li>
            <li>
              <a
                href="#claim"
                className="text-white/90 decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300"
              >
                Claim daily rewards
              </a>
            </li>
            <li>
              <a
                href="#inscribe"
                className="text-white/90 decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300"
              >
                Start inscribing your Bitcoin collectibles
              </a>
            </li>
          </ol>
          <button className="w-full max-w-48 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
