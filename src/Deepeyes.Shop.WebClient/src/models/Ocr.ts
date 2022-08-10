import Entity from "./Entities"
import Summary from "./Summary"

export default interface Ocr {
  state: string
  lines: string[]
  summary: string
  entities: Entity[]
  keyPhrases: string[]
  summaries: Summary[]
}
