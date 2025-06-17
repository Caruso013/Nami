
import { Wallet, Github, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold nami-gradient-text">Nami</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              O gerenciador financeiro moderno que coloca você no controle das suas finanças pessoais.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Caruso013" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Produto</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Funcionalidades</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Demonstração</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Preços</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">API</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Suporte</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Central de Ajuda</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Documentação</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contato</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            © 2024 Nami. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-center md:text-right flex items-center mt-4 md:mt-0">
            Feito com <Heart className="w-4 h-4 text-red-500 mx-2" /> para sua independência financeira
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
