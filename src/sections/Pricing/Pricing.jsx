import "./Pricing.css";
import { motion } from "framer-motion";
const plans = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Basic Lessons",
      "Play Unlimited Games",
      "Community Access"
    ]
  },
  {
    title: "Pro",
    price: "$19",
    popular: true,
    features: [
      "AI Analysis",
      "Unlimited Lessons",
      "Coach Dashboard",
      "Priority Support"
    ]
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Creator Platform",
      "Custom Branding",
      "API Access",
      "Dedicated Support"
    ]
  }
];

function Pricing() {
  return (
    <motion.section
    className="pricing"
    id="pricing"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: .7 }}
>

      <h2>Simple Pricing</h2>

      <p>Choose the plan that fits your journey.</p>

      <div className="pricing-grid">

        {plans.map((plan, index) => (

          <div
            key={index}
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
          >

            {plan.popular && <span className="popular-tag">Most Popular</span>}

            <h3>{plan.title}</h3>

            <h1>{plan.price}</h1>

            <ul>

              {plan.features.map((item, i) => (

                <li key={i}>✓ {item}</li>

              ))}

            </ul>

            <button>Get Started</button>

          </div>

        ))}

      </div>

    </motion.section>
  );
}

export default Pricing;