import { useMatch } from 'react-router-dom';

/**
 * @param {string} entitiesPath e.g. "tariffs/apartments" => "/tariffs/apartments/:id", "/tariffs/apartments/new"
 */
export function useParamsId(entitiesPath: string): [entityId: number, isNew: boolean, wrongId: boolean] {
  const {
    params: { id },
  } = useMatch(`/${entitiesPath}/:id`);
  const isNew = id === 'new';
  const entityId = isNew ? null : +id;
  const wrongId = !isNew && isNaN(entityId);
  return [entityId, isNew, wrongId];
}
