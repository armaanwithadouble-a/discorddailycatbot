# Daily Cat Webhook

Automatically sends random cat images to Discord at midnight PST daily using GitHub Actions and webhooks.

## How it works

- **GitHub Actions** runs daily at midnight PST (8 AM UTC)
- **Fetches** random cat from The Cat API
- **Sends** to Discord via webhook
- **No hosting needed** - runs on GitHub's servers

## Setup

### 1. Create Discord Webhook

1. Go to your Discord channel
2. Edit Channel → Integrations → Webhooks
3. Create Webhook
4. Copy the webhook URL

### 2. Add Webhook to GitHub Secrets

1. Go to your GitHub repo
2. Settings → Secrets and variables → Actions
3. New repository secret
4. Name: `DISCORD_WEBHOOK_URL`
5. Value: Your webhook URL

### 3. That's it!

The workflow will automatically run daily at midnight PST and send random cats to your Discord channel.

## Manual Trigger

Want to test it? Go to Actions tab → Daily Cat → Run workflow → Run workflow

## Customization

- **Change time**: Edit the cron schedule in `.github/workflows/daily-cat.yml`
- **Change message**: Edit the content in the workflow
- **Add multiple channels**: Create multiple webhooks and add them as separate secrets

## No Bot Needed!

This approach uses webhooks instead of bot accounts:
- ✅ No hosting costs
- ✅ No bot permissions
- ✅ Runs automatically
- ✅ Simple setup
