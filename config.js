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
     Fill in your own GCash details below. They only ever appear on the
     upgrade screen, to a signed-in seller who is ready to pay.
     For the QR: put your image in this same folder on GitHub and make
     gcashQr below match the filename exactly, including the extension.
     Leave gcashQr blank to show no image.
     Leave gcashNumber blank to show the QR on its own. */
  gcashName:   'MJM',
  gcashNumber: '',
  gcashQr:     'gcash-qr.jpg',

  proPrice:        79,     // what they pay this month
  proPriceRegular: 129,    // shown struck through beside it

  // Listing caps per 2-week cycle. The database enforces these too —
  // if you change them here, change enforce_listing_cap in Supabase as well.
  maxListingsFree: 3,
  maxListingsPro:  6,
  cycleDays:       14
};
