export const endPoints = {

    admin: {

        users: {
            list: (numberPage: number) => `api/admin/users?page=${numberPage}&size=10`,
            create: "/api/admin/users",
            findById: (id: number) => `/api/admin/users/${id}`,
            update: (id: number) => `/api/admin/users/${id}`,
            delete: (id: number) => `/api/admin/users/${id}`,
        },

        product:{
            list: (numberPage: number) => `/api/products?page=${numberPage}&size=10&sortBy=id&direction=ASC`,
            create: "/api/products",
            findById: (id: number) => `/api/products/${id}`,
            update: (id: number) => `/api/products/${id}`,
            delete: (id: number) => `/api/products/${id}`,
        }

    },

    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        authGoogle: "/api/auth/google",
        forgotPassword: "/api/auth/forgot-password",
        resetPassword: "/api/auth/reset-password"
    },

    user:{
        profile: "/api/profile",
        updateProfile : "api/profile"
    }
}