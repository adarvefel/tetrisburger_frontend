import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/homePage/Home'
import RegisterPage from '../pages/auth/registerPage/RegisterPage'
import LoginPage from '../pages/auth/loginPage/LoginPage'
import ForgotPasswordPage from '../pages/auth/forgot-passwordPage/ForgotPasswordPage'
import ResetPasswordPage from '../pages/auth/reset-passwordPage/ResetPasswordPage'
import CorreoEnviado from '../shared/components/formAuth/correoEnviado/CorreoEnviado'
import Navbar from '../shared/components/navbar/Navbar'
import Footer from '../shared/components/footer/Footer'
import HeroSection from '../pages/homePage/components/heroSection/HeroSection'
import OptionsSection from '../pages/homePage/components/optionsSection/OptionsSection'
import AboutSection from '../pages/homePage/components/aboutSection/AboutSection'
import GallerySection from '../pages/homePage/components/gallerySection/GallerytSection'
import ExtraGallerySection from '../pages/homePage/components/extraGallerySection/ExtraGallerySection'
import UserCard from '../entities/user/ui/UserCard'
import UserList from '../features/admin/user/ui/userList/UserList'
import UserUpdate from '../features/admin/user/ui/userUpdate/UserUpdate'
import ProfileUserPage from '../pages/user/profilePage/ProfileUserPage'
import IconTetris from '../shared/components/iconTetris/IconTetris'
import UsersCreatePage from '../pages/admin/users/usersCreatePage/UsersCreatePage'
import UsersListPage from '../pages/admin/users/usersListPage/UsersListPage'
import UsersUpdatePage from '../pages/admin/users/usersUpdatePage/UsersUpdatePage'
import TermsAndConditionsPage from '../pages/auth/termsAndConditionsPage/TermsAndConditionsPage'
import ProductsListPage from '../pages/admin/products/productsListPage/productsListPage'
import ProductsCreatePage from '../pages/admin/products/productsCreatePage/productsCreatePage'
import ProductsUpdatePage from '../pages/admin/products/productsUpdatePage/productsUpdatePage'
import ProductCategoriesListPage from '../pages/admin/productCategory/productCategoriesListPage/productCategoriesListPage'
import SuppliersListPage from '../pages/admin/suppliers/suppliersListPage/suppliersListPage'
import ProductCategoriesCreatePage from '../pages/admin/productCategory/productCategoriesCreatePage/productCategoriesCreatePage'
import ProductCategoriesUpdatePage from '../pages/admin/productCategory/productCategoriesUpdatePage/productCategoriesUpdatePage'
import SuppliersCreatePage from '../pages/admin/suppliers/suppliersCreatePage/suppliersCreatePage'
import SuppliersUpdatePage from '../pages/admin/suppliers/suppliersUpdatePage/suppliersUpdatePage'
import ContactUsPage from '../pages/contactUs/ContactUsPage'
import PqrsCreate from '../features/user/pqrs/ui/pqrsCreate/PqrsCreate'
import PqrsCreatePage from '../pages/user/pqrs/pqrsCreatePage/PqrsCreatePage'
import PqrsMePage from '../pages/user/pqrs/pqrsMePage/PqrsMePage'
import PqrsListMe from '../features/user/pqrs/ui/pqrsListMe/PqrsListMe'
import PqrsListPage from '../pages/admin/pqrs/pqrsListPage/PqrsListPage'
import ConfirmDeleteModal from '../shared/components/confirmDeleteModal/ConfirmDeleteModal'
import PqrsUpdatePage from '../pages/admin/pqrs/pqrsUpdatePage/PqrsUpdatePage'
import PqrsUpdateMePage from '../pages/user/pqrs/pqrsUpdateMePage/PqrsUpdateMePage'
import ProtectedRoute from "../shared/routes/ProtectedRoute";
import AdminSidebar from '../pages/admin/components/adminSidebar/AdminSidebar'
import TestTable from '../shared/components/componetsCrud/table/TestTable'
import TestFields from '../shared/components/componetsCrud/fields/TestFields'
import ButtonSubmitCrud from '../shared/components/componetsCrud/buttonSubmit/ButtonSubmitCrud'

import { FaCircleExclamation } from "react-icons/fa6";
import SubTittleCrud from '../shared/components/componetsCrud/subTittle/SubTittleCrud'

import CreateBurger from '../shared/components/test/createBurger/CreateBurger'

