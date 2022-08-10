import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import Ocr from "../models/Ocr"
import ScanVisionResult from "../models/ScanVisionResult"
import generatedImageUrl from "../utils/generatedImageUrl"

interface ItemModalProps {
  item: ScanVisionResult | null
  open: boolean
  onClose: () => void
  onDelete: () => void
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

export default function ItemModal({ item, open, onClose, onDelete }: ItemModalProps): JSX.Element {
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
        <div id="modal-modal-description">
          {item.captions?.length > 0 && (
            <>
              <Typography variant="h6" component="h3">
                Descriptions:
              </Typography>
              <ul>
                {item.captions.map((caption, i) => (
                  <Typography key={i} variant="body2" component="li">
                    {caption.text} | {caption.confidence.toFixed(2)}
                  </Typography>
                ))}
              </ul>
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
                <Typography key={i} variant="body2" component="li">
                  {face.gender} - {face.age.toString()}
                </Typography>
              ))}
          </ul>
          <Typography variant="h6" component="h3">
            Objects:
          </Typography>
          <ul>
            {item.objects?.length > 0 &&
              item.objects.map((object, i) => (
                <Typography key={i} variant="body2" component="li">
                  {object.name} - {object.confidence.toString()}
                </Typography>
              ))}
          </ul>
          <Typography variant="h6" component="h3">
            Is Adult: {item.isAdult.toString()}
          </Typography>
          <Typography variant="h6" component="h3">
            Ocr:
          </Typography>
          <OcrBlock ocr={item.ocr} />
          <Button variant="contained" color="error" onClick={onDelete} sx={{ mt: "0.5em" }}>
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

function OcrBlock({ ocr }: { ocr: Ocr }) {
  if (ocr.state === "DONE")
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Text: </Typography>
          <OcrState ocr={ocr} />
        </AccordionSummary>
        <AccordionDetails>
          {ocr.lines.map((text, i) => (
            <Typography key={i}>{text}</Typography>
          ))}
        </AccordionDetails>
      </Accordion>
    )
  return (
    <Typography variant="body2" component="p">
      Unknown state
    </Typography>
  )
}

function OcrState({ ocr: { state, summary } }: { ocr: Ocr }) {
  if (state === "NONE")
    return <Typography sx={{ color: "text.secondary" }}>No Text found</Typography>
  if (state === "PENDING")
    return <Typography sx={{ color: "text.secondary" }}>Text will be processed</Typography>
  if (state === "RUNNING")
    return <Typography sx={{ color: "text.secondary" }}>Text is being processed</Typography>
  if (state === "DONE")
    return <Typography sx={{ color: "text.secondary" }}>{summary ?? "Text processed"}</Typography>
  return <Typography sx={{ color: "text.secondary" }}>Unknown state</Typography>
}
