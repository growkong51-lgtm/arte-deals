/* ARTE DEALS — settings
   Public values only. Row-level security in Supabase is what guards your data.
   Never put a Supabase Secret key or a Cloudinary API Secret in this file. */

const ARTE_CONFIG = {
  supabaseUrl:     'https://xglcldcptghjlurlcenw.supabase.co',
  supabaseAnonKey: 'sb_publishable_NpN0G_anHWPfY1fNp_rSPA_PlhC9KKY',

  // Photo hosting
  cloudinaryCloud:  'rg0lr69y',
  cloudinaryPreset: 'arte_deals',

  // Location search (MapTiler). Safe to be public, but lock it to your
  // domain in the MapTiler dashboard so nobody else can spend your quota.
  maptilerKey: 'r8lLo1jNAdPcZbvsWb55',

  /* ---------- Subscriptions ----------
     GCash details are NOT here. They live in the database, visible only to
     signed-in sellers, and you set them from the admin panel's Settings tab. */
  proPrice:        79,     // what they pay this month
  proPriceRegular: 129,    // shown struck through beside it

  // PRO access codes (shown to sellers instead of the GCash flow while
  // it's switched off from the admin Settings tab) are no longer a
  // single fixed value here — they're rows in the pro_codes table,
  // created and managed from the admin panel's PRO Codes tab, redeemed
  // through the redeem_pro_code() database function. See sql/pro_codes.sql.

  // Listing caps per 2-week cycle. The database enforces these too —
  // if you change them here, change enforce_listing_cap in Supabase as well.
  maxListingsFree: 3,
  maxListingsPro:  6,
  cycleDays:       14
};
