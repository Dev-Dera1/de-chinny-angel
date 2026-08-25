import {
  UserCircle,
  Star,
  History,
  Bell,
  ShoppingBag,
  Gift,
  Sparkles,
} from "lucide-react";

export default function Customer({ state }) {
  const rewards = [
    {
      name: "₦5 Off",
      description: "Redeem with 500 points",
      icon: Gift,
    },
    {
      name: "VIP Access",
      description: "New product drops",
      icon: Sparkles,
    },
    {
      name: "Free Sample",
      description: "On qualifying orders",
      icon: Gift,
    },
    {
      name: "Birthday Gift",
      description: "Claim during your birthday month",
      icon: Star,
    },
  ];

  return (
    <>
      <section className="grid grid-3">

        <aside className="card quick">

          <div className="stat">
            <div className="icon">
              <UserCircle />
            </div>

            <div>
              {state.user.name}

              <div className="muted">
                {state.user.tier} Member
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="icon green">
              <Star />
            </div>

            <div>
              {state.user.points} pts

              <div className="muted">
                Available
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="icon amber">
              <History />
            </div>

            <div>
              Recent Activity

              <div className="muted">
                Your activity
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="icon blue">
              <Bell />
            </div>

            <div>
              Notifications

              <div className="muted">
                {state.user.notifications} unread
              </div>
            </div>
          </div>

          <a
            className="btn"
            href="#/payments"
          >
            <ShoppingBag size={17} />
            Go to Checkout
          </a>

        </aside>

        <div className="card span-2">

          <div className="section-head">
            <h3>
              Available Rewards
            </h3>
          </div>

          <div className="grid grid-4">

            {rewards.map((reward) => {
              const Icon = reward.icon;

              return (
                <div
                  className="card"
                  key={reward.name}
                >

                  <div className="chip">
                    <Icon size={15} />
                    {reward.name}
                  </div>

                  <div className="muted reward-desc">
                    {reward.description}
                  </div>

                  <button className="btn primary">
                    Redeem
                  </button>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      <section className="grid grid-2 section-gap">

        <div className="card">

          <h3>
            Loyalty Status
          </h3>

          <div className="badge-row">

            <span className="badge success">
              Points: {state.user.points}
            </span>

            <span className="badge warn">
              Tier: {state.user.tier}
            </span>

            <span className="badge">
              Next: 1000 pts
            </span>

          </div>

        </div>

        <div className="card">

          <h3>
            Referrals
          </h3>

          <div className="muted">
            Invite friends and earn rewards.
          </div>

          <div className="action-row">

            <input
              value="https://dechinny.example/ref/ABC123"
              readOnly
            />

            <button className="btn">
              Copy
            </button>

          </div>

        </div>

      </section>
    </>
  );
}