# Baby Blue - Luxury Nigerian Hair Brand

A premium e-commerce platform for Baby Blue, a luxury Nigerian hair brand offering high-quality human hair products.

## Features

- 🛍️ **E-commerce Functionality**
  - Product catalog with advanced filtering
  - Product detail pages with image galleries
  - Shopping cart with real-time updates
  - Multi-step checkout process

- 👤 **User Management**
  - User authentication (login/register)
  - User dashboard with order history
  - Wishlist functionality
  - Address management

- 💳 **Payment Integration**
  - Paystack integration (ready for implementation)
  - Flutterwave integration (ready for implementation)
  - Bank transfer option

- 🎨 **Luxury Design**
  - Premium, minimalist UI
  - Responsive mobile-first design
  - Smooth animations with Framer Motion
  - Custom luxury color palette

- 📱 **Responsive Design**
  - Mobile-optimized
  - Tablet support
  - Desktop experience

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API + Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd baby-blue
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
baby-blue/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── Contact.tsx
│   ├── context/        # React Context providers
│   │   ├── CartContext.tsx
│   │   └── AuthContext.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Design System

### Colors

- **Baby Blue**: Primary brand color (#0ea5e9)
- **Ivory**: Background color (#faf9f6)
- **Nude**: Accent color (#e8dcc6)
- **Charcoal**: Text color (#2c2c2c)

### Typography

- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body text)

## Payment Integration

The checkout process includes hooks for integrating with:

1. **Paystack**: Nigerian payment gateway
2. **Flutterwave**: Pan-African payment gateway
3. **Bank Transfer**: Manual payment confirmation

To integrate, update the `handlePayment` function in `src/pages/Checkout.tsx` with your payment provider's SDK.

## Future Enhancements

- [ ] Backend API integration (Supabase/Firebase)
- [ ] Real product data and images
- [ ] Advanced search functionality
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Blog/content management
- [ ] International shipping calculator
- [ ] Multi-language support

## License

This project is proprietary and confidential.

## Contact

For questions or support, please contact hello@babyblue.com
