import Caption from "./Caption"
import Face from "./Face"
import Object from "./Object"
import Ocr from "./Ocr"
import Tag from "./Tag"

export default interface ScanVisionResult {
  id: string
  image: string
  captions: Caption[]
  tags: Tag[]
  isAdult: boolean
  dominantColors: string[]
  accentColor: string
  faces: Face[]
  objects: Object[]
  ocr: Ocr
}
