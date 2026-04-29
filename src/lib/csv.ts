/**
 * Convert an array of records to CSV and trigger a browser download.
 */
export function downloadCsv<T extends object>(rows: T[], filename: string) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0] as Record<string, unknown>);
  const escape = (val: unknown) => {
    if (val === null || val === undefined) return "";
    const s = String(val).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => escape((r as Record<string, unknown>)[h])).join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}