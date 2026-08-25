 

function formatCategory(category) {
  if (category === "all") return "All";

  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CategoryTabs({
  categories,
  active,
  onChange,
}) {
  return (
    <div className="tabs">
      {["all", ...categories].map((category) => (
        <button
          key={category}
          className={`tab ${
            active === category ? "active" : ""
          }`}
          onClick={() => onChange(category)}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}