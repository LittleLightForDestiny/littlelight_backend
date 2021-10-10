import { ItemNotes } from "src/schemas/item_notes.schema";
import { Tag } from "src/schemas/tag.schema";

export interface ItemNotesResponse {
    notes:ItemNotes[];
    tags:Tag[];
}