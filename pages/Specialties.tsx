import React from 'react';
import { useContent } from '../context/ContentContext';
import * as LucideIcons from 'lucide-react';
import { Sparkles } from 'lucide-react';

const Specialties = () => {
  const { content } = useContent();

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Nossas Especialidades</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Métodos comprovados e atendimento personalizado para cada necessidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.specialties.main.map((service) => {
          // Dynamic icon rendering
          // @ts-ignore
          const IconComponent = LucideIcons[service.iconName] || LucideIcons.HelpCircle;

          return (
            <div key={service.id} className="bg-white rounded-2xl p-8 shadow-md border-l-8 border-indigo-500 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-indigo-50 p-4 rounded-full text-indigo-600 shrink-0">
                <IconComponent size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consolidated Extras */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/3 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="text-yellow-300" />
                    Equipe Multidisciplinar
                </h3>
                <p className="text-indigo-100">
                    Além do reforço escolar, oferecemos suporte completo para o desenvolvimento integral do aluno.
                </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end flex-1">
                {content.specialties.extra.map((extra, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-bold border border-white/30 text-white">
                        {extra}
                    </span>
                ))}
            </div>
        </div>
      </div>

      <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 text-center shadow-lg border border-indigo-100">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Metodologia Exclusiva</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-indigo-600 mb-2">Diagnóstico</h4>
                <p className="text-gray-600 text-sm">Identificamos as lacunas de aprendizado através de uma avaliação inicial detalhada.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-indigo-600 mb-2">Plano de Ação</h4>
                <p className="text-gray-600 text-sm">Criamos um roteiro de estudos personalizado focado nas necessidades do aluno.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-indigo-600 mb-2">Acompanhamento</h4>
                <p className="text-gray-600 text-sm">Feedback constante para os pais e ajustes na rota de ensino conforme a evolução.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Specialties;
