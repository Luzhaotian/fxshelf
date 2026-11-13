export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Lock to the viewport so demos cannot grow the document and show a page scrollbar.
  // Prefer clip over hidden so transformed layers (e.g. card-orbit) are less aggressively cropped.
  return (
    <div className="fixed inset-0 overflow-x-clip overflow-y-hidden bg-fd-background text-fd-foreground">
      {children}
    </div>
  )
}
