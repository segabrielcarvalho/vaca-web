import { useCallback, useState } from "react";

/**
 * useDisclosure hook para controlar o estado de abertura e fechamento de elementos como modais e dropdowns.
 *
 * @returns {Object} Um objeto contendo:
 *  - isOpen: Estado booleano indicando se o elemento está aberto ou fechado.
 *  - onOpen: Função para abrir o elemento.
 *  - onClose: Função para fechar o elemento.
 *  - onToggle: Função para alternar entre abrir e fechar o elemento.
 */
const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
