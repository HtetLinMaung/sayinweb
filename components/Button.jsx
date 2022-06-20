export default function Button({
  children,
  color = "#0285FF",
  style = {},
  onClick,
  block = false,
  loading = false,
}) {
  const className = `text-white shadow-lg font-bold py-3 px-4 rounded-full  active:scale-90 transition ease-in-out ${
    block ? "w-full" : "w-auto"
  } ${loading ? "cursor-not-allowed animate-bounce" : "cursor-pointer"}`;

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        ...style,
        backgroundColor: color ? color : "black",
        fontSize: 12,
      }}
    >
      {children}
    </button>
  );
}
