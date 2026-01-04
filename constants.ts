import { Teacher, SiteContent, Student, ScheduleSlot, AdminConfig } from './types';

// USANDO LINKS RAW DO GITHUB PARA FUNCIONAR NO PREVIEW
const BASE_REPO_URL = "https://raw.githubusercontent.com/douglaslopes/up-educacional/25743635b0139a71bed6e134129d62fdedcca4ad/public";

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Elaine Cristina dos Santos',
    role: 'Gestora e Professora',
    specialty: 'Pedagogia e Gestão Escolar',
    image: `${BASE_REPO_URL}/fotos/foto-elaineprof.jpeg`, 
  },
  {
    id: '2',
    name: 'Ana Paula',
    role: 'Professora',
    specialty: 'Alfabetização e Letramento',
    image: 'https://picsum.photos/seed/ana/200/200',
  },
  {
    id: '3',
    name: 'Bárbara',
    role: 'Professora',
    specialty: 'Matemática e Lógica',
    image: 'https://picsum.photos/seed/barbara/200/200',
  },
  {
    id: '4',
    name: 'Marcelo',
    role: 'Professor',
    specialty: 'Reforço Ensino Fundamental II',
    image: 'https://picsum.photos/seed/marcelo/200/200',
  },
];

export const INITIAL_CONTENT: SiteContent = {
  home: {
    logoUrl: `${BASE_REPO_URL}/logo-up.png`,
    welcomeTitle: 'Bem-vindo à Família UP',
    welcomeText: 'No Instituto Educacional UP, entendemos que cada criança tem seu próprio ritmo e maneira de aprender. Nossa missão é identificar essas particularidades e oferecer o suporte necessário para que o aluno não apenas melhore suas notas, mas recupere a autoconfiança e o prazer em descobrir o novo.',
    stats: {
      students: '+200',
      satisfaction: '98%',
      reference: 'Top 1'
    }
  },
  about: {
    leadText: 'Uma equipe apaixonada por educação, dedicada a transformar dificuldades em conquistas.',
    elaineText: 'Com anos de experiência em sala de aula e gestão escolar, a professora Elaine Cristina dos Santos fundou o Instituto UP com o sonho de oferecer um atendimento mais humano e individualizado. Ela acredita que o afeto é a base da aprendizagem e seleciona sua equipe rigorosamente para manter esse padrão de acolhimento e excelência técnica.',
    elaineImage: `${BASE_REPO_URL}/fotos/foto-elainegestora.jpeg` // Assumindo que essa foto existe no repo com base no print anterior, se não, use a prof
  },
  specialties: {
    main: [
      { id: 's1', title: 'Reforço Escolar', description: 'Acompanhamento personalizado para superar dificuldades em matérias específicas e melhorar o desempenho escolar.', iconName: 'BookOpen' },
      { id: 's2', title: 'Atendimento Especializado', description: 'Suporte pedagógico adaptado para crianças com TDAH, Dislexia e outras necessidades de aprendizado.', iconName: 'Brain' },
      { id: 's3', title: 'Auxílio na Lição de Casa', description: 'Orientação diária para organização e realização das tarefas escolares com autonomia.', iconName: 'Pencil' },
      { id: 's4', title: 'Preparatório', description: 'Foco em provas e avaliações específicas, garantindo confiança e domínio do conteúdo.', iconName: 'Target' },
    ],
    extra: [
      'Neuro e Psicopedagogia',
      'Fonoaudiologia',
      'Psicanálise Infantil'
    ]
  },
  space: {
    gallery: [
      { id: 'g1', url: `${BASE_REPO_URL}/fotos/foto-lousabrinquedos.jpeg`, caption: 'Ambiente Lúdico' },
      { id: 'g2', url: 'https://picsum.photos/seed/librarykid/800/400', caption: 'Área de Leitura' },
      { id: 'g3', url: 'https://picsum.photos/seed/playinglearning/800/400', caption: 'Jogos Pedagógicos' },
      { id: 'g4', url: 'https://picsum.photos/seed/materials/600/400', caption: 'Material Rico' }
    ],
    didactics: [
      { id: 'd1', title: 'Aprendizagem Lúdica', description: 'Para os menores, utilizamos jogos, contação de histórias e brincadeiras dirigidas para ensinar conceitos complexos de forma natural.' },
      { id: 'd2', title: 'Uso de Metodologias Atuais', description: 'Recursos visuais e interativos são integrados às aulas para tornar o conteúdo mais dinâmico e atrativo.' },
      { id: 'd3', title: 'Foco e Disciplina Positiva', description: 'Ensinamos técnicas de organização e estudo que o aluno levará para a vida toda.' }
    ]
  },
  contact: {
    address: 'Rua Albert Einstein, 211, Bairro Centro (Próximo ao Cemitério da Paixão)',
    whatsappLabel: 'Falar com a Equipe',
    whatsappNumber: '5511976762776'
  },
  testimonials: [
    { id: 't1', name: 'Maria Eduarda', role: 'Mãe do Pedro (5º ano)', text: 'A evolução do Pedro foi incrível! A equipe da Elaine é muito atenciosa.' },
    { id: 't2', name: 'João Silva', role: 'Pai da Sofia (Alfabetização)', text: 'Estávamos preocupados com a alfabetização, mas em poucos meses ela já está lendo.' },
    { id: 't3', name: 'Fernanda Oliveira', role: 'Mãe do Lucas (8º ano)', text: 'O professor Marcelo ajudou muito o Lucas em Matemática.' },
  ]
};

