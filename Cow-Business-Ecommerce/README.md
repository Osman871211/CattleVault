# CattleVault — Cow Business E-commerce Website

## Project Summary
CattleVault is a static cattle marketplace website built with HTML, CSS, and JavaScript. It features a modern responsive design for buying and browsing livestock, including dairy cows, beef cattle, breeding bulls, calves, and farm products. The project includes dynamic search, filtering, shopping cart, wishlist, dark mode, and checkout flow powered by client-side JavaScript.

## Live Pages Included
- `index.html` — Home page with hero section, featured livestock, search, and quick navigation.
- `cows.html` — Marketplace catalog page with filters, sorting, and product listing.
- `cow-details.html` — Product details page for individual cattle listings.
- `cart.html` — Shopping cart page and order summary.
- `checkout.html` — Checkout form, delivery details, and order review.
- `about.html` — Company/about information.
- `contact.html` — Contact form page.
- `login.html` — Login page template.
- `register.html` — Registration page template.

## Folder Structure
- `css/`
  - `style.css` — Main project styles and theme definitions.
  - `responsive.css` — Mobile responsive layout and breakpoints.
- `js/`
  - `script.js` — Main UI logic, page initialization, search suggestions, dark mode, mobile menu, and page-specific behavior.
  - `products.js` — Product dataset with sample cattle listings and helper functions like `getProductById()` and `getFeaturedProducts()`.
  - `cart.js` — Cart and wishlist state management using `localStorage`, cart rendering, add/remove operations, and toast notifications.
- `images/` — Images used across the site.

## Key Features
- Responsive marketplace layout for desktop, tablet, and mobile.
- Live navbar search with auto-suggestions.
- Product filtering by category, breed, price, and sorting options.
- Add to cart functionality with quantity updates and local storage persistence.
- Wishlist toggling stored in local storage.
- Dark mode toggle saved across visits.
- Dynamic cart badge counters and toast alerts.
- Checkout form template and cart summary review.
- Easily extensible product dataset in `js/products.js`.

## How to Run
1. Open the project folder in your code editor or file manager.
2. Open `index.html` directly in your browser.
3. Optionally, use a static server (such as VS Code Live Server) for best local development experience.

## Development Notes
- To add or update cattle listings, edit `js/products.js`.
- Cart and wishlist data are stored in browser `localStorage` under the keys `cattle_cart` and `cattle_wishlist`.
- The search suggestions and product rendering logic are built in `js/script.js`.
- The marketplace page loads product cards inside `#catalog-products-container` and uses filter controls with IDs `filter-category`, `filter-breed`, `filter-price`, and `filter-sort`.
- The theme button with ID `theme-toggle-btn` toggles between light and dark mode.

## Customization Tips
- Add new page content by copying existing HTML structure for consistent design.
- Update CSS variables in `css/style.css` to change brand colors, typography, or spacing.
- Add new routes or sections by linking new pages in the navigation menu and footer.

## Notes
- This project is a static front-end website and does not require a backend server.
- The checkout form is a template and does not process real payments.
- The cart uses static sample data from `js/products.js`, so product details are served client-side.

## Recommended Next Steps
- Add real product detail rendering in `cow-details.html` by reading query param `id`.
- Improve form validation and messaging for login/register pages.
- Add cart persistence across pages by refreshing the cart rendering logic.
- Replace sample data with a JSON API or CMS for production use.
