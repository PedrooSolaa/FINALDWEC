import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      {/* Header */}
      <header className="mainlayout__header bg-black bg-opacity-90 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="mainlayout__logo">
              <h1 className="text-3xl font-bold text-primary">
                🎬 MovieFlix
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="mainlayout__nav flex items-center gap-6">
              <Link
                to="/"
                className="text-white hover:text-primary transition-colors font-semibold"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-white hover:text-primary transition-colors font-semibold"
              >
                Búsqueda
              </Link>
              <Link
                to="/#favoritos"
                className="text-white hover:text-primary transition-colors font-semibold"
              >
                Favoritos
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mainlayout__main flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="mainlayout__footer mt-12">
        <div className="bg-black border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 text-center justify-items-center">
              <div>
                <h3 className="text-primary font-bold text-xl mb-4">MovieFlix</h3>
                <p className="text-gray-400">
                  Tu sala privada para descubrir, filtrar y guardar tus peliculas favoritas.
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  Proyeccion en 4K • Audio 5.1 • Sin anuncios
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Cartelera</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/search" className="hover:text-primary transition-colors">
                      Busqueda
                    </Link>
                  </li>
                  <li>
                    <Link to="/#favoritos" className="hover:text-primary transition-colors">
                      Favoritos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 flex flex-col items-center justify-center gap-3 text-gray-400 text-sm text-center">
              <p>&copy; 2026 MovieFlix. Todos los derechos reservados.</p>
              <p className="text-gray-500">Vive la experiencia de cine en casa</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
