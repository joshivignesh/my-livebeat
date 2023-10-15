import { LiveBeatEvent } from "@/types/events";
import { database } from "./appwrite";

export async function getEvents() {
    const { documents } = await database.listDocuments(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID)
    return {
        events: documents.map( document => {
            const event: LiveBeatEvent = {
                $id: document.$id,
                name: document.name,
                location: document.location,
                date: document.date
            }
            return event;
        })
    } 
}

export async function getEventById(eventId: string) {
    const document = await database.getDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, 
                            import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, eventId)
        return document;
}