import "./Button.css";

function Button({
  children,
  variant = "primary",
}) {
  return (
    <button type="button" className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;