import InputSearch from '../shared/components/componetsCrud/fields/inputSearch/InputSearch'
import BurgerCustomForm from '../shared/components/formsCruds/burgerCustomForm/BurgerCustomForm'

import AdditionForm from '../shared/components/formsCruds/additionForm/AdditionForm'
import CreateAdditionPage from '../pages/admin/additions/createAdditionPage/CreateAdditionPage'
import ListAdditionPage from '../pages/admin/additions/listAdditionPage/ListAdditionPage'
import UpdateAdditionPage from '../pages/admin/additions/updateAdditionPage/UpdateAdditionPage'
import CreateBurgerPage from '../pages/admin/burgers/createBurgerPage/CreateBurgerPage'
import ListBurgerPage from '../pages/admin/burgers/listBurgerPage/ListBurgerPage'
import UpdateBurgerPage from '../pages/admin/burgers/updateBurgerPage/UpdateBurgerPage'
import InputNumberCrud from '../shared/components/componetsCrud/fields/inputNumberCrud/InputNumberCrud'
import CreateMenuCategoryPage from '../pages/admin/menuCategory/createMenuCategoryPage/CreateMenuCategoryPage'
import ListMenuCategoryPage from '../pages/admin/menuCategory/listMenuCategoryPage/ListMenuCategoryPage'
import UpdateMenuCategoryPage from '../pages/admin/menuCategory/updateMenuCategoryPage/UpdateMenuCategoryPage'
import UpdateMenuPage from '../pages/admin/menu/updateMenuPage/UpdateMenuPage'
import ListMenuPage from '../pages/admin/menu/listMenuPage/ListMenuPage'
import CreateMenuPage from '../pages/admin/menu/createMenuPage/CreateMenuPage'
import CategoryMenuForm from '../shared/components/formsCruds/categoryMenuForm/CategoryMenuForm'
import MenuForm from '../shared/components/formsCruds/menuForm/MenuForm'
import ListConfigurationsPage from '../pages/admin/configurations/listConfigurationsPage/ListConfigurationsPage'
import LoadingSpinner from '../shared/components/loadings/loadingSpinner/LoadingSpinner'







