import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className='fixed -z-1 w-full h-screen'>
        <div className='absolute w-full h-full bg-gradient-to-br from-slate-950 to-zinc-950'></div>
        <div className='relative top-1/8 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-purple-950 to-zinc-950 blur-3xl animate-move-slow'></div>
      </div>
      <main className="relative w-full h-screen dark text-foreground bg-transparent">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)
