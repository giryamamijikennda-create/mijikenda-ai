# Mijikenda AI — Deployment

## A. Put the project on GitHub
Create a GitHub repository and upload the contents of this project.

## B. Deploy backend + website on Render
1. Open Render and choose New → Web Service.
2. Connect the GitHub repository.
3. Render can use `render.yaml` automatically (Blueprint) or set:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variable:
   - `OPENAI_API_KEY` = your OpenAI secret key
   - `OPENAI_MODEL` = `gpt-5.5`
5. Deploy.

After deployment, test:
`https://YOUR-SERVICE.onrender.com/api/health`

Then open:
`https://YOUR-SERVICE.onrender.com`

## C. Connect Android
In `android/lib/main.dart`, replace:
`http://10.0.2.2:3000`
with:
`https://YOUR-SERVICE.onrender.com`

Then run:
`flutter pub get`
`flutter build apk --release`

For Play Store:
`flutter build appbundle`

## Security
Never put `OPENAI_API_KEY` in Flutter, browser JavaScript, GitHub, or a public file.
The key belongs only on the backend environment.

## Important
A public deployment cannot be completed from this chat alone unless the hosting account/repository is connected and authorized. The final external step is creating/authorizing the hosting service and entering the secret API key.
