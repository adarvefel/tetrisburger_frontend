import React, { useState } from 'react'
import "./faqPage.css"
import iconoTetrisBurger from "../../assets/iconoOficial.png"
import { Link } from 'react-router-dom'
import Footer from '../../shared/components/footer/Footer'
import Navbar from '../../shared/components/navbar/Navbar'

const FAQ_DATA = [
  {
    id: 1,
    question: "¿Cómo puedo personalizar mi hamburguesa?",
    answer:
      "Puedes personalizar tu hamburguesa desde la sección de 'Hamburguesa Personalizada' en la página de productos, donde podrás crearla desde cero eligiendo el tipo de pan,  ingredientes adicionales y salsas.",
  },
  {
    id: 2,
    question: "¿Puedo hacer pedidos para un grupo grande?",
    answer:
      "Para pedidos de más de 10 hamburguesas, te recomendamos contactarnos directamente por WhatsApp o correo para coordinar tiempos y asegurarnos de que todo llegue fresquito y caliente.",
  },
  {
    id: 3,
    question: "¿Puedo modificar o cancelar mi pedido?",
    answer:
      "Puedes cancelar tu pedido únicamente antes de haber realizado el pago a través de WhatsApp. Una vez confirmado y procesado el pago, no es posible modificar ni cancelar el pedido, ya que entra en preparación automáticamente.",
  },
]

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="faq__container-global">

      <Navbar />

      {/* ── Hero ── */}
      <header className="faq__hero">
        <img src={iconoTetrisBurger} alt="TetrisBurger" className="faq__logo-icon" />
        <h1 className="faq__title">
          Preguntas <span>Frecuentes</span>
        </h1>
        <p className="faq__subtitle">
          ¿Tienes dudas sobre tus burgers? Aquí encontrarás todas las respuestas,
          más rápido que un pedido exprés.
        </p>
      </header>

      {/* ── Squiggly divider ── */}
      <svg className="faq__divider" viewBox="0 0 1200 28" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0,14 C100,28 200,0 300,14 C400,28 500,0 600,14 C700,28 800,0 900,14 C1000,28 1100,0 1200,14 L1200,0 L0,0 Z"
          fill="#FFF8F8"
        />
      </svg>

      {/* ── Accordion list ── */}
      <main>
        <ul className="faq__list" role="list">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id
            return (
              <li key={item.id} className={`faq__item${isOpen ? " open" : ""}`}>
                <button
                  className="faq__question"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  {item.question}
                  <span className="faq__chevron" aria-hidden="true">▾</span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className="faq__answer"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="faq__answer-inner">
                    {item.answer}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* ── Contact banner ── */}
        <div className="faq__contact-banner">
          <div className="faq__contact-inner">
            <div className="faq__contact-text">
              <h3>¿No encontraste lo que buscabas?</h3>
              <p>Nuestro equipo está listo para ayudarte en minutos.</p>
            </div>
            <Link to={"/contact-us"} className="faq__contact-btn">
              Contactar soporte
            </Link>
          </div>
        </div>
      </main>


      <Footer />
    </div>
  )
}