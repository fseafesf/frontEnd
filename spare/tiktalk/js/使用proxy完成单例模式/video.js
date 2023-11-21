import { single } from "./single"
class Video {
    constructor() {
        console.log("video created")
    }
}
const video = single(Video)
export { video }