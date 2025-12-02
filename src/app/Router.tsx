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
import NavbarAuthenticated from '../shared/components/navbar/navbarAuthenticated/NavbarAuthenticated'
import UserForm from '../shared/components/userForm/UserForm'
import { createUser } from '../entities/user/api/userApi'
import ProfileUserPage from '../pages/user/profilePage/ProfileUserPage'
import IconTetris from '../shared/components/iconTetris/IconTetris'
import UsersListPage2 from '../pages/admin/users/usersListPage/UsersListPage'
import ButtonCasual from '../shared/components/buttonCasual/ButtonCasual'
import UsersCreate from '../pages/admin/users/usersCreatePage/UsersCreatePage'
import UsersCreatePage from '../pages/admin/users/usersCreatePage/UsersCreatePage'
import UsersListPage from '../pages/admin/users/usersListPage/UsersListPage'
import UsersUpdatePage from '../pages/admin/users/usersUpdatePage/UsersUpdatePage'
import TermsAndConditionsPage from '../pages/auth/termsAndConditionsPage/TermsAndConditionsPage'
import ProductsListPage from '../pages/admin/products/productsListPage/productsListPage'
import ProductsCreatePage from '../pages/admin/products/productsCreatePage/productsCreatePage'
import ProductUpdate from '../features/admin/product/ui/productUpdate/productUpdate'
import ProductsUpdatePage from '../pages/admin/products/productsUpdatePage/productsUpdatePage'





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


        {/*RUTAS PA LOS CLIENTES , etc...*/}
        <Route path='/profile' element={<ProfileUserPage />} />


        {/*RUTAS PA ADMINS*/}
        <Route path='/admin/users-list' element={<UsersListPage />} />
        <Route path='/admin/users-create' element={<UsersCreatePage/>}/>
        <Route path='/admin/users/update/:id' element={<UsersUpdatePage/>} />
        <Route path='/admin/product-list' element={<ProductsListPage/>} />
        <Route path='/admin/product/create' element={<ProductsCreatePage/>}/>
        <Route path='/admin/product/update/:id' element={<ProductsUpdatePage/>}/>


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
        


      </Routes>
    </BrowserRouter>
  )
}
