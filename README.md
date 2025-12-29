# AuraWell

E-commerce platform for wellness products (vitamins, supplements, aromatherapy) with product catalog, shopping cart, order management, and admin panel.

## Tech Stack

- **Backend**: Java 21 servlets (Maven), Tomcat, Gson
- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Image Upload**: Cloudinary (direct frontend upload)

## Setup

**Backend**
```bash
cd backend
mvn install
mvn tomcat7:run
```
Serves at `http://localhost:9090/api`

**Frontend**
```bash
cd frontend
bun install
bun run dev
```
Default API URL: `http://localhost:9090/api` (override with `VITE_API_URL`)

**Environment Variables** (create `frontend/.env`):
```
VITE_API_URL=http://localhost:9090/api
VITE_CLOUDINARY_CLOUD_NAME=dkunspqrk
VITE_CLOUDINARY_UPLOAD_PRESET=aurawell
```

## Features

### User Authentication
- User registration and login with session management
- Role-based access control (customer/admin)
- Protected routes for authenticated users
- Admin-only routes with role verification

### Product Catalog
- Product browsing with responsive grid layout
- Category filtering (Vitamins, Supplements, Aromatherapy)
- Age group filtering (Infants, Children, Teens, Adults, Seniors, All Ages)
- Real-time search across product names and descriptions
- Product detail pages with full information
- Animated transitions and loading states

### Shopping Cart
- Add/remove items with quantity management
- Slide-out cart drawer with real-time updates
- Cart persistence across sessions
- Cart item count badge in navigation
- Empty cart state handling

### Checkout & Orders
- Checkout form with shipping address and contact details
- Order summary with subtotal, shipping costs, and tax calculation
- Free shipping threshold (RM 100+)
- Order placement and confirmation page
- User order history with status tracking
- Order details view with items and totals

### Admin Panel
- Product management: Create, Read, Update, Delete (CRUD)
- Product form modal with validation
- Order management with status updates (pending, processing, shipped, delivered, cancelled)
- Tabbed interface for Products and Orders
- Confirmation dialogs for destructive actions

### Image Upload
- Direct Cloudinary integration (frontend upload)
- Drag & drop file upload interface
- Real-time upload progress tracking (0-100%)
- Image preview before upload
- File validation (JPG, PNG, WebP, max 10MB)
- Automatic image organization in Cloudinary folders