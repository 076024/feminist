
# Feminism Awareness & Support Platform

## Design System
- **Colors**: Purple (#7C3AED primary), soft pink (#F9A8D4 accent), white backgrounds, dark text
- **Typography**: Clean, modern sans-serif
- **Style**: Professional, empowering, accessible

## Pages to Build

### 1. Home Page
- Hero section with headline "Equality is a Right, Not a Privilege" and empowering imagery
- Key statistics section (gender pay gap, violence stats, representation)
- CTA buttons: "Get Help", "Join the Movement", "Learn More"
- Featured campaigns preview
- Testimonials/impact section

### 2. About Page
- What is feminism — clear, accessible explanation
- History timeline of the feminist movement
- Mission, vision, and core values

### 3. Awareness & Education (Blog)
- Blog listing page with categories (Sexual Violence, Women's Rights, Gender Equality)
- Individual article pages
- Blog posts stored in database, managed via admin panel

### 4. Support & Help Section
- Emergency contacts and hotline numbers
- Anonymous help/reporting form (saves to database securely)
- Links to shelters and support organizations
- Mental health resources

### 5. Community Section
- Anonymous stories/testimonials (submitted via form, stored in DB)
- Events listing
- Volunteer signup form

### 6. Campaigns & Advocacy
- Active campaigns with descriptions and progress
- Petition signing (name + email saved to DB)
- Social media share buttons

### 7. Contact Page
- Contact form (saves to database)
- Organization email and phone
- Social media links

## Backend (Lovable Cloud)

### Database Tables
- **blog_posts** — title, content, category, image_url, published_at, author
- **help_requests** — anonymous submissions (no user_id required), message, category, status, created_at
- **testimonials** — anonymous stories, approved flag for moderation
- **events** — title, description, date, location
- **volunteers** — name, email, interests
- **petitions** — campaign_id, signer_name, signer_email
- **campaigns** — title, description, goal, status
- **contacts** — form submissions (name, email, message)

### Authentication & Admin
- Admin login for content management
- Admin panel to manage blog posts, review help requests, moderate testimonials, manage campaigns
- Role-based access using user_roles table

## Key Features
- Fully responsive (mobile-first)
- Smooth navigation with consistent header/footer
- Search functionality for blog content
- Quick-exit button on Support page (safety feature for users in danger)
- Accessible design (proper contrast, alt text, keyboard navigation)
