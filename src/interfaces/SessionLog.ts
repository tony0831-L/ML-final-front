import { ChatCompletionRequestMessage } from "./ChatCompletionRequestMessage";

export interface SessionLog{
    charater:string,
    conversation?:Array<ChatCompletionRequestMessage>,
}