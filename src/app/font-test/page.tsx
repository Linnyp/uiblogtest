export default function FontTestPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Font Test Page</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Love Ya Like A Sister Font
          </h2>
          <div className="space-y-2">
            <p className="font-love-ya-like-a-sister text-2xl">
              This is Love Ya Like A Sister font - Large
            </p>
            <p className="font-love-ya-like-a-sister text-lg">
              This is Love Ya Like A Sister font - Medium
            </p>
            <p className="font-love-ya-like-a-sister text-base">
              This is Love Ya Like A Sister font - Normal
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Inter Font</h2>
          <div className="space-y-2">
            <p className="font-inter text-2xl">This is Inter font - Large</p>
            <p className="font-inter text-lg">This is Inter font - Medium</p>
            <p className="font-inter text-base">This is Inter font - Normal</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            CSS Custom Properties Test
          </h2>
          <div className="space-y-2">
            <p
              style={{ fontFamily: "var(--font-love-ya-like-a-sister)" }}
              className="text-lg"
            >
              Love Ya Like A Sister via CSS custom property
            </p>
            <p style={{ fontFamily: "var(--font-inter)" }} className="text-lg">
              Inter via CSS custom property
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Default Body Font</h2>
          <p className="text-lg">
            This should use the default body font (Inter)
          </p>
        </div>
      </div>
    </div>
  );
}
