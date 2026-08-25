import {
  LogIn,
  ShieldCheck,
  Sparkles,
  Gift,
  Bell,
  Smartphone,
} from "lucide-react";

export default function Login({ onLogin }) {
  return (
    <section className="grid grid-2">

      <div className="card hero float-up">

        <div className="avatar">
          👋
        </div>

        <div>
          <h2>
            Welcome to De Chinny Angel Global
          </h2>

          <div className="muted">
            Loyalty • Shop • Rewards • Payments
          </div>

          <div className="action-row">

            <button
              className="btn primary"
              onClick={() => onLogin("customer")}
            >
              <LogIn size={17} />
              Login as Customer
            </button>

            <button
              className="btn"
              onClick={() => onLogin("admin")}
            >
              <ShieldCheck size={17} />
              Login as Admin
            </button>

          </div>
        </div>

      </div>

      <div className="card">

        <h3>Why join?</h3>

        <div className="grid grid-2">

          <div className="stat">
            <div className="icon">
              <Gift />
            </div>

            <div>
              Earn Points
              <div className="muted">
                Every purchase adds up
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="icon green">
              <Sparkles />
            </div>

            <div>
              Tiered Rewards
              <div className="muted">
                Silver • Gold • VIP
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="icon amber">
              <Bell />
            </div>

            <div>
              Personal Offers
              <div className="muted">
                Birthday & milestones
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="icon blue">
              <Smartphone />
            </div>

            <div>
              Mobile Friendly
              <div className="muted">
                Use anywhere
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}