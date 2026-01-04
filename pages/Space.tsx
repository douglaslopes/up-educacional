import React from 'react';
import { useContent } from '../context/ContentContext';

const Space = () => {
  const { content } = useContent();

  return (
    <div className="space-y-12 animate-fade-in p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Nosso Espaço e Didática</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Um ambiente preparado para estimular a criatividade, o foco e o conforto.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.space.gallery.map((item, index) => (
           <div key={item.id} className={`group relative overflow-hidden rounded-2xl h-64 shadow-md ${index === 1 || index === 2 ? 'lg:col-span-2' : ''}`}>
               <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                   <span className="text-white font-bold text-lg flex items-center gap-2">{item.caption}</span>
               </div>
           </div>
        ))}
      </div>

      {/* Didactics Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Como ensinamos</h2>
        <div className="space-y-6">
            {content.space.didactics.map((didactic, index) => (
                <div key={didactic.id} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${
                        index === 0 ? 'bg-green-100 text-green-600' : 
                        index === 1 ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                    }`}>
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{didactic.title}</h3>
                        <p className="text-gray-600">{didactic.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Space;
