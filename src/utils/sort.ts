import { SortOrder } from "./types/sort.type";

interface SortResult {
    [key: string]: 1 | -1
}
export default (sortBy: string, order: SortOrder): SortResult => {
    return {
        [sortBy]: order === "asc" ? 1 : -1
    }
}