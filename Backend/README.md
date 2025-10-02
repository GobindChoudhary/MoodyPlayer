# MoodyPlayer Backend

Express + MongoDB API that stores songs, handles uploads via ImageKit, and serves mood-based playlists.

## Environment variables

Copy `.env.example` to `.env` and fill in values from your infrastructure:

```
PORT=3000
MONGODB_URL=your-mongodb-connection-string
PUBLIC_KEY_URL=your-imagekit-public-key
PRIVATE_KEY_URL=your-imagekit-private-key
END_POINT_URL=https://ik.imagekit.io/your_imagekit_id
CLIENT_URL=https://your-frontend-domain.com
```

- `PORT` is optional in local development but required by most hosting platforms.
- `CLIENT_URL` accepts a comma-separated list of allowed origins for CORS. Include both local (e.g. `http://localhost:5173`) and production frontend URLs.

## Scripts

```bash
# start in development
npm start
```

For production use a process manager such as PM2, or a platform (Render, Railway, Fly.io, etc.) that runs `npm install` followed by `npm start`.

## Deployment checklist

1. **Provision environment variables** on your host (PORT, MongoDB connection string, ImageKit keys, CLIENT_URL).
2. **Ensure MongoDB is accessible** from your hosting provider (Atlas or self-hosted cluster).
3. **Configure ImageKit** to accept uploads from your backend domain.
4. **Open the port** your platform assigns (usually done automatically when using `process.env.PORT`).
5. **Update the frontend `VITE_API_BASE_URL`** to point to the deployed backend URL.
6. **Verify CORS** by loading the frontend and calling `/songs?mood=neutral` from the browser console.
