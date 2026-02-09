import { Link } from 'react-router-dom'
import Button from '@components/atoms/Button'

export default function NotFoundPage() {
  return (
    <div className="notfoundpage--container flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Página No Encontrada
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="space-y-3">
          <p className="text-gray-500">
            Aquí hay algunas cosas que puedes hacer:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg">
                Volver al Home
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" size="lg">
                Ir a Búsqueda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
