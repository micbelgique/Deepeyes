import Caption from "./Caption"

export default interface ScanVisionResult {
  id: string
  image: string
  captions: Caption[]
  tags: string[]
}
