import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Navbar, Footer, Sidebar, ThemeSettings } from './components'
import { Stacked, Pyramid, Line, Area, Bar, Pie, Financial, ColorMapping } from './pages'
import './App.css'

import { useStateContext } from './contexts/ContextProvider'

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext()

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>

      {/* Seting button at lower left corner */}
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>

          {/* Seting button */}
          <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
            <TooltipComponent
              content='Settings'
              position='Top'
            >
              {/* Seting button's CSS setting */}
              <button
                type='button'
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className='text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray'
              >
                {/* Seting button's Logo */}
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>

          {/* Sidebar */}
          {activeMenu ? (
            // Sidebar's CSS setting when it's active
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white '>
              <Sidebar />
            </div>
          ) : (
            // Sidebar's CSS setting when it's not active
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <div
            // Main Content's CSS setting
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >

            {/* Navbar and it CSS setting */}
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
              <Navbar />
            </div>

            <div>
              {/* Theme Settings
                Only show it when it true */}
              {themeSettings && (<ThemeSettings />)}

              {/* Main Content's Routes */}
              <Routes>

                {/* charts  */}
                <Route path='/line' element={<Line />} />
                <Route path='/area' element={<Area />} />
                <Route path='/bar' element={<Bar />} />
                <Route path='/pie' element={<Pie />} />
                <Route path='/financial' element={<Financial />} />
                <Route path='/color-mapping' element={<ColorMapping />} />
                <Route path='/pyramid' element={<Pyramid />} />
                <Route path='/stacked' element={<Stacked />} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
