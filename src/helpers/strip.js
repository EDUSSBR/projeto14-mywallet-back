import { stripHtml } from "string-strip-html"

export function strip(...strings){
    const strippedArr = []
    for (let str of strings){
        strippedArr.push(stripHtml(str).result)
    }
    return strippedArr
}