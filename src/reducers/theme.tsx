export default function theme(state = "darkblue", action: any) {
  if (action.type === "CHANGE_THEME") {
    return action.payload;
  }
  return state;
}