// Mock Schedule Data
const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const times = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00'];

export const INITIAL_SCHEDULE: ScheduleSlot[] = [];
let slotIdCounter = 1;
days.forEach(day => {
  times.forEach(time => {
    INITIAL_SCHEDULE.push({
      id: `slot-${slotIdCounter++}`,
      day,
      time,
      available: Math.random() > 0.3, // Randomly available
    });
  });
});

export const INITIAL_STUDENTS: Student[] = [
  { 
    id: '1', 
    name: 'Pedro Henrique', 
    grade: '5º Ano', 
    status: 'Ativo', 
    schedule: ['Segunda 14:00', 'Quarta 14:00'],
    enrollmentDate: '2024-02-15',
    paymentStatus: 'Em dia',
    monthlyFee: '450,00',
    hasDisability: false,
    disabilityDetail: '',
    contractedHours: 8,
    attendedHours: 6,
    notes: 'Aluno com ótima evolução em matemática.'
  },
  { 
    id: '2', 
    name: 'Sofia Silva', 
    grade: '1º Ano', 
    status: 'Ativo', 
    schedule: ['Terça 09:00', 'Quinta 09:00'],
    enrollmentDate: '2024-01-20',
    paymentStatus: 'Pendente',
    monthlyFee: '500,00',
    hasDisability: true,
    disabilityDetail: 'TDAH',
    contractedHours: 12,
    attendedHours: 4,
    notes: 'Precisa de mais pausas durante as atividades.'
  },
  { 
    id: '3', 
    name: 'Lucas Oliveira', 
    grade: '8º Ano', 
    status: 'Inativo', 
    schedule: [],
    enrollmentDate: '2023-08-10',
    paymentStatus: 'Em dia',
    monthlyFee: '400,00',
    hasDisability: true,
    disabilityDetail: 'Dislexia',
    contractedHours: 4,
    attendedHours: 0,
    notes: 'Pausou por motivos de saúde.'
  },
];

export const INITIAL_ADMIN_CONFIG: AdminConfig = {
  password: 'admin123' // Senha padrão inicial
};

// Link atualizado para o endereço correto no Google Maps
export const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Rua+Albert+Einstein,+211+-+Centro,+Franco+da+Rocha";
