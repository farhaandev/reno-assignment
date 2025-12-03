# Reno School Management App

A full-stack web application built using Next.js, MySQL, Prisma ORM, and Tailwind CSS.

## Features

- Add school with name, address, location, contact and image
- View schools in a responsive card layout
- Form validation using react-hook-form
- Uses Prisma ORM for MySQL database interaction

## Image Upload Logic

- **Local Environment:**  
  Uploaded images are stored in `/public/schoolImages` as per assignment requirements.

- **Production (Vercel):**  
  Since Vercel does not allow runtime file persistence, the app automatically switches to a placeholder image while still submitting the form and storing other data correctly.

## Tech Stack

- **Frontend:** Next.js (App Router), React Hook Form, Tailwind CSS
- **Backend:** Next.js API Routes + Prisma
- **Database:** MySQL (Locally + Railway in production)

## Deployment

- Backend and UI deployed on **Vercel**
- Database hosted on **Railway**

