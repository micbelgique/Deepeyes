import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import TreeItem from "@mui/lab/TreeItem"
import TreeView from "@mui/lab/TreeView"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import useMediaQuery from "@mui/material/useMediaQuery"
import { forwardRef, Fragment, useEffect, useState } from "react"
import Entity from "../models/Entities"
import Ocr from "../models/Ocr"
import ScanVisionResult from "../models/ScanVisionResult"
import { filteredTags } from "../utils/filter"
import generatedImageUrl from "../utils/generatedImageUrl"
interface ItemModalProps {
  item: ScanVisionResult | null
  open: boolean
  onClose: () => void
  onDelete: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ItemModal({ item, open, onClose, onDelete }: ItemModalProps): JSX.Element {
  const [isShownTag, setIsShownTag] = useState(false)
  const [ShownDescribe, setIsShownDescribe] = useState(false)
  const [ShownObject, setIsShownObject] = useState(false)
  const theme = useTheme()
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"))
  useEffect(() => {
    console.log(item);
  }, [])

  if (item === null) return <></>
  return (
    <Dialog
      fullScreen={fullscreen}
      fullWidth={true}
      maxWidth="md"
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="modal-modal-title">{item.captions?.[0]?.text ?? "Description"}</DialogTitle>
      <DialogContent>
        <img src={generatedImageUrl(item.image, "full")} style={{ maxWidth: "100%" }} />
        {item.captions?.length > 0 && (
          <ul
            onMouseEnter={() => setIsShownDescribe(true)}
            onMouseLeave={() => setIsShownDescribe(false)}
          >
            {item.captions.map((caption, i) => (
              <Typography variant="body1" key={i} component="li">
                {caption.text}
                {ShownDescribe && (
                  <Chip
                    key={caption.confidence}
                    label={`${caption.confidence.toFixed(2)}`}
                    sx={{
                      ml: 0.5,
                      fontSize: "small",
                      backgroundColor: "#a5a5a5",
                      color: "white",
                    }}
                  />
                )}
              </Typography>
            ))}
          </ul>
        )}
        <Typography variant="h4">Tags</Typography>
        <Stack
          onMouseEnter={() => setIsShownTag(true)}
          onMouseLeave={() => setIsShownTag(false)}
          spacing={0}
          direction="row"
          flexWrap="wrap"
        >
          {filteredTags(item.tags).map((tag) => (
            <>
              <Chip
                key={tag.name}
                label={`${tag.name}`}
                sx={{
                  m: 0.5,
                  fontSize: "small",
                }}
              />
              {isShownTag && (
                <Chip
                  key={tag.confidence}
                  label={`${tag.confidence.toFixed(2)}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                    backgroundColor: "#a5a5a5",
                    color: "white",
                  }}
                />
              )}
            </>
          ))}
        </Stack>
        <Typography variant="h4">Accent Color</Typography>
        <Tooltip title={`#${item.accentColor}`}>
          <div
            style={{
              height: "100px",
              width: "200px",
              backgroundColor: "#" + item.accentColor,
            }}
          ></div>
        </Tooltip>
        <Typography variant="h4">Apparence</Typography>
        {item.facesAttributes?.length > 0 &&
          item.facesAttributes.map((facesAttribute, i) => (
            <Fragment key={i}>
              <Stack direction="row" flexWrap="wrap">
                <Chip
                  label={facesAttribute.gender}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  label={`Age : ${facesAttribute.age}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  label={`Smile : ${(facesAttribute.smile * 100).toFixed(0)}%`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  label={facesAttribute.glasses}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  label={`Beard : ${(facesAttribute.facialHair.beard * 100).toFixed(0)} %`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  label={`Moustache : ${facesAttribute.facialHair.moustache * 100} %`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  label={`Sideburns : ${facesAttribute.facialHair.sideburns * 100} %`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
              </Stack>
              <Divider sx={{ my: "0.5em" }} />
            </Fragment>
          ))}
        <Typography variant="h4">Objects</Typography>
        <Stack
          direction="row"
          spacing={0}
          flexWrap="wrap"
          onMouseEnter={() => setIsShownObject(true)}
          onMouseLeave={() => setIsShownObject(false)}
        >
          {item.objects?.length > 0 &&
            item.objects.map((object, i) => (
              <Fragment key={i}>
                <Chip
                  label={object.name}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                {ShownObject && (
                  <Chip
                    label={`${object.confidence.toFixed(2)}`}
                    sx={{
                      m: 0.5,
                      fontSize: "small",
                      backgroundColor: "#a5a5a5",
                      color: "white",
                    }}
                  />
                )}
              </Fragment>
            ))}
        </Stack>
        <Typography variant="h4">Adult Content</Typography>
        <Typography>{item.isAdult.toString()}</Typography>
        <Typography variant="h4">Ocr</Typography>
        <OcrBlock ocr={item.ocr} />
        <Typography variant="h4">Key phrase</Typography>
        <div>
          {item.ocr.keyPhrases.map((keyPhrase, i) => (
            <Chip
              key={i}
              label={keyPhrase}
              sx={{
                m: 0.5,
                fontSize: "small",
              }}
            />
          ))}
        </div>
        <FilterCategory entities={item.ocr.entities} />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onDelete}>
          <DeleteForeverIcon />
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

function OcrBlock({ ocr }: { ocr: Ocr }) {
  return (
    <Accordion disabled={ocr.state !== "DONE"}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}></Typography>
        <OcrState ocr={ocr} />
      </AccordionSummary>
      <AccordionDetails>
        {ocr.lines.map((text, i) => (
          <Typography key={i}>{text}</Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

function OcrState({ ocr: { state, summaries } }: { ocr: Ocr }) {
  if (state === "NONE")
    return <Typography sx={{ color: "text.secondary" }}>No Text found</Typography>
  if (state === "PENDING")
    return <Typography sx={{ color: "text.secondary" }}>Text will be processed</Typography>
  if (state === "RUNNING")
    return <Typography sx={{ color: "text.secondary" }}>Text is being processed</Typography>

  if (state === "DONE")
    return (
      <Typography sx={{ color: "text.secondary" }}>
        {summaries?.[0]?.text ?? "Text processed"}
      </Typography>
    )
  return <Typography sx={{ color: "text.secondary" }}>Unknown state</Typography>
}

function FilterCategory({ entities }: { entities: Entity[] }) {
  let cats: Record<string, Set<string>> = {}

  for (var en of entities) {
    if (!cats.hasOwnProperty(en.category)) {
      cats[en.category] = new Set([en.name])
      // cats = {[en.category]:[en.name], ...cats}
    } else {
      cats[en.category].add(en.name)
    }
  }

  return (
    <>
      <Typography variant="h4">Categories</Typography>
      {Object.entries(cats).map(([categorieName, valueName]) => (
        <div key={categorieName}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto", backgroundColor: "white" }}
          >
            <TreeItem className="changecolor" nodeId="1" label={categorieName}>
              {[...valueName].map((v, i) => (
                <TreeItem key={i} nodeId="2" label={v} />
              ))}
            </TreeItem>
          </TreeView>
        </div>
      ))}
    </>
  )
}
