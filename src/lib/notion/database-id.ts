/** Validates Notion blog database id; avoids passing the string "undefined" to the API. */
export function requireDatabaseId(): string {
  const id = process.env.DATABASE_ID?.trim();
  if (!id) {
    throw new Error('DATABASE_ID missing');
  }
  return id;
}
