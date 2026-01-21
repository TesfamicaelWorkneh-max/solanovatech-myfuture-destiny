module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/solanovatech/frontend/my-app/src/app/components/ProtectedRoute.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$app$2f$store$2f$useAuthStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/src/app/store/useAuthStore.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ProtectedRoute({ children, allowedRoles = [] }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$app$2f$store$2f$useAuthStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
            router.push("/");
        }
    }, [
        isAuthenticated,
        user,
        allowedRoles,
        router
    ]);
    if (!isAuthenticated || allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/components/ProtectedRoute.js",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600",
                        children: "Checking authentication..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/components/ProtectedRoute.js",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/components/ProtectedRoute.js",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/components/ProtectedRoute.js",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/Desktop/solanovatech/frontend/my-app/src/lib/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || "http://localhost:5000/api";
const api = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});
// Request interceptor to add token
api.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
}, (error)=>Promise.reject(error));
// Response interceptor for error handling
api.interceptors.response.use((response)=>response, (error)=>{
    if (error.response?.status === 401) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.location.href = "/login";
    }
    return Promise.reject(error);
});
}),
"[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminUsersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$app$2f$store$2f$useAuthStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/src/app/store/useAuthStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$app$2f$components$2f$ProtectedRoute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/src/app/components/ProtectedRoute.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/lucide-react/dist/esm/icons/user-check.js [app-ssr] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserX$3e$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/lucide-react/dist/esm/icons/user-x.js [app-ssr] (ecmascript) <export default as UserX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/src/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/solanovatech/frontend/my-app/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function AdminUsersPage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$app$2f$store$2f$useAuthStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchUsers();
    }, []);
    const fetchUsers = async ()=>{
        try {
            setLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get("/admin/users");
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error("Failed to load users");
        } finally{
            setLoading(false);
        }
    };
    const handleToggleUserStatus = async (userId, userName)=>{
        const userToToggle = users.find((u)=>u._id === userId);
        const action = userToToggle?.deletedAt ? "enable" : "disable";
        if (!confirm(`Are you sure you want to ${action} ${userName}?`)) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].put(`/admin/users/${userId}/toggle-status`);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success(`User ${action}d successfully`);
            fetchUsers();
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(error.response?.data?.message || `Failed to ${action} user`);
        }
    };
    const formatDate = (dateString)=>{
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[400px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-gray-600",
                        children: "Loading users..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                lineNumber: 55,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
            lineNumber: 54,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$src$2f$app$2f$components$2f$ProtectedRoute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        allowedRoles: [
            "admin"
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "w-8 h-8 text-primary-600 mr-3"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl font-bold text-gray-900",
                                                children: "Manage Users"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600",
                                                children: "View and manage all user accounts on the platform."
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: fetchUsers,
                                className: "flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    "Refresh"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card p-6",
                    children: users.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                className: "w-16 h-16 text-gray-300 mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-gray-900 mb-2",
                                children: "No users found"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600",
                                children: "There are no users in the system yet."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 105,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 108,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 111,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                children: "Joined"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 117,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-gray-200",
                                    children: users.map((userItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-gray-900",
                                                        children: userItem.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                        lineNumber: 129,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                    lineNumber: 128,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-900",
                                                        children: userItem.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                        lineNumber: 134,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                    lineNumber: 133,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 rounded-full text-xs font-semibold ${userItem.role === "admin" ? "bg-purple-100 text-purple-800" : userItem.role === "owner" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`,
                                                        children: userItem.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                        lineNumber: 139,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                    lineNumber: 138,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 rounded-full text-xs font-semibold ${userItem.deletedAt ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`,
                                                        children: userItem.deletedAt ? "Disabled" : "Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                        lineNumber: 152,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 text-sm text-gray-500",
                                                    children: formatDate(userItem.createdAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                    lineNumber: 162,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 text-sm font-medium",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleToggleUserStatus(userItem._id, userItem.name),
                                                        className: `flex items-center ${userItem.deletedAt ? "text-green-600 hover:text-green-900" : "text-red-600 hover:text-red-900"}`,
                                                        disabled: userItem._id === user?._id,
                                                        children: userItem.deletedAt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                                    className: "w-4 h-4 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                                    lineNumber: 179,
                                                                    columnNumber: 31
                                                                }, this),
                                                                "Enable"
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$solanovatech$2f$frontend$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserX$3e$__["UserX"], {
                                                                    className: "w-4 h-4 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                                    lineNumber: 184,
                                                                    columnNumber: 31
                                                                }, this),
                                                                "Disable"
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                        lineNumber: 166,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                                    lineNumber: 165,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, userItem._id, true, {
                                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                            lineNumber: 127,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                            lineNumber: 102,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/solanovatech/frontend/my-app/src/app/dashboard/admin/users/page.js",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ae59637d._.js.map