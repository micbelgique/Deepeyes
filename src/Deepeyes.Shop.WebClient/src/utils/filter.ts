import Tag from "../models/Tag"

const UNWANTED_TAGS = ["indoor", "outdoor", "wall", "floor", "ceil"]

const filteredTags = (tags: Tag[]) => {
  return tags.filter((tag) => !UNWANTED_TAGS.includes(tag.name))
}

export { filteredTags }
