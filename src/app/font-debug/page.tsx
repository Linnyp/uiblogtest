"use client";

export default function FontDebugPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Font Debug - Blog Post Title</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Blog Post Title (Same as BlogPost.tsx)
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-love-ya-like-a-sister">
            This is a Sample Blog Post Title
          </h1>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Blog Post Description (Same as BlogPost.tsx)
          </h2>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed font-inter">
            This is a sample description that should use the Inter font.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Direct CSS Variable Test
          </h2>
          <h1
            style={{ fontFamily: "var(--font-love-ya-like-a-sister)" }}
            className="text-4xl font-bold text-gray-900"
          >
            Love Ya Like A Sister via CSS Variable
          </h1>
          <p
            style={{ fontFamily: "var(--font-inter)" }}
            className="text-xl text-gray-600"
          >
            Inter via CSS Variable
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            CSS Custom Properties Check
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              <div>
                <strong>--font-love-ya-like-a-sister:</strong>{" "}
                {typeof document !== "undefined"
                  ? getComputedStyle(document.documentElement).getPropertyValue(
                      "--font-love-ya-like-a-sister"
                    )
                  : "N/A"}
              </div>
              <div>
                <strong>--font-inter:</strong>{" "}
                {typeof document !== "undefined"
                  ? getComputedStyle(document.documentElement).getPropertyValue(
                      "--font-inter"
                    )
                  : "N/A"}
              </div>
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Body Element Classes</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
              {typeof document !== "undefined"
                ? document.body.className
                : "N/A"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
