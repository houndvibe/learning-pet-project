export function createFilePath(fileUrl: string) {
  const isRelativeAvatarUrl =
    !fileUrl.startsWith("data:") && !fileUrl.startsWith("http");

  const apiUrl = __API__ || "";
  const baseUrl = apiUrl.replace(/\/api$/, "");

  return isRelativeAvatarUrl ? `${baseUrl}${fileUrl}` : fileUrl;
}
