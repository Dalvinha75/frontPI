import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NovaTransacaoProps {
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void; // Ajustado para usar Omit
}

// Supondo que você tenha um tipo Transaction definido
interface Transaction {
  id: number;
  tipo: 'Receita' | 'Despesa';
  descricao: string;
  valor: number;
  data: Date;
}

const NovaTransacao: React.FC<NovaTransacaoProps> = ({ onClose, onSave }) => {
  const [tipo, setTipo] = useState<'Receita' | 'Despesa'>('Receita');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | string>(''); // Pode começar como string vazia
  const [data, setData] = useState<Date | undefined>();
  const [valorInput, setValorInput] = useState(''); // Estado para o valor do input

  const handleSave = () => {
    // Validação dos campos
    if (!descricao.trim() || !valor || !data) {
      alert('Por favor, preencha todos os campos.'); // Usando alert para simplificar
      return;
    }

    const valorNumerico = typeof valor === 'string' ? parseFloat(valor.replace(/[^0-9,-]/g, '').replace(',', '.')) : valor;


    if (isNaN(valorNumerico)) {
      alert('Valor inválido. Insira um número válido.');
      return;
    }

    // Cria um novo objeto de transação sem o ID
    const novaTransacao: Omit<Transaction, 'id'> = {
      tipo,
      descricao,
      valor: valorNumerico,
      data: data,
    };

    onSave(novaTransacao);
    onClose(); // Fecha o formulário após salvar
  };

    // Formata o valor de entrada
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Remove tudo que não for dígito, vírgula ou ponto
        value = value.replace(/[^0-9,-]/g, '');
        // Garante que só tenha uma vírgula ou ponto
        const decimalSeparator = value.includes(',') ? ',' : value.includes('.') ? '.' : '';
        if (decimalSeparator) {
            const parts = value.split(decimalSeparator);
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ''); // Adiciona separador de milhar antes da vírgula/ponto
            value = parts.join(decimalSeparator);
        } else {
             value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '');
        }
        setValorInput(value); // Atualiza o estado do input
        setValor(value); // Atualiza o estado do valor
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nova Transação</h2>

        <div className="mb-4">
          <Label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</Label>
          <Select onValueChange={(value) => setTipo(value as 'Receita' | 'Despesa')} value={tipo}>
            <SelectTrigger id="tipo" className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Receita">Receita</SelectItem>
              <SelectItem value="Despesa">Despesa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</Label>
          <Input
            id="descricao"
            placeholder="Ex: Salário, Aluguel..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</Label>
          <Input
            id="valor"
            placeholder="R$ 0,00"
            value={valorInput}
            onChange={handleValorChange}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Input
                        id="data"
                        placeholder="Selecione a data"
                        value={data ? format(data, 'dd/MM/yyyy', { locale: ptBR }) : ''}
                        className={cn(
                            "w-full",
                            !data && "text-gray-500" // Estilo para placeholder
                        )}
                        readOnly // Impede a edição direta
                    />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={data}
                    onSelect={setData}
                    locale={ptBR}
                    captionLayout="dropdown-buttons"
                    fromYear={2000}
                    toYear={new Date().getFullYear() + 10}
                    className="rounded-md"
                />
                </PopoverContent>
            </Popover>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default NovaTransacao;
