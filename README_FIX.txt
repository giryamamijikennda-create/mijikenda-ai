RENDER ROOT-DIRECTORY FIX

Your GitHub repository currently has index.html, style.css, package.json and server.js
at the repository ROOT, not inside /server.

Upload/replace:
1. server.js  -> repository root
2. assets/mijikenda-logo.png -> repository root /assets/

Then commit the changes.

Render settings:
Root Directory: leave EMPTY
Build Command: npm install
Start Command: npm start

Environment variables:
OPENAI_API_KEY = your secret key
OPENAI_MODEL = gpt-5.6-luna

Do NOT upload the actual API key to GitHub.
