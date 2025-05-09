type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  };
  
  const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Exclusão de projeto</h2>
          <p className="mb-6">Tem certeza que deseja excluir este projeto?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 rounded bg-red-700 text-white hover:bg-red-800"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteModal;
  