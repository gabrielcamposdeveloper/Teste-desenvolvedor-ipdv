export function formatarCPF(cpf: string): string {
  const apenasNumeros = cpf.replace(/\D/g, '');
  if (apenasNumeros.length !== 11) return cpf; 
  return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatarTelefone(telefone: string): string {
  const apenasNumeros = telefone.replace(/\D/g, '');
  if (apenasNumeros.length === 10) {
    // Formato (XX)XXXX-XXXX
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
  }
  if (apenasNumeros.length === 11) {
    // Formato (XX)XXXXX-XXXX
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
  }
  return telefone;
}
