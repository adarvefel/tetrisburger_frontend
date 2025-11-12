import React from 'react'
import Navbar from '../../../shared/components/navbar/Navbar'
import "./termsAndConditionsPage.css"
import Footer from '../../../shared/components/footer/Footer'

export default function TermsAndConditionsPage() {
  return (
    <div className="termsAndContionsPage__container-global">
      <Navbar />
      <div className='termsAndConditionsPage__text'>
        <p className='termsAndConditionsPage__title'>Términos y Condiciones</p>
        <p className='termsAndConditionsPage__subtitle'>Alcance del sitio</p>
        <p className='termsAndConditionsPage__content'>Estos Términos aplican a compras, promociones y contenidos publicados en la página web de TetrisBurger para pedidos en Medellín, Colombia. Las ofertas son personales e intransferibles, no acumulables entre sí y pueden modificarse o suspenderse en cualquier momento sin previo aviso.</p>
        <p className='termsAndConditionsPage__subtitle'>Cuentas y pedidos en línea</p>
        <p className='termsAndConditionsPage__content'>Para comprar en la página puedes crear cuenta o finalizar como invitado, garantizando que la información suministrada sea veraz y actualizada. El pedido queda sujeto a confirmación de disponibilidad y precio al cierre del checkout; errores evidentes de publicación podrán corregirse antes de preparar tu orden.</p>
        <p className='termsAndConditionsPage__subtitle'>Promociones en la página</p>
        <p className='termsAndConditionsPage__content'>Las promociones activas se comunican en banners y se aplican automáticamente en el carrito cuando cumples condiciones de la oferta. No son acumulables con otras promociones o cupones, no son canjeables por dinero y están limitadas por stock, cobertura y horarios de operación.</p>
        <p className='termsAndConditionsPage__subtitle'>Pagos y entrega</p>
        <p className='termsAndConditionsPage__content'>En la página se aceptan los métodos de pago listados en el checkout y el cobro se realiza al confirmar la orden. Las órdenes pueden ser a domicilio en zonas cubiertas de Medellín o para recoger en tienda, con tiempos estimados informados al confirmar el pedido.</p>
        <p className='termsAndConditionsPage__subtitle'>Cambios, cancelaciones y devoluciones</p>
        <p className='termsAndConditionsPage__content'>Puedes solicitar cancelación antes de iniciar la preparación, y si ya inició se aplicarán las políticas de calidad y servicio informadas en la página. Si hay error atribuible a TetrisBurger, se gestionará reposición o nota de crédito; por ser productos perecederos, no hay devoluciones por gusto o consumo parcial.</p>
        <p className='termsAndConditionsPage__subtitle'>Datos personales</p>
        <p className='termsAndConditionsPage__content'>Al usar la página autorizas el tratamiento de datos conforme a la Ley 1581 de 2012 y normas concordantes, para fines de atención, logística y comunicaciones comerciales. Puedes ejercer derechos de acceso, actualización y supresión a través del correo de contacto publicado en la página.</p>
        <p className='termsAndConditionsPage__subtitle'>Propiedad intelectual del sitio</p>
        <p className='termsAndConditionsPage__content'>Todo contenido del sitio (marcas, textos, imágenes, diseños y software) es de TetrisBurger o sus licenciantes, y su uso no autorizado está prohibido. Se otorga una licencia limitada para navegar y comprar en la página, sin permitir usos comerciales no autorizados ni obras derivadas.</p>
        <p className='termsAndConditionsPage__subtitle'>Limitación de responsabilidad</p>
        <p className='termsAndConditionsPage__content'>Las imágenes son ilustrativas y pueden variar respecto del producto entregado; precios y descripciones pueden ajustarse por errores tipográficos o de sistema. TetrisBurger no será responsable por indisponibilidad temporal del sitio, fallas técnicas o interrupciones de terceros que afecten la operación.</p>
        <p className='termsAndConditionsPage__subtitle'>Contacto</p>
        <p className='termsAndConditionsPage__content'>Para soporte de pedidos de la página y ejercicio de derechos de datos, utiliza el canal de contacto indicado en el apartado de Ayuda del sitio. La atención se brinda en horario de operación informado en la página, salvo eventos de fuerza mayor o mantenimiento programado.</p>
      </div>
      <Footer />
    </div>
  )
}
