import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@layout/MainLayout'
import HomePage from '@pages/HomePage'
import SearchPage from '@pages/SearchPage'
import MovieDetailPage from '@pages/MovieDetailPage'
import NotFoundPage from '@pages/NotFoundPage'
import { moviesLoader, movieDetailLoader } from './loaders'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: moviesLoader,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/movies/:id',
        element: <MovieDetailPage />,
        loader: movieDetailLoader,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
