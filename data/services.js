import {
    FiCode,
    FiSmartphone,
    FiCloud,
    FiShield,
    FiTrendingUp,
    FiDatabase,
    FiGlobe,
    FiCpu,
  } from "react-icons/fi";
  
  export const services = [
    {
      id: 1,
      title: "Custom Software Development",
      description:
        "Tailor-made software solutions designed to streamline your business operations and drive growth with cutting-edge technologies.",
      icon: "FiCode",
      features: ["Enterprise Apps", "SaaS Platforms", "API Development", "Microservices"],
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.",
      icon: "FiSmartphone",
      features: ["iOS & Android", "React Native", "Flutter", "PWA"],
      color: "from-orange-400 to-amber-500",
    },
    {
      id: 3,
      title: "Cloud Solutions & DevOps",
      description:
        "Scalable cloud infrastructure and DevOps practices to accelerate deployment and ensure 99.9% uptime.",
      icon: "FiCloud",
      features: ["AWS/Azure/GCP", "Docker & K8s", "CI/CD Pipelines", "Cloud Migration"],
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: 4,
      title: "Cybersecurity Services",
      description:
        "Comprehensive security solutions to protect your digital assets from threats and ensure regulatory compliance.",
      icon: "FiShield",
      features: ["Penetration Testing", "Security Audits", "SOC Services", "Compliance"],
      color: "from-red-500 to-orange-500",
    },
    {
      id: 5,
      title: "Digital Transformation",
      description:
        "End-to-end digital transformation strategies to modernize your business processes and stay ahead of competition.",
      icon: "FiTrendingUp",
      features: ["Process Automation", "Legacy Migration", "Digital Strategy", "Change Management"],
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 6,
      title: "Data & AI Solutions",
      description:
        "Harness the power of data analytics and artificial intelligence to make informed decisions and predict trends.",
      icon: "FiDatabase",
      features: ["Machine Learning", "Data Analytics", "BI Dashboards", "NLP Solutions"],
      color: "from-orange-600 to-red-600",
    },
    {
      id: 7,
      title: "Web Development",
      description:
        "Modern, responsive, and high-performance web applications built with the latest frameworks and technologies.",
      icon: "FiGlobe",
      features: ["React/Next.js", "Vue/Nuxt", "E-Commerce", "CMS Solutions"],
      color: "from-orange-400 to-orange-600",
    },
    {
      id: 8,
      title: "IoT Solutions",
      description:
        "Connect, monitor, and manage your devices with our Internet of Things solutions for smart business operations.",
      icon: "FiCpu",
      features: ["IoT Platforms", "Edge Computing", "Smart Devices", "Real-time Analytics"],
      color: "from-orange-500 to-amber-600",
    },
  ];