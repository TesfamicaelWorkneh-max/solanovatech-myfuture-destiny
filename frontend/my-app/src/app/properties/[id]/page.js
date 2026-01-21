import { notFound } from "next/navigation";
// import PropertyDetail from "@/app/components/PropertyDetail";
import PropertyDetail from "@/app/components/PropertyDeatail";
import { api } from "@/app/lib/api";

async function getProperty(id) {
  try {
    console.log("Fetching property with ID:", id);

    if (!id || id === "undefined") {
      console.error("Invalid property ID:", id);
      return null;
    }

    const response = await api.get(`/properties/${id}`);

    if (!response.data.success) {
      console.error("API returned error:", response.data.message);
      return null;
    }

    console.log("Property data received successfully");
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching property:",
      error.response?.data || error.message,
    );

    if (error.response?.status === 404) {
      return null;
    }

    return null;
  }
}

export default async function PropertyPage({ params }) {
  // First, await the params promise
  const { id } = await params;

  console.log("Page params received:", { id });

  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}
