<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Keep shared site chrome in the root route and page content in dedicated TanStack route files so navigation and SEO remain consistent.
- Validate volunteer data with the shared Zod schema before browser-local persistence so every entry follows the same format.
- Keep the TanStack application as the primary runtime and maintain the parallel academic HTML/CSS/ES-module version as a functionally equivalent deliverable.
