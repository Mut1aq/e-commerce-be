import { PropOptions, raw } from '@nestjs/mongoose';

export const mediaObjectProp: PropOptions = raw({
  url: { type: String, required: true },
  solutionID: { type: String, required: true },
  fileName: { type: String, required: true },
  format: { type: String, required: true },
});
