import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';
import NovaComissao from './NovaComissao';
import EdicaoComissao from './EdicaoComissao';
import ExclusaoComissao from './ExclusaoComissao';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Supondo que você tenha um tipo Comissao definido
interface Comissao {
  id: number;
  vendedor: string;
  descricao: string;
  valor: number;
  data: Date;
}

const Comissoes: React.FC = () => {
  const [comissoes, setComissoes] = useState<Comissao[]>([
    { id: 1, vendedor: 'João da Silva', descricao: 'Venda 123', valor: 150.00, data: new Date() },
    { id: 2, vendedor: 'Maria Souza', descricao: 'Serviço 456', valor: 200.00, data: new Date() },
    { id: 3, vendedor: 'João da Silva', descricao: 'Venda 789', valor: 100.00, data: new Date() },
  ]);

  const [search, setSearch] = useState('');
  const [isNovaComissaoOpen, setIsNovaComissaoOpen] = useState(false);
  const [isEdicaoComissaoOpen, setIsEdicaoComissaoOpen] = useState(false);
  const [comissaoParaEditar, setComissaoParaEditar] = useState<Comissao | null>(null);
  const [isExclusaoComissaoOpen, setIsExclusaoComissaoOpen] = useState(false);
  const [comissaoParaExcluir, setComissaoParaExcluir] = useState<Comissao | null>(null);


  const handleNovaComissaoSave = (novaComissao: Omit<Comissao, 'id'>) => {
    // Lógica para adicionar a nova comissão à lista
    const novaComissaoComId: Comissao = {
      id: comissoes.length + 1, // Simples, use algo melhor
      ...novaComissao,
    };
    setComissoes([...comissoes, novaComissaoComId]);
    setIsNovaComissaoOpen(false);
  };

  const handleEditarComissao = (comissao: Comissao) => {
    setComissaoParaEditar(comissao);
    setIsEdicaoComissaoOpen(true);
  };

  const handleEdicaoComissaoSave = (comissaoAtualizada: Comissao) => {
    // Lógica para atualizar a comissão na lista
    setComissoes(comissoes.map(c => c.id === comissaoAtualizada.id ? comissaoAtualizada : c));
    setIsEdicaoComissaoOpen(false);
  };

  const handleExcluirComissao = (comissao: Comissao) => {
    setComissaoParaExcluir(comissao);
    setIsExclusaoComissaoOpen(true);
  };

  const handleConfirmarExclusao = () => {
    // Lógica para excluir a comissão
    if (comissaoParaExcluir) {
      setComissoes(comissoes.filter(c => c.id !== comissaoParaExcluir.id));
    }
    setIsExclusaoComissaoOpen(false);
    setComissaoParaExcluir(null);
  };

  // Filtra as comissões com base na pesquisa
  const filteredComissoes = comissoes.filter((comissao) =>
    comissao.vendedor.toLowerCase().includes(search.toLowerCase()) ||
    comissao.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Comissões</h1>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Pesquisar comissão..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendedor</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComissoes.map((comissao) => (
              <TableRow key={comissao.id}>
                <TableCell>{comissao.vendedor}</TableCell>
                <TableCell>{comissao.descricao}</TableCell>
                <TableCell>{comissao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>{format(comissao.data, 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditarComissao(comissao)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4 text-gray-500 hover:text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleExcluirComissao(comissao)}
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => setIsNovaComissaoOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Comissão
        </Button>
      </div>

      {/* Modais */}
      {isNovaComissaoOpen && (
        <NovaComissao
          onClose={() => setIsNovaComissaoOpen(false)}
          onSave={handleNovaComissaoSave}
        />
      )}

      {isEdicaoComissaoOpen && comissaoParaEditar && (
        <EdicaoComissao
          onClose={() => setIsEdicaoComissaoOpen(false)}
          onSave={handleEdicaoComissaoSave}
          comissao={comissaoParaEditar}
        />
      )}

      {isExclusaoComissaoOpen && comissaoParaExcluir && (
        <ExclusaoComissao
          onClose={() => setIsExclusaoComissaoOpen(false)}
          onConfirm={handleConfirmarExclusao}
          comissaoId={comissaoParaExcluir.id}
        />
      )}
    </div>
  );
};

export default Comissoes;
