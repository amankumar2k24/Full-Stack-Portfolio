# 🤖 AI Assistant Setup Guide

## Overview
Your AI Assistant is now integrated and will have **real-time knowledge** of all your website data. Every time someone asks a question, it fetches fresh data from your database, so it automatically knows about:

- ✅ **Skills added/removed/updated**
- ✅ **New projects**
- ✅ **Experience updates**
- ✅ **Service changes**
- ✅ **Profile information updates**

## 🔧 Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-`)

### 2. Add API Key to Backend
1. Open `backend/.env` file
2. Add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Restart Backend Server
```bash
cd backend
npm run start:dev
```

## 🎯 Features

### Chat Widget
- **Location**: Bottom-right corner of website
- **Appearance**: Appears 2 seconds after page load
- **Design**: Modern, responsive chat interface
- **Mobile**: Fully responsive on all devices

### AI Capabilities
The AI assistant can answer questions about:

#### Personal Information
- "Where is Aman located?"
- "What's Aman's email?"
- "How can I contact Aman?"

#### Current Work
- "Where does Aman currently work?"
- "What's Aman's current position?"
- "Is Aman available for work?"

#### Technical Skills
- "What programming languages does Aman know?"
- "What's Aman's skill level in React?"
- "What technologies does Aman use?"

#### Experience
- "What's Aman's work experience?"
- "What companies has Aman worked for?"
- "What are Aman's key achievements?"

#### Projects
- "What projects has Aman built?"
- "Show me Aman's latest projects"
- "What technologies were used in [project name]?"

#### Services
- "What services does Aman offer?"
- "Can Aman help with mobile app development?"
- "What's included in Aman's web development service?"

## 🔄 Real-Time Data Sync

### How It Works
1. **User asks question** → AI Assistant receives message
2. **Fetch fresh data** → Queries all database collections
3. **Build context** → Creates comprehensive knowledge base
4. **Generate response** → ChatGPT responds with current information
5. **Return answer** → User gets up-to-date information

### Data Sources
- **About**: Personal info, bio, contact details
- **Skills**: All skill categories and proficiency levels
- **Experience**: Work history, achievements, current position
- **Projects**: Portfolio projects, descriptions, tech stacks
- **Services**: Offered services, features, descriptions
- **Settings**: Contact info, social links, preferences

## 💡 Example Conversations

### Skills Query
**User**: "What are Aman's React skills?"
**AI**: "Aman has excellent React skills with a proficiency level of 95%. He also has strong skills in Next.js (90%), TypeScript (85%), and related frontend technologies. He uses React for building modern, responsive web applications."

### Current Work Query
**User**: "Where is Aman currently working?"
**AI**: "Aman is currently working at [Company Name] as a [Position] since [Start Date]. He focuses on [description from current experience]."

### Project Query
**User**: "Tell me about Aman's projects"
**AI**: "Aman has built several impressive projects including:
1. [Project 1] - [Description] using [Tech Stack]
2. [Project 2] - [Description] using [Tech Stack]
You can view live demos and source code on his portfolio."

## 🎨 Customization

### Chat Widget Styling
The chat widget matches your website's design system:
- Uses your color scheme (primary, muted, etc.)
- Responsive design
- Smooth animations
- Dark/light theme support

### AI Personality
The AI assistant is configured to be:
- Professional and friendly
- Knowledgeable about your work
- Helpful and informative
- Encouraging visitors to contact you

## 🚀 Deployment Notes

### Environment Variables
Make sure to add `OPENAI_API_KEY` to your production environment:
- Vercel: Add in project settings
- Netlify: Add in site settings
- Railway/Heroku: Add in config vars

### API Costs
- Uses GPT-3.5-turbo (cost-effective)
- ~$0.002 per 1K tokens
- Typical conversation: $0.01-0.05
- Monthly cost for moderate usage: $5-20

### Rate Limiting
Consider adding rate limiting to prevent abuse:
- Limit messages per IP
- Implement cooldown periods
- Add user session tracking

## 🔒 Security

### API Key Protection
- Never expose API key in frontend
- Use environment variables only
- Rotate keys periodically

### Input Validation
- Messages are validated before sending to OpenAI
- No sensitive data is logged
- Error handling prevents information leakage

## 📱 Mobile Experience

The AI Assistant is fully optimized for mobile:
- Touch-friendly interface
- Responsive chat window
- Proper keyboard handling
- Smooth animations

## 🎯 Next Steps

1. **Add API Key**: Get your OpenAI key and add to `.env`
2. **Test Locally**: Try asking questions about your data
3. **Customize**: Adjust AI personality or styling if needed
4. **Deploy**: Push to production with environment variables
5. **Monitor**: Check usage and costs in OpenAI dashboard

Your AI Assistant is now ready to help visitors learn about your skills, experience, and services with real-time, accurate information! 🚀