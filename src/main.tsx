import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className='fixed -z-1 w-full min-h-screen bg-gradient-to-tr from-slate-950 to-zinc-950'></div>
      <main className="relative w-full h-screen dark text-foreground bg-transparent">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)
