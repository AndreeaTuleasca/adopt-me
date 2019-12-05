export default function location(state = "Seattle, WA", action: any) {
  if (action.type === "CHANGE_LOCATION") {
    return action.payload;
  }
  return state;
}
