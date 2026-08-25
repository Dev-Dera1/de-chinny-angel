import React, { useState } from "react";

import {
  Settings,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Gift,
  CreditCard,
  BarChart3,
  Bell,
} from "lucide-react";

import ProductManager from "./productmanager";
import CategoryManager from "./categorymanager";

const sections = [
  ["catalog", "Catalog", Package],
  ["categories", "Categories", Tags],
  ["orders", "Orders", ShoppingCart],
  ["customers", "Customers", Users],
  ["rewards", "Rewards", Gift],
  ["payments", "Payments", CreditCard],
  ["analytics", "Analytics", BarChart3],
  ["notifications", "Notifications", Bell],
  ["settings", "Settings", Settings],
];

export default function Admin({
  state,
  setState,
  saveProduct,
  deleteProduct,
  toggleAvailable,
  saveCategory,
  deleteCategory,
  assignCategory,
  notify,
}) {
  const [section, setSection] =
    useState("catalog");

  return (
    <>
      <section className="card hero">

        <div className="avatar">
          🛠️
        </div>

        <div>
          <h2>
            Admin Dashboard
          </h2>

          <div className="muted">
            Manage products, categories,
            orders, customers, rewards
            and analytics.
          </div>
        </div>

      </section>

      <section className="card admin-panel section-gap">

        <div className="section-head">
          <h3>
            Administration
          </h3>
        </div>

        <div className="admin-tabs">

          {sections.map(
            ([id, label, Icon]) => (
              <button
                key={id}
                className={`btn ${
                  section === id
                    ? "primary"
                    : ""
                }`}
                onClick={() =>
                  setSection(id)
                }
              >
                <Icon size={15} />
                {label}
              </button>
            )
          )}

        </div>

        <div className="admin-content">

          {section === "catalog" && (
            <ProductManager
              state={state}
              saveProduct={saveProduct}
              deleteProduct={deleteProduct}
              toggleAvailable={
                toggleAvailable
              }
              assignCategory={
                assignCategory
              }
            />
          )}

          {section === "categories" && (
            <CategoryManager
              state={state}
              saveCategory={
                saveCategory
              }
              deleteCategory={
                deleteCategory
              }
            />
          )}

          {section === "orders" && (
            <Orders
              state={state}
              setState={setState}
              notify={notify}
            />
          )}

          {section === "customers" && (
            <Customers
              state={state}
              setState={setState}
              notify={notify}
            />
          )}

          {section === "rewards" && (
            <Rewards
              state={state}
            />
          )}

          {section === "payments" && (
            <AdminPayments
              state={state}
            />
          )}

          {section === "analytics" && (
            <Analytics
              state={state}
            />
          )}

          {section === "notifications" && (
            <Notifications
              state={state}
              setState={setState}
              notify={notify}
            />
          )}

          {section === "settings" && (
            <SettingsPanel
              state={state}
              setState={setState}
              notify={notify}
            />
          )}

        </div>

      </section>
    </>
  );
}

