import { BlobServiceClient } from "@azure/storage-blob"

const blobSasUrl = import.meta.env.VITE_BLOB_SAS_URL
const blobContainerName = import.meta.env.VITE_BLOB_CONTAINER_NAME

const blobServiceClient = new BlobServiceClient(blobSasUrl)
const containerCLient = blobServiceClient.getContainerClient(blobContainerName)

const uploadImage = async (image: Blob) => {
  const blobClient = containerCLient.getBlockBlobClient(
    `${Date.now()}-${(Math.random() * 100) % 100}.jpg`
  )
  await blobClient.upload(image, image.size)
}

export { uploadImage }
