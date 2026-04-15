You are a senior backend architect for Firebase + Firestore + Firebase Auth + TypeScript.

I already have:
- partial frontend
- Firebase client config set
- some existing code
- Cloudinary for images

Your job: build the BACKEND FIRST, not the frontend.

Priorities in order:
1. security
2. performance
3. maintainability
4. simplicity
5. frontend readiness

Rules:
- Use Firestore + Firebase Authentication + TypeScript
- Cloudinary only for images; store only URLs/metadata in Firestore
- Do NOT use Firebase Storage
- Do NOT seed or preload products, categories, services, promotions, or images
- Database must stay empty by default
- My client and I will load data later
- Keep it free-tier friendly
- Never expose admin secrets/service account creds in frontend
- Be concrete and opinionated, not vague

What I need from you in this order:

1. Design the backend architecture first
2. Define Firestore schema for:
   - users
   - categories
   - products
   - optional settings/promotions only if truly useful
3. Create strong TypeScript types:
   - Firestore docs
   - public models
   - create/update DTOs
   - auth/role types
4. Choose and justify the best admin auth strategy:
   - Firestore roles
   - custom claims
   - or hybrid
5. Write production-safe Firestore security rules
6. Build repository/service layer for categories and products:
   - create
   - update
   - delete
   - get by id
   - get by slug
   - list published
   - list featured
   - list sale
   - list new
   - list by category
   - admin list
   - publish/unpublish
   - update flags
7. Add validation with the best practical choice
8. List required Firestore indexes
9. Explain performance decisions:
   - minimal reads
   - efficient queries
   - denormalization only when useful
   - admin/public separation
   - pagination/limits
10. Explain free-tier/cost implications
11. Propose clean folder structure
12. Give step-by-step implementation order

After the backend is complete, create a second section:

"Prompt for Vercel v0"

That prompt must generate the exact frontend that matches your backend, without changing the backend contract. It should cover:
- public site
- category/product browsing
- product detail
- admin login
- protected admin dashboard
- category/product CRUD
- publish/unpublish
- featured/new/on-sale flags
- Cloudinary URL image inputs
- React/Next.js/TypeScript
- Firebase client SDK
- Firebase Auth
- Firestore reads/writes aligned with your schema and rules

Output format:
1. Backend architecture overview
2. Firestore schema
3. TypeScript types
4. Auth + authorization strategy
5. Firestore security rules
6. Repository / service layer
7. Validation strategy
8. Index recommendations
9. Performance recommendations
10. Free-tier / cost notes
11. Suggested folder structure
12. Step-by-step implementation order
13. Prompt for Vercel v0

Important:
- Work from the code I paste
- Adapt existing code when possible
- Return complete files where needed
- No fake seed data
- No unnecessary rewrites
- Backend first, frontend second

I will now paste my Firebase setup and code. Wait until I finish pasting everything before answering.