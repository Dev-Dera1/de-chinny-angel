import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

export default function CategoryManager({
  state,
  saveCategory,
  deleteCategory,
}) {
  const [name, setName] =
    useState("");

  const [editing, setEditing] =
    useState(null);

  function submit(e) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    saveCategory(
      editing,
      name
    );

    setName("");
    setEditing(null);
  }

  function editCategory(category) {
    setEditing(category);
    setName(category);
  }

  return (
    <div>

      <div className="card">

        <h3>
          {editing
            ? "Edit Category"
            : "Add Category"}
        </h3>

        <form
          className="action-row"
          onSubmit={submit}
        >

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="e.g. Shoes, Perfumes, Bags"
            required
          />

          <button
            className="btn primary"
            type="submit"
          >
            <Plus size={16} />

            {editing
              ? "Save"
              : "Add Category"}
          </button>

          {editing && (
            <button
              className="btn"
              type="button"
              onClick={() => {
                setEditing(null);
                setName("");
              }}
            >
              Cancel
            </button>
          )}

        </form>

        <div className="muted small-note">
          You can create any product
          category you want. For example:
          Shoes, Perfumes, Bags, Watches,
          Makeup, Accessories, Sandals, etc.
        </div>

      </div>

      <div className="table-wrap section-gap">

        <table>

          <thead>

            <tr>
              <th>Category</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {state.categories.map(
              (category) => (
                <tr key={category}>

                  <td>
                    {category}
                  </td>

                  <td>
                    {
                      state.products.filter(
                        (product) =>
                          product.cat ===
                          category
                      ).length
                    }
                  </td>

                  <td>

                    <div className="table-actions">

                      <button
                        className="btn"
                        onClick={() =>
                          editCategory(
                            category
                          )
                        }
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        className="btn"
                        disabled={
                          state.categories
                            .length <= 1
                        }
                        onClick={() =>
                          deleteCategory(
                            category
                          )
                        }
                      >
                        <Trash2 size={15} />
                        Delete
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