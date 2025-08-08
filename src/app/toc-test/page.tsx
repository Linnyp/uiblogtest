"use client";

import { useState } from "react";
import TableOfContents from "@/app/components/TableOfContents";

export default function TOCTestPage() {
  const [contentHtml] = useState(`
    <div class="article-content">
      <h1>Introduction to Bitcoin Ordinals</h1>
      <p>This is an introduction to Bitcoin Ordinals and how they work.</p>
      
      <h2>What are Bitcoin Ordinals?</h2>
      <p>Bitcoin Ordinals are a way to inscribe data on Bitcoin's smallest unit, the satoshi.</p>
      
      <h2>How to Create Ordinals</h2>
      <p>Creating ordinals involves inscribing data onto individual satoshis.</p>
      
      <h1>Advanced Topics</h1>
      <p>Now let's explore some advanced concepts.</p>
      
      <h2>Ordinal Theory</h2>
      <p>Understanding the theory behind ordinals is crucial.</p>
      
      <h2>Inscription Process</h2>
      <p>The process of creating inscriptions involves several steps.</p>
      
      <h1>Conclusion</h1>
      <p>This concludes our overview of Bitcoin Ordinals.</p>
    </div>
  `);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-6">
              <TableOfContents contentHtml={contentHtml} />
            </div>
          </aside>

          {/* Main Content */}
          <article className="flex-1 max-w-4xl">
            <div
              className="article-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
