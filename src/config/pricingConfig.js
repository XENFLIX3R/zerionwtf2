export const pricingConfig = {
  title: "Choose Your Plan",
  description: "Select the perfect plan to unleash Zerion's full potential.",
  maxPlansToShow: 2,
  plans: [
    {
      name: "Standard Plan",
      description: "Perfect for getting started with serverside execution",
      price: "$10",
      period: "/lifetime",
      features: [
        "Instant serverside access",
        "Basic script execution",
        "Full FE compatibility",
        "Community script access",
        "Discord community access"
      ],
      buttonText: "Get Standard",
      popular: false
    },
    {
      name: "Premium Plan",
      description: "Ultimate power with exclusive features",
      price: "$20",
      period: "/lifetime",
      features: [
        "All Standard features",
        "Premium script library",
        "Priority execution speed",
        "Advanced command access",
        "VIP Discord support"
      ],
      buttonText: "Get Premium",
      popular: true
    }
  ]
};