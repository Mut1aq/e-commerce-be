import { PrivateTokenPayloadI } from './token-payload.interface';

export interface DecodedTokenI extends PrivateTokenPayloadI {
  iat: number;
  exp: number;
}
