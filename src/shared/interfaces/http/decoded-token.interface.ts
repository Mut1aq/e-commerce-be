import { TokenPayloadI } from './token-payload.interface';

export interface DecodedTokenI extends TokenPayloadI {
  iat: number;
  exp: number;
}
