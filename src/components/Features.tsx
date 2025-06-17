
import { PlusCircle, BarChart3, Target, FileDown, Shield, Smartphone } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: PlusCircle,
      title: 'Renda Variável',
      description: 'Especialmente pensado para autônomos! Adicione suas receitas de forma rápida e organize sua renda variável com facilidade.',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      delay: '0.1s'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Visuais',
      description: 'Gráficos interativos e dashboards intuitivos que mostram exatamente onde seu dinheiro está sendo usado.',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      delay: '0.2s'
    },
    {
      icon: Target,
      title: 'Orçamentos Inteligentes',
      description: 'Defina metas por categoria e receba alertas visuais quando estiver próximo dos limites.',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
      delay: '0.3s'
    },
    {
      icon: FileDown,
      title: 'Exportação Completa',
      description: 'Exporte seus dados para CSV ou gere relatórios em PDF profissionais para acompanhamento.',
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
      delay: '0.4s'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Suas informações ficam seguras com criptografia moderna e backup automático na nuvem.',
      gradient: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      delay: '0.5s'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Interface responsiva que funciona perfeitamente em qualquer dispositivo, onde quer que você esteja.',
      gradient: 'bg-gradient-to-br from-teal-500 to-green-600',
      delay: '0.6s'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Funcionalidades que{' '}
            <span className="nami-gradient-text">Transformam</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Tudo que você precisa para ter controle total das suas finanças pessoais, 
            com a simplicidade que você merece.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
