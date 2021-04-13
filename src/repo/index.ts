import type { ICradle } from '../types';

export default class Repo {
  query;

  constructor({ query }: ICradle) {
    this.query = query;
  }

  getSimilarUsers = async (id: number, categories: string[]) => {
    const q = `
    select id from 
    (select count(distinct month(t.date_time)) as ct, month(t.date_time) as mnth, user_id,category 
    from transactions t 
    where t.category in (?) and type='debit' 
    and t.date_time  BETWEEN CURRENT_TIMESTAMP() - INTERVAL 1 YEAR AND CURRENT_TIMESTAMP()
    group by user_id,category
    having ct >=5
    order by category)a 
    join users u on a.user_id=u.id
    group by a.user_id having count(user_id) > 1 and not id=?
    order by user_id;`;

    const res = await this.query(q, [categories, id]);
    return res;
  };
}
