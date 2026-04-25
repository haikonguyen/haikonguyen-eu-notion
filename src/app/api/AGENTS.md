These rules apply to Route Handlers in `src/app/api/`.

- Prefer **Server Actions** (`src/actions/`) for first-party mutations from the UI.
- Keep `app/api/` for webhooks, email providers (SendGrid), and cases where a Route Handler is the right boundary.
- Always return `NextResponse`.
- Validate body/query with Zod. Never `as` on `request.json()`.
- Zod schemas: PascalCase (`ContactMessageSchema`). Prefer `if (result.error)` over `if (!result.success)`.
- Do not leak internals in error responses.
- Functions with more than three positional args take a single options object.
