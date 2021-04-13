import type { ICradle } from '../types';

export default class Similar {
  constructor(opts: ICradle) {
    this.repo = opts.repo;
  }
  repo;

  getSimilarUsers = async (id: number, categories: string[]) => {
    const similarUsers = await this.repo.getSimilarUsers(id, categories);
    return similarUsers;
  };
}
