import { DEBUG } from "@/env";

export const log = (message: any) => {
    if (DEBUG === "TRUE") {
        console.log(message);
    }
}