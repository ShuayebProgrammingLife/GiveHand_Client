
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type PasswordInputProps = {
  id: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
};



const PasswordInput = ({
  id,
  name,
  placeholder = "Enter your password",
  autoComplete,
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div className='relative'>
      <Input 
        id = {id}
        name = {name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className='pr-10'
      />

      <button
        type='button'
        onClick={() =>{
          setVisible((v) => !v)
        }}
        aria-label={visible ? "Hide password" : "Show password"}

        className='absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground'
      >
        {visible ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4'/>}
      </button>
    </div>
  );
};

export default PasswordInput;