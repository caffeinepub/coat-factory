# LuxuryCars

## Current State
The project currently contains a Coat Factory website with a product catalog, category filtering, product detail modals, an About section, and a contact form. This will be replaced entirely with a luxury car dealership website.

## Requested Changes (Diff)

### Add
- Hero section with a full-screen cinematic banner for luxury cars
- Car catalog/showroom displaying luxury vehicle listings with make, model, year, price, and key specs
- Car detail view/modal with full specs (engine, horsepower, 0-60, top speed, interior features)
- Category/brand filtering (e.g. Lamborghini, Ferrari, Rolls Royce, Bentley, Porsche)
- Featured/highlight section showcasing a "Car of the Month" or top picks
- About section describing the dealership (heritage, exclusivity, white-glove service)
- Contact/Inquiry form for scheduling test drives or requesting more info
- Navigation bar with smooth scrolling to sections

### Modify
- Replace all existing coat factory content, branding, and UI with luxury car dealership content

### Remove
- All coat factory product data, categories, and related UI components

## Implementation Plan
1. Replace backend data models: define Car type with fields (id, make, model, year, price, horsepower, engine, topSpeed, zeroToSixty, category, description, features)
2. Backend: store sample luxury car listings; expose query to list all cars, get by id, filter by brand/category
3. Frontend: build full-page layout with Hero, Showroom (catalog), Car Detail modal, Featured section, About, Contact/Inquiry form
4. Implement brand filter tabs in the showroom
5. Use high-quality imagery placeholders or generated images for each car
