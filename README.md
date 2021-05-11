# Implementation of Implicit Grant Flow
Implicit grant flow is for clients that are implemented entirely using JavaScript and running in the resource owner’s browser. You do not need any server-side code to use it. Rate limits for requests are improved but there is no refresh token provided. This flow is described in [RFC-6749](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2/).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# and
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

