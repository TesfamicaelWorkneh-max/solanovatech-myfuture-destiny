(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/navigation.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/store/useAuthStore'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
// "use client";
// import { useEffect, useState } from "react";
// import useAuthStore from "@/app/store/useAuthStore";
// import ProtectedRoute from "@/app/components/ProtectedRoute";
// import { Users, Home, BarChart, Shield, TrendingUp } from "lucide-react";
// import { api } from "@/lib/api";
// export default function AdminDashboardPage() {
//   const { user } = useAuthStore();
//   const [metrics, setMetrics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     fetchMetrics();
//   }, []);
//   const fetchMetrics = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/admin/metrics");
//       setMetrics(response.data.data);
//     } catch (error) {
//       console.error("Error fetching metrics:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <ProtectedRoute allowedRoles={["admin"]}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
//             <Shield className="w-8 h-8 text-primary-600 mr-3" />
//             <h1 className="text-3xl font-bold text-gray-900">
//               Admin Dashboard
//             </h1>
//           </div>
//           <p className="text-gray-600">
//             Welcome, {user?.name}. Monitor and manage the platform.
//           </p>
//         </div>
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Users</p>
//                 <p className="text-3xl font-bold mt-2">
//                   {metrics?.totalUsers || 0}
//                 </p>
//               </div>
//               <div className="p-3 rounded-lg bg-blue-100">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-green-600">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>12% from last month</span>
//             </div>
//           </div>
//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Properties</p>
//                 <p className="text-3xl font-bold mt-2">
//                   {metrics?.totalProperties || 0}
//                 </p>
//               </div>
//               <div className="p-3 rounded-lg bg-green-100">
//                 <Home className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-green-600">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>8% from last month</span>
//             </div>
//           </div>
//           <div className="card p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">System Health</p>
//                 <p className="text-3xl font-bold mt-2">100%</p>
//               </div>
//               <div className="p-3 rounded-lg bg-purple-100">
//                 <BarChart className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center text-sm text-green-600">
//               <TrendingUp className="w-4 h-4 mr-1" />
//               <span>All systems operational</span>
//             </div>
//           </div>
//         </div>
//         {/* Detailed Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Users by Role */}
//           <div className="card p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Users by Role
//             </h2>
//             <div className="space-y-4">
//               {metrics?.usersByRole.map((role) => (
//                 <div
//                   key={role._id}
//                   className="flex items-center justify-between"
//                 >
//                   <div className="flex items-center">
//                     <div
//                       className={`w-3 h-3 rounded-full mr-3 ${
//                         role._id === "admin"
//                           ? "bg-purple-500"
//                           : role._id === "owner"
//                             ? "bg-blue-500"
//                             : "bg-green-500"
//                       }`}
//                     />
//                     <span className="capitalize">{role._id}s</span>
//                   </div>
//                   <div className="font-semibold">{role.count}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Properties by Status */}
//           <div className="card p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Properties by Status
//             </h2>
//             <div className="space-y-4">
//               {metrics?.propertiesByStatus.map((status) => (
//                 <div
//                   key={status._id}
//                   className="flex items-center justify-between"
//                 >
//                   <div className="flex items-center">
//                     <div
//                       className={`w-3 h-3 rounded-full mr-3 ${
//                         status._id === "published"
//                           ? "bg-green-500"
//                           : status._id === "draft"
//                             ? "bg-yellow-500"
//                             : "bg-gray-500"
//                       }`}
//                     />
//                     <span className="capitalize">{status._id}</span>
//                   </div>
//                   <div className="font-semibold">{status.count}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* Recent Properties */}
//         <div className="mt-8">
//           <div className="card p-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Recently Added Properties
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Property
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Owner
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {metrics?.recentProperties.map((property) => (
//                     <tr key={property._id}>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {property.title}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900">
//                           {property.owner?.name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {property.owner?.email}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                             property.status === "published"
//                               ? "bg-green-100 text-green-800"
//                               : property.status === "draft"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-gray-100 text-gray-800"
//                           }`}
//                         >
//                           {property.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-900">
//                         ${property.price?.toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
"use client";
;
;
;
function AdminDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthenticated } = useAuthStore();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            console.log("Admin Dashboard - User:", user);
            console.log("Admin Dashboard - Authenticated:", isAuthenticated);
            if (!isAuthenticated) {
                router.push("/login");
                return;
            }
            if (user?.role !== "admin") {
                router.push("/");
                return;
            }
        }
    }["AdminDashboard.useEffect"], [
        user,
        isAuthenticated,
        router
    ]);
    if (!isAuthenticated || user?.role !== "admin") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600",
                        children: "Checking permissions..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                lineNumber: 268,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
            lineNumber: 267,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-gray-900 mb-6",
                    children: "Admin Dashboard"
                }, void 0, false, {
                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                    lineNumber: 279,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow p-6 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-4",
                            children: [
                                "Welcome, ",
                                user.name,
                                "!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-2",
                            children: [
                                "Email: ",
                                user.email
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-2",
                            children: [
                                "Role: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-blue-600",
                                    children: user.role
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 287,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: [
                                "Phone: ",
                                user.phone
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                    lineNumber: 283,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2",
                                    children: "Users"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Manage system users"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
                                    children: "View Users"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2",
                                    children: "Properties"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 302,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Manage all properties"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 303,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
                                    children: "View Properties"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 301,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2",
                                    children: "System"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "System settings & logs"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
                                    children: "System Settings"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
                    lineNumber: 292,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
            lineNumber: 278,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/page.js",
        lineNumber: 277,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "hruLzN1c/xxNFHGHm3lKECexqRU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        useAuthStore
    ];
});
_c = AdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_solanovatech_frontend_my-app_392913d8._.js.map