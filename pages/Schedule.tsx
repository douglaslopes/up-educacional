import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Schedule = () => {
  const [loading, setLoading] = useState(false);
  const { content } = useContent();

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    studentName: '',
    studentAge: '',
    school: '',
    difficulties: '',
    hasDiagnosis: 'nao',
    shift: 'manha'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Construct WhatsApp Message
    const text = `*Olá! Gostaria de agendar uma triagem/avaliação.* %0A%0A` +
      `*DADOS DO RESPONSÁVEL* %0A` +
      `👤 Nome: ${formData.parentName} %0A` +
      `📱 Telefone: ${formData.parentPhone} %0A%0A` +
      `*DADOS DO ALUNO* %0A` +
      `🎓 Nome: ${formData.studentName} %0A` +
      `🎂 Idade/Série: ${formData.studentAge} %0A` +
      `🏫 Escola: ${formData.school} %0A%0A` +
      `*DETALHES* %0A` +
      `⚠️ Dificuldades: ${formData.difficulties} %0A` +
      `🏥 Diagnóstico: ${formData.hasDiagnosis === 'nao' ? 'Não possui' : formData.hasDiagnosis === 'sim' ? 'Sim' : 'Em investigação'} %0A` +
      `🌞 Turno preferido: ${formData.shift === 'manha' ? 'Manhã' : 'Tarde'}`;

    // Create WhatsApp Link
    const whatsappNumber = content.contact.whatsappNumber.replace(/\D/g, '');
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    // Open in new tab
    window.open(url, '_blank');
    setLoading(false);
  };

  // Base style for all inputs to ensure readability (High Contrast)
  const inputClass = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-gray-900 placeholder-gray-500";

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Agendamento & Triagem</h1>
        <p className="text-gray-600">
          Preencha o formulário abaixo. Ao clicar em enviar, você será direcionado para o WhatsApp da nossa secretaria com os dados já preenchidos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-t-4 border-indigo-500">
        
        {/* Parent Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Dados do Responsável
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input required name="parentName" value={formData.parentName} onChange={handleChange} type="text" className={inputClass} placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input required name="parentPhone" value={formData.parentPhone} onChange={handleChange} type="tel" className={inputClass} placeholder="(00) 00000-0000" />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Student Info */}
        <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Dados do Aluno
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Criança</label>
              <input required name="studentName" value={formData.studentName} onChange={handleChange} type="text" className={inputClass} placeholder="Nome do aluno" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Idade / Série Escolar</label>
              <input required name="studentAge" value={formData.studentAge} onChange={handleChange} type="text" className={inputClass} placeholder="Ex: 8 anos, 3º ano" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Escola atual</label>
            <input name="school" value={formData.school} onChange={handleChange} type="text" className={inputClass} />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Needs */}
        <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            Objetivo
          </h3>
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principais dificuldades?</label>
                <textarea required name="difficulties" value={formData.difficulties} onChange={handleChange} rows={3} className={inputClass} placeholder="Ex: Dificuldade em matemática, falta de concentração, alfabetização..."></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Possui algum laudo ou diagnóstico?</label>
                <select name="hasDiagnosis" value={formData.hasDiagnosis} onChange={handleChange} className={inputClass}>
                    <option value="nao">Não</option>
                    <option value="sim">Sim (TDAH, TEA, Dislexia...)</option>
                    <option value="investigacao">Em investigação</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Melhor turno para atendimento</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="shift" value="manha" checked={formData.shift === 'manha'} onChange={handleChange} className="text-indigo-600 focus:ring-indigo-500" />
                        Manhã
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="shift" value="tarde" checked={formData.shift === 'tarde'} onChange={handleChange} className="text-indigo-600 focus:ring-indigo-500" />
                        Tarde
                    </label>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-3 text-sm text-yellow-800">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <p>Ao clicar em enviar, você será redirecionado para o WhatsApp para confirmar o envio da mensagem.</p>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Abrindo WhatsApp...' : <><Send size={20} /> Enviar via WhatsApp</>}
        </button>

      </form>
    </div>
  );
};

export default Schedule;
