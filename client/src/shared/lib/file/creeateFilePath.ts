export function createFilePath(fileUrl: string) {
  const apiUrl = __API__ || "";
  const baseUrl = apiUrl.replace(/\/api$/, "");
  return `${baseUrl}${fileUrl}`;
}
