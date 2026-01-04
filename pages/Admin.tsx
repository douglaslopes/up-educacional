import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Teacher, Student, AdminConfig } from '../types';
import { Lock, LogOut, Plus, Trash2, Save, X, ArrowLeft, Layout, Users, Calendar, DollarSign, Clock, FileText, Activity, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminConfig, isLoading } = useContent();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (password === adminConfig.password) {
      onLogin();
    } else {
      setError('Senha incorreta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Área Restrita</h2>
          <p className="text-gray-500">Acesso exclusivo para gestão.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Acesso</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
              placeholder="Digite a senha"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition" disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center justify-center gap-1"><ArrowLeft size={14}/> Voltar ao Site</Link>
        </div>
      </div>
    </div>
  );
};

// Componente de Configurações Extraído para evitar crash
const SettingsTab = ({ adminConfig, updateAdminConfig }: { adminConfig: AdminConfig, updateAdminConfig: (c: AdminConfig) => void }) => {
    const [newPassword, setNewPassword] = useState(adminConfig.password);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSavePassword = () => {
        updateAdminConfig({ ...adminConfig, password: newPassword });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <Lock size={18} /> Segurança
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Alterar Senha do Admin</label>
                        <input 
                            type="text" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <p className="text-xs text-gray-500 mt-2">Esta senha é usada para acessar este painel. Escolha algo seguro.</p>
                    </div>
                    <button 
                        onClick={handleSavePassword}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition w-full md:w-auto"
                    >
                        Atualizar Senha
                    </button>
                    {showSuccess && (
                        <div className="p-3 bg-green-100 text-green-800 rounded-lg text-sm text-center font-bold animate-pulse">
                            Senha atualizada com sucesso!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const { 
    content, updateContent, 
    teachers, updateTeachers, 
    students, updateStudents, 
    schedule, updateSchedule,
    adminConfig, updateAdminConfig
  } = useContent();

  const handleLogout = () => setIsLoggedIn(false);

  // --- Helper Functions for Content Updates ---
  const updateNestedContent = (section: string, field: string, value: any) => {
    updateContent({
      ...content,
      [section]: {
        // @ts-ignore
        ...content[section],
        [field]: value
      }
    });
  };

  // Shared Styles
  const inputStyle = "w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500";
  const smallInputStyle = "p-2 border rounded text-sm bg-white text-gray-900 placeholder-gray-400";
  const labelStyle = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  // --- Render Functions ---

  const renderHomeEditor = () => (
    <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-xl border">
             <h3 className="font-bold text-gray-700 mb-4">Identidade Visual</h3>
             <div>
                <ImageUpload 
                    label="Logotipo da Escola"
                    currentImage={content.home.logoUrl}
                    onUpload={(url) => updateNestedContent('home', 'logoUrl', url)}
                />
            </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="font-bold text-gray-700 mb-4">Texto de Boas-vindas</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Título</label>
                    <input 
                        type="text" 
                        value={content.home.welcomeTitle}
                        onChange={(e) => updateNestedContent('home', 'welcomeTitle', e.target.value)}
                        className={inputStyle}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Texto Principal</label>
                    <textarea 
                        rows={4}
                        value={content.home.welcomeText}
                        onChange={(e) => updateNestedContent('home', 'welcomeText', e.target.value)}
                        className={inputStyle}
                    />
                </div>
            </div>
        </div>
    </div>
  );

  const renderAboutEditor = () => (
      <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border">
              <label className="block text-sm font-bold text-gray-700 mb-2">Texto de Destaque (Topo)</label>
              <textarea 
                  rows={2}
                  value={content.about.leadText}
                  onChange={(e) => updateNestedContent('about', 'leadText', e.target.value)}
                  className={inputStyle}
              />
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border">
              <h3 className="font-bold text-gray-700 mb-4">Liderança (Elaine)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Texto Sobre Elaine</label>
                      <textarea 
                          rows={8}
                          value={content.about.elaineText}
                          onChange={(e) => updateNestedContent('about', 'elaineText', e.target.value)}
                          className={inputStyle}
                      />
                  </div>
                  <div>
                      <ImageUpload 
                        label="Foto da Elaine"
                        currentImage={content.about.elaineImage}
                        onUpload={(url) => updateNestedContent('about', 'elaineImage', url)}
                      />
                  </div>
              </div>
          </div>
          
          {/* Teachers Section */}
          <div className="bg-gray-50 p-6 rounded-xl border">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700">Equipe de Professores</h3>
                  <button onClick={() => updateTeachers([...teachers, {id: Date.now().toString(), name: 'Novo', role: 'Professor', specialty: '', image: ''}])} className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Adicionar</button>
              </div>
              <div className="space-y-4">
                  {teachers.map((t, idx) => (
                      <div key={t.id} className="flex flex-col md:flex-row gap-4 items-start border-b pb-4">
                           {/* Corrigido: Removido w-20 para dar espaço ao botão */}
                           <div className="w-full md:w-32 shrink-0">
                                <ImageUpload 
                                    label="Foto"
                                    currentImage={t.image}
                                    onUpload={(url) => {
                                        const nt = [...teachers]; nt[idx].image = url; updateTeachers(nt);
                                    }}
                                    className="!space-y-0"
                                />
                           </div>
                          
                          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input type="text" value={t.name} onChange={(e) => {
                                  const nt = [...teachers]; nt[idx].name = e.target.value; updateTeachers(nt);
                              }} className="p-2 border rounded text-sm bg-white text-gray-900 w-full" placeholder="Nome" />
                               <input type="text" value={t.role} onChange={(e) => {
                                  const nt = [...teachers]; nt[idx].role = e.target.value; updateTeachers(nt);
                              }} className="p-2 border rounded text-sm bg-white text-gray-900 w-full" placeholder="Cargo" />
                               <input type="text" value={t.specialty} onChange={(e) => {
                                  const nt = [...teachers]; nt[idx].specialty = e.target.value; updateTeachers(nt);
                              }} className="p-2 border rounded text-sm md:col-span-2 bg-white text-gray-900 w-full" placeholder="Especialidade" />
                          </div>
                          <button onClick={() => updateTeachers(teachers.filter(x => x.id !== t.id))} className="text-red-500 self-end md:self-center"><Trash2 size={16} /></button>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderSpecialtiesEditor = () => (
    <div className="space-y-6">
         <div className="bg-gray-50 p-6 rounded-xl border">
             <h3 className="font-bold text-gray-700 mb-4">Serviços Principais</h3>
             {content.specialties.main.map((s, idx) => (
                 <div key={s.id} className="mb-4 border-b pb-4">
                     <input 
                        type="text" value={s.title}
                        onChange={(e) => {
                            const nm = [...content.specialties.main]; nm[idx].title = e.target.value;
                            updateNestedContent('specialties', 'main', nm);
                        }}
                        className="font-bold p-1 border rounded w-full mb-1 bg-white text-gray-900"
                     />
                     <textarea 
                        value={s.description}
                        onChange={(e) => {
                            const nm = [...content.specialties.main]; nm[idx].description = e.target.value;
                            updateNestedContent('specialties', 'main', nm);
                        }}
                        className={smallInputStyle + " w-full"}
                     />
                 </div>
             ))}
         </div>
    </div>
  );

  const renderSpaceEditor = () => (
    <div className="space-y-6">
        {/* Gallery Section */}
        <div className="bg-gray-50 p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Galeria de Fotos</h3>
                <button 
                    onClick={() => {
                        const newGallery = [...content.space.gallery, { id: Date.now().toString(), url: '', caption: '' }];
                        updateNestedContent('space', 'gallery', newGallery);
                    }} 
                    className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 transition"
                >
                    <Plus size={14} className="inline mr-1"/> Adicionar Foto
                </button>
            </div>
            <div className="space-y-4">
                {content.space.gallery.map((item, idx) => (
                    <div key={item.id} className="flex gap-4 items-start border-b pb-4 last:border-0">
                         {/* Gallery Image Upload */}
                         <div className="w-24 shrink-0">
                            <ImageUpload 
                                label=""
                                currentImage={item.url}
                                onUpload={(url) => {
                                    const newGallery = [...content.space.gallery];
                                    newGallery[idx].url = url;
                                    updateNestedContent('space', 'gallery', newGallery);
                                }}
                            />
                        </div>

                        <div className="flex-1 grid grid-cols-1 gap-2 pt-2">
                            <input 
                                type="text" 
                                value={item.caption} 
                                onChange={(e) => {
                                    const newGallery = [...content.space.gallery];
                                    newGallery[idx].caption = e.target.value;
                                    updateNestedContent('space', 'gallery', newGallery);
                                }} 
                                className={smallInputStyle} 
                                placeholder="Legenda da foto" 
                            />
                        </div>
                        <button 
                            onClick={() => {
                                const newGallery = content.space.gallery.filter(g => g.id !== item.id);
                                updateNestedContent('space', 'gallery', newGallery);
                            }} 
                            className="text-red-400 hover:text-red-600 p-2 mt-2"
                            title="Remover"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Didactics Section */}
        <div className="bg-gray-50 p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700">Didática e Metodologia</h3>
                <button 
                    onClick={() => {
                        const newDidactics = [...content.space.didactics, { id: Date.now().toString(), title: 'Novo Item', description: '' }];
                        updateNestedContent('space', 'didactics', newDidactics);
                    }} 
                    className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 transition"
                >
                    <Plus size={14} className="inline mr-1"/> Adicionar Item
                </button>
            </div>
            <div className="space-y-4">
                {content.space.didactics.map((item, idx) => (
                    <div key={item.id} className="border-b pb-4 last:border-0 relative">
                        <div className="flex justify-between items-start gap-2 mb-2">
                            <input 
                                type="text" 
                                value={item.title} 
                                onChange={(e) => {
                                    const newDidactics = [...content.space.didactics];
                                    newDidactics[idx].title = e.target.value;
                                    updateNestedContent('space', 'didactics', newDidactics);
                                }} 
                                className="font-bold p-1 border rounded w-full bg-white text-gray-900"
                                placeholder="Título"
                            />
                            <button 
                                onClick={() => {
                                    const newDidactics = content.space.didactics.filter(d => d.id !== item.id);
                                    updateNestedContent('space', 'didactics', newDidactics);
                                }} 
                                className="text-red-400 hover:text-red-600 p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <textarea 
                            value={item.description}
                            onChange={(e) => {
                                const newDidactics = [...content.space.didactics];
                                newDidactics[idx].description = e.target.value;
                                updateNestedContent('space', 'didactics', newDidactics);
                            }}
                            className={smallInputStyle + " w-full"}
                            placeholder="Descrição detalhada"
                            rows={2}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const renderContactEditor = () => (
      <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border">
              <h3 className="font-bold text-gray-700 mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-600">Endereço Completo</label>
                      <textarea 
                        rows={3}
                        value={content.contact.address}
                        onChange={(e) => updateNestedContent('contact', 'address', e.target.value)}
                        className={inputStyle}
                      />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-600">WhatsApp (apenas números)</label>
                          <input 
                            type="text"
                            value={content.contact.whatsappNumber}
                            onChange={(e) => updateNestedContent('contact', 'whatsappNumber', e.target.value)}
                            className={inputStyle}
                            placeholder="5511999999999"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-600">Texto do Botão</label>
                          <input 
                            type="text"
                            value={content.contact.whatsappLabel}
                            onChange={(e) => updateNestedContent('contact', 'whatsappLabel', e.target.value)}
                            className={inputStyle}
                          />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

  const renderStudents = () => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'Ativo').length;
    const pendingPayments = students.filter(s => s.paymentStatus === 'Pendente').length;
    const totalRevenue = students
        .filter(s => s.status === 'Ativo')
        .reduce((acc, curr) => acc + (parseFloat(curr.monthlyFee.replace('.','').replace(',','.')) || 0), 0);

    return (
      <div className="space-y-6">
           {/* Dashboard Summary */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-blue-500 mb-1 font-bold text-xs uppercase">Alunos Ativos</div>
                  <div className="text-2xl font-bold text-blue-800">{activeStudents} <span className="text-sm font-normal text-gray-500">/ {totalStudents}</span></div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="text-green-600 mb-1 font-bold text-xs uppercase">Receita Mensal (Est.)</div>
                  <div className="text-2xl font-bold text-green-800">R$ {totalRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <div className="text-red-500 mb-1 font-bold text-xs uppercase">Pagamentos Pendentes</div>
                  <div className="text-2xl font-bold text-red-800">{pendingPayments}</div>
              </div>
               <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-center justify-center cursor-pointer hover:bg-purple-100 transition"
                    onClick={() => updateStudents([...students, { 
                        id: Date.now().toString(), name: 'Novo Aluno', grade: '', status: 'Ativo', schedule: [], 
                        paymentStatus: 'Em dia', monthlyFee: '0,00', enrollmentDate: new Date().toISOString().split('T')[0],
                        hasDisability: false, disabilityDetail: '', contractedHours: 0, attendedHours: 0, notes: ''
                    }])}
               >
                  <div className="text-purple-600 font-bold flex items-center gap-2">
                      <Plus size={24} /> Novo Aluno
                  </div>
              </div>
           </div>

            {/* Students List */}
            <div className="space-y-4">
                {students.map(s => (
                    <div key={s.id} className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
                        {/* Header Row */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b pb-4">
                            <div className="flex-1 w-full">
                                <label className={labelStyle}>Nome do Aluno</label>
                                <input 
                                    type="text" 
                                    value={s.name} 
                                    onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, name: e.target.value} : st))} 
                                    className="font-bold text-lg bg-transparent border-b border-dashed border-gray-300 w-full focus:ring-0 focus:border-indigo-500 p-0 pb-1" 
                                    placeholder="Nome Completo" 
                                />
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <div>
                                    <label className={labelStyle}>Status</label>
                                    <select 
                                        value={s.status}
                                        onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, status: e.target.value as any} : st))}
                                        className={`rounded-lg px-3 py-1 text-sm font-bold border-none cursor-pointer ${
                                            s.status === 'Ativo' ? 'bg-green-100 text-green-800' : 
                                            s.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        <option value="Ativo">Matriculado</option>
                                        <option value="Pendente">Em análise</option>
                                        <option value="Inativo">Trancado</option>
                                    </select>
                                </div>
                                <button onClick={() => updateStudents(students.filter(st => st.id !== s.id))} className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Column 1: Academic & Personal */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-indigo-700 font-bold border-b pb-1 mb-2">
                                    <FileText size={16} /> Dados Acadêmicos
                                </div>
                                <div>
                                    <label className={labelStyle}>Série / Ano</label>
                                    <input type="text" value={s.grade} onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, grade: e.target.value} : st))} className={smallInputStyle + " w-full"} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Data de Matrícula</label>
                                    <input type="date" value={s.enrollmentDate} onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, enrollmentDate: e.target.value} : st))} className={smallInputStyle + " w-full"} />
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <input 
                                            type="checkbox" 
                                            checked={s.hasDisability} 
                                            onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, hasDisability: e.target.checked} : st))} 
                                            id={`disability-${s.id}`}
                                        />
                                        <label htmlFor={`disability-${s.id}`} className="text-sm font-bold text-gray-700">Possui Deficiência/Laudo?</label>
                                    </div>
                                    {s.hasDisability && (
                                        <input 
                                            type="text" 
                                            value={s.disabilityDetail} 
                                            onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, disabilityDetail: e.target.value} : st))} 
                                            className={smallInputStyle + " w-full text-xs"} 
                                            placeholder="Qual? (Ex: TDAH, Autismo...)" 
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Column 2: Financial */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-green-700 font-bold border-b pb-1 mb-2">
                                    <DollarSign size={16} /> Financeiro
                                </div>
                                <div>
                                    <label className={labelStyle}>Valor da Mensalidade (R$)</label>
                                    <input 
                                        type="text" 
                                        value={s.monthlyFee} 
                                        onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, monthlyFee: e.target.value} : st))} 
                                        className={smallInputStyle + " w-full font-mono font-bold text-gray-700"} 
                                    />
                                </div>
                                <div>
                                    <label className={labelStyle}>Status Pagamento (Mês Atual)</label>
                                    <select 
                                        value={s.paymentStatus} 
                                        onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, paymentStatus: e.target.value as any} : st))}
                                        className={`w-full p-2 rounded text-sm font-bold border ${
                                            s.paymentStatus === 'Em dia' ? 'border-green-300 bg-green-50 text-green-800' :
                                            s.paymentStatus === 'Pendente' ? 'border-yellow-300 bg-yellow-50 text-yellow-800' :
                                            'border-red-300 bg-red-50 text-red-800'
                                        }`}
                                    >
                                        <option value="Em dia">Pago / Em dia</option>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Atrasado">Atrasado</option>
                                    </select>
                                </div>
                            </div>

                            {/* Column 3: Presence & Hours */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-orange-700 font-bold border-b pb-1 mb-2">
                                    <Clock size={16} /> Banco de Horas (Mensal)
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className={labelStyle}>Contratadas</label>
                                        <input 
                                            type="number" 
                                            value={s.contractedHours} 
                                            onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, contractedHours: parseInt(e.target.value) || 0} : st))} 
                                            className={smallInputStyle + " w-full text-center"} 
                                        />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Realizadas</label>
                                        <div className="flex items-center border rounded bg-white overflow-hidden">
                                            <button 
                                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 border-r"
                                                onClick={() => updateStudents(students.map(st => st.id === s.id ? {...st, attendedHours: Math.max(0, st.attendedHours - 1)} : st))}
                                            >-</button>
                                            <div className="flex-1 text-center text-sm font-bold">{s.attendedHours}</div>
                                            <button 
                                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 border-l"
                                                onClick={() => updateStudents(students.map(st => st.id === s.id ? {...st, attendedHours: st.attendedHours + 1} : st))}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div 
                                        className={`h-2.5 rounded-full ${s.attendedHours > s.contractedHours ? 'bg-red-500' : 'bg-blue-600'}`} 
                                        style={{ width: `${Math.min(100, (s.attendedHours / (s.contractedHours || 1)) * 100)}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-right text-gray-500">
                                    {s.attendedHours} de {s.contractedHours} horas
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <label className={labelStyle}>Observações da Gestão (Interno)</label>
                            <textarea 
                                value={s.notes}
                                onChange={(e) => updateStudents(students.map(st => st.id === s.id ? {...st, notes: e.target.value} : st))}
                                className={smallInputStyle + " w-full bg-yellow-50 border-yellow-200"}
                                placeholder="Anotações sobre o aluno, conversa com pais, etc."
                                rows={2}
                            />
                        </div>
                    </div>
                ))}
            </div>
      </div>
    );
  }

   const renderSchedule = () => (
     <div>
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800">Grade Horária Geral</h2>
                <p className="text-sm text-gray-500">Controle de disponibilidade das salas/professores</p>
            </div>
            <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-300 rounded"></span> Livre</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 border border-red-300 rounded"></span> Ocupado</span>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map(day => (
                <div key={day} className="bg-white p-3 rounded-lg border shadow-sm">
                    <div className="font-bold text-center text-sm mb-3 text-indigo-700 uppercase tracking-wider">{day}</div>
                    <div className="space-y-2">
                    {schedule.filter(s => s.day === day).map(slot => (
                        <button
                            key={slot.id}
                            onClick={() => updateSchedule(schedule.map(s => s.id === slot.id ? {...s, available: !s.available} : s))}
                            className={`w-full text-xs py-2 px-2 rounded font-medium transition-all ${
                                slot.available 
                                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 line-through decoration-red-300 opacity-80'
                            }`}
                        >
                            {slot.time}
                        </button>
                    ))}
                    </div>
                </div>
            ))}
        </div>
     </div>
   );

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <Link to="/" className="p-2 bg-gray-100 rounded-full hover:bg-indigo-100 text-indigo-600 transition">
                <ArrowLeft size={20} />
             </Link>
             <div>
                <h1 className="text-2xl font-bold text-gray-800">Painel do Gestor</h1>
                <p className="text-xs text-gray-500">Bem-vinda, Elaine!</p>
             </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition text-sm font-bold">
            <LogOut size={18} /> Sair
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Navigation for Admin */}
            <div className="w-full md:w-64 flex-shrink-0 space-y-6">
                
                {/* School Management Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-3 bg-indigo-50 border-b border-indigo-100 text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-2">
                        <Activity size={14} /> Gestão Escolar
                    </div>
                    <nav className="flex flex-col p-2">
                        {[
                            {id: 'students', label: 'Alunos & Financeiro', icon: <Users size={16}/>},
                            {id: 'schedule', label: 'Grade Horária', icon: <Calendar size={16}/>}
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-left px-4 py-3 rounded-lg transition-colors font-medium text-sm flex items-center gap-3 mb-1 ${
                                    activeTab === tab.id 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Site Content Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                        <Layout size={14} /> Edição do Site
                    </div>
                    <nav className="flex flex-col p-2">
                        {[
                            {id: 'home', label: 'Home'},
                            {id: 'about', label: 'Quem Somos'},
                            {id: 'specialties', label: 'Especialidades'},
                            {id: 'space', label: 'Espaço & Galeria'},
                            {id: 'contact', label: 'Contato'}
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-left px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-3 mb-1 ${
                                    activeTab === tab.id 
                                    ? 'bg-gray-200 text-gray-900' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
                
                {/* Config Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-6 py-3 transition-colors font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${
                            activeTab === 'settings' 
                            ? 'bg-gray-800 text-white' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        <Settings size={14} /> Configurações
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                <div className="bg-white rounded-xl shadow-sm p-6 min-h-[600px]">
                    <div className="mb-6 flex justify-between items-center border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                            {activeTab === 'students' && <><Users /> Gestão de Alunos e Financeiro</>}
                            {activeTab === 'schedule' && <><Calendar /> Grade Horária Geral</>}
                            {activeTab === 'settings' && <><Settings /> Configurações do Sistema</>}
                            {activeTab === 'home' && <><Layout /> Editar Página Inicial</>}
                            {/* ... labels for other tabs ... */}
                            {!['students', 'schedule', 'home', 'settings'].includes(activeTab) && `Editar ${activeTab}`}
                        </h2>
                        <span className="text-xs text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                            <Save size={12}/> Salvo automaticamente
                        </span>
                    </div>

                    <div className="animate-fade-in">
                        {activeTab === 'students' && renderStudents()}
                        {activeTab === 'schedule' && renderSchedule()}
                        {/* Renderizando o componente extraído em vez de chamar uma função interna */}
                        {activeTab === 'settings' && <SettingsTab adminConfig={adminConfig} updateAdminConfig={updateAdminConfig} />}
                        {activeTab === 'home' && renderHomeEditor()}
                        {activeTab === 'about' && renderAboutEditor()}
                        {activeTab === 'specialties' && renderSpecialtiesEditor()}
                        {activeTab === 'space' && renderSpaceEditor()}
                        {activeTab === 'contact' && renderContactEditor()}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
