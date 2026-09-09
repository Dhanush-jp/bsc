# Boppana Srinivas Contractor

Modern contractor landing page built with Next.js 14 App Router, TypeScript, Tailwind CSS, ShadCN-style components, and Framer Motion for subtle scroll animation.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Admin

Hidden admin panel:

```text
/admin
Username: srinivas
Password: honey123
```

Admin changes save instantly to browser localStorage. Use **Reset Content** in the admin panel to return to the seeded content in `data/site-content.ts`.

## Content And Images

Seed content lives in `data/site-content.ts`.

Project images are stored in `public/projects`. The admin image uploader can add more images from the browser, infer starter project copy from image/file context, and lets you edit titles, descriptions, categories, ordering, visibility, SEO, colors, and contact details.

## Environment

Copy `.env.example` to `.env.local` and update values as needed.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_GOOGLE_MAPS_EMBED=https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.3995858377502!2d78.55916747493714!3d17.488428683416085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9bbd503c00a5%3A0x944a3c6187e921d8!2sBoppana%20Srinivas%20Contractor!5e0!3m2!1sen!2sin!4v1778492848869!5m2!1sen!2sin
```

## Production Check

```bash
npm run build
```
