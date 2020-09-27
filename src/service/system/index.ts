import { StandardError, StandardSuccess } from '../../entity/standard-operation';
import { System } from '../../entity/system';

export default interface ISystemService {
  fetch: () => Promise<StandardError | System>;
}
