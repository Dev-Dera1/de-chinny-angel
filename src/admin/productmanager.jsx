import { useState } from "react";

import {
  Plus,
  Download,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from "lucide-react";

const emptyProduct = {
  name: "",
  cat: "",
  price: "",
  img: "",
  available: true,
};

export default function ProductManager({
  state,
  saveProduct,
  deleteProduct,
  toggleAvailable,
  assignCategory,
}) {
  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(emptyProduct);

  function openForm(product = null) {
    if (product) {
      setEditingId(product.id);

      setForm({
        ...product,
      });

      return;
    }

    setEditingId(null);

    setForm({
      ...emptyProduct,
      cat:
        state.categories[0] ||
        "uncategorized",
    });
  }

  function save(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (Number(form.price) < 0) {
      return;
    }

    saveProduct({
      ...form,

      id:
        editingId ||
        Date.now(),

      price: Number(form.price),

      available:
        form.available !== false,
    });

    setEditingId(null);
    setForm(emptyProduct);
  }

  function exportProducts() {
    const blob = new Blob(
      [
        JSON.stringify(
          state.products,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "products.json";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>

      <div className="section-head">

        <div className="action-row">

          <button
            className="btn primary"
            onClick={() =>
              openForm()
            }
          >
            <Plus size={16} />
            Add Product
          </button>

          <button
            className="btn"
            onClick={
              exportProducts
            }
          >
            <Download size={16} />
            Export
          </button>

        </div>

        <div className="muted">
          {state.products.length} products
        </div>

      </div>

      <form
        className="card product-form"
        onSubmit={save}
      >

        <h3>
          {editingId
            ? "Edit Product"
            : "Add New Product"}
        </h3>

        <div className="grid grid-2">

          <div className="field">

            <label>
              Product Name
            </label>

            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="e.g. Designer Shoe"
            />

          </div>

          <div className="field">

            <label>
              Category
            </label>

            <select
              value={form.cat}
              onChange={(e) =>
                setForm({
                  ...form,
                  cat: e.target.value,
                })
              }
            >

              {state.categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}

            </select>

          </div>

          <div className="field">

            <label>
              Price
            </label>

            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

          </div>

          <div className="field">

            <label>
              Product Image URL
            </label>

            <input
              value={form.img}
              onChange={(e) =>
                setForm({
                  ...form,
                  img: e.target.value,
                })
              }
              placeholder="https://..."
            />

          </div>

        </div>

        <div className="action-row">

          <button
            className="btn primary"
            type="submit"
          >
            {editingId
              ? "Update Product"
              : "Save Product"}
          </button>

          {editingId && (
            <button
              className="btn"
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyProduct);
              }}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

      <div className="table-wrap">

        <table>

          <thead>

            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {state.products.map(
              (product) => (
                <tr key={product.id}>

                  <td>

                    <img
                      className="admin-thumb"
                      src={product.img}
                      alt=""
                    />

                  </td>

                  <td>
                    {product.name}
                  </td>

                  <td>

                    <select
                      value={product.cat}
                      onChange={(e) =>
                        assignCategory(
                          product.id,
                          e.target.value
                        )
                      }
                    >

                      {state.categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </td>

                  <td>
                    ₦
                    {Number(
                      product.price
                    ).toFixed(2)}
                  </td>

                  <td>

                    <span
                      className={`badge ${
                        product.available
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {product.available
                        ? "Available"
                        : "Hidden"}
                    </span>

                  </td>

                  <td>

                    <div className="table-actions">

                      <button
                        className="btn"
                        onClick={() =>
                          toggleAvailable(
                            product.id
                          )
                        }
                      >
                        {product.available ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>

                      <button
                        className="btn"
                        onClick={() =>
                          openForm(product)
                        }
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="btn"
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}