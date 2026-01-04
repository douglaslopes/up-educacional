import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Teacher, Student, ScheduleSlot, AdminConfig } from '../types';
import { INITIAL_CONTENT, INITIAL_TEACHERS, INITIAL_STUDENTS, INITIAL_SCHEDULE, INITIAL_ADMIN_CONFIG } from '../constants';
import { supabase } from '../supabaseClient';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  teachers: Teacher[];
  updateTeachers: (newTeachers: Teacher[]) => void;
  students: Student[];
  updateStudents: (newStudents: Student[]) => void;
  schedule: ScheduleSlot[];
  updateSchedule: (newSchedule: ScheduleSlot[]) => void;
  adminConfig: AdminConfig;
  updateAdminConfig: (newConfig: AdminConfig) => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(INITIAL_SCHEDULE);
  const [adminConfig, setAdminConfig] = useState<AdminConfig>(INITIAL_ADMIN_CONFIG);

  // Load data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('app_data').select('*');
        
        if (error) {
           console.error('Erro ao buscar dados:', error);
           return;
        }

        if (data) {
          data.forEach((row: any) => {
             // Only update if the value is not empty object/array (based on initial insert)
             if (row.key === 'up_site_content' && Object.keys(row.value).length > 0) setContent(row.value);
             if (row.key === 'up_teachers' && row.value.length > 0) setTeachers(row.value);
             if (row.key === 'up_students' && row.value.length > 0) setStudents(row.value);
             if (row.key === 'up_schedule' && row.value.length > 0) setSchedule(row.value);
             if (row.key === 'up_admin_config' && row.value) setAdminConfig(row.value);
          });
        }
      } catch (err) {
        console.error('Erro de conexão:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generic saver function
  const saveData = async (key: string, value: any) => {
    try {
      await supabase.from('app_data').upsert({ key, value });
    } catch (err) {
      console.error(`Erro ao salvar ${key}:`, err);
    }
  };

  // Wrapper update functions
  const handleUpdateContent = (newContent: SiteContent) => {
    setContent(newContent);
    saveData('up_site_content', newContent);
  };

  const handleUpdateTeachers = (newTeachers: Teacher[]) => {
    setTeachers(newTeachers);
    saveData('up_teachers', newTeachers);
  };

  const handleUpdateStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    saveData('up_students', newStudents);
  };

  const handleUpdateSchedule = (newSchedule: ScheduleSlot[]) => {
    setSchedule(newSchedule);
    saveData('up_schedule', newSchedule);
  };

  const handleUpdateAdminConfig = (newConfig: AdminConfig) => {
    setAdminConfig(newConfig);
    saveData('up_admin_config', newConfig);
  }

  return (
    <ContentContext.Provider value={{
      content, updateContent: handleUpdateContent,
      teachers, updateTeachers: handleUpdateTeachers,
      students, updateStudents: handleUpdateStudents,
      schedule, updateSchedule: handleUpdateSchedule,
      adminConfig, updateAdminConfig: handleUpdateAdminConfig,
      isLoading
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};