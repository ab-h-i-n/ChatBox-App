
export const log = (message: any) => {
    if (process.env.EXPO_PUBLIC_DEBUG === "TRUE") {
        console.log(message);
    }
}