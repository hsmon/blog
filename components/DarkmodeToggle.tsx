import React from "react"
import {
  changeToDarkmode,
  changeToLightmode,
  changeDarkmodeTheme,
  hasDarkmodeTheme,
} from "../functions/changeDarkMode"

type ChangeStatus = {
  (bool: boolean): void
}

const DarkmodeToggle = () => {
  const [isDarkmode, setDarkmode] = React.useState<boolean>(hasDarkmodeTheme)

  const toggleChange = React.useCallback(() => {
    setDarkmode(!isDarkmode)
    changeStatus(isDarkmode)
  }, [isDarkmode])

  const changeStatus: ChangeStatus = (bool) => {
    if (bool) {
      changeToLightmode()
    } else {
      changeToDarkmode()
    }
    changeDarkmodeTheme()
  }

  return (
    <button
      className="w-6 h-6 rounded-full toggle"
      onClick={toggleChange}
    >
      <span role="img" aria-label="電球" className="text-sm inline-block" style={{width:"1em"}}>
        💡
      </span>
    </button>
  )
}

export default DarkmodeToggle
