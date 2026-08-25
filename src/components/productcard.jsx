import { ShoppingCart } from "lucide-react";

export default function ProductCard({
  product,
  onAdd,
}) {
  return (
    <article className="product card">

      <div className="thumb">
        <img
          src={product.img}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop";
          }}
        />

        <span className="tag">
          {product.cat}
        </span>
      </div>

      <div className="product-name">
        {product.name}
      </div>

      <div className="price">
        <strong>
          ₦{Number(product.price).toFixed(2)}
        </strong>

        {product.available ? (
          <button
            className="btn"
            onClick={() => onAdd(product)}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        ) : (
          <span className="badge danger">
            Out of stock
          </span>
        )}
      </div>

    </article>
  );
}