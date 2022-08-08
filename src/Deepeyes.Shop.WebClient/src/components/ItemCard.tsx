import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material"
import adultImage from "../assets/adult.jpg"
import ScanVisionResult from "../models/ScanVisionResult"
import generatedImageUrl from "../utils/generatedImageUrl"
interface ItemCardProps {
  item: ScanVisionResult
  onClick: () => void
}

export default function ItemCard({
  item: { image, captions, tags, isAdult },
  onClick,
}: ItemCardProps) {
  let imageUrl = generatedImageUrl(image, "thumbnails")
  let description = captions?.[0]?.text ?? "unknown"
  if (isAdult == true) {
    imageUrl = adultImage
    tags = []
    description = "Censored"
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: "2rem" }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="250" image={imageUrl} alt={description} />
        <CardContent>
          {/* Adults : {isAdult.toString()} */}
          <Typography variant="h5" color="text.secondary" sx={{ mb: "0.2em" }}>
            {description}
          </Typography>
          <Stack spacing={0} direction="row" sx={{ flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <Chip key={tag.name} label={tag.name} sx={{ m: 0.2 }} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
