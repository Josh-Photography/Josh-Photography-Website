// ============================================================
// OFFER MODEL — JOSH PHOTOGRAPHY MONGODB SCHEMA
// Manages seasonal promotions, packages and limited-time discounts
// ============================================================

import mongoose from 'mongoose'

const offerSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      index: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    bannerImage: {
      type: String,
      default: '',
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    badgeText: {
      type: String,
      default: 'OFF',
    },
    badgeStyle: {
      type: String,
      default: 'starburst',
    },
    showBadge: {
      type: Boolean,
      default: true,
    },
    promoLabel: {
      type: String,
      default: 'SPECIAL OFFER',
    },
    showSpecialOfferSticker: {
      type: Boolean,
      default: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    festival: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    terms: {
      type: String,
      default: '',
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
    computedStatus: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

offerSchema.index({ category: 1, published: 1, order: 1 })

export const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema)
export default Offer
