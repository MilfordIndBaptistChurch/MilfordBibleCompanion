import { getJsonData } from '../common/utils';
import indexSource from '../data/bible/Index.json';

const getBooks = async () => await getJsonData('$keys(*)', indexSource);

export {
  getBooks
}