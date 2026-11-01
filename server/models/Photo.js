// ============================================================
// PHOTO MODEL — JOSH PHOTOGRAPHY MONGODB SCHEMA
// Optimized with compound indexing for instant SEO response times
// ============================================================

import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    categorySlug: {
      type: String,
      required: true,
      index: true,
    },
    image: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    srcLarge: {
      type: String,
      default: '',
    },
    num: {
      type: String,
      default: '01',
    },
    order: {
      type: Number,
      default: 1,
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    publicId: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: String,
      default: null,
    },
    objectPosition: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// High-Performance Compound Indexes for Lightning-Fast SEO Querying
photoSchema.index({ category: 1, published: 1, order: 1 })
photoSchema.index({ categorySlug: 1, published: 1, order: 1 })
photoSchema.index({ published: 1, order: 1 })

export const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema)
export default Photo
