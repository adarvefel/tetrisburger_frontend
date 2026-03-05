export const endPoints = {

    admin: {

        users: {
            list: (numberPage: number) => `api/admin/users?page=${numberPage}&size=10`,
            create: "/api/admin/users",
            findById: (id: number) => `/api/admin/users/${id}`,
            update: (id: number) => `/api/admin/users/${id}`,
            updateImage: (id: number) => `/api/admin/users/${id}/image`,
            delete: (id: number) => `/api/admin/users/${id}`,
            searchByEmail: (email: string, numberPage: number) => `/api/admin/users/by-email?email=${email}&page=${numberPage}&size=10`,
        },

        product: {
            list: (numberPage: number) => `/api/products/list?page=${numberPage}&size=10&sortBy=id&direction=ASC`,
            create: "/api/products",
            findById: (id: number) => `/api/products/${id}`,
            update: (id: number) => `/api/products/${id}`,
            updateImage: (id: number) => `/api/products/image/${id}`,
            delete: (id: number) => `/api/products/${id}`,
            searchByName: (name: string, numberPage: number) => `api/products/search?q=${name}&page=${numberPage}&size=10`,

            listPrueba: (page: number, productCategoryId?: number) => {
                const query = new URLSearchParams({
                    page: page.toString(),
                    size: "5",
                    sortBy: "id",
                    direction: "ASC",
                });

                if (productCategoryId) {
                    query.append("productCategoryId", productCategoryId.toString());
                }

                return `/api/products/list?${query.toString()}`;
            },
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


        },

        addition: {
            create: "/api/admin/additions",
            list: (numberPage: number) => `/api/admin/additions?page=${numberPage}&size=10&sortBy=id&direction=ASC`,
            delete: (id: number) => `/api/admin/additions/${id}`,
            searchByName: (name: string, numberPage: number) => `/api/admin/additions/search?name=${name}&page=${numberPage}&size=10`,
            findById: (id: number) => `/api/admin/additions/${id}`,
            update: (id: number) => `/api/admin/additions/${id}`,
            updateImage: (id: number) => `/api/admin/additions/image/${id}`,

        },

        burgers: {
            create: "/api/admin/burgers/menu",
            listIngredients: (page: number, categoryId?: number) =>
                `/api/admin/burgers/ingredients?page=${page}&size=5${categoryId ? `&categoryId=${categoryId}` : ""}`,
            list: (numberPage: number) => `/api/admin/burgers/menu?page=${numberPage}&size=10&sortBy=idBurger&direction=ASC`,
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
        profile: {
            me: "/api/profile",
            updateProfile: "/api/profile",
            updateProfileImage: "/api/profile/image",
        },

        pqrs: {
            create: "/api/pqrs",
            listMe: (numberPage: number) => `/api/pqrs/me?page=${numberPage}&size=10&sortBy=idPqrs&direction=ASC`,
            findById: (id: number) => `/api/pqrs/${id}`,
            update: (id: number) => `/api/pqrs/${id}`,
            delete: (id: number) => `/api/pqrs/${id}`


        }
    }
}