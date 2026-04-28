# Supabase Setup Guide for Contact Form

## 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the entire contents of `supabase_schema.sql`
4. Click "Run" to create the contacts table and all associated policies

## 2. Get Your Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy your:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - Anon/Public key (a long string starting with `eyJ...`)

## 3. Update the JavaScript Configuration

1. Open `js/contact-form.js`
2. Replace the placeholder values at the top of the file:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## 4. Testing

The form will work even without Supabase configured (it will log to console).
Once configured, submissions will be stored in your Supabase database.

## 5. View Submissions

To view form submissions:
1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Select the `contacts` table
4. You'll see all submissions with their details

## Features

- **Duplicate Prevention**: Users can't submit multiple times within 5 minutes
- **Data Validation**: Email format validation and required field checking
- **Analytics View**: Use the `contact_analytics` view for insights
- **Status Tracking**: Track lead progress through the pipeline
- **Security**: Row Level Security (RLS) ensures data protection

## Optional: Email Notifications

To get notified when someone submits the form:

1. Go to Database → Functions in Supabase
2. Create a new function to send emails using Supabase's email integration
3. Create a trigger that calls this function on new contact insertions

## Troubleshooting

- **"Please wait before submitting again"**: This is the duplicate prevention - wait 5 minutes
- **Form not submitting**: Check browser console for errors
- **Supabase not loading**: Ensure you have internet connection and correct credentials