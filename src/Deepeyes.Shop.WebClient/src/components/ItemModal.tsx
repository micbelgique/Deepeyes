import { ConstructionOutlined } from "@mui/icons-material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
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
import { useState } from "react"
import Entity from "../models/Entities"
import Ocr from "../models/Ocr"
import ScanVisionResult from "../models/ScanVisionResult"
import generatedImageUrl from "../utils/generatedImageUrl"
import TreeView from '@mui/lab/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem'


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

const subtitle = {
  fontSize: "x-large",
  textTransform: "uppercase",
  fontFamily: "Bebas Neue",
  margin: "2%",
  color: "#9d9797",
}

const buttonstyle = {
  marginTop: "10%",
  marginRight: "40%",
  marginLeft: "40%",
}
  
export default function ItemModal({ item, open, onClose, onDelete }: ItemModalProps): JSX.Element {
  //Show the confidence
  const [isShown, setIsShown] = useState(false)
  const [ShownDescribe, setIsShownDescribe] = useState(false)
  const [ShownObject, setIsShownObject] = useState(false)


  if (item === null) return <></>
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          className="modalTitle"
          id="modal-modal-title"
          style={{
            fontSize: "xx-large",
            textTransform: "uppercase",
            fontFamily: "Bebas Neue",
            margin: "auto",
          }}
        >
          <b></b>
          {item.captions?.[0]?.text ?? "Description"}
        </Typography>
        <img src={generatedImageUrl(item.image, "full")} style={{ width: 500 }} />
        <div id="modal-modal-description">
          {item.captions?.length > 0 && (
            <>
              <Typography>{/* Description */}</Typography>
              <ul>
                {item.captions.map((caption, i) => (
                  <Typography key={i} variant="body2">
                    <div
                      onMouseEnter={() => setIsShownDescribe(true)}
                      onMouseLeave={() => setIsShownDescribe(false)}
                      className="DescriptionModal"
                    >
                      {caption.text}

                      {ShownDescribe && (
                        <Chip
                          key={caption.confidence}
                          label={`${caption.confidence.toFixed(2)}`}
                          sx={{
                            m: 0.5,
                            fontSize: "small",
                            backgroundColor: "#a5a5a5",
                            color: "white",
                          }}
                        />
                      )}
                    </div>
                  </Typography>
                ))}
              </ul>
            </>
          )}
          <Typography sx={subtitle}>Tags</Typography>
          <Stack
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            spacing={0}
            direction="row"
            sx={{ flexWrap: "wrap" }}
          >
            {item.tags.map((tag) => (
              <>
                <Chip
                  key={tag.name}
                  label={`${tag.name}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />

                {isShown && (
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

          <Typography sx={subtitle}>
            Accent Color
            <Tooltip title={`#${item.accentColor}`}>
              <div
                style={{
                  display: "flex",
                  height: "100px",
                  width: "200px",
                  backgroundColor: "#" + item.accentColor,
                  marginTop: "2%",
                }}
              ></div>
            </Tooltip>
          </Typography>


          <Typography sx={subtitle}>Apparence</Typography>
          {item.facesAttributes?.length > 0 &&
            item.facesAttributes.map((facesAttribute, i) => (
              
              <>
              <Typography key={i} variant="body2">
                <Chip
                  key={facesAttribute.gender}
                  label={`${facesAttribute.gender.toString()}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  key={facesAttribute.age}
                  label={`${facesAttribute.age.toString()}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />

                <Chip
                  
                  key={facesAttribute.smile}
                  label={`Smile : ${(facesAttribute.smile.toFixed(2))}/1`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
              </Typography>

              <Typography key={i} variant="body2">
                <Chip
                  key={facesAttribute.glasses}
                  label={`${facesAttribute.glasses.toString()}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />

                <Chip
                  key={facesAttribute.facialHair.beard}
                  label={`Beard : ${facesAttribute.facialHair.beard} /1`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                <Chip
                  key={facesAttribute.facialHair.moustache}
                  label={`Moustache : ${facesAttribute.facialHair.moustache}/1`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />               
                <Chip
                  key={facesAttribute.facialHair.sideburns}
                  label={`Sideburns : ${facesAttribute.facialHair.sideburns}/1`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                /> 
              </Typography>
              </>
          ))}

          <Typography sx={subtitle}>Objects</Typography>
          {item.objects?.length > 0 &&
            item.objects.map((object, i) => (
              <Typography key={i} variant="body2">
                <Chip
                  onMouseEnter={() => setIsShownObject(true)}
                  onMouseLeave={() => setIsShownObject(false)}
                  key={object.name}
                  label={`${object.name}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                {ShownObject && (
                  <Chip
                    key={object.confidence}
                    label={`${object.confidence.toFixed(2)}`}
                    sx={{
                      m: 0.5,
                      fontSize: "small",
                      backgroundColor: "#a5a5a5",
                      color: "white",
                    }}
                  />
                )}
              </Typography>
            ))}

          <Typography sx={subtitle}>
            Adult Content
            <div
              style={{
                display: "flex",
                marginTop: "2%",
                fontSize: "large",
                color: "black",
              }}
            >
              {" "}
              {item.isAdult.toString()}
            </div>
          </Typography>

          <Typography sx={subtitle}>Ocr</Typography>
          <OcrBlock ocr={item.ocr} />

         

        <Typography sx={subtitle}>Key phrase</Typography>
              <Typography variant="body2">
              {item.ocr.keyPhrases.map((keyPhrase) => (
               <Chip
                  key={keyPhrase}
                  label={`${keyPhrase}`}
                  sx={{
                    m: 0.5,
                    fontSize: "small",
                  }}
                />
                ))}
              </Typography>


              <FilterCategory entities={item.ocr.entities} />

          <Button variant="contained" color="error" onClick={onDelete} sx={buttonstyle}>
            <DeleteForeverIcon />
          </Button>
        </div>
      </Box>
    </Modal>
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
  console.log(state)
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




function FilterCategory ({ entities }: { entities: Entity[] }) {
  let cats: Record<string, Set<string>> = {
  };
 
  for(var en of entities){
      if (!cats.hasOwnProperty(en.category)) {
        cats[en.category] = new Set([en.name])
        // cats = {[en.category]:[en.name], ...cats}
      }
      else{
        cats[en.category].add(en.name)
      }
    }
    console.log(cats)
    
    return(
      <>
      <Typography sx={subtitle}>Categories</Typography>
      {Object.entries(cats).map(([categorieName,valueName]) => (
        <div key={categorieName}>
        <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto',backgroundColor:"white"}}
        >
          <TreeItem className="changecolor" nodeId="1" label={categorieName}>
          {[...valueName].map((v, i) => <TreeItem key={i} nodeId="2" label={v} />)}
          </TreeItem>
        </TreeView>
        </div>
      ))}
    </>
    )
}