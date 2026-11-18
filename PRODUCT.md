# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (React), chosen by the user. The backend lives in the sibling repo `../resort-booking-backend`, which is empty as of 2026-11-17; the API contract between the two is undecided.

## Users

- **Guests (primary):** mixed leisure travellers, both domestic (Indian) and international, looking for a resort, homestay, villa, or premium stay in Kerala. No single segment (families, couples, groups) dominates.
- **Owners / partners:** operators of the listed properties who manage their own listings, availability, and bookings through a partner portal.
- **Platform admins:** the marketplace team who run the platform, including curating which properties are listed.

## Product Purpose

A multi-property booking marketplace for curated stays in Kerala. Guests discover, compare, and book resorts, homestays, villas, and premium stays; owners manage their properties; admins operate and curate the marketplace. Success means guests trust that any listed property is worth booking, and owners get bookings from travellers they would not otherwise reach.

## Positioning

Curated, not exhaustive. Unlike Booking.com, Airbnb, or MakeMyTrip, only hand-picked, verified properties are listed, so quality matters more than inventory size. The platform is also Kerala-specific rather than a generic national or global OTA.

## Operating Context

The frontend covers four surfaces:

1. **Guest booking site:** public pages for discovery, property details, availability search, and checkout.
2. **Guest account:** the logged-in area for the guest's bookings, modifying or cancelling them, and their profile.
3. **Owner / partner portal:** owners list and manage their own properties, availability, and reservations.
4. **Admin dashboard:** platform staff manage the marketplace, its listings, curation, and reservations.

## Capabilities and Constraints

- **Market:** Kerala, India is the launch market. Expansion across South India and then the rest of India is planned, so location, region, and taxonomy should not be hard-coded to Kerala.
- **Property types:** resorts, homestays, villas, and premium stays.
- **Packages:** owners create packages that bundle a stay with meals or activities (for example an Ayurveda week or a houseboat night) and sell them on the platform. "Experiences" are editorial inspiration that routes guests into stays and packages; they are not bookable on their own.
- **Discovery axes:** guests browse by destination, by theme (backwaters, hills, beach, wellness/Ayurveda, plantation, wildlife), and by stay type.
- **Currency:** INR (₹) only for now.
- **Pricing transparency:** every price the guest sees must show its tax and fee breakdown (base rate, taxes, platform or service fees, total) before payment. No fee may appear for the first time at checkout.
- **Reviews:** only guests with a completed booking made through the platform may leave a review. Until that system exists, any review content is a clearly labelled placeholder.
- **Languages:** English and Malayalam at launch. The architecture must support adding Hindi and other languages later, so no UI strings should be hard-coded.
- **Name:** not finalized. "Kerala Resort Booking Platform" is a working title only and must not be treated as the brand name.
- **Open decisions:**
  - the curation and verification criteria and process;
  - the payment provider and checkout flow;
  - the cancellation and refund policy;
  - the commission and owner pricing model;
  - whether international guests see converted currencies.

## Brand Commitments

The brand should feel like a premium, luxury travel experience inspired by Kerala's nature, culture, and hospitality. This is the user's stated identity direction, and later visual work must honour it. No name, logo, or brand assets exist yet.

## Evidence on Hand

None yet. There are no property listings, photography, reviews, ratings, testimonials, partner logos, press, or booking data. Future work must not invent property names, guest reviews, star ratings, booking counts, prices, or "verified" badges presented as real. Placeholder content must be clearly marked as placeholder.

## Product Principles

1. **Curation is the product.** Every surface should reinforce that a listed property was chosen on purpose. Never pad inventory or dilute the signal of being verified.
2. **Hospitality before transaction.** Guests are choosing an experience, not a SKU. The booking flow should carry the warmth of a good host and stay efficient.
3. **Kerala first, India ready.** Design for Kerala now, without baking in assumptions that block South India or pan-India expansion, or new languages.
4. **Four audiences, one platform.** Guests, owners, and admins have different jobs. Each surface serves its user's task rather than reusing the guest experience everywhere.
5. **Trust through truth.** Prices, availability, policies, and verification status shown to guests must be accurate and never inflated.

## Accessibility & Inclusion

- Bilingual UI in English and Malayalam. Layouts must handle Malayalam script (taller glyphs and longer strings) and switching languages without breaking.
- Serves both international and domestic travellers. Copy should not assume local knowledge.
- Accessibility target: WCAG 2.2 AA across all surfaces.
