

# Plan: Build All Remaining Features

## Summary
Add 6 remaining features: individual blog post pages, admin volunteers section, admin petitions section, social share buttons on campaigns, framer-motion animations, and mobile-responsive admin sidebar.

## Features

### 1. Individual Blog Post Pages
- Create `src/pages/BlogPost.tsx` — full article view fetching by ID from `blog_posts`
- Add route `/awareness/:id` in `App.tsx`
- Update article cards in `Awareness.tsx` to link to `/awareness/{id}`

### 2. Admin Volunteers Section
- Create `src/pages/admin/AdminVolunteers.tsx` — table view of volunteer signups from `volunteers` table (name, email, interests, date)
- Add route and sidebar nav link in `App.tsx` and `AdminLayout.tsx`

### 3. Admin Petitions Section
- Create `src/pages/admin/AdminPetitions.tsx` — table showing petition signatures from `petitions` table, grouped or filterable by campaign
- Add RLS policy so admins can SELECT from `petitions` table (currently missing admin read policy)
- Add route and sidebar nav link

### 4. Social Share Buttons on Campaigns
- Add share buttons (Twitter/X, Facebook, WhatsApp) to each campaign card in `Campaigns.tsx` alongside the existing generic share button

### 5. Framer-Motion Animations
- Install `framer-motion`
- Add fade-in / slide-up animations on page hero sections and card grids across Index, About, Awareness, Support, Community, Campaigns pages
- Add hover scale effects on interactive cards

### 6. Mobile-Responsive Admin Sidebar
- Convert admin sidebar to a collapsible sheet/drawer on mobile using existing Sheet component
- Add hamburger menu trigger visible on small screens

## Database Changes
- Migration: Add RLS policy for admin SELECT on `petitions` table

## Files Created
- `src/pages/BlogPost.tsx`
- `src/pages/admin/AdminVolunteers.tsx`
- `src/pages/admin/AdminPetitions.tsx`

## Files Modified
- `src/App.tsx` — 3 new routes
- `src/components/admin/AdminLayout.tsx` — 2 new nav items + mobile responsive sidebar
- `src/pages/Awareness.tsx` — link cards to individual posts
- `src/pages/Campaigns.tsx` — social share buttons
- `src/pages/Index.tsx` — framer-motion animations
- `src/pages/About.tsx` — framer-motion animations
- `src/pages/Support.tsx` — framer-motion animations
- `src/pages/Community.tsx` — framer-motion animations

