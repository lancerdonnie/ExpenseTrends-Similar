import type { ICradle } from '../types';
import { createContainer, asClass, asFunction, asValue } from 'awilix';
import Repo from '../repo';
import Similar from '../core/similar';
import SimilarController from '../controller';
import query from './createConn';

export const setupDi = () => {
  const container = createContainer<ICradle>();

  container.register({
    repo: asClass(Repo).scoped(),
    query: asValue(query),
    core: asClass(Similar).scoped(),
    SimilarController: asFunction(SimilarController),
  });

  return container;
};
