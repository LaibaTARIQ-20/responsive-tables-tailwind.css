# 📊 Production Tables — React + Tailwind CSS v4

A collection of **production-ready, responsive table components** built with React and Tailwind CSS v4. Includes full dark/light theme switching, search, filtering, sorting, multi-select, progress bars, status badges, and mobile-responsive card layouts.

---

> <img width="1920" height="1139" alt="screencapture-localhost-5175-2026-03-03-09_26_48" src="https://github.com/user-attachments/assets/3f7745b9-6055-441f-90ac-2b657f88f029" />
<img width="1920" height="1139" alt="screencapture-localhost-5175-2026-03-03-09_26_36" src="https://github.com/user-attachments/assets/3c58577b-a44e-4ad8-981b-aafaf70fffe2" /><img width="1920" height="933" alt="screencapture-localhost-5175-2026-03-03-09_26_13 (1)" src="https://github.com/user-attachments/assets/1715c1f2-941a-4bb9-bef5-dc4dc7177980" />


>
---

## 📁 Project Structure

```
my-table-app/
│
├── vite.config.js                        # Vite + Tailwind v4 plugin config
│
└── src/
    ├── App.jsx                           # Root — theme toggle + tab switcher
    ├── main.jsx                          # React entry point
    ├── index.css                         # Tailwind v4 import
    │
    ├── data/
    │   └── data.js                       # All mock data + color config maps
    │
    └── components/
        │
        ├── ui/                           # Reusable small components
        │   ├── Avatar.jsx                # Colored initial avatar circle
        │   ├── StatusBadge.jsx           # Pill badge (Paid / Pending / etc.)
        │   └── Pagination.jsx            # Page navigation buttons
        │
        └── tables/                       # Main table components
            ├── OrderTable.jsx            # E-commerce / SaaS order table
            └── TeamTable.jsx             # HR / team management table
```

---

## ⚙️ Tech Stack & Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19 | UI framework |
| `react-dom` | ^19 | DOM rendering |
| `vite` | ^7 | Dev server + bundler |
| `@vitejs/plugin-react` | ^5 | React fast refresh |
| `tailwindcss` | ^4.2 | Utility-first CSS |
| `@tailwindcss/vite` | latest | Tailwind v4 Vite plugin |
| `lucide-react` | ^0.576 | Icon library |
| `clsx` | ^2.1 | Conditional classNames |

### Install all dependencies

```bash
npm install
npm install -D @tailwindcss/vite
```

---

## 🚀 Getting Started

```bash
# 1. Clone or download the project
cd my-table-app

# 2. Install dependencies
npm install
npm install -D @tailwindcss/vite

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🌗 Dark / Light Theme

The entire app uses a single `dark` boolean prop passed from `App.jsx` down to every component. Toggling the button in the top-right corner switches both tables simultaneously.

```jsx
// App.jsx
const [dark, setDark] = useState(true);  // true = dark, false = light

// Passed to each table:
<OrderTable dark={dark} />
<TeamTable  dark={dark} />
```

Every component defines a local color map `c` that switches based on the `dark` prop:

```jsx
const c = {
  bg:     dark ? "#0f1117"                : "#ffffff",
  text:   dark ? "#f1f5f9"               : "#0f172a",
  sub:    dark ? "rgba(255,255,255,0.4)" : "#64748b",
  border: dark ? "rgba(255,255,255,0.07)": "#e2e8f0",
  // ...
};
```

This pattern makes it trivial to add a third theme (e.g. blue, sepia) by extending the map.

---

## 🧩 Component Reference

---

### `Avatar.jsx`

A small colored square with the user's initials.

```jsx
import Avatar from "./components/ui/Avatar";

<Avatar initials="SJ" color="#3b82f6" size={36} />
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `initials` | string | — | 2-letter initials e.g. `"SJ"` |
| `color` | string | — | Hex color for border + text |
| `size` | number | `36` | Width and height in px |

**How it works:**  
Uses the `color` hex with `22` appended for a transparent background fill and `44` for the border — creating a soft tinted look matching the user's accent color.

---

### `StatusBadge.jsx`

A pill-shaped badge for order status.

```jsx
import StatusBadge from "./components/ui/StatusBadge";

<StatusBadge status="Paid" />
<StatusBadge status="Pending" />
<StatusBadge status="Failed" />
<StatusBadge status="Refunded" />
```

**Props:**

| Prop | Type | Options |
|---|---|---|
| `status` | string | `"Paid"` \| `"Pending"` \| `"Failed"` \| `"Refunded"` |

**Color mapping** (defined in `data.js`):

```js
export const statusCfg = {
  Paid:     { bg: "rgba(16,185,129,0.12)",  color: "#10b981", border: "rgba(16,185,129,0.25)"  },
  Pending:  { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b", border: "rgba(245,158,11,0.25)"  },
  Failed:   { bg: "rgba(239,68,68,0.12)",   color: "#ef4444", border: "rgba(239,68,68,0.25)"   },
  Refunded: { bg: "rgba(107,114,128,0.12)", color: "#9ca3af", border: "rgba(107,114,128,0.25)" },
};
```

