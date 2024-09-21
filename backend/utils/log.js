export default function log(message) {
  if (process.env.DEBUG === "true") console.log(message);
}
