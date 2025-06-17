
import { Shield, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Sobre o{' '}
              <span className="nami-gradient-text">Nami</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Nascemos da necessidade de criar uma ferramenta financeira{' '}
              <strong>moderna, intuitiva e pensada especialmente para autônomos</strong>{' '}
              que precisam de autonomia total sobre suas finanças.
            </p>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Democratizar o controle financeiro pessoal através de uma plataforma que combina{' '}
                <span className="text-blue-600 font-semibold">simplicidade, segurança e funcionalidade</span>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Acreditamos que todo mundo deveria ter acesso a ferramentas financeiras de qualidade,{' '}
                sem complicações desnecessárias ou custos exorbitantes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="nami-card p-6 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">+10k</h3>
                <p className="text-gray-600 text-sm">Usuários Ativos</p>
              </div>
              <div className="nami-card p-6 text-center">
                <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">98%</h3>
                <p className="text-gray-600 text-sm">Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estes são os princípios que guiam cada decisão e cada linha de código do Nami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="nami-card p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Segurança</h3>
              <p className="text-gray-600">
                Seus dados são protegidos com criptografia de nível bancário e backup automático.
              </p>
            </div>

            <div className="nami-card p-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Simplicidade</h3>
              <p className="text-gray-600">
                Interface intuitiva que qualquer pessoa pode usar, sem necessidade de treinamento.
              </p>
            </div>

            <div className="nami-card p-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparência</h3>
              <p className="text-gray-600">
                Sem taxas ocultas, sem pegadinhas. Tudo que fazemos é claro e transparente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Pronto para Transformar suas Finanças?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram uma forma mais inteligente de gerenciar dinheiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="nami-button-primary">
              <Link to="/register">Criar Conta Gratuita</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/">Voltar ao Início</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
