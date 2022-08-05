import { Card, CardContent, CardMedia, Chip, Stack, Typography } from "@mui/material"
import ScanVisionResult from "../models/ScanVisionResult"
import adultImage from "../assets/adult.jpg"
interface ItemCardProps {
  item: ScanVisionResult
}

export default function ItemCard({ item:{image, captions, tags , isAdult} }: ItemCardProps) {
  let  imageUrl = import.meta.env.VITE_BLOB_URL + "/thumbnails/" + image
  let description = captions?.[0]?.text ?? "unknown"
   if(isAdult==true){
      imageUrl = adultImage
      tags = []
      description = "Censored"
   }

  return (
    <Card sx={{ maxWidth: 345, marginTop: "2rem" }}>
      <CardMedia component="img" height="240" image={imageUrl} alt={description} />
      <CardContent>
        {/* Adults : {isAdult.toString()} */}
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
