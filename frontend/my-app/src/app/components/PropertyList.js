import PropertyCard from "./PropertyCard";

export default function PropertyList({ properties }) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">No properties found</div>
        <p className="text-gray-400">Check back later for new listings</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
}
