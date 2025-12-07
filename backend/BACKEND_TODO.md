# Backend TODO

## Person A — Auth, Cart, Orders
- [ ] Hardening `LoginServlet`, `RegisterServlet`, `LogoutServlet`, `MeServlet`: input validation, password verification against stored values, clearer error payloads, session fixation avoidance.
- [ ] Cart flow (`CartServlet`, `CartItemServlet`): validate quantities > 0, reject unknown products, ensure cart total math is correct after updates/clears.
- [ ] Order creation (`OrdersServlet` POST): validate shippingAddress presence, ensure sufficient stock before decrementing, rollback stock on failure paths, handle empty cart response consistently.
- [ ] Order listing (`OrdersServlet` GET): ensure orders are scoped to session user; mask no data unnecessarily.
- [ ] Error/status codes audit: align unauthenticated as 401, bad input as 400, missing resources as 404 across these servlets.
- [ ] Tests: auth session lifecycle, cart add/update/remove/clear, order creation with stock changes and empty-cart rejection.
- [ ] Frontend integration: implement typed auth/cart/order calls in `src/services/api.ts`, manage session hydration in `AuthContext`, cart hydration in `CartContext`, and expose typed hooks/actions for Login/Register/Checkout/Orders pages; avoid `any`.

## Person B — Products, Admin, Media
- [ ] Catalog (`ProductsServlet`, `ProductServlet`): category filter allowlist, consistent 400/404 errors, optional pagination support if needed by frontend.
- [ ] Admin products (`AdminProductsServlet`, `AdminProductServlet`): enforce admin guard, validate numeric fields, keep `createdAt` on update, handle missing IDs with 400 vs 404.
- [ ] Admin orders (`AdminOrdersServlet`): admin guard, status allowlist (`pending|processing|shipped|delivered|cancelled`), reject invalid transitions if desired.
- [ ] Image upload/serve (`ImageUploadServlet`, `ImageServlet`): MIME/extension allowlist, size limits already present, path traversal guards, content-type headers.
- [ ] Data integrity: ensure `DataManager` writes for products/orders are synchronized; add basic locking if concurrent writes possible.
- [ ] Tests: product list/detail (happy + not found), admin CRUD, admin order status update (success + not found + forbidden), upload failure cases.
- [ ] Frontend integration : implement typed product/admin/media calls in `src/services/api.ts`, ensure image URLs resolve through `ImageServlet`, and provide data hooks/actions for Home/Products/ProductDetail/Admin pages;