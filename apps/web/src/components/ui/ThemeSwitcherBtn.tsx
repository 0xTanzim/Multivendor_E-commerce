"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcherBtn = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  
  return (
    <button
    className='w-fit p-1 rounded-md hover:scale-110 active:scale-100 transform transition duration-200 dark:text-emerald-500 text-emerald-500'
    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >

      {
        theme === 'light' ? <Moon />  : <Sun />
      }

    </button>
  )
}

export default ThemeSwitcherBtn