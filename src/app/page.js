import Hero from "@/app/components/Hero";

async function getProperties() {
  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(
      `${API_URL}/properties?limit=6&status=published&sort=-createdAt`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Hero />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="h-48 bg-gray-200">
                    {property.images?.[0]?.url && (
                      <img
                        src={property.images[0].url}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      ${property.price?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {property.location?.city}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No properties available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
