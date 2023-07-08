import { RootState } from ".."

export const saveStateToLocalStorage = (state: RootState) => {
  try {
      const stateString = JSON.stringify(state)
  localStorage.setItem('persistantState', stateString)

  } catch (error) {
      console.warn(error)
  }
}


export const loadStateFromLocalStorage = () => {
try {
  const serialisedState = localStorage.getItem("persistantState");
  if (serialisedState === null) return undefined;
  return JSON.parse(serialisedState);
} catch (e) {
  console.warn(e);
  return undefined;
}
}