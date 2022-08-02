import  {fetcher} from './fetcher'

export class Api {
  constructor(host) {
    this.host = host;
    this.api = `${this.host}/api`;
  }
  categories = async () => {
    return fetcher(`${this.api}/categories?populate=*`);
  };
  questionsSets = async () => fetcher(`${this.api}/questions-sets?populate=*`);
  questions = async () => fetcher(`${this.api}/questions?populate=*`);
}
