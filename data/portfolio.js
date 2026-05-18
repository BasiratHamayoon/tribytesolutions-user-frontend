export const portfolio = [
  {
    id: 1,
    category: "Web Application",
    title: "FinTech Banking Platform",
    description:
      "A comprehensive digital banking solution with real-time transactions and AI-powered insights.",
    fullDescription:
      "A comprehensive digital banking solution built for modern financial institutions. It features real-time transaction processing, AI-powered financial insights, fraud detection, and a seamless user experience across web and mobile. Serving over 50,000 active users with 99.9% uptime.",
    image: "/p1.png",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    link: "#",
    liveUrl: "#",
    duration: "8 months",
    client: "FinTech Corp.",
    year: "2024",
    services: ["UI/UX Design", "Full Stack Development", "Cloud Architecture", "AI Integration"],
    challenge:
      "Building a secure, scalable banking platform that handles real-time transactions at scale while meeting strict financial compliance standards and delivering a modern user experience.",
    solution:
      "We architected the platform on AWS with multi-region redundancy, implemented end-to-end encryption, and used event-driven architecture with Node.js for real-time transaction processing. AI models were integrated for fraud detection and personalized financial insights.",
    results: [
      "50K+ active users within 6 months of launch",
      "99.9% uptime with zero critical security incidents",
      "1M+ transactions processed successfully",
      "Transaction processing time under 300ms",
    ],
    screenshots: ["/p1.png", "/p2.png", "/p3.png"],
    stats: { users: "50K+", uptime: "99.9%", transactions: "1M+" },
  },
  {
    id: 2,
    category: "Enterprise Software",
    title: "Healthcare Management System",
    description:
      "End-to-end hospital management system with telemedicine and patient portal features.",
    fullDescription:
      "An end-to-end hospital management system that digitizes every aspect of clinical operations — from patient registration and appointment scheduling to telemedicine consultations, billing, and reporting. Deployed across 120+ hospitals serving 500K+ patients.",
    image: "/p2.png",
    tags: ["Next.js", "Python", "MongoDB", "Docker"],
    link: "#",
    liveUrl: "#",
    duration: "10 months",
    client: "MediCare Systems",
    year: "2023",
    services: ["Healthcare UX", "HIPAA Compliance", "Telemedicine Integration", "DevOps"],
    challenge:
      "Developing a HIPAA-compliant, interoperable system that integrates with legacy hospital infrastructure while supporting real-time telemedicine and handling sensitive patient data securely.",
    solution:
      "We built a microservices architecture using Docker and Python, with MongoDB for flexible medical record storage. WebRTC powers the telemedicine module. We achieved HIPAA compliance through end-to-end encryption, audit logging, and role-based access control.",
    results: [
      "Deployed across 120+ hospitals nationwide",
      "500K+ patients onboarded to the portal",
      "2K+ doctors actively using telemedicine",
      "Admin workload reduced by 40%",
    ],
    screenshots: ["/p2.png", "/p3.png", "/p1.png"],
    stats: { hospitals: "120+", patients: "500K+", doctors: "2K+" },
  },
  {
    id: 3,
    category: "Mobile & Web",
    title: "E-Commerce Marketplace",
    description:
      "Multi-vendor marketplace with AI recommendations and seamless payment integration.",
    fullDescription:
      "A full-featured multi-vendor e-commerce marketplace that connects thousands of sellers with millions of buyers. The platform features AI-powered product recommendations, real-time inventory management, and seamless payment processing through Stripe — driving over $10M in revenue.",
    image: "/p3.png",
    tags: ["React Native", "Node.js", "Redis", "Stripe"],
    link: "#",
    liveUrl: "#",
    duration: "7 months",
    client: "MarketHub Inc.",
    year: "2024",
    services: ["Mobile Development", "AI Recommendations", "Payment Integration", "Vendor Portal"],
    challenge:
      "Scaling a multi-vendor platform to handle millions of concurrent users, complex vendor management, real-time inventory sync, and a frictionless checkout experience across web and mobile.",
    solution:
      "We used React Native for cross-platform mobile and Node.js with Redis caching for high-performance APIs. The AI recommendation engine was built using collaborative filtering. Stripe handles all payment flows with support for multi-currency and split payouts.",
    results: [
      "5K+ active vendors onboarded",
      "2M+ orders processed successfully",
      "$10M+ in total revenue generated",
      "Average page load time under 1.2 seconds",
    ],
    screenshots: ["/p3.png", "/p1.png", "/p2.png"],
    stats: { vendors: "5K+", orders: "2M+", revenue: "$10M+" },
  },
  {
    id: 4,
    category: "IoT Solution",
    title: "Smart City IoT Dashboard",
    description:
      "Real-time monitoring and management dashboard for smart city infrastructure.",
    fullDescription:
      "A real-time IoT monitoring and management platform for smart city infrastructure. The dashboard aggregates data from 10,000+ connected devices across 5 cities — including traffic sensors, energy meters, and environmental monitors — enabling city administrators to make data-driven decisions instantly.",
    image: "/p1.png",
    tags: ["Vue.js", "Go", "InfluxDB", "MQTT"],
    link: "#",
    liveUrl: "#",
    duration: "9 months",
    client: "SmartCity Gov.",
    year: "2023",
    services: ["IoT Architecture", "Real-time Dashboard", "Data Pipeline", "Alert System"],
    challenge:
      "Processing and visualizing billions of data points from thousands of heterogeneous IoT devices in real time, while ensuring system reliability and low-latency alerting for critical infrastructure events.",
    solution:
      "We used Go for high-performance data ingestion via MQTT, InfluxDB for time-series data storage, and Vue.js for an intuitive real-time dashboard. An intelligent alerting engine detects anomalies and triggers notifications within milliseconds.",
    results: [
      "10K+ IoT devices connected and monitored",
      "Deployed across 5 cities",
      "1B+ data points processed and stored",
      "Alert latency reduced to under 500ms",
    ],
    screenshots: ["/p1.png", "/p2.png", "/p3.png"],
    stats: { devices: "10K+", cities: "5", dataPoints: "1B+" },
  },
  {
    id: 5,
    category: "Web Application",
    title: "EdTech Learning Platform",
    description:
      "Interactive learning platform with live classes, assessments, and progress tracking.",
    fullDescription:
      "A modern EdTech platform that reimagines online education with live interactive classes, adaptive assessments, gamified progress tracking, and AI-powered learning paths. Serving 100K+ students across 500+ courses with an industry-leading completion rate.",
    image: "/p2.png",
    tags: ["Next.js", "Django", "PostgreSQL", "WebRTC"],
    link: "#",
    liveUrl: "#",
    duration: "6 months",
    client: "EduFlow Education",
    year: "2024",
    services: ["LMS Development", "Live Video Streaming", "Gamification", "Analytics"],
    challenge:
      "Building a scalable live-class platform that supports hundreds of concurrent sessions while delivering adaptive learning experiences, detailed progress analytics, and a gamified interface that keeps students engaged.",
    solution:
      "We built the platform on Next.js with Django backend and PostgreSQL. WebRTC with an SFU server powers live classes at scale. An adaptive assessment engine adjusts difficulty based on learner performance, and a gamification layer drives engagement.",
    results: [
      "100K+ students onboarded",
      "500+ courses published by 1K+ instructors",
      "Course completion rate of 74% vs 15% industry average",
      "Supports 300+ concurrent live class sessions",
    ],
    screenshots: ["/p2.png", "/p3.png", "/p1.png"],
    stats: { students: "100K+", courses: "500+", instructors: "1K+" },
  },
  {
    id: 6,
    category: "Enterprise Software",
    title: "Supply Chain Management",
    description:
      "AI-powered supply chain optimization with predictive analytics and blockchain tracking.",
    fullDescription:
      "An AI-powered supply chain management platform that brings end-to-end visibility, predictive analytics, and blockchain-based shipment tracking to enterprise logistics. Helping 200+ companies optimize operations, reduce costs, and eliminate supply chain blind spots.",
    image: "/p3.png",
    tags: ["Angular", "Java", "Kafka", "Kubernetes"],
    link: "#",
    liveUrl: "#",
    duration: "12 months",
    client: "LogiChain Enterprise",
    year: "2023",
    services: ["Supply Chain Architecture", "AI/ML Models", "Blockchain Integration", "DevOps"],
    challenge:
      "Integrating AI-driven demand forecasting, real-time shipment tracking via blockchain, and complex multi-party data flows into a single enterprise platform that scales across global operations.",
    solution:
      "We built an event-driven microservices architecture using Java and Kafka for real-time data streaming. Kubernetes handles auto-scaling for peak loads. AI/ML models predict demand and flag supply risks. A private blockchain provides tamper-proof shipment tracking.",
    results: [
      "200+ enterprise companies onboarded",
      "5M+ shipments tracked on blockchain",
      "30% average cost savings for clients",
      "Demand forecast accuracy of 91%",
    ],
    screenshots: ["/p3.png", "/p1.png", "/p2.png"],
    stats: { companies: "200+", shipments: "5M+", savings: "30%" },
  },
];