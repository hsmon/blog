type HasDarkmodeTheme = {
  (): boolean
}
type ChangeToDarkmode = {
  (): void
}
type ChangeToLightmode = {
  (): void
}
type DeleteTheme = {
  (): void
}

export const hasDarkmodeTheme: HasDarkmodeTheme = () => {
  if (typeof window === "undefined") return false
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return true
  } else {
    return false
  }
}

export const changeDarkmodeTheme = () => {
  if (typeof window === "undefined") return false
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.querySelector("html")!.classList.add("dark")
  } else {
    document.querySelector("html")!.classList.remove("dark")
  }
}

export const changeToDarkmode: ChangeToDarkmode = () =>
  (localStorage.theme = "dark")
export const changeToLightmode: ChangeToLightmode = () =>
  (localStorage.theme = "light")
export const deleteTheme: DeleteTheme = () => localStorage.removeItem("theme")
