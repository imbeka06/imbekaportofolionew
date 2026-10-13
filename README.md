# Imbeka Portfolio

The portfolio keeps its original visual design and interactions, but its files are now separated and it is ready to read editable content from Sanity.

## Structure

- `index.html` — page structure and built-in fallback content
- `src/styles.css` — all existing styles
- `src/app.js` — navigation, themes, backgrounds, mobile menu, and modals
- `src/sanity-config.js` — public Sanity connection settings
- `src/cms.js` — fetches and renders published Sanity content
- `studio/` — Sanity Studio and content schemas

The built-in HTML content is intentional: the website still works when Sanity is unavailable or has not been configured. Once published Sanity documents exist, projects, photographs, blog posts, the name, taglines, and About text are replaced with CMS content.

## Set up Sanity

Run these commands from the repository root using Git Bash:

1. Create or sign in to a Sanity account and create a project:

   ```sh
   cd studio
   npm install
   npx sanity login
   npx sanity init
   ```

   When `sanity init` asks questions:
   - select **Use an existing project** if you already created one in Sanity;
   - use the `production` dataset;
   - if it offers to overwrite the existing configuration or schemas, choose **No**.

2. Copy the Studio environment template:

   ```sh
   cp .env.example .env
   ```

3. Open the Sanity project dashboard or inspect the CLI output, copy the project ID, and replace `your-project-id` in `studio/.env`.

4. Put the same project ID in `src/sanity-config.js`:

   ```js
   window.SANITY_CONFIG = {
       projectId: 'your-project-id',
       dataset: 'production',
       apiVersion: '2025-01-01',
       useCdn: true
   };
   ```

   This project ID is public configuration, not a secret. Do not add an API token to browser JavaScript.

5. Start the editing dashboard:

   ```sh
   cd studio
   npm run dev
   ```

6. In Studio, create and **Publish**:
   - one **Site settings** document;
   - your **Project** documents;
   - **Photo** documents (upload images and provide useful alt text);
   - **Blog post** documents.

7. Allow the portfolio website to read the dataset. Add each frontend origin to the Sanity project's CORS origins. During local development this will normally be your local server origin, such as `http://localhost:8081`. Add your deployed portfolio URL too. Credentials are not needed for a public, read-only portfolio.

8. Preview the portfolio through a local web server rather than opening `index.html` directly:

   ```sh
   python -m http.server 8081
   ```

   Then open `http://localhost:8081`.

   > Port `8080` is often reserved by IIS on Windows (it returns a 403). Use `8081` (or any free port) instead.

## Deploying

The portfolio itself remains a static site and can stay on GitHub Pages, Netlify, or another static host. Sanity Studio can be run locally or deployed separately:

```sh
cd studio
npm run deploy
```

After deployment, content changes only require editing and publishing in Studio; the portfolio fetches the newly published content without code changes.

## Content behavior

- Empty/unconfigured CMS: original content remains visible.
- CMS request error: original content remains visible and a warning is written to the browser console.
- Published CMS content: matching sections are replaced after loading.
- Project and photo ordering: set the **Display order** number in Studio; lower numbers appear first.
