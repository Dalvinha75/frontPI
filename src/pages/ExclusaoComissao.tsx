import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExclusaoComissaoProps {
  onClose: () => void;
  onConfirm: () => void; // Função para confirmar a exclusão
  comissaoId: number; // Adicionei o ID da comissão a ser excluída
}

const ExclusaoComissao: React.FC<ExclusaoComissaoProps> = ({ onClose, onConfirm, comissaoId }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Exclusão de Comissão</h2>
        <p className="text-gray-700 mb-6">
          Tem certeza que deseja excluir esta comissão? (ID: {comissaoId})
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            variant="destructive" // Usa a variante "destructive" para o botão de excluir
            onClick={onConfirm}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExclusaoComissao;
