import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface ImageUploadProps {
  currentImage: string;
  onUpload: (url: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onUpload, label = "Imagem", className = "" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // 1. Gera um nome único para o arquivo para evitar conflitos
      // Ex: 167889900-nome-do-arquivo.jpg
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Faz o upload para o bucket 'images'
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Pega a URL pública
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // 4. Retorna a URL para o componente pai
      onUpload(data.publicUrl);

    } catch (err: any) {
      console.error('Erro no upload:', err);
      setError('Erro ao enviar imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      
      <div className="flex items-start gap-4">
        {/* Preview Area */}
        <div className="relative w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          {currentImage ? (
            <img 
              src={currentImage} 
              alt="Preview" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <ImageIcon className="text-gray-300" size={32} />
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
               <Loader2 className="animate-spin text-white" size={24} />
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="flex-1 space-y-2">
            <div className="relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-upload-${label}-${Math.random()}`} // ID único randomico
                    disabled={isUploading}
                />
                <label
                    htmlFor={`file-upload-${label}`}
                    // Hack to make the label trigger the specific input sibling
                    onClick={(e) => {
                       const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                       input.click();
                    }}
                    className={`flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Upload size={16} />
                    {isUploading ? 'Enviando...' : 'Escolher Arquivo'}
                </label>
            </div>
            
            <p className="text-xs text-gray-500">
                Formatos: JPG, PNG, WEBP.
            </p>
            
            {currentImage && (
                <div className="text-xs text-gray-400 break-all line-clamp-1">
                    Atual: ...{currentImage.slice(-20)}
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500 font-bold">{error}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;