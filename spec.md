# Coat Factory

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full coat factory retail website with the following pages/sections:
  - Hero/banner section with brand name and tagline
  - Featured collections section (e.g. Winter, Classic, Sport)
  - Product catalog/gallery with coat listings (name, image, price, short description)
  - Individual product detail view (expandable or modal)
  - About Us section describing the factory/brand story
  - Contact section with address, phone, email, and a simple contact form

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Motoko canister to store coat products (id, name, description, price, category, imageUrl) and contact form submissions. Expose query functions to list products by category and get product details. Expose update function to submit contact form.
2. Frontend: React app with:
   - Navbar with logo and navigation links
   - Hero section
   - Featured collections grid
   - Product catalog with category filter
   - Product detail modal/drawer
   - About Us section
   - Contact form wired to backend
3. Sample coat products pre-seeded in the backend or displayed as static data on the frontend.
