import { useMatch } from 'react-router-dom';
/**
 * @param {string} entitiesPath e.g. "cats" => "/cats/:id", "/cats/new"
 */
export function useParamsId(entitiesPath) {
    const { params: { id }, } = useMatch(`/${entitiesPath}/:id`);
    const isNew = id === 'new';
    const entityId = isNew ? null : +id;
    const wrongId = !isNew && isNaN(entityId);
    return [entityId, isNew, wrongId];
}
//# sourceMappingURL=use_params_id.js.map