/* ARTE DEALS — settings
   These two values connect the site to your Supabase project.

   The publishable key is meant to be public. Every visitor's browser
   downloads it, and it is safe on GitHub. What guards your data is the
   row-level security installed by schema.sql.
   Never put a Secret key in this file. */

const ARTE_CONFIG = {
  supabaseUrl:     'https://xglcldcptghjlurlcenw.supabase.co',
  supabaseAnonKey: 'sb_publishable_NpN0G_anHWPfY1fNp_rSPA_PlhC9KKY',

  // Raise this when the paid tier goes in. The real limit is the
  // listing_cap trigger in schema.sql — change that too.
  maxListingsPerUser: 3
};
