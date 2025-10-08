type ActionKey = "Restock Now" | "Update Stock" | "Good";

const alerts = [
  {
    name: "Ibuprofen",
    description: "Pain reliever, Anti-inflammatory",
    status: "Only 8 units left in stock",
    action: "Restock Now",
  },
  {
    name: "Lisinopril",
    description: "Antihypertensive",
    status: "5 units left - Consider restocking",
    action: "Update Stock",
  },
  {
    name: "Sertraline",
    description: "Antidepressant",
    status: "Well Stocked - 47 Units Available",
    action: "Good",
  },
];

const actionStyle = {
  "Restock Now": {
    actionColor: "bg-primary-red hover:bg-red-600",
    bgColor: "bg-primary-red/10",
  },
  "Update Stock": {
    actionColor: "bg-primary-yellow hover:bg-yellow-500",
    bgColor: "bg-primary-yellow/10",
  },
  Good: {
    actionColor:
      "text-primary-green! hover:bg-primary-green/20",
    bgColor: "bg-primary-green/10",
  },
};

export default function InventoryAlerts() {
  return (
    <div className="bg-light-background rounded-lg border border-border p-6">
      {/* Header */}
      <h2 className=" mb-6">
        Inventory Alerts
      </h2>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg border border-border ${actionStyle[alert.action as ActionKey].bgColor}`}
          >
            <div className="flex-1">
              <p className="text-base font-semibold text-dark-blue mb-1">
                {alert.name}{" "}
                <span className="">
                  ({alert.description})
                </span>
              </p>
              <p className="p2">{alert.status}</p>
            </div>
            <button
              className={`px-5 sm:px-10 py-2.5 rounded-md text-xs font-medium text-white transition-colors ${actionStyle[alert.action as ActionKey].actionColor} `}
            >
              {alert.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
