import React from 'react';
import { Star, Heart, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Home = () => {
  const { content } = useContent();
  const whatsappLink = `https://wa.me/${content.contact.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white rounded-3xl overflow-hidden shadow-xl mx-4 mt-4 lg:mx-0">
        <div className="absolute inset-0 opacity-20">
             <img src="https://picsum.photos/seed/schoolkids/1200/600" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative p-8 md:p-16 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Instituto Educacional UP</h1>
          <h2 className="text-xl md:text-2xl font-light mb-8 max-w-2xl">
            Descomplicando a aprendizagem com amor, técnica e dedicação. O futuro do seu filho começa aqui.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/agendamento" className="bg-yellow-400 text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <CheckCircle size={20} />
              Agendar Triagem
            </Link>
            <Link to="/especialidades" className="bg-white/20 backdrop-blur-sm border border-white/40 px-8 py-3 rounded-full font-bold hover:bg-white/30 transition flex items-center justify-center">
              Conhecer Especialidades
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-blue-500 text-center transform hover:-translate-y-1 transition">
          <div className="bg-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-blue-600 mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{content.home.stats.students}</h3>
          <p className="text-gray-500 font-medium">Alunos Atendidos</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-pink-500 text-center transform hover:-translate-y-1 transition">
          <div className="bg-pink-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-pink-600 mb-4">
            <Heart size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{content.home.stats.satisfaction}</h3>
          <p className="text-gray-500 font-medium">Satisfação dos Pais</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-green-500 text-center transform hover:-translate-y-1 transition">
          <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-green-600 mb-4">
            <Star size={24} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{content.home.stats.reference}</h3>
          <p className="text-gray-500 font-medium">Referência na Região</p>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="px-6 md:px-12 py-8 bg-white rounded-3xl shadow-sm mx-4 lg:mx-0">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">{content.home.welcomeTitle}</h2>
        <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto whitespace-pre-wrap">
          {content.home.welcomeText}
        </p>
      </section>

      {/* Testimonials */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">O que dizem os pais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-lg relative">
              <div className="absolute top-4 right-6 text-yellow-400 flex">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic mb-6">"{t.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 mr-3">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Whatsapp */}
      <div className="text-center py-8">
         <p className="text-xl text-gray-600 mb-4">Ficou com dúvidas? Fale conosco agora!</p>
         <a 
           href={whatsappLink}
           target="_blank" 
           rel="noopener noreferrer"
           className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition shadow-lg hover:shadow-xl"
         >
            {content.contact.whatsappLabel}
         </a>
      </div>
    </div>
  );
};

export default Home;
