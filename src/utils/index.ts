import { API_V1_BASE_ROUTE } from "../constants";

export * from "./pagination.util";
export * from "./response.util";

export const createApiResourcePath =
    (version = API_V1_BASE_ROUTE) =>
    (resourceBasePath: string) =>
        `${version}${resourceBasePath}`;

export const isDefined = <T>(value: T) => value !== null && value !== undefined;
