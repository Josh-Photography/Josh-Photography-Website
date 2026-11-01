// ============================================================
// CONTENT MODEL — JOSH PHOTOGRAPHY MONGODB SCHEMA
// Manages homepage hero slides, studio information, services & settings
// ============================================================

import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'main_content',
      unique: true,
      index: true,
    },
    studio: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    about: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    heroSlides: {
      type: Array,
      default: [],
    },
    services: {
      type: Array,
      default: [],
    },
    testimonials: {
      type: Array,
      default: [],
    },
    collaborators: {
      type: Array,
      default: [],
    },
    social: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    anotherStudio: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

export const Content = mongoose.models.Content || mongoose.model('Content', contentSchema)
export default Content

