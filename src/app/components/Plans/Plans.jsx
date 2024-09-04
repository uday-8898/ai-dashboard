import React, { useState } from "react";
import "./style.css";
const PlanCard = ({
  cardType,
  title,
  price,
  features,
  activeCard,
  onMouseOver,
  ribbon,
}) => {
  return (
    <div
      className={`pricing-card ${
        activeCard === cardType ? "active" : "otherPlan"
      }`}
    >
      <div className="card h-[400px]">
        {ribbon && (
          <div className="ribbon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <div>Best</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <h3 className="card-title">{title}</h3>
        <hr className="first" />
        <p className="card-price">
          <span>$</span>
          {price}
        </p>
        <ul className="features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <hr className="second" />
        <a href="#" className="card-btn">
          I want it
        </a>
      </div>
    </div>
  );
};

const Plans = () => {
  const [activeCard, setActiveCard] = useState("AI Pro (GPT-4o)");

  const handleMouseOver = (card) => {
    setActiveCard(card);
  };

  const plans = [
    {
      cardType: "Business",
      title: "Business",
      price: "9.99",
      features: [
        "For businesses and startups that are just beginning to implement WhatsApp chatbots.",
      ],
    },
    {
      cardType: "AI Pro (GPT-4o)",
      title: "AI Pro (GPT-4o)",
      price: "19.99",
      features: [
        "For businesses seeking superior accuracy and advanced AI performance. The model will be activated within 24 hours of purchase.",
      ],
      ribbon: true,
    },
    {
      cardType: "Enterprise",
      title: "Enterprise",
      price: "49.99",
      features: [
        "For businesses of all sizes seeking a tailored plan, priority support, and a dedicated bot-builder specialist.",
      ],
    },
  ];

  return (
    <section className="p-4">
      <p className="text-2xl font-bold">Choose the right plan for you</p>

      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            cardType={plan.cardType}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            activeCard={activeCard}
            onMouseOver={handleMouseOver}
            ribbon={plan.ribbon}
          />
        ))}
      </div>
    </section>
  );
};

export default Plans;
