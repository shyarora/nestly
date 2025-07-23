import { OptionalAuthGuard } from "../../../services/auth/components";
import { mockProperties } from "../../../services/property/mock-data";
import PropertyDetailClient from "./client";

// Required for static export
export async function generateStaticParams() {
  // Generate static params for all mock properties
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyDetailPage() {
  return (
    <OptionalAuthGuard>
      <PropertyDetailClient />
    </OptionalAuthGuard>
  );
}
