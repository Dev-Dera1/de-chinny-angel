git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Dev-Dera1/de-chinny-angel.git
git push -u origin mainimport {
  useEffect,
  useState,
} from "react";

import {
  UserRound,
  LayoutDashboard,
  CreditCard,
  LogIn,
  LogOut,
  Sparkles,
  Store,
} from "lucide-react";

import { freshState } from "./data";

import Login from "./pages/login";
import Shop from "./pages/shop";
import Customer from "./pages/customer";
import Payments from "./pages/payment";

import Admin from "./admin/admin";

import Toast from "./components/toast";

const STORAGE_KEY =
  "de_chinny_angel_react";

function loadState() {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error(error);
  }

  return freshState();
}

export default function App() {
  const [state, setState] =
    useState(loadState);

  const [route, setRoute] =
    useState(
      window.location.hash ||
        "#/login"
    );

  const [toast, setToast] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  }, [state]);

  useEffect(() => {
    function handleHashChange() {
      setRoute(
        window.location.hash ||
          "#/login"
      );
    }

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () =>
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
  }, []);

  function notify(message) {
    setToast(message);

    clearTimeout(
      window.__toastTimer
    );

    window.__toastTimer =
      setTimeout(() => {
        setToast("");
      }, 2000);
  }

  function login(role, email = "") {
    setState((current) => ({
      ...current,

      role,

      user: {
        ...current.user,
        name:
          role === "admin"
            ? "Admin"
            : email.split("@")[0] || "Chidera",
        email,
      },
    }));

    window.location.hash =
      role === "admin"
        ? "#/admin"
        : "#/customer";
  }

  function logout() {
    setState((current) => ({
      ...current,
      role: "guest",

      user: {
        ...current.user,
        name: "Guest",
      },
    }));

    window.location.hash =
      "#/login";
  }

  function addToCart(product) {
    setState((current) => {
      const existing =
        current.cart.find(
          (item) =>
            item.id === product.id
        );

      if (existing) {
        return {
          ...current,

          cart: current.cart.map(
            (item) =>
              item.id === product.id
                ? {
                    ...item,
                    qty:
                      item.qty + 1,
                  }
                : item
          ),
        };
      }

      return {
        ...current,

        cart: [
          ...current.cart,
          {
            id: product.id,
            name: product.name,
            price: Number(
              product.price
            ),
            qty: 1,
          },
        ],
      };
    });

    notify("Added to cart");
  }

  function removeFromCart(id) {
    setState((current) => ({
      ...current,

      cart: current.cart.filter(
        (item) =>
          item.id !== id
      ),
    }));
  }

  function updateQty(id, qty) {
    setState((current) => ({
      ...current,

      cart: current.cart.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                qty: Math.max(
                  1,
                  Number(qty) || 1
                ),
              }
            : item
      ),
    }));
  }

  function changeFilter(filter) {
    setState((current) => ({
      ...current,
      filter,
    }));
  }

  function saveProduct(product) {
    setState((current) => {
      const exists =
        current.products.some(
          (item) =>
            item.id === product.id
        );

      if (exists) {
        return {
          ...current,

          products:
            current.products.map(
              (item) =>
                item.id === product.id
                  ? product
                  : item
            ),
        };
      }

      return {
        ...current,

        products: [
          ...current.products,
          product,
        ],
      };
    });

    notify("Product saved");
  }

  function deleteProduct(id) {
    setState((current) => ({
      ...current,

      products:
        current.products.filter(
          (product) =>
            product.id !== id
        ),

      cart:
        current.cart.filter(
          (item) =>
            item.id !== id
        ),
    }));

    notify("Product deleted");
  }

  function toggleAvailable(id) {
    setState((current) => ({
      ...current,

      products:
        current.products.map(
          (product) =>
            product.id === id
              ? {
                  ...product,
                  available:
                    !product.available,
                }
              : product
        ),
    }));
  }

  function saveCategory(
    oldName,
    newName
  ) {
    const cleanName =
      newName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    if (!cleanName) {
      return;
    }

    setState((current) => {
      if (oldName) {
        return {
          ...current,

          categories:
            current.categories.map(
              (category) =>
                category === oldName
                  ? cleanName
                  : category
            ),

          products:
            current.products.map(
              (product) =>
                product.cat === oldName
                  ? {
                      ...product,
                      cat: cleanName,
                    }
                  : product
            ),
        };
      }

      if (
        current.categories.includes(
          cleanName
        )
      ) {
        return current;
      }

      return {
        ...current,

        categories: [
          ...current.categories,
          cleanName,
        ],
      };
    });

    notify(
      oldName
        ? "Category updated"
        : "Category added"
    );
  }

  function deleteCategory(
    category
  ) {
    setState((current) => {
      const remaining =
        current.categories.filter(
          (item) =>
            item !== category
        );

      const fallback =
        remaining[0] ||
        "uncategorized";

      return {
        ...current,

        categories: remaining,

        products:
          current.products.map(
            (product) =>
              product.cat === category
                ? {
                    ...product,
                    cat: fallback,
                  }
                : product
          ),
      };
    });

    notify("Category deleted");
  }

  function assignCategory(
    productId,
    category
  ) {
    setState((current) => ({
      ...current,

      products:
        current.products.map(
          (product) =>
            product.id === productId
              ? {
                  ...product,
                  cat: category,
                }
              : product
        ),
    }));
  }

  let page;

  if (route === "#/login") {
    page = (
      <Login
        onLogin={login}
      />
    );
  }

  else if (route === "#/shop") {
    page = (
      <Shop
        state={state}
        onFilter={changeFilter}
        onAdd={addToCart}
      />
    );
  }

  else if (route === "#/customer") {
    page =
      state.role ===
      "customer" ? (
        <Customer
          state={state}
        />
      ) : (
        <Login
          onLogin={login}
        />
      );
  }

  else if (route === "#/admin") {
    page =
      state.role === "admin" ? (
        <Admin
          state={state}
          setState={setState}
          saveProduct={saveProduct}
          deleteProduct={
            deleteProduct
          }
          toggleAvailable={
            toggleAvailable
          }
          saveCategory={
            saveCategory
          }
          deleteCategory={
            deleteCategory
          }
          assignCategory={
            assignCategory
          }
          notify={notify}
        />
      ) : (
        <Login
          onLogin={login}
        />
      );
  }

  else if (route === "#/payments") {
    page = (
      <Payments
        state={state}
        setState={setState}
        updateQty={updateQty}
        removeFromCart={
          removeFromCart
        }
        notify={notify}
      />
    );
  }

  else {
    page = (
      <Shop
        state={state}
        onFilter={changeFilter}
        onAdd={addToCart}
      />
    );
  }

  const navigation = [
    {
      label: "Shop",
      icon: Store,
      path: "#/shop",
    },

    {
      label: "Customer",
      icon: UserRound,
      path: "#/customer",
    },

    ...(state.role === "admin"
      ? [
          {
            label: "Admin",
            icon: LayoutDashboard,
            path: "#/admin",
          },
        ]
      : []),

    {
      label: "Payments",
      icon: CreditCard,
      path: "#/payments",
    },
  ];

  return (
    <>
      <header className="topbar">

        <div className="topbar-inner">

          <a
            className="brand"
            href="#/shop"
          >

            <div className="logo">
              <Sparkles size={22} />
            </div>

            <div>
              De Chinny Angel Global
            </div>

            <span className="chip">
              Earn rewards, glow brighter
            </span>

          </a>

          <nav className="nav">

            {state.role ===
              "guest" && (
              <a
                className="btn"
                href="#/login"
              >
                <LogIn size={17} />
                Login
              </a>
            )}

            {navigation.map(
              ({
                label,
                icon: Icon,
                path,
              }) => (
                <a
                  key={path}
                  className="btn"
                  href={path}
                >
                  <Icon size={17} />
                  {label}
                </a>
              )
            )}

            {state.role !==
              "guest" && (
              <button
                className="btn danger"
                onClick={logout}
              >
                <LogOut size={17} />
                Logout
              </button>
            )}

          </nav>

        </div>

      </header>

      <main className="container">
        {page}
      </main>

      <footer className="footer">
        © {new Date().getFullYear()}
        {" "}
        De Chinny Angel Global •
        Loyalty & Shop
      </footer>

      <Toast
        message={toast}
      />
    </>
  );
}