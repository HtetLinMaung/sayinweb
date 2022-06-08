export default function Layout({ children }) {
  return (
    <div className="flex">
      <nav
        className="w-60 h-screen shadow-2xl text-white "
        style={{ backgroundColor: "#1A1C1E" }}
      >
        <ul style={{ fontSize: 14 }}>
          <li
            className="py-2 px-4 m-6 rounded-xl cursor-pointer"
            style={{ backgroundColor: "#313334" }}
          >
            Product
          </li>
        </ul>
      </nav>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
