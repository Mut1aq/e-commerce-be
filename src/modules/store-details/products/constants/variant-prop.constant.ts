import { PropOptions, raw } from '@nestjs/mongoose';

export const variantProp: PropOptions = raw({
  sizes: {
    type: [
      raw({
        value: {
          type: String,
          minlength: 1,
          maxlength: 50,
          required: true,
        },
        quantity: {
          type: Number,
          min: 0,
          max: 10000,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          max: 100000,
          required: true,
        },
        discountedPrice: {
          type: Number,
          min: 0,
          max: 100000,
          required: false,
          default: undefined,
        },
      }),
    ],
  },
  colors: {
    type: [
      raw({
        value: {
          type: String,
          minlength: 1,
          maxlength: 50,
          required: true,
        },
        quantity: {
          type: Number,
          min: 0,
          max: 10000,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          max: 100000,
          required: true,
        },
        discountedPrice: {
          type: Number,
          min: 0,
          max: 100000,
          required: false,
          default: undefined,
        },
      }),
    ],
  },
  materials: {
    type: [
      raw({
        value: {
          type: String,
          minlength: 1,
          maxlength: 50,
          required: true,
        },
        quantity: {
          type: Number,
          min: 0,
          max: 10000,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          max: 100000,
          required: true,
        },
        discountedPrice: {
          type: Number,
          min: 0,
          max: 100000,
          required: false,
          default: undefined,
        },
      }),
    ],
  },
  styles: {
    type: [
      raw({
        value: {
          type: String,
          minlength: 1,
          maxlength: 50,
          required: true,
        },
        quantity: {
          type: Number,
          min: 0,
          max: 10000,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          max: 100000,
          required: true,
        },
        discountedPrice: {
          type: Number,
          min: 0,
          max: 100000,
          required: false,
          default: undefined,
        },
      }),
    ],
  },
});
