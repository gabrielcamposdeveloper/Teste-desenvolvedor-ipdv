import * as cargoRepository from './cargo.repository'

export const listarCargos = () => {
  return cargoRepository.getAllCargos()
}

export const criarCargo = (data: { nome: string }) => {
  return cargoRepository.createCargo(data.nome)
}

export const atualizarCargo = (id: number, data: { nome: string }) => {
  return cargoRepository.updateCargo(id, data.nome)
}

export const deletarCargo = (id: number) => {
  return cargoRepository.deleteCargo(id)
}
