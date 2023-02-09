import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SearchActasPage } from '../components/actas/search/SearchActasPage'
import { ResultadosCandidatos } from '../components/ResultadosCandidatos'
import { WebsterConcejalesPage } from '../components/WebsterConcejalesPage'
import { WebsterJuntasPage } from '../components/WebsterJuntasPage'

export const AppRouter = () => {
  return (
    <Routes>

        <Route path="/resultados/candidatos" element={<ResultadosCandidatos />} />
        <Route path="/resultados/candidatos/*" element={<Navigate to="/resultados/candidatos" />} />

        <Route path="/webster/concejales" element={<WebsterConcejalesPage />} />
        <Route path="/webster/concejales/*" element={<Navigate to="/webster/concejales" />} />


        <Route path="/webster/juntas" element={<WebsterJuntasPage />} />
        <Route path="/webster/juntas/*" element={<Navigate to="/webster/juntas" />} />

        <Route path="/actas" element={<SearchActasPage />} />
        <Route path="/actas/*" element={<Navigate to="/actas" />} />


        {/* <Route path="/*" element={<Navigate to="/webster/concejales" />} /> */}


    </Routes>
  )
}
