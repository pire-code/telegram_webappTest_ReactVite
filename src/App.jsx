import './App.css'
import {Route, Routes} from 'react-router'
import { TgOrder } from './pages'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<TgOrder/>} />
        <Route path='/telegram_webappTest_ReactVite' element={<TgOrder/>} />
      </Routes>
    </>
  )
}

export default App
