export const orders = [
  { id: "#ORD-5521", customer: "Sarah Johnson", email: "sarah@email.com",  product: "Pro Plan", date: "Mar 1, 2025",  amount: 299, status: "Paid",     avatar: "SJ", color: "#3b82f6" },
  { id: "#ORD-5520", customer: "James Wilson",  email: "james@email.com",  product: "Starter",  date: "Feb 28, 2025", amount: 49,  status: "Pending",  avatar: "JW", color: "#f59e0b" },
  { id: "#ORD-5519", customer: "Aiko Tanaka",   email: "aiko@email.com",   product: "Business", date: "Feb 27, 2025", amount: 799, status: "Paid",     avatar: "AT", color: "#10b981" },
  { id: "#ORD-5518", customer: "Carlos Reyes",  email: "carlos@email.com", product: "Pro Plan", date: "Feb 26, 2025", amount: 299, status: "Failed",   avatar: "CR", color: "#ef4444" },
  { id: "#ORD-5517", customer: "Emma Clarke",   email: "emma@email.com",   product: "Business", date: "Feb 25, 2025", amount: 799, status: "Paid",     avatar: "EC", color: "#8b5cf6" },
  { id: "#ORD-5516", customer: "Noah Smith",    email: "noah@email.com",   product: "Starter",  date: "Feb 24, 2025", amount: 49,  status: "Refunded", avatar: "NS", color: "#06b6d4" },
  { id: "#ORD-5515", customer: "Priya Mehta",   email: "priya@email.com",  product: "Business", date: "Feb 23, 2025", amount: 799, status: "Paid",     avatar: "PM", color: "#ec4899" },
];

export const teamMembers = [
  { name: "Alex Morgan",     role: "Engineering Lead", dept: "Engineering", tasks: 24, done: 18, joined: "2022", status: "Online",  avatar: "AM", color: "#6366f1" },
  { name: "Bella Torres",    role: "Product Manager",  dept: "Product",     tasks: 31, done: 28, joined: "2021", status: "Busy",    avatar: "BT", color: "#f43f5e" },
  { name: "Chen Wei",        role: "Data Scientist",   dept: "Analytics",   tasks: 15, done: 15, joined: "2023", status: "Online",  avatar: "CW", color: "#0ea5e9" },
  { name: "Diana Park",      role: "UX Designer",      dept: "Design",      tasks: 20, done: 11, joined: "2022", status: "Away",    avatar: "DP", color: "#f59e0b" },
  { name: "Ethan Brooks",    role: "Backend Dev",      dept: "Engineering", tasks: 38, done: 32, joined: "2020", status: "Online",  avatar: "EB", color: "#10b981" },
  { name: "Fatima Al-Sayed", role: "Marketing Lead",   dept: "Marketing",   tasks: 17, done: 9,  joined: "2023", status: "Offline", avatar: "FA", color: "#a78bfa" },
];

export const presenceColors = {
  Online:  "#10b981",
  Busy:    "#ef4444",
  Away:    "#f59e0b",
  Offline: "#6b7280",
};

export const deptColors = {
  Engineering: "#6366f1",
  Product:     "#f43f5e",
  Analytics:   "#0ea5e9",
  Design:      "#f59e0b",
  Marketing:   "#10b981",
};

export const statusCfg = {
  Paid:     { bg: "rgba(16,185,129,0.12)",  color: "#10b981", border: "rgba(16,185,129,0.25)"  },
  Pending:  { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b", border: "rgba(245,158,11,0.25)"  },
  Failed:   { bg: "rgba(239,68,68,0.12)",   color: "#ef4444", border: "rgba(239,68,68,0.25)"   },
  Refunded: { bg: "rgba(107,114,128,0.12)", color: "#9ca3af", border: "rgba(107,114,128,0.25)" },
};