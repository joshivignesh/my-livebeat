import { LiveBeatEvent } from "@/types/events";
import { database } from "./appwrite";
import { Models, ID } from "appwrite";

export async function getEvents() {
    const { documents } = await database.listDocuments(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID)
    return {
        events: documents.map( mapDocumentToEvent)
    } 
}

export async function getEventById(eventId: string) {
    const document = await database.getDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, 
                            import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, eventId)
                        
                            return { events: mapDocumentToEvent(document)};
}

export async function createEvent(event: Omit<LiveBeatEvent, '$id'>) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID, 
                            import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID, ID.unique(), event)
                        
                            return { events: mapDocumentToEvent(document)};
}

function mapDocumentToEvent(document: Models.Document) {
    const event: LiveBeatEvent = {
        $id: document.$id,
        name: document.name,
        location: document.location,
        date: document.date
    }
    return event;
}