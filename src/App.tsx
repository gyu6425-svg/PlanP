import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { RouteFallback } from './components/layout/RouteFallback'
import { routes } from './lib/routes'

const HomePage = lazy(() => import('./pages/HomePage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const SurveyPage = lazy(() => import('./pages/SurveyPage'))
const SurveyResultPage = lazy(() => import('./pages/SurveyResultPage'))
const FoodDetailPage = lazy(() => import('./pages/FoodDetailPage'))
const StayDetailPage = lazy(() => import('./pages/StayDetailPage'))
const TourDetailPage = lazy(() => import('./pages/TourDetailPage'))

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="survey" element={<Navigate to={routes.survey('tokyo')} replace />} />
          <Route path="survey/result" element={<Navigate to={routes.surveyResult('tokyo')} replace />} />
          <Route path="food/:placeId" element={<Navigate to={routes.surveyResult('tokyo')} replace />} />
          <Route path=":city/survey" element={<SurveyPage />} />
          <Route path=":city/survey/result" element={<SurveyResultPage />} />
          <Route path=":city/food/:category/:placeSlug" element={<FoodDetailPage />} />
          <Route path=":city/stay/:category/:placeSlug" element={<StayDetailPage />} />
          <Route path=":city/tour/:category/:placeSlug" element={<TourDetailPage />} />
          <Route path="*" element={<Navigate to={routes.home()} replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
