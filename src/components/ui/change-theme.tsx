"use client"
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'
import { Button } from './button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  function changeTheme(){
  if(theme === "dark"){
    setTheme("light");
  }
  else{
    setTheme("dark")
  }
}

  return ( 
    <span>
      <Button className='border-0' onClick={changeTheme} variant={"link"}>
        {theme === "dark"? <Sun className='size-4'/> : <Moon className='size-4 '/>}
      </Button>
      
    </span>
   );
}
 
