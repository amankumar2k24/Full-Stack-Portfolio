# Keep-Alive Cron Job Setup

This setup prevents your Render backend server from sleeping due to inactivity by automatically pinging the health endpoint every 5 minutes.

## 🎯 Features

- **Automatic Keep-Alive**: Pings `/health` endpoint every 5 minutes
- **Health Monitoring**: Logs successful and failed pings
- **Status Endpoint**: Check cron job status via API
- **Manual Testing**: Trigger manual pings for testing
- **Lightweight**: Minimal resource usage

## 📋 Components Added

### 1. Health Endpoint (`/health`)
- **URL**: `https://full-stack-portfolio-1-q8b2.onrender.com/health`
- **Method**: GET
- **Response**: 
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "message": "Server is running"
}
```

### 2. Cron Service
- **Schedule**: Every 5 minutes (`*/5 * * * *`)
- **Action**: HTTP GET request to `/health`
- **Logging**: Success/failure logs
- **Auto-start**: Starts when server boots

### 3. Admin Endpoints (Protected)
- **GET** `/cron/status` - Check cron job status
- **POST** `/cron/ping` - Manual health ping

## 🚀 Setup Instructions

### 1. Update Environment Variables

In your Render dashboard, add this environment variable:

```
APP_URL=https://your-actual-render-app-name.onrender.com
```

**Replace `your-actual-render-app-name` with your real Render app name!**

### 2. Deploy to Render

The cron job will automatically start when your server boots up.

### 3. Verify Setup

1. **Check Health Endpoint**:
   ```bash
   curl https://full-stack-portfolio-1-q8b2.onrender.com/health
   ```

2. **Check Logs**: Look for these messages in Render logs:
   ```
   [CronService] Keep-alive cron job started - pinging https://full-stack-portfolio-1-q8b2.onrender.com/health every 5 minutes
   [CronService] Keep-alive ping successful: ok at 2024-01-01T12:00:00.000Z
   ```

3. **Check Cron Status** (requires admin login):
   ```bash
   curl -H "Authorization: Bearer YOUR_JWT_TOKEN" https://full-stack-portfolio-1-q8b2.onrender.com/cron/status
   ```

## 📊 How It Works

1. **Server Starts** → Cron service initializes
2. **Every 5 Minutes** → Cron job triggers
3. **HTTP GET Request** → Sent to `/health` endpoint
4. **Server Responds** → Keeps Render service active
5. **Logging** → Success/failure logged for monitoring

## 🔧 Configuration

### Change Ping Interval

Edit `backend/src/cron/cron.service.ts`:

```typescript
// Current: Every 5 minutes
'*/5 * * * *'

// Every 3 minutes
'*/3 * * * *'

// Every 10 minutes  
'*/10 * * * *'
```

### Change Target URL

Update the `APP_URL` environment variable in Render dashboard.

## 🐛 Troubleshooting

### Cron Job Not Running
- Check server logs for initialization message
- Verify `APP_URL` environment variable is set correctly
- Ensure server has internet access

### Health Endpoint Not Responding
- Test manually: `curl https://full-stack-portfolio-1-q8b2.onrender.com/health`
- Check if server is running
- Verify no firewall blocking requests

### Render Still Sleeping
- Confirm cron job is running: check `/cron/status`
- Verify ping frequency (every 5 minutes)
- Check Render activity logs

## 📈 Benefits

- ✅ **Prevents Sleep**: Keeps Render service active 24/7
- ✅ **Free Solution**: No external services needed
- ✅ **Self-Contained**: Everything runs within your app
- ✅ **Monitoring**: Built-in logging and status endpoints
- ✅ **Lightweight**: Minimal resource usage
- ✅ **Reliable**: Automatic restart if server reboots

## 🔒 Security

- Health endpoint is public (no authentication required)
- Admin endpoints (`/cron/*`) require JWT authentication
- No sensitive data exposed in health response
- Minimal attack surface

Your Render backend will now stay awake 24/7! 🎉