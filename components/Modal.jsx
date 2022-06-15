export default function Modal({
  open,
  children,
  minWidth = 500,
  onOverlayClick,
}) {
  const className = `fixed flex justify-center items-center h-screen w-screen top-0 left-0 z-50 overflow-auto transition ease-in-out ${
    !open ? "scale-0" : "scale-100"
  } `;

  return (
    <div className={className} onClick={onOverlayClick}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white shadow-lg rounded-2xl p-10 "
        style={{ minWidth }}
      >
        {children}
      </div>
    </div>
  );
}
