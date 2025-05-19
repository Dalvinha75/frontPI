import React, { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowLeft,
    ArrowRight,
    ChevronsLeft,
    ChevronsRight,
    GripVertical,
    Loader2,
    Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Supondo que você tenha um tipo Transaction definido
interface Transaction {
  id: number;
  tipo: 'Receita' | 'Despesa';
  descricao: string;
  valor: number;
  data: Date;
}

const FluxoDeCaixa: React.FC = () => {
  // Dados de exemplo (substitua por dados reais de uma API)
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, tipo: 'Receita', descricao: 'Salário', valor: 5000, data: new Date() },
    { id: 2, tipo: 'Despesa', descricao: 'Aluguel', valor: 1200, data: new Date() },
    { id: 3, tipo: 'Despesa', descricao: 'Supermercado', valor: 500, data: new Date() },
    { id: 4, tipo: 'Receita', descricao: 'Freelance', valor: 800, data: new Date() },
    { id: 5, tipo: 'Despesa', descricao: 'Conta de Luz', valor: 150, data: new Date() },
    { id: 6, tipo: 'Receita', descricao: 'Investimentos', valor: 1000, data: new Date() },
    { id: 7, tipo: 'Despesa', descricao: 'Transporte', valor: 100, data: new Date() },
    { id: 8, tipo: 'Despesa', descricao: 'Lazer', valor: 200, data: new Date() },
    { id: 9, tipo: 'Receita', descricao: 'Venda de Produto', valor: 300, data: new Date() },
    { id: 10, tipo: 'Despesa', descricao: 'Telefone', valor: 50, data: new Date() },
  ]);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Adiciona estado de loading
  const transactionsPerPage = 5;

    // Filtra as transações com base na pesquisa
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.descricao.toLowerCase().includes(search.toLowerCase())
    );

    // Calcula a paginação
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

    // Função para formatar moeda (BRL)
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    // Calcula o saldo, receita e despesa
    const saldo = transactions.reduce((acc, transaction) => {
        if (transaction.tipo === 'Receita') {
            return acc + transaction.valor;
        } else {
            return acc - transaction.valor;
        }
    }, 0);

    const receitaMes = transactions
        .filter((t) => t.tipo === 'Receita')
        .reduce((acc, t) => acc + t.valor, 0);

    const despesaMes = transactions
        .filter((t) => t.tipo === 'Despesa')
        .reduce((acc, t) => acc + t.valor, 0);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Fluxo de Caixa</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Saldo Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-500 text-xl font-bold">{formatCurrency(saldo)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-500 text-xl font-bold">{formatCurrency(receitaMes)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Despesas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 text-xl font-bold">{formatCurrency(despesaMes)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
                type="text"
                placeholder="Pesquisar transação..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10" // Adiciona padding para o ícone
            />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead> {/* Checkbox Column */}
              <TableHead>Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? ( // Exibe mensagem de carregamento
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Loader2 className="animate-spin text-gray-500 h-6 w-6 mx-auto" />
                  <p className="mt-2 text-gray-500">Carregando...</p>
                </TableCell>
              </TableRow>
            ) : currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </TableCell>
                  <TableCell className="font-medium">{transaction.tipo}</TableCell>
                  <TableCell>{transaction.descricao}</TableCell>
                  <TableCell>{formatCurrency(transaction.valor)}</TableCell>
                  <TableCell>{transaction.data.toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        {/* Paginação */}
        {filteredTransactions.length > transactionsPerPage && (
            <div className="flex items-center justify-center mt-4 space-x-2">
                <Button
                    variant="outline"
                    className={cn(
                        "rounded-full",
                        currentPage === 1 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">First Page</span>
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        "rounded-full",
                        currentPage === 1 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                </Button>

                {/* Mostra as páginas perto da página atual */}
                {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                        pageNumber === 1 ||
                        pageNumber === currentPage ||
                        pageNumber === currentPage - 1 ||
                        pageNumber === currentPage + 1 ||
                        pageNumber === totalPages
                    ) {
                        return (
                            <Button
                                key={pageNumber}
                                variant={currentPage === pageNumber ? "default" : "outline"}
                                className={cn(
                                    "rounded-full",
                                    currentPage === pageNumber && "font-bold"
                                )}
                                onClick={() => paginate(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        );
                    } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                    ) {
                        return (
                            <span key={`ellipsis-${pageNumber}`} className="text-gray-500">
                                ...
                            </span>
                        );
                    }
                    return null;
                })}

                <Button
                    variant="outline"
                    className={cn(
                        "rounded-full",
                        currentPage === totalPages && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        "rounded-full",
                        currentPage === totalPages && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">Last Page</span>
                </Button>
            </div>
        )}
      <div className="mt-6 flex justify-end">
        <Button>Adicionar Transação</Button>
      </div>
    </div>
  );
};

export default FluxoDeCaixa;
