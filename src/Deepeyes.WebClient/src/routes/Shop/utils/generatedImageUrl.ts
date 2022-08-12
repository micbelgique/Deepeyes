export default function generatedImageUrl(
  imageId: string,
  mode: "thumbnails" | "full" = "thumbnails"
): string {
  let container = "thumbnails"
  if (mode === "thumbnails") {
    container = "thumbnails"
  } else if (mode === "full") {
    container = "raw-pics"
  }
  return `${import.meta.env.VITE_BLOB_URL}/${container}/${imageId}`
}
