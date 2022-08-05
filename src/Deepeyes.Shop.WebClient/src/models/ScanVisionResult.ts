import Caption from "./Caption"
import Face from "./Face"
import Object from "./Object"

export default interface ScanVisionResult {
  id: string
  image: string
  captions: Caption[]
  tags: string[]
  isAdult: boolean
  dominantColors : string[]
  accentColors : string[]
  faces:Face[]
  objects:Object[]
}
