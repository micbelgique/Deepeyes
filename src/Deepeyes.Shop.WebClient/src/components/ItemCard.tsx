import { Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material"

interface ItemCardProps {
  tags: string[]
  image: string
  description: string
}

export default function ItemCard({ tags, image, description }: ItemCardProps) {
  const imageUrl = import.meta.env.VITE_BLOB_URL + "/thumbnails/" + image
  return (
    <Card sx={{ maxWidth: 345, marginTop: "2rem" }}>
      <CardMedia component="img" height="240" image={imageUrl} alt={description} />
      <CardContent>
        <Typography variant="h5" color="text.secondary" sx={{ mb: "0.2em" }}>
          {description}
        </Typography>
        <Stack spacing={2} direction="row">
          {tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
