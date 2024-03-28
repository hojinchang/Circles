import { useState, useEffect } from 'react'
import { CookiesProvider } from 'react-cookie';

import AppRouter from "./routers/AppRouter";

function App() {

  return (
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>
  )
}

export default App
