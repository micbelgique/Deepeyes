import Accessory from "./Accessory"
import Emotion from "./Emotion"
import FacialHair from "./FacialHair"
import Makeup from "./Makeup"

export default interface FaceAttributes {
  age: number
  emotion: Emotion
  gender: string
  glasses: string
  facialHair: FacialHair
  accessories: Accessory[]
  smile: number
  makeup: Makeup
}
