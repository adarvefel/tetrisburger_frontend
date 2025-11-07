export const endPoints = {

    admin: {

        users: {
            list: (numberPage: number) => `api/admin/users?page=${numberPage}&size=10`,
            create: "/api/admin/users",
            findById: (id: number) => `/api/admin/users/${id}`,
            update: (id: number) => `/api/admin/users/${id}`,
            delete: (id: number) => `/api/admin/users/${id}`,
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