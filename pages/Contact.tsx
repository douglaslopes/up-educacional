import React from 'react';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { GOOGLE_MAPS_LINK } from '../constants';

const CuteMap = () => (
  <div className="w-full h-64 md:h-96 bg-[#f8fafc] rounded-2xl border-4 border-dashed border-indigo-300 relative overflow-hidden flex items-center justify-center">
    <div className="absolute top-2 right-2 text-indigo-300 text-xs font-bold">Mapa Ilustrativo</div>
    
    {/* SVG Map representing "Reference Point (Cemetery) -> Path -> School" */}
    <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
        {/* Background */}
        <rect x="0" y="0" width="400" height="200" fill="#f1f5f9" />
        
        {/* Roads */}
        {/* Main Road Horizontal */}
        <rect x="0" y="140" width="400" height="30" fill="#cbd5e1" />
        {/* Vertical Road connecting to school */}
        <rect x="250" y="50" width="30" height="100" fill="#cbd5e1" />
        
        {/* Path highlight */}
        <path d="M 50 155 L 265 155 L 265 80" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="8,4" />

        {/* Cemetery (Reference) - Left side */}
        <g transform="translate(30, 90)">
            <rect x="0" y="20" width="60" height="40" fill="#94a3b8" rx="2" />
            <path d="M 0 20 L 30 0 L 60 20 Z" fill="#64748b" />
            <text x="30" y="75" fontSize="10" textAnchor="middle" fill="#334155" fontFamily="sans-serif" fontWeight="bold">Cemitério</text>
            <text x="30" y="85" fontSize="8" textAnchor="middle" fill="#64748b">(Referência)</text>
             {/* Crosses */}
             <path d="M 15 35 L 15 50 M 10 40 L 20 40" stroke="#cbd5e1" strokeWidth="2" />
             <path d="M 45 35 L 45 50 M 40 40 L 50 40" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* School (Destination) - Top Right */}
        <g transform="translate(240, 10)">
            <rect x="10" y="20" width="50" height="40" fill="#4f46e5" rx="2" />
            <path d="M 5 20 L 35 -5 L 65 20 Z" fill="#facc15" />
            <rect x="25" y="35" width="20" height="25" fill="#fef08a" />
            <text x="80" y="45" fontSize="12" textAnchor="start" fill="#1e1b4b" fontFamily="sans-serif" fontWeight="bold">Instituto UP</text>
            <circle cx="35" cy="10" r="5" fill="#ef4444" opacity="0.8">
               <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
        </g>

        {/* Direction marker */}
        <circle cx="50" cy="155" r="4" fill="#6366f1" />
        <circle cx="265" cy="80" r="4" fill="#6366f1" />
    </svg>
  </div>
);

const Contact = () => {
  const { content } = useContent();
  const whatsappLink = `https://wa.me/${content.contact.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Onde Estamos</h1>
        <p className="text-xl text-gray-600">Venha nos fazer uma visita!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info Column */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-yellow-400">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="text-yellow-500" /> Endereço
            </h3>
            <p className="text-lg text-gray-600 mb-2 whitespace-pre-wrap">{content.contact.address}</p>
            <a 
              href={GOOGLE_MAPS_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline mt-4"
            >
              <Navigation size={16} /> Abrir no Google Maps (GPS)
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-green-500">
             <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Phone className="text-green-500" /> Contato
            </h3>
            <p className="text-lg text-gray-600 mb-4">
                Tem dúvidas? Quer agendar? Chame no WhatsApp!
            </p>
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
              {content.contact.whatsappLabel}
            </a>
          </div>
        </div>

        {/* Map Column */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-700">Trajeto (Cemitério ➔ Escola)</h3>
            <CuteMap />
            
            <h3 className="text-xl font-bold text-indigo-700 mt-8">Google Maps</h3>
            <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center text-gray-500">
                {/* Embed com o endereço correto */}
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Rua%20Albert%20Einstein%2C%20211%20-%20Centro&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Google Maps"
                ></iframe>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
