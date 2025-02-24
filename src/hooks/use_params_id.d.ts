/**
 * @param {string} entitiesPath e.g. "tariffs/apartments" => "/tariffs/apartments/:id", "/tariffs/apartments/new"
 */
export declare function useParamsId(entitiesPath: string): [entityId: number, isNew: boolean, wrongId: boolean];
