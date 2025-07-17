// This layout file provides generateStaticParams for the dynamic route
// Required for static export of dynamic routes

export async function generateStaticParams() {
  // Return the property IDs that should be statically generated
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

// Disable generation of additional dynamic routes
export const dynamicParams = false;

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
