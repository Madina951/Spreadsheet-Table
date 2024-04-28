import { Existance } from "./tableRow.model";

export type Search = {
    search: {
        field: string;
        search: string | Existance;
    }[];
}