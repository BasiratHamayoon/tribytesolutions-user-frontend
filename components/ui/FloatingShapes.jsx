"use client";

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-tribyte-orange/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-tribyte-orange/3 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-tribyte-orange/4 rounded-full blur-3xl animate-float-fast" />

      {/* Geometric Shapes */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-tribyte-orange/10 rounded-lg rotate-45 animate-spin-slow" />
      <div className="absolute bottom-1/3 left-1/5 w-16 h-16 border border-tribyte-orange/10 rounded-full animate-bounce-slow" />
      <div className="absolute top-2/3 right-1/6 w-12 h-12 bg-tribyte-orange/5 rounded-lg rotate-12 animate-float" />

      {/* Dots */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-tribyte-orange/20 rounded-full animate-particle-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
          }}
        />
      ))}

      {/* Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#FF6B00"
          strokeWidth="1"
        />
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="#FF6B00"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}