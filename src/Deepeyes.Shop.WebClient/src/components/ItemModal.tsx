import { Box, Chip, Modal, Stack, Tooltip, Typography } from "@mui/material"
import ScanVisionResult from "../models/ScanVisionResult"
import generatedImageUrl from "../utils/generatedImageUrl"

interface ItemModalProps {
  item: ScanVisionResult | null
  open: boolean
  onClose: () => void
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  display: "block",
  height: "100%",
}

export default function ItemModal({ item, open, onClose }: ItemModalProps): JSX.Element {
  if (item === null) return <></>
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {item.captions?.[0]?.text ?? "Description"}
        </Typography>
        <img src={generatedImageUrl(item.image, "full")} style={{ width: 500 }} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {item.captions?.length > 0 && (
            <>
              <Typography variant="h6" component="h3">
                Descriptions:
              </Typography>
              <li>
                {item.captions.map((caption, i) => (
                  <ul key={i}>
                    {caption.text} | {caption.confidence.toFixed(2)}
                  </ul>
                ))}
              </li>
            </>
          )}
          <Typography variant="h6" component="h3">
            Tags:
          </Typography>
          <Stack spacing={0} direction="row" sx={{ flexWrap: "wrap" }}>
            {item.tags.map((tag) => (
              <Chip
                key={tag.name}
                label={`${tag.name} | ${tag.confidence.toFixed(2)}`}
                sx={{ m: 0.2 }}
              />
            ))}
          </Stack>
          <Typography variant="h6" component="h3">
            Accent Color:
            <Tooltip title={`#${item.accentColor}`}>
              <span
                style={{
                  height: "1em",
                  width: "1em",
                  backgroundColor: "#" + item.accentColor,
                  display: "inline-block",
                  borderRadius: "50%",
                }}
              ></span>
            </Tooltip>
          </Typography>
          <Typography variant="h6" component="h3">
            Faces:
          </Typography>
          <ul>
            {item.faces?.length > 0 &&
              item.faces.map((face, i) => (
                <li key={i}>
                  {face.gender} - {face.age.toString()}
                </li>
              ))}
          </ul>
          <Typography variant="h6" component="h3">
            Objects:
          </Typography>
          <ul>
            {item.objects?.length > 0 &&
              item.objects.map((object, i) => (
                <li key={i}>
                  {object.name} - {object.confidence.toString()}
                </li>
              ))}
          </ul>
          <Typography variant="h6" component="h3">
            Is Adult: {item.isAdult.toString()}
          </Typography>
        </Typography>
      </Box>
    </Modal>
  )
}
