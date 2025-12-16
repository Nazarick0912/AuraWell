# API Plan

## Structure and servlet layout
- One servlet per endpoint group under domain packages; map each servlet explicitly in `WEB-INF/web.xml`.
- Domain packages under `com.aurawell.api`:
  - Auth (`/api/auth/*`): `auth/LoginServlet`, `auth/RegisterServlet`, `auth/LogoutServlet`, `auth/MeServlet`
  - Catalog (`/api/products*`): `catalog/ProductsServlet`, `catalog/ProductServlet`
  - Cart (`/api/cart*`): `cart/CartServlet`, `cart/CartItemServlet`
  - Orders (`/api/orders*`): `orders/OrdersServlet`
  - Admin (`/api/admin/*`): `admin/AdminProductsServlet`, `admin/AdminProductServlet`, `admin/AdminOrdersServlet`
  - Media (`/api/media/*`): `media/ImageUploadServlet`, `media/ImageServlet`
  - CORS: `api/CorsFilter`

## Auth — `LoginServlet`, `RegisterServlet`, `LogoutServlet`, `MeServlet`
- `POST /api/auth/login` — body `{ email, password }`.
  - Success: `{ success: true, message, user: { id, email, firstName, lastName, role } }`; sets session `userId`, `userRole`.
  - Errors: `401` with `{ success: false, message: "Invalid email or password" }`.
- `POST /api/auth/register` — body `{ email, password, firstName, lastName }`.
  - Success: `{ success: true, message, user }`; sets session.
  - Errors: `409` when email exists; `500` on failure; messages in `message` field.
- `POST /api/auth/logout` — no body.
  - Success: `{ success: true, message }`; session invalidated.
- `GET /api/auth/me`
  - Success: `{ success: true, user }` when session valid.
  - Errors: `401` with `{ success: false, message: "Not authenticated" }` or `404` if user missing.

## Catalog — `ProductsServlet`, `ProductServlet`
- `GET /api/products` (optional `?category=`)
  - Success: array of `Product { id, name, description, price, stock, category, ageGroup, imageUrl, createdAt }`.
- `GET /api/products/{id}`
  - Success: `Product`.
  - Errors: `400` `{ error: "Product ID required" }` when no id; `404` `{ error: "Product not found" }` when missing.

## Cart — `CartServlet`, `CartItemServlet`
- `GET /api/cart` (auth required)
  - Success: `{ items: [{ productId, quantity, name, price, imageUrl, subtotal }], totalAmount, itemCount }`.
  - Errors: `401` `{ error: "Not authenticated" }`.
- `POST /api/cart` (auth required) — body `{ productId, quantity? }` (default 1).
  - Success: `{ success: true, message: "Item added to cart" }`.
  - Errors: `401` unauthenticated; `404` `{ error: "Product not found" }`.
- `DELETE /api/cart` (auth required)
  - Success: `{ success: true, message: "Cart cleared" }`.
- `PUT /api/cart/{productId}` (auth required) — body `{ quantity }`.
  - Success: `{ success: true, message: "Cart updated" }`; quantity <= 0 removes item.
  - Errors: `400` `{ error: "Product ID required" }`; `401` unauthenticated.
- `DELETE /api/cart/{productId}` (auth required)
  - Success: `{ success: true, message: "Item removed from cart" }`.
  - Errors: `400` missing id; `401` unauthenticated.

## Orders — `OrdersServlet`
- `GET /api/orders` (auth required)
  - Success: array of `Order { id, userId, items[{ productId, productName, quantity, priceAtPurchase }], totalAmount, status, shippingAddress, createdAt }`.
  - Errors: `401` `{ error: "Not authenticated" }`.
- `POST /api/orders` (auth required) — body `{ shippingAddress }`.
  - Success: `{ success: true, message: "Order placed successfully", orderId, totalAmount }`; also reduces product stock and clears cart.
  - Errors: `401` unauthenticated; `400` `{ error: "Cart is empty" }`.

## Admin — `AdminProductsServlet`, `AdminProductServlet`, `AdminOrdersServlet` (all require `userRole` = `admin` in session)
- `GET /api/admin/products`
  - Success: array of `Product`.
  - Errors: `403` `{ error: "Admin access required" }`.
- `POST /api/admin/products` — body `{ name, description, price, stock, category, ageGroup, imageUrl? }`.
  - Success: `{ success: true, message, product }`.
- `PUT /api/admin/products/{id}` — same body as create.
  - Success: `{ success: true, message, product }`.
  - Errors: `400` when id missing; `404` `{ error: "Product not found" }`.
- `DELETE /api/admin/products/{id}`
  - Success: `{ success: true, message }`.
  - Errors: `400` missing id; `404` when not found.
- `GET /api/admin/orders`
  - Success: array of `Order`.
  - Errors: `403` on non-admin.
- `PUT /api/admin/orders` — body `{ orderId, status }`.
  - Success: `{ success: true, message, order }`.
  - Errors: `404` `{ error: "Order not found" }` or `403` non-admin.

## Media — `ImageUploadServlet`, `ImageServlet`
- `POST /api/upload/image` — multipart form-data with `image`; size limits: max file 10MB, request 15MB.
  - Success: `{ success: true, imageUrl, message? }`.
  - Errors: standard JSON error with `error` message when upload fails.
- `GET /api/images/{path}` — serves uploaded images from storage.

## CORS
- Origin (env-driven): read from env/config (e.g., `CORS_ALLOW_ORIGIN`). If set, use that exact origin (production website url). If not set, default to `http://localhost:3000` (or your dev port). 
- Methods: `GET, POST, PUT, DELETE, OPTIONS`.
- Headers: `Content-Type, Authorization`; add more only when the frontend actually sends them.
- Preflight: `OPTIONS` should return `200` with the allowed origin, methods, headers, credentials flag, and a sensible `Access-Control-Max-Age` (e.g., 3600s).
- Avoid `*` when credentials are used; keep the allowlist explicit for production and local dev.
