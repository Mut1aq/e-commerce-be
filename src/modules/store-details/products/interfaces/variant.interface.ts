export interface VariantValueI {
  value: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
}

export interface VariantI {
  sizes: VariantValueI[];
  colors: VariantValueI[];
  materials: VariantValueI[];
  styles: VariantValueI[];
}
