import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

// Initial state of each part of the app
const initialState = {
  // chat: false,
  // cart: false,
  // userProfile: false,
  // notification: false,
}

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined)
  const [currentColor, setCurrentColor] = useState('#03C9D7')
  const [currentMode, setCurrentMode] = useState('Light')
  const [themeSettings, setThemeSettings] = useState(false)
  const [activeMenu, setActiveMenu] = useState(true)
  const [isClicked, setIsClicked] = useState(initialState)

  // Transform the event to the value of the mode
  const setMode = (e) => {
    setCurrentMode(e.target.value)
    localStorage.setItem('themeMode', e.target.value)

    // when change the mode, the Setting menu will be closed
    setThemeSettings(false)
  }

  const setColor = (color) => {
    setCurrentColor(color)
    localStorage.setItem('colorMode', color)

    // when change the mode, the Setting menu will be closed
    setThemeSettings(false)
  }

  // To handle the click, only set clicked to true
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true })

  return (
    // the varialbespass hear will pass to all the components
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor,
      currentMode,
      activeMenu,
      screenSize,
      setScreenSize,
      handleClick,
      isClicked,
      initialState,
      setIsClicked,
      setActiveMenu,
      setCurrentColor,
      setCurrentMode,
      setMode,
      setColor,
      themeSettings,
      setThemeSettings }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
