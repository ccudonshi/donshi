import React from 'react';
import { Text } from 'react-native';
import {unicodeToChar} from '../helper/helper'
export function renderParserText(text){
    // const decodedText = text
    const decodedText = unicodeToChar(text)
    const regexp = /<font\s*color="(.*?)"\s*id="(.*?)"[^>]*>(.*?)<\/font>/g;
    let result;
    let start = 0;
    let list = []
    while ((result = regexp.exec(decodedText)) !== null) {
        list.push(decodedText.slice(start, result.index))
        list.push(result[0])
        start = result.index + result[0].length
    }
    list.push(decodedText.slice(start))
    list = list.filter(value => value !== "")
    return <>{
        list.map((value,idx) => {
            const result = regexp.exec(value)
            if (result == null) return <Text key={value}>{value}</Text>
            const color = result?.[1]
            const id = result?.[2]
            const textValue = (result?.[3] === "undefined")?id:result?.[3]
            return <Text style={{ color }} key={`${id}${idx}`}>{`@${textValue}`}</Text>
        })}
    </>
}
export function parserText(text){
    const decodedText = unicodeToChar(text)
    return decodedText
            .replace(/<font[^>]*>/g,'')
            .replace(/<\/font>/g,'')
}
