"use client";

import { useEffect, useState } from "react";

export default function DebugFontsPage() {
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const computedStyle = getComputedStyle(root);
    const bodyComputedStyle = getComputedStyle(body);

    const variables = {
      "--font-love-ya-like-a-sister": computedStyle.getPropertyValue(
        "--font-love-ya-like-a-sister"
      ),
      "--font-inter": computedStyle.getPropertyValue("--font-inter"),
      "--font-geist-sans": computedStyle.getPropertyValue("--font-geist-sans"),
      "--font-geist-mono": computedStyle.getPropertyValue("--font-geist-mono"),
    };

    // Check body element attributes
    const bodyAttributes = {
      "data-fonts-loaded": body.getAttribute("data-fonts-loaded"),
      "data-love-ya-like-a-sister": body.getAttribute(
        "data-love-ya-like-a-sister"
      ),
      "data-inter": body.getAttribute("data-inter"),
    };

    console.log("CSS Variables:", variables);
    console.log("Body Attributes:", bodyAttributes);
    console.log("Body Classes:", body.className);

    setCssVariables(variables);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Font Debug Page</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">CSS Custom Properties</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              {Object.entries(cssVariables).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value || "(not set)"}
                </div>
              ))}
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Body Element Debug</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              <div>
                <strong>data-fonts-loaded:</strong>{" "}
                {typeof document !== "undefined"
                  ? document.body.getAttribute("data-fonts-loaded")
                  : "N/A"}
              </div>
              <div>
                <strong>data-love-ya-like-a-sister:</strong>{" "}
                {typeof document !== "undefined"
                  ? document.body.getAttribute("data-love-ya-like-a-sister")
                  : "N/A"}
              </div>
              <div>
                <strong>data-inter:</strong>{" "}
                {typeof document !== "undefined"
                  ? document.body.getAttribute("data-inter")
                  : "N/A"}
              </div>
              <div>
                <strong>body className:</strong>{" "}
                {typeof document !== "undefined"
                  ? document.body.className
                  : "N/A"}
              </div>
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Font Family Test</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">
                Love Ya Like A Sister (Tailwind class)
              </h3>
              <p className="font-love-ya-like-a-sister text-lg">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Inter (Tailwind class)</h3>
              <p className="font-inter text-lg">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Love Ya Like A Sister (CSS variable)
              </h3>
              <p
                style={{ fontFamily: "var(--font-love-ya-like-a-sister)" }}
                className="text-lg"
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Inter (CSS variable)</h3>
              <p
                style={{ fontFamily: "var(--font-inter)" }}
                className="text-lg"
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Body Font Test</h2>
          <p className="text-lg">
            This text should use the default body font (should be Inter): The
            quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>
    </div>
  );
}
