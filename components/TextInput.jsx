export default function TextInput({ style, placeholder }) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="outline-none py-3 px-6 w-full rounded-xl placeholder:text-sm focus:border-pink-400  border-gray-300 transition ease-in-out"
        style={{ ...style, fontSize: 14, borderWidth: 1 }}
      />
    </div>
  );
}
