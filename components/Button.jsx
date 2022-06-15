export default function Button({
  children,
  color,
  style = {},
  onClick,
  block = false,
}) {
  const className = `text-white shadow-lg font-bold py-3 px-4 rounded-xl  active:scale-90 transition ease-in-out ${
    block ? "w-full" : "w-auto"
  }`;
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ ...style, backgroundColor: color ? color : "black" }}
    >
      {children}
    </button>
  );
}
