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
            list: "/api/products/list",
            create: "/api/products",
            findById: (id: number) => `/api/products/${id}`,
            update: (id: number) => `/api/products/${id}`,
            updateImage: (id: number) => `/api/products/image/${id}`,
            delete: (id: number) => `/api/products/${id}`,
            searchByName: (name: string, numberPage: number, size: number = 10) => `api/products/search?q=${name}&page=${numberPage}&size=${size}`,
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
            list: (page: number, type?: string, status?: string, priority?: string) => {
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
            list: (numberPage: number, size: number = 10) => `/api/admin/burgers/menu?page=${numberPage}&size=${size}&sortBy=idBurger&direction=ASC`,
            delete: (id: number) => `/api/admin/burgers/menu/${id}`,
            searchByName: (name: string, numberPage: number, size: number = 10) => `/api/admin/burgers/menu/search?name=${name}&page=${numberPage}&size=${size}`,
            findById: (id: number) => `/api/admin/burgers/${id}`,
            update: (id: number) => `/api/admin/burgers/menu/${id}`,
            updateImage: (id: number) => `/api/admin/burgers/menu/${id}/image`,
            searchIngredientsByName: (name: string, numberPage: number) =>
                `/api/admin/burgers/ingredients/search?name=${name}&page=${numberPage}&size=5`
        },

        categoryMenu: {
            create: "/api/menu-category",
            update: (id: number) => `/api/menu-category/${id}`,
            findById: (id: number) => `/api/menu-category/${id}`,
            delete: (id: number) => `/api/menu-category/${id}`,
            list: (numberPage: number) => `/api/menu-categories?page=${numberPage}&size=10`,
        },

        menu: {
            create: "/api/menu",
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

            list: (numberPage: number) => `/api/menu?page=${numberPage}&size=10`,
            delete: (id: number) => `/api/menu/${id}`,
            update: (id: number) => `/api/menu/${id}`,
            updateImage: (id: number) => `/api/menu/${id}/image`,
            findById: (id: number) => `/api/menu/${id}`,
        },

        settings: {
            getSettingsAddition: "/api/addition-settings",
            updateSettingsAddition: "/api/addition-settings",
            getSettingsBurger: "/api/admin/settings/burgers",
            updateSettingsBurger: "/api/admin/settings/burgers",
        },


        
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
        },

        // 🔥 Merge correcto aquí
        cart: {
            sync: "/api/cart/sync",
            get: "/api/cart",
            clear: "/api/cart/clear",
        },

        burgerCustom: {
            create: "/api/burgers/custom",
            addFavorite: "/api/favorites",
            listFavorites: "/api/favorites",
            deleteFavorite: (id: number) => `/api/favorites/${id}`,
            update: (id: number) => `api/burgers/custom/${id}`
        },

        order: {
            create: "/api/orders",

        }

    },


    employee: {
        order: {
            list: (params: {
                page: number;
                status?: string;
                date?: string;
            }) => {
                const query = new URLSearchParams({
                    page: params.page.toString(),
                    size: "10",
                });

                if (params.status) query.append("status", params.status);
                if (params.date) query.append("date", params.date);

                return `/api/orders/all?${query.toString()}`;
            },

            updated: (id: number, status: string) => (`/api/orders/${id}/status?status=${status}&paymentMethod=CASH`),

            preview: (id: number) => (`/api/invoices/order/${id}/pdf`)


        }
    },

    public: {
        products: {
            list: (params?: {
                productType?: string;
                categoryId?: number;
                page?: number;
                size?: number;
            }) => {
                const query = new URLSearchParams({
                    page: (params?.page ?? 0).toString(),
                    size: (params?.size ?? 10).toString(),
                });
                if (params?.productType) query.append("productType", params.productType);
                if (params?.categoryId) query.append("categoryId", params.categoryId.toString());
                return `/api/products/public?${query.toString()}`;
            },
        },
        productCategory: {
            list: "/api/product-categories/public",
        },
    },

}