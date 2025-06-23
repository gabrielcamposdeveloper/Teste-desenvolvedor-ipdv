import * as cargoRepository from './cargo.repository'

export const listarCargos = async () => {
  return await cargoRepository.getAllCargos()
}
