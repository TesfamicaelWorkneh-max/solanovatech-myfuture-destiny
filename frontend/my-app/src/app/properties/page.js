// import PropertyList from "@/app/components/PropertyList";
// import { api } from "@/lib/api";

// async function getProperties(searchParams) {
//   try {
//     const response = await api.get("/properties/search", {
//       params: searchParams,
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     return [];
//   }
// }

// export default async function PropertiesPage({ searchParams }) {
//   const properties = await getProperties(searchParams);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Browse Properties
//         </h1>
//         <p className="text-gray-600">{properties.length} properties found</p>
//       </div>

//       <PropertyList properties={properties} />
//     </div>
//   );
// // }
// import PropertyList from "@/app/components/PropertyList.js";
// import { api } from "@/lib/api";

// async function getProperties(searchParams = {}) {
//   try {
//     const API_URL =
//       process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

//     // Build query string from searchParams
//     const queryParams = new URLSearchParams();
//     Object.keys(searchParams).forEach((key) => {
//       if (searchParams[key]) {
//         queryParams.append(key, searchParams[key]);
//       }
//     });

//     const url = queryParams.toString()
//       ? `${API_URL}/properties/search?${queryParams.toString()}`
//       : `${API_URL}/properties?limit=12&status=published`;

//     const res = await fetch(url, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return [];
//     }

//     const data = await res.json();
//     return data.data || [];
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     return [];
//   }
// }

// export default async function PropertiesPage({ searchParams }) {
//   // searchParams is a Promise, so we need to await it
//   const params = await searchParams;
//   const properties = await getProperties(params);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Browse Properties
//           </h1>
//           <p className="text-gray-600">{properties.length} properties found</p>
//         </div>

//         <PropertyList properties={properties} />
//       </div>
//     </div>
//   );
// }
import PropertyList from "@/app/components/PropertyList.js";

async function getProperties(searchParams = {}) {
  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    // Build query string from searchParams
    const queryParams = new URLSearchParams();

    // Only add non-empty parameters
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] && searchParams[key].trim() !== "") {
        queryParams.append(key, searchParams[key]);
      }
    });

    // Always show published properties for public
    if (!searchParams.status) {
      queryParams.append("status", "published");
    }

    const url = `${API_URL}/properties?${queryParams.toString()}&limit=12`;

    console.log("Fetching properties from:", url);

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch properties:", res.status);
      return [];
    }

    const data = await res.json();
    console.log("Properties data received:", data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function PropertiesPage({ searchParams }) {
  // searchParams is a Promise in Next.js 14
  const params = await searchParams;

  console.log("Search params:", params);

  const properties = await getProperties(params);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Properties
          </h1>
          <p className="text-gray-600">{properties.length} properties found</p>
        </div>

        <PropertyList properties={properties} />
      </div>
    </div>
  );
}
