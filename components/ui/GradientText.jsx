export default function GradientText({ children, className = "" }) {
    return (
      <span
        className={`bg-gradient-to-r from-tribyte-orange via-tribyte-orange-light to-tribyte-orange bg-clip-text text-transparent ${className}`}
      >
        {children}
      </span>
    );
  }