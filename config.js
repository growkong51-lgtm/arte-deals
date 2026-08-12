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

  // Raise this when the paid tier goes in. The real limit is the
  // listing_cap trigger in the database — change that too.
  maxListingsPerUser: 3
};
