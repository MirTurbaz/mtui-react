/**
 * @param {string} entitiesPath e.g. "cats" => "/cats/:id", "/cats/new"
 */
export declare function useParamsId(entitiesPath: string): [entityId: number, isNew: boolean, wrongId: boolean];