export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/*RUTAS PA TODO EL WORLD*/}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={< RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/terms' element={<TermsAndConditionsPage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />


        {/*RUTAS PA LOS CLIENTES , etc...*/}
        <Route path="/profile" element={<ProtectedRoute><ProfileUserPage /></ProtectedRoute>} />
        <Route path="/pqrs-create" element={<ProtectedRoute><PqrsCreatePage /></ProtectedRoute>} />
        <Route path="/pqrs-me" element={<ProtectedRoute><PqrsMePage /></ProtectedRoute>} />
        <Route path="/pqrs/update/:id" element={<ProtectedRoute><PqrsUpdateMePage /></ProtectedRoute>} />



        {/*RUTAS PA ADMINS*/}
        <Route path="/admin/users-list" element={<ProtectedRoute requireAdmin><UsersListPage /></ProtectedRoute>} />
        <Route path="/admin/users-create" element={<ProtectedRoute requireAdmin><UsersCreatePage /></ProtectedRoute>} />
        <Route path="/admin/users/update/:id" element={<ProtectedRoute requireAdmin><UsersUpdatePage /></ProtectedRoute>} />

        <Route path="/admin/product-list" element={<ProtectedRoute requireAdmin><ProductsListPage /></ProtectedRoute>} />
        <Route path="/admin/product/create" element={<ProtectedRoute requireAdmin><ProductsCreatePage /></ProtectedRoute>} />
        <Route path="/admin/product/update/:id" element={<ProtectedRoute requireAdmin><ProductsUpdatePage /></ProtectedRoute>} />

        <Route path="/admin/category-list" element={<ProtectedRoute requireAdmin><ProductCategoriesListPage /></ProtectedRoute>} />
        <Route path="/admin/category/create" element={<ProtectedRoute requireAdmin><ProductCategoriesCreatePage /></ProtectedRoute>} />
        <Route path="/admin/category/update/:id" element={<ProtectedRoute requireAdmin><ProductCategoriesUpdatePage /></ProtectedRoute>} />

        <Route path="/admin/suppliers-list" element={<ProtectedRoute requireAdmin><SuppliersListPage /></ProtectedRoute>} />
        <Route path="/admin/suppliers/create" element={<ProtectedRoute requireAdmin><SuppliersCreatePage /></ProtectedRoute>} />
        <Route path="/admin/suppliers/update/:id" element={<ProtectedRoute requireAdmin><SuppliersUpdatePage /></ProtectedRoute>} />

        <Route path="/admin/pqrs-list" element={<ProtectedRoute requireAdmin><PqrsListPage /></ProtectedRoute>} />
        <Route path="/admin/pqrs/update/:id" element={<ProtectedRoute requireAdmin><PqrsUpdatePage /></ProtectedRoute>} />

        <Route path="/admin/addition-create" element={<ProtectedRoute requireAdmin><CreateAdditionPage /></ProtectedRoute>} />
        <Route path="/admin/addition-list" element={<ProtectedRoute requireAdmin><ListAdditionPage /></ProtectedRoute>} />
        <Route path="/admin/addition/update/:id" element={<ProtectedRoute requireAdmin><UpdateAdditionPage /></ProtectedRoute>} />

        <Route path="/admin/burger-create" element={<ProtectedRoute requireAdmin><CreateBurgerPage /></ProtectedRoute>} />
        <Route path="/admin/burger-list" element={<ProtectedRoute requireAdmin><ListBurgerPage /></ProtectedRoute>} />
        <Route path="/admin/burger/update/:id" element={<ProtectedRoute requireAdmin><UpdateBurgerPage /></ProtectedRoute>} />

        <Route path="/admin/category-menu-create" element={<ProtectedRoute requireAdmin><CreateMenuCategoryPage /></ProtectedRoute>} />
        <Route path="/admin/category-menu-list" element={<ProtectedRoute requireAdmin><ListMenuCategoryPage /></ProtectedRoute>} />
        <Route path="/admin/category-menu/update/:id" element={<ProtectedRoute requireAdmin><UpdateMenuCategoryPage /></ProtectedRoute>} />

        <Route path="/admin/menu-create" element={<ProtectedRoute requireAdmin><CreateMenuPage /></ProtectedRoute>} />
        <Route path="/admin/menu-list" element={<ProtectedRoute requireAdmin><ListMenuPage /></ProtectedRoute>} />
        <Route path="/admin/menu/update/:id" element={<ProtectedRoute requireAdmin><UpdateMenuPage /></ProtectedRoute>} />

        <Route path="/admin/configurations-list" element={<ProtectedRoute requireAdmin><ListConfigurationsPage /></ProtectedRoute>} />

        {/*Pruebas de componentres */}
        <Route path='/prueba2' element={<CorreoEnviado correo='mipene@gmail.com' />} />
        <Route path='/prueba3' element={<Navbar />} />
        <Route path='/prueba4' element={<Footer />} />
        <Route path='/prueba5' element={<HeroSection />} />
        <Route path='/prueba6' element={<OptionsSection />} />
        <Route path='/prueba7' element={<AboutSection />} />
        <Route path='/prueba8' element={<GallerySection />} />
        <Route path='/prueba9' element={<ExtraGallerySection />} />


        <Route path='/prueba10' element={<UserCard
          userName='Jaimito Cojoncio'
          userEmail='jaimito@gmail.com'
          userId={99}
          userRole="Cliente"

        />} />

        <Route path='/prueba11' element={<UserList />} />
        <Route path='/prueba12/:id' element={<UserUpdate />} />



        <Route path='/users-list' element={<UsersListPage />} />








        <Route path='/prueba17' element={<IconTetris />} />

        <Route path='/prueba18' element={<PqrsCreate />} />

        <Route path='/prueba19' element={<PqrsListMe />} />

        <Route path='/prueba20' element={<ConfirmDeleteModal description='description prueba' onClose={() => { }} onConfirm={() => { }} />} />

        <Route path='/prueba21' element={<AdminSidebar />} />


        <Route path='/prueba23' element={<TestTable />} />

        <Route path='/prueba23' element={<TestTable />} />


        <Route path='/prueba24' element={<TestFields />} />

        <Route path='/prueba25' element={<ButtonSubmitCrud label='Actualizar' />} />

        <Route path='/prueba26' element={<SubTittleCrud title='Actualizar datos de don pene' icon={<FaCircleExclamation size={23} color='red' />} />} />


        <Route path='/prueba27' element={<CreateBurger />} />


        <Route path='/prueba28' element={<MenuForm />} />

        <Route path='/prueba29' element={<InputNumberCrud />} />



        <Route path='/prueba30' element={<InputSearch />} />

        <Route path='/prueba31' element={<LoadingSpinner />}/>

      </Routes>
    </BrowserRouter>
  )
}
