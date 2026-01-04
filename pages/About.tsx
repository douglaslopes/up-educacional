import React from 'react';
import { useContent } from '../context/ContentContext';

const About = () => {
  const { content, teachers } = useContent();

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Quem Somos</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {content.about.leadText}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-64 overflow-hidden relative group">
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">{teacher.role}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{teacher.name}</h3>
              <div className="h-1 w-12 bg-indigo-500 rounded mb-3"></div>
              <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide mb-2">{teacher.role}</p>
              <p className="text-gray-500 text-sm">{teacher.specialty}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 rounded-3xl p-8 mt-12 border border-yellow-100">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4">A liderança de Elaine Cristina</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {content.about.elaineText}
                </div>
            </div>
            <div className="w-full md:w-1/3">
                 <img src={content.about.elaineImage} alt="Elaine Cristina" className="rounded-xl shadow-md w-full" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