---

### `Pagination.jsx`

Page navigation with prev/next arrows and numbered buttons.

```jsx
import Pagination from "./components/ui/Pagination";

<Pagination current={1} total={3} onChange={setPage} dark={true} />
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `current` | number | Currently active page number |
| `total` | number | Total number of pages |
| `onChange` | function | Called with the new page number on click |
| `dark` | boolean | Switches button border/text colors |

---

### `OrderTable.jsx`

A full-featured order management table. Best used in **e-commerce dashboards**, **SaaS billing pages**, and **admin panels**.

```jsx
import OrderTable from "./components/tables/OrderTable";

<OrderTable dark={true} />
<OrderTable dark={false} />
```

**Features:**

| Feature | Description |
|---|---|
| 🔍 Search | Filters by customer name or order ID in real time |
| 🏷️ Filter tabs | One-click filter: All / Paid / Pending / Failed / Refunded |
| 📊 Stats bar | Live counts of total orders, paid, pending, and total revenue |
| ☑️ Multi-select | Checkbox per row + select-all in header |
| 👁️ Hover action | "View →" button appears on row hover |
| 📄 Pagination | Page buttons at footer (wired to `page` state) |
| 📱 Responsive | Horizontal scroll on small screens via `minWidth: 720` |

**State managed internally:**

```jsx
const [selected, setSelected] = useState([]);   // array of selected order IDs
const [search,   setSearch]   = useState("");   // search input value
const [filter,   setFilter]   = useState("All");// active filter tab
const [page,     setPage]     = useState(1);    // current page
const [hovered,  setHovered]  = useState(null); // hovered row ID
```

---

### `TeamTable.jsx`

A team and HR management table. Best used in **internal tools**, **HR dashboards**, **project management apps**, and **admin portals**.

```jsx
import TeamTable from "./components/tables/TeamTable";

<TeamTable dark={true} />
<TeamTable dark={false} />
```

**Features:**

| Feature | Description |
|---|---|
| 🔍 Search | Filters by member name or department |
| ↕️ Sortable columns | Click any column header to sort ascending/descending |
| 🟢 Presence dot | Live status indicator on avatar: Online / Busy / Away / Offline |
| 🏷️ Dept pill | Color-coded department badge per member |
| 📈 Progress bar | Task completion bar — green ≥80%, amber ≥50%, red <50% |
| 👁️ Hover actions | Edit + Remove buttons appear on row hover |
| 📱 Responsive | Horizontal scroll on small screens via `minWidth: 760` |

**Presence color map** (defined in `data.js`):

```js
export const presenceColors = {
  Online:  "#10b981",  // green
  Busy:    "#ef4444",  // red
  Away:    "#f59e0b",  // amber
  Offline: "#6b7280",  // grey
};
```

**Department color map** (defined in `data.js`):

```js
export const deptColors = {
  Engineering: "#6366f1",  // indigo
  Product:     "#f43f5e",  // rose
  Analytics:   "#0ea5e9",  // sky
  Design:      "#f59e0b",  // amber
  Marketing:   "#10b981",  // emerald
};
```

**Sort logic:**

```jsx
const handleSort = col => {
  if (sortCol === col) setSortDir(d => -d);   // toggle direction
  else { setSortCol(col); setSortDir(1); }    // new column, reset to asc
};

const sorted = [...teamMembers]
  .filter(...)
  .sort((a, b) => a[sortCol] > b[sortCol] ? sortDir : -sortDir);
```

---

## 🎨 Tailwind CSS Classes Used

Since Tailwind v4 is used **via the Vite plugin** (not a config file), classes are auto-detected. Below are all key utility classes used and what they do:

### Layout & Spacing

| Class | What it does |
|---|---|
| `flex` | `display: flex` |
| `items-center` | `align-items: center` |
| `justify-between` | `justify-content: space-between` |
| `gap-2`, `gap-4` | spacing between flex/grid children |
| `flex-wrap` | allows flex children to wrap to next line |
| `flex-shrink-0` | prevents item from shrinking in flex |
| `grid` | `display: grid` |
| `grid-cols-4` | 4 equal columns in grid |
| `min-w-[720px]` | minimum width (used to force table scroll) |
| `max-w-5xl` | max width ~1024px, keeps content centered |
| `mx-auto` | centers a block element horizontally |
| `p-4`, `px-6`, `py-3` | padding (all / horizontal / vertical) |
| `m-0`, `mt-1`, `mb-6` | margin (all / top / bottom) |
| `overflow-hidden` | hides overflow, used for rounded card edges |
| `overflow-x-auto` | horizontal scroll for table on small screens |

### Typography

| Class | What it does |
|---|---|
| `text-xs` | font-size: 12px |
| `text-sm` | font-size: 14px |
| `text-base` | font-size: 16px |
| `text-lg` | font-size: 18px |
| `text-2xl` | font-size: 24px |
| `font-medium` | font-weight: 500 |
| `font-semibold` | font-weight: 600 |
| `font-bold` | font-weight: 700 |
| `font-extrabold` | font-weight: 800 |
| `uppercase` | `text-transform: uppercase` |
| `tracking-wide` | `letter-spacing: 0.025em` |
| `tracking-widest` | `letter-spacing: 0.1em` |
| `whitespace-nowrap` | prevents text from wrapping |
| `font-mono` | monospace font (used for order IDs) |

### Colors

| Class | What it does |
|---|---|
| `text-white` | white text |
| `text-gray-400` | medium grey text |
| `text-emerald-500` | green text (used for "Paid" status) |
| `text-amber-500` | amber text (used for "Pending" status) |
| `text-red-500` | red text (used for "Failed" status) |
| `text-blue-400` | blue text (used for order IDs) |
| `text-indigo-400` | indigo (active sort column header) |
| `bg-white` | white background |
| `bg-gray-50` | very light grey (table header row) |
| `bg-blue-500` | blue (active filter tab + active pagination) |
| `bg-indigo-500` | indigo (Add Member button) |

### Borders & Radius

| Class | What it does |
|---|---|
| `rounded-lg` | border-radius: 8px |
| `rounded-xl` | border-radius: 12px |
| `rounded-2xl` | border-radius: 16px — used for card containers |
| `rounded-full` | border-radius: 9999px — used for badges + progress bar |
| `border` | adds 1px border |
| `border-t` | border on top only (table row dividers) |
| `border-b` | border on bottom only (section separators) |

### Interactivity & Transitions

| Class | What it does |
|---|---|
| `cursor-pointer` | shows hand cursor on hover |
| `select-none` | disables text selection (on sortable headers) |
| `transition-all` | smooth transition on all CSS properties |
| `transition-colors` | smooth color transitions only |
| `hover:bg-white/10` | background on hover with 10% opacity |
| `hover:opacity-100` | full opacity on hover |
| `opacity-0` | fully transparent (hidden action buttons) |
| `group` | marks a parent for `group-hover:` targeting |
| `group-hover:opacity-100` | reveals child element when parent is hovered |

### Responsive Breakpoints

| Class | What it does |
|---|---|
| `sm:flex` | `display: flex` only on screens ≥640px |
| `sm:hidden` | hidden on screens ≥640px |
| `hidden sm:block` | hidden on mobile, visible on sm+ |
| `sm:flex-row` | row direction on sm+ (vs column on mobile) |
| `sm:inline` | inline on sm+ (used to show button label text) |

---

## 📊 Data Structure

### orders (in `data.js`)

```js
{
  id:       "#ORD-5521",     // unique order ID
  customer: "Sarah Johnson", // full name
  email:    "sarah@email.com",
  product:  "Pro Plan",      // subscription tier
  date:     "Mar 1, 2025",
  amount:   299,             // number (no $ symbol in data)
  status:   "Paid",          // "Paid" | "Pending" | "Failed" | "Refunded"
  avatar:   "SJ",            // initials for Avatar component
  color:    "#3b82f6",       // hex color for that user's avatar
}
```

### teamMembers (in `data.js`)

```js
{
  name:   "Alex Morgan",
  role:   "Engineering Lead",
  dept:   "Engineering",     // must match a key in deptColors
  tasks:  24,                // total tasks assigned
  done:   18,                // tasks completed (used for progress %)
  joined: "2022",            // year joined
  status: "Online",          // "Online" | "Busy" | "Away" | "Offline"
  avatar: "AM",
  color:  "#6366f1",
}
```

---

## ➕ How to Add Your Own Data

### Add a new order:
```js
// in src/data/data.js — add to the orders array:
{ id: "#ORD-5522", customer: "John Doe", email: "john@email.com", product: "Starter", date: "Mar 2, 2025", amount: 49, status: "Paid", avatar: "JD", color: "#14b8a6" },
```

### Add a new team member:
```js
// in src/data/data.js — add to the teamMembers array:
{ name: "Lena Park", role: "QA Engineer", dept: "Engineering", tasks: 20, done: 17, joined: "2024", status: "Online", avatar: "LP", color: "#f97316" },
```

### Add a new department:
```js
// in src/data/data.js — add to deptColors:
export const deptColors = {
  // ...existing entries...
  Legal: "#64748b",   // ← new department with its color
};
```

---

## 🔌 How to Use in Your Own Dashboard

Both tables accept only one prop — `dark` — making them plug-and-play:

```jsx
// In any parent component or page:
import OrderTable from "./components/tables/OrderTable";
import TeamTable  from "./components/tables/TeamTable";

function DashboardPage() {
  const [dark, setDark] = useState(true);

  return (
    <div>
      <OrderTable dark={dark} />
      <TeamTable  dark={dark} />
    </div>
  );
}
```

To connect to a real API, replace the imported `orders` / `teamMembers` arrays with `useState` + `useEffect` fetch calls inside each table component:

```jsx
// Replace static import with:
const [orders, setOrders] = useState([]);

useEffect(() => {
  fetch("/api/orders")
    .then(res => res.json())
    .then(data => setOrders(data));
}, []);
```

---

## 🛠️ Available Scripts

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # run ESLint
```

---

## 📜 License

MIT — free to use in personal and commercial projects.
