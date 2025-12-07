# Frontend UI Design TODO 

## Shared UI foundations
- [ ] Define a light design system: spacing, colors, typography, buttons, inputs, cards, alerts/snackbars; document variants and disabled/loading states.
- [ ] App shell: top nav with auth/cart badges, footer, and responsive layout grid; ensure route guards for protected pages stay intact.
- [ ] Loading/empty/error patterns: skeletons or spinners + empty-state components for lists; inline errors + toast for async failures.
- [ ] Forms UX: consistent labels, helper/error text, focus management, keyboard navigation, and validation hints (email, password strength, required fields, positive numbers).
- [ ] Accessibility: semantic headings, form labeling, focus outlines, and contrast checks for all new UI.

## Page + component map
- [ ] Auth pages: `LoginPage`, `RegisterPage` with shared `AuthForm` pieces (inputs, submit, error banner, secondary links).
- [ ] Shopping flow: `HomePage`/`ProductsPage` grid, `ProductCard`, `ProductDetail` layout, filters/sorting controls, `AddToCartButton` with badge updates.
- [ ] Cart/Checkout: `CartPage` list rows (image, qty stepper, price, remove), summary panel, checkout form sections (shipping/contact), confirmation states.
- [ ] Orders: `OrdersPage` list with status chips, expandable items, empty/404/401 states.
- [ ] Admin: `AdminLayout`, products table with inline actions, edit/create drawer/modal forms, orders table with status update controls; show role-gate empty/redirect state.
- [ ] Feedback primitives: `Toast/Alert`, `Modal/Drawer`, `ConfirmDialog` for destructive actions.

## Person C — Auth + User-facing flows (UI)
- [ ] Auth pages: compose `AuthForm` variants for login/register; show field-level and form-level errors; disabled states while submitting.
- [ ] Session-aware header pieces: avatar/menu for logged-in user, logout action entry, guarded nav links.
- [ ] Checkout UI: address/contact form sections, order summary, empty-cart guard view; success state with next steps.
- [ ] Orders UI: list card/table, status chips, detail expander; render empty/error/unauthorized states.

## Person D — Catalog, Cart, Admin (UI)
- [ ] Catalog pages: product grid/list layout, category filter chips, optional sort select; design empty/error/skeleton states.
- [ ] Product detail: media/thumbnail gallery, price/stock block, spec/description sections; disable add-to-cart when stock <= 0.
- [ ] Cart UI: line items with qty stepper, price calc, remove/clear actions; inline error display for failed updates.
- [ ] Admin products: table with pagination/search affordance, inline status badges, create/edit modal/drawer forms with numeric validation cues.
- [ ] Admin orders: table with status select + feedback, role-guarded empty/redirect view; show success/error notifications.