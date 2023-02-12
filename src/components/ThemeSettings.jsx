import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { BsCheck } from 'react-icons/bs'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { themeColors } from '../asset/ThemeAsset'
import { useStateContext } from '../contexts/ContextProvider'

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } = useStateContext()

  return (

    <div className='bg-half-transparent w-screen fixed nav-item top-0 right-0'>
      {/* Seting bar */}
      <div className='float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400'>

        {/* Seting bar's head */}
        <div className='flex justify-between items-center p-4 ml-4'>

          {/* Title */}
          <p className='font-semibold text-xl'>
            Settings
          </p>

          {/* Close button */}
          <button
            type='button'
            onClick={() => setThemeSettings(false)}
            style={{ color: 'rgb(153,171,180)', borderRadius: '50%' }}
            className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'
          >

            {/* Close button's Logo */}
            <MdOutlineCancel />

          </button>
        </div>

        {/* Theme Option part */}
        <div className='flex-col border-t-1 border-color p-4 ml-4'>

          {/* Theme Option title */}
          <p className='font-semibold text-xl '>
            Theme Option
          </p>

          {/* Light theme option */}
          <div className='mt-4'>
            <input
              type='radio'
              id='light'
              name='theme'
              value='Light'
              className='cursor-pointer'
              onChange={setMode}
              checked={currentMode === 'Light'}
            />

            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor='light' className='ml-2 text-md cursor-pointer'>
              Light
            </label>
          </div>

          {/* Dark theme option */}
          <div className='mt-2'>
            <input
              type='radio'
              id='dark'
              name='theme'
              value='Dark'
              onChange={setMode}
              className='cursor-pointer'
              checked={currentMode === 'Dark'}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor='dark' className='ml-2 text-md cursor-pointer'>
              Dark
            </label>
          </div>
        </div>

        {/* Color Option part */}
        <div className='flex-col border-t-1 border-color p-4 ml-4'>

          {/* Color Option title */}
          <p className='font-semibold text-xl '>
            Color Option
          </p>

          {/* Color Option */}
          <div className='flex gap-3'>
            {themeColors.map((item, index) => (

              <TooltipComponent key={index} content={item.name} position='TopCenter'>

                <div className='relative mt-2 cursor-pointer flex gap-5 items-center'>
                  <button
                    type='button'
                    className='h-10 w-10 rounded-full cursor-pointer'
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    {/* Check the current color, the current color is marked */}
                    <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                  </button>
                </div>

              </TooltipComponent>

            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default ThemeSettings
