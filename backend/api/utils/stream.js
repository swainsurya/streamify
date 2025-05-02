import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecrete = process.env.STREAM_API_SECRETE;

if(!apiKey || !apiSecrete) {
    console.log("Stream api key or secrete is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecrete);

export const upsertStreamUser = async(userdata) => {
    try {
        await streamClient.upsertUsers([userdata]);
        return userdata;
    } catch (error) {
        console.log("Error creating stream user");
    }
}

export const generateStreamToken = async(userID) => {
    
}