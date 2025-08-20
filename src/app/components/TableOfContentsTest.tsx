"use client";

import { useEffect, useState } from "react";
import { List, Wallet } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
}

export default function TableOfContentsTest({
  contentHtml,
}: TableOfContentsProps) {
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
      {/* Main TOC Content - MODIFY STYLES HERE */}
      <div className="relative z-10 bg-gray-300 rounded-2xl py-8 text-black">
        <h3 className="text-center text-md font-semibold mb-5 decoration-white/50 flex items-center justify-center gap-2">
          <List size={20} className="text-secondary" />
          Table of Contents
        </h3>

        {/* Navigation Links - MODIFY STYLES HERE */}
        <nav className="mb-8">
          <ul className="list-none p-0 m-0">
            {tocItems.map((item) => (
              <li
                key={item.id}
                className={`mb-1 ${item.level === 2 ? "ml-5" : ""}`}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left block p-2 text-sm font-medium transition-all duration-200
                    border-l-3 border-transparent hover:border-l-cta hover:bg-white/40 hover:pl-4
                    ${activeId === item.id ? "border-l-cta bg-white/30" : ""}
                    ${
                      item.level === 2
                        ? "text-black/80 text-xs font-normal"
                        : "text-white"
                    }
                  `}
                >
                  {item.level === 2 && (
                    <span className="text-secondary mr-2">
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

        {/* CTA Section - MODIFY STYLES HERE */}
        <div className="border-t border-white/20 pt-5 text-center">
          <h4 className="text-md font-semibold text-black mb-4">
            Still Haven&apos;t Tried Ord-X?
          </h4>
          <ol className="list-decimal list-inside mb-5 space-y-2 text-sm">
            <li>Connect a wallet</li>
            <li>Claim daily rewards</li>
            <li>Start inscribing your Bitcoin collectibles</li>
          </ol>
          <button className="mx-auto max-w-48 bg-cta text-black font-semibold py-3 px-5 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm flex items-center justify-center gap-2">
            <Wallet size={16} />
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
