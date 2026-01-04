export interface Teacher {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

export interface Student {
  id: string;
  name: string;
  birthDate: string; // Novo
  parentName: string; // Novo
  parentPhone: string; // Novo
  grade: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  schedule: string[];
  // Management Fields
  enrollmentDate: string;
  paymentStatus: 'Em dia' | 'Pendente' | 'Atrasado';
  paymentDueDay: string; // Novo: Dia do vencimento (ex: "10")
  monthlyFee: string;
  hasDisability: boolean;
  disabilityDetail: string;
  contractedHours: number;
  attendedHours: number;
  notes: string;
}

export interface ScheduleSlot {
  id: string;
  day: string;
  time: string;
  available: boolean;
  studentId?: string; // If occupied
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface DidacticItem {
  id: string;
  title: string;
  description: string;
}

export interface SiteContent {
  home: {
    logoUrl: string;
    welcomeTitle: string;
    welcomeText: string;
    stats: {
      students: string;
      satisfaction: string;
      reference: string;
    };
  };
  about: {
    leadText: string;
    elaineText: string;
    elaineImage: string;
  };
  specialties: {
    main: ServiceItem[];
    extra: string[]; // For Neuro, Fono, etc.
  };
  space: {
    gallery: GalleryImage[];
    didactics: DidacticItem[];
  };
  contact: {
    address: string;
    whatsappLabel: string;
    whatsappNumber: string;
  };
  testimonials: Testimonial[];
}

export interface AdminConfig {
  password: string;
}
