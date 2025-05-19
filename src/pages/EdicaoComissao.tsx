import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Comissao {
  id: number;
  vendedor: string;
  descricao: string;
  valor: number;
  data: Date;
}

interface EdicaoComissaoProps {
  onClose: () => void;
  onSave: (comissaoAtualizada: Comissao) => void;
  comissao: Comissao;
}

const EdicaoComissao: React.FC<EdicaoComissaoProps> = ({ onClose, onSave, comissao }) => {
  const [descricao, setDescricao] = useState(comissao.descricao);
  const [valor, setValor] = useState(comissao.valor);

  const handleSave = () => {
    onSave({
      ...comissao,
      descricao,
      valor,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Editar Comissão</h2>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value))}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default EdicaoComissao;
