// ============================================================
// DATABASE MIGRATION SCRIPT: JSON -> MONGODB ATLAS
// Migrates all 102 verified Cloudinary portfolio photos,
// 17 promotional offers, and content to MongoDB Atlas.
// ============================================================

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { connectDB, isMongoConnected } from '../utils/db.js'
import Photo from '../models/Photo.js'
import Content from '../models/Content.js'
import Offer from '../models/Offer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function migrate() {
  console.log('--- Josh Photography: MongoDB Atlas Migration ---')
  
  await connectDB()
  if (!isMongoConnected()) {
    console.error('Cannot run migration: MongoDB Atlas is not connected. Please verify MONGODB_URI in your .env file.')
    process.exit(1)
  }

  // 1. Migrate 102 Portfolio Photos
  const photosPath = join(__dirname, '../data/photos.json')
  if (existsSync(photosPath)) {
    const data = JSON.parse(readFileSync(photosPath, 'utf8'))
    const photosList = Array.isArray(data.photos) ? data.photos : []
    console.log(`Found ${photosList.length} photos in local JSON. Migrating to MongoDB Atlas...`)

    let photosCount = 0
    for (const p of photosList) {
      await Photo.findOneAndUpdate(
        { id: p.id },
        {
          id: p.id,
          title: p.title || 'Untitled Photograph',
          desc: p.desc || '',
          alt: p.alt || p.title || 'Josh Photography showcase',
          category: p.category,
          categorySlug: p.categorySlug || p.category,
          image: p.image || p.src,
          src: p.src || p.image,
          srcLarge: p.srcLarge || p.image || p.src,
          num: p.num || '01',
          order: p.order || 1,
          published: p.published !== false,
          publicId: p.publicId || '',
          aspectRatio: p.aspectRatio || null,
          objectPosition: p.objectPosition || null,
        },
        { upsert: true, new: true }
      )
      photosCount++
    }
    console.log(`Successfully migrated ${photosCount} portfolio photos into MongoDB Atlas!`)
  }

  // 2. Migrate Content (Hero slides, Studio info, Services, Testimonials)
  const contentPath = join(__dirname, '../data/content.json')
  if (existsSync(contentPath)) {
    const content = JSON.parse(readFileSync(contentPath, 'utf8'))
    console.log('Migrating content settings and sections into MongoDB Atlas...')

    await Content.findOneAndUpdate(
      { key: 'main_content' },
      {
        key: 'main_content',
        studio: content.studio || {},
        about: content.about || {},
        heroSlides: content.heroSlides || [],
        services: content.services || [],
        testimonials: content.testimonials || [],
        collaborators: content.collaborators || [],
        social: content.social || {},
        settings: content.settings || {},
        anotherStudio: content.anotherStudio || {},
      },
      { upsert: true, new: true }
    )
    console.log('Successfully migrated content sections into MongoDB Atlas!')
  }

  // 3. Migrate Offers
  const offersPath = join(__dirname, '../data/offers.json')
  if (existsSync(offersPath)) {
    const data = JSON.parse(readFileSync(offersPath, 'utf8'))
    const offersList = Array.isArray(data.offers) ? data.offers : []
    console.log(`Found ${offersList.length} offers in local JSON. Migrating to MongoDB Atlas...`)

    let offersCount = 0
    for (const o of offersList) {
      await Offer.findOneAndUpdate(
        { id: o.id },
        {
          id: o.id,
          title: o.title,
          category: o.category,
          categories: o.categories || [o.category],
          bannerImage: o.bannerImage || '',
          discountPercent: o.discountPercent || 0,
          badgeText: o.badgeText || 'OFF',
          badgeStyle: o.badgeStyle || 'starburst',
          showBadge: o.showBadge !== false,
          promoLabel: o.promoLabel || 'SPECIAL OFFER',
          showSpecialOfferSticker: o.showSpecialOfferSticker !== false,
          tagline: o.tagline || '',
          festival: o.festival || '',
          description: o.description || '',
          startDate: o.startDate || '',
          endDate: o.endDate || '',
          terms: o.terms || '',
          order: o.order || 1,
          published: o.published !== false,
          computedStatus: o.computedStatus || 'active',
        },
        { upsert: true, new: true }
      )
      offersCount++
    }
    console.log(`Successfully migrated ${offersCount} promotional offers into MongoDB Atlas!`)
  }

  console.log('\n--- Migration Complete: All data successfully synced into MongoDB Atlas! ---')
  await mongoose.disconnect()
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})
