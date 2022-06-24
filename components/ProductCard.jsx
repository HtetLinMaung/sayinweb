export default function ProductCard({
  image,
  name,
  description,
  price,
  onClick,
}) {
  return (
    <div className="raised-rounded-card p-4 cursor-pointer" onClick={onClick}>
      <img
        className="rounded-xl"
        style={{ width: "100%", height: 200 }}
        src={image}
        alt="image"
      />

      <div className="font-bold text-xl my-5">{name}</div>
      <div
        className="overflow-hidden mb-5"
        style={{ height: 44, color: "#9C9C9C" }}
      >
        {description}
      </div>
      <div className="text-xl" style={{ color: "#0285FF" }}>
        {price} Ks
      </div>
    </div>
  );
}
