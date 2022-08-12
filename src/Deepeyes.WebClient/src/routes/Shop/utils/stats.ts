import ScanVisionResult from "../models/ScanVisionResult"

function nbObjects(items: ScanVisionResult[]) {
  return items.reduce((acc, item) => acc + item.objects.length, 0)
}

function genderRatio(items: ScanVisionResult[]) {
  const MALE = "Male"
  const FEMALE = "Female"

  let nbMales = 0
  let nbFemales = 0
  let nbOthers = 0

  for (const { facesAttributes } of items) {
    for (const { gender } of facesAttributes) {
      switch (gender) {
        case MALE:
          nbMales++
          break
        case FEMALE:
          nbFemales++
          break
        default:
          nbOthers++
      }
    }
  }

  return { nbMales, nbFemales, nbOthers }
}

function meanAge(items: ScanVisionResult[]) {
  let nbFaces = 0
  let sumAge = 0
  for (const { facesAttributes } of items) {
    nbFaces += facesAttributes.length
    for (const { age } of facesAttributes) {
      sumAge += age
    }
  }
  return sumAge / nbFaces
}

export { nbObjects, genderRatio, meanAge }
