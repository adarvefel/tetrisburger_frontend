export const endPoints = {

    admin: {

        users: {
            list: (numberPage: number) => `api/admin/users?page=${numberPage}&size=10`,
            create: "/api/admin/users",
            findById: (id: number) => `/api/admin/users/${id}`,
            update: (id: number) => `/api/admin/users/${id}`,
            updateImage: (id: number) => `/api/admin/users/${id}/image`,
            delete: (id: number) => `/api/admin/users/${id}`,
        },

        product: {
            list: (numberPage: number) => `/api/products?page=${numberPage}&size=10&sortBy=id&direction=ASC`,
            create: "/api/products",
            findById: (id: number) => `/api/products/${id}`,
            update: (id: number) => `/api/products/${id}`,
            delete: (id: number) => `/api/products/${id}`,
        },

        productCategory: {
            list: (numberPage: number) => `/api/product-categories?page=${numberPage}&size=10&sortBy=id&direction=ASC`,
            create: "/api/product-categories",
            findById: (id: number) => `/api/product-categories/${id}`,
            update: (id: number) => `/api/product-categories/${id}`,
            delete: (id: number) => `/api/product-categories/${id}`,
        },

        supplier: {
            list: (numberPage: number) => `/api/suppliers?page=${numberPage}&size=10&sortBy=id&direction=ASC`,
            create: "/api/suppliers",
            findById: (id: number) => `/api/suppliers/${id}`,
            update: (id: number) => `/api/suppliers/${id}`,
            delete: (id: number) => `/api/suppliers/${id}`,
        },

        pqrs: {
            list: (
                page: number,
                type?: string,
                status?: string,
                priority?: string) => {
                const query = new URLSearchParams({
                    page: page.toString(),
                });

                if (type) query.append("type", type);
                if (status) query.append("status", status);
                if (priority) query.append("priority", priority);

                return `/api/pqrs?${query.toString()}`;
            },

            delete: (id: number) => `/api/pqrs/${id}`,

            findById: (id: number) => `/api/pqrs/${id}`,

            update: (id: number) => `/api/pqrs/admin/${id}`,

            
        }



    },

    auth: {
        login: "/api/auth/login",
        register: "/api/auth/register",
        authGoogle: "/api/auth/google",
        forgotPassword: "/api/auth/forgot-password",
        resetPassword: "/api/auth/reset-password"
    },

    user: {
        profile: "/api/profile",
        updateProfile: "api/profile",

        pqrs: {
            create: "/api/pqrs",
            listMe: (numberPage: number) => `/api/pqrs/me?page=${numberPage}&size=10&sortBy=idPqrs&direction=ASC`,
            findById: (id: number) => `/api/pqrs/${id}`,
            update: (id: number) => `/api/pqrs/${id}`,
            delete: (id: number) => `/api/pqrs/${id}`
            

        }
    }
}