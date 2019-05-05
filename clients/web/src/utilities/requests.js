import { mapKeys, rearg, camelCase } from "lodash";

export function snakeToCamel(data) {
  return mapKeys(data, rearg(camelCase, 1));
}