function Orders({
  state,
  setState,
  notify,
}) {
  function updateOrder(
    id,
    status
  ) {
    setState((current) => ({
      ...current,
      orders:
        current.orders.map(
          (order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                }
              : order
        ),
    }));

    notify("Order updated");
  }

  return (
    <div>

      <h3>Orders</h3>

      <div className="table-wrap">

        <table>

          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {state.orders.map(
              (order) => (
                <tr key={order.id}>

                  <td>
                    #{order.id}
                  </td>

                  <td>
                    {order.customerName}
                  </td>

                  <td>
                    ₦
                    {order.total.toFixed(
                      2
                    )}
                  </td>

                  <td>
                    <span className="badge">
                      {order.status}
                    </span>
                  </td>

                  <td>

                    <div className="table-actions">

                      <button
                        className="btn"
                        onClick={() =>
                          updateOrder(
                            order.id,
                            "paid"
                          )
                        }
                      >
                        Paid
                      </button>

                      <button
                        className="btn"
                        onClick={() =>
                          updateOrder(
                            order.id,
                            "shipped"
                          )
                        }
                      >
                        Ship
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

function Customers({
  state,
  setState,
  notify,
}) {
  function toggleCustomer(id) {
    setState((current) => ({
      ...current,

      customers:
        current.customers.map(
          (customer) =>
            customer.id === id
              ? {
                  ...customer,
                  blocked:
                    !customer.blocked,
                }
              : customer
        ),
    }));

    notify("Customer updated");
  }

  return (
    <div>

      <h3>Customers</h3>

      <div className="table-wrap">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Points</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {state.customers.map(
              (customer) => (
                <tr key={customer.id}>

                  <td>
                    {customer.name}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {customer.points}
                  </td>

                  <td>
                    {customer.tier}
                  </td>

                  <td>
                    {customer.blocked
                      ? "Blocked"
                      : "Active"}
                  </td>

                  <td>

                    <button
                      className="btn"
                      onClick={() =>
                        toggleCustomer(
                          customer.id
                        )
                      }
                    >
                      {customer.blocked
                        ? "Unblock"
                        : "Block"}
                    </button>

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

function Rewards({ state }) {
  return (
    <div>

      <h3>Rewards</h3>

      <div className="grid grid-2">

        {state.rewards.map(
          (reward) => (
            <div
              className="card"
              key={reward.id}
            >
              <h3>
                {reward.name}
              </h3>

              <div className="muted">
                Cost: {reward.cost} points
              </div>
            </div>
          )
        )}

      </div>

    </div>
  );
}

function AdminPayments({ state }) {
  return (
    <div>

      <h3>Payments</h3>

      <div className="table-wrap">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Method</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            {state.payments.map(
              (payment) => (
                <tr key={payment.id}>

                  <td>
                    {payment.id}
                  </td>

                  <td>
                    {payment.customer}
                  </td>

                  <td>
                    {payment.method}
                  </td>

                  <td>
                    ₦
                    {payment.amount.toFixed(
                      2
                    )}
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

function Analytics({ state }) {
  const revenue =
    state.orders.reduce(
      (total, order) =>
        total + order.total,
      0
    );

  return (
    <div className="grid grid-2">

      <div className="card">

        <h3>
          Store Overview
        </h3>

        <div className="badge-row">

          <span className="badge success">
            Revenue: ₦
            {revenue.toFixed(2)}
          </span>

          <span className="badge">
            Products:{" "}
            {state.products.length}
          </span>

          <span className="badge">
            Categories:{" "}
            {state.categories.length}
          </span>

        </div>

      </div>

      <div className="card">

        <h3>
          Product Categories
        </h3>

        {state.categories.map(
          (category) => (
            <div
              className="stat"
              key={category}
            >
              <div>
                {category}
              </div>

              <strong>
                {
                  state.products.filter(
                    (product) =>
                      product.cat ===
                      category
                  ).length
                }
              </strong>
            </div>
          )
        )}

      </div>

    </div>
  );
}

function Notifications({
  setState,
  notify,
}) {
  const [title, setTitle] =
    React.useState("");

  const [message, setMessage] =
    React.useState("");

  function send() {
    setState((current) => ({
      ...current,

      user: {
        ...current.user,
        notifications:
          current.user.notifications +
          1,
      },
    }));

    setTitle("");
    setMessage("");

    notify("Notification sent");
  }

  return (
    <div className="card">

      <h3>
        Send Notification
      </h3>

      <div className="field">

        <label>
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Announcement"
        />

      </div>

      <div className="field">

        <label>
          Message
        </label>

        <textarea
          rows="5"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

      </div>

      <button
        className="btn primary"
        onClick={send}
      >
        Send Notification
      </button>

    </div>
  );
}

function SettingsPanel({
  state,
  setState,
  notify,
}) {
  const [name, setName] =
    React.useState("");

  const [email, setEmail] =
    React.useState("");

  function addAdmin() {
    if (!name.trim()) {
      return;
    }

    setState((current) => ({
      ...current,

      admins: [
        ...current.admins,
        {
          id: Date.now(),
          name,
          email,
          role: "Manager",
        },
      ],
    }));

    setName("");
    setEmail("");

    notify("Admin added");
  }

  return (
    <div className="grid grid-2">

      <div className="card">

        <h3>
          Add Admin
        </h3>

        <div className="field">

          <label>
            Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        <div className="field">

          <label>
            Email
          </label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <button
          className="btn primary"
          onClick={addAdmin}
        >
          Add Admin
        </button>

      </div>

      <div className="card">

        <h3>
          Current Admins
        </h3>

        {state.admins.map(
          (admin) => (
            <div
              className="stat"
              key={admin.id}
            >
              <div>
                <strong>
                  {admin.name}
                </strong>

                <div className="muted">
                  {admin.email}
                </div>
              </div>

              <span className="badge">
                {admin.role}
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}