import Publication from '../../publication';
import { PublicationFields } from '../../types';
import createPublicationFields from './publication-fields-factory';

function createPublication(partialFields: Partial<PublicationFields> = {}): Publication {
  return new Publication(createPublicationFields(partialFields));
}

export default createPublication;
