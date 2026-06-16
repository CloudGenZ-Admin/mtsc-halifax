# Event Management System

A complete, production-ready event management system with secure admin panel and public-facing pages. Built with React, Node.js, Express, MySQL, and Sequelize.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🔐 Admin Panel
- Secure JWT authentication
- Create, edit, and delete events
- Rich content editor with BlockNote
- Custom image gallery blocks with carousel
- Date picker for event scheduling
- Featured event toggle
- Auto-generate URL slugs
- Live preview mode
- Responsive design

### 🌐 Public Pages
- Event listing with card layout
- Featured events section
- Date-based filtering with calendar
- Individual event detail pages
- Image galleries with Swiper carousel
- Fully responsive

### 🛡️ Security
- JWT authentication
- Input validation & sanitization
- SQL injection protection
- XSS protection
- CORS configuration
- Rate limiting
- Helmet security headers
- Environment variable secrets

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE event_db;
   ```

4. **Frontend Setup**
   ```bash
   cd ..
   npm install
   cp .env.example .env
   ```

5. **Start Development Servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Admin Login: http://localhost:5173/event/login

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation instructions
- **[Architecture](ARCHITECTURE.md)** - System architecture and data flow
- **[Features](README_EVENTS.md)** - Complete feature documentation
- **[Image Management](IMAGE_MANAGEMENT_GUIDE.md)** - Image hosting solutions
- **[Commands Reference](COMMANDS_REFERENCE.md)** - All useful commands
- **[Backend API](backend/README.md)** - API documentation
- **[Security Checklist](backend/SECURITY_CHECKLIST.md)** - Security guidelines

## 🏗️ Tech Stack

### Backend
- Node.js & Express.js
- MySQL & Sequelize ORM
- JWT for authentication
- Helmet for security
- Express Validator
- Express Rate Limit

### Frontend
- React 19
- React Router DOM
- Tailwind CSS 4
- BlockNote Editor
- Swiper (carousel)
- React DatePicker
- Axios
- React Icons

## 📁 Project Structure

```
project/
├── backend/              # Node.js backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
├── src/                 # React frontend
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utilities
│   └── App.jsx         # Main app
│
└── Documentation/       # All documentation files
```

## 🎯 Usage

### Admin Access
1. Navigate to `/event/login`
2. Login with credentials from `backend/.env`
3. Manage events from `/event/admin`

### Creating Events
1. Click "Add New Event"
2. Fill in event details
3. Use rich editor for content
4. Add images or galleries
5. Set event date (optional)
6. Toggle featured status
7. Preview before saving

### Public Access
- View all events at `/events`
- Filter by date using calendar
- Click event card to view details

## 🔧 Configuration

### Backend Environment Variables
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=event_db

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!

JWT_SECRET=your_jwt_secret_key
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## 📸 Image Management

Currently uses URL-based images. For production:

**Recommended: AWS S3 + CloudFront**
- Scalable and reliable
- CDN integration
- See [Image Management Guide](IMAGE_MANAGEMENT_GUIDE.md)

**Alternatives:**
- Cloudinary (built-in transformations)
- Local storage (development only)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/AWS/DigitalOcean)
```bash
cd backend
npm start
```

See [Setup Guide](SETUP_GUIDE.md) for detailed deployment instructions.

## 🧪 Testing

```bash
# Run linter
npm run lint

# Security audit
npm audit

# Check for updates
npm outdated
```

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials
- Ensure database exists
- Check port 5000 is available

### Frontend won't connect
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS settings

### Can't login
- Verify credentials in `backend/.env`
- Clear browser localStorage
- Check backend console for errors

See [Commands Reference](COMMANDS_REFERENCE.md) for more troubleshooting.

## 📊 API Endpoints

### Public
- `GET /api/events/public` - All events
- `GET /api/events/public/featured` - Featured events
- `GET /api/events/public/by-date` - Events by date
- `GET /api/events/public/:url` - Event by URL

### Admin (Protected)
- `POST /api/auth/login` - Login
- `GET /api/events` - All events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

See [Backend API Documentation](backend/README.md) for complete API reference.

## 🎨 Customization

### Colors
Edit `src/index.css`:
```css
--color-navy: #2d3580;
--color-coral: #e05a2b;
--color-warm-gray: #f7f4f1;
```

### Fonts
Edit `src/index.css` font imports and variables.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [BlockNote](https://www.blocknotejs.org/) - Rich text editor
- [Swiper](https://swiperjs.com/) - Image carousel
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Sequelize](https://sequelize.org/) - ORM

## 📞 Support

For issues or questions:
- Check [Documentation](SETUP_GUIDE.md)
- Review [Troubleshooting](COMMANDS_REFERENCE.md)
- Open an issue on GitHub

## 🗺️ Roadmap

- [ ] Event categories/tags
- [ ] Search functionality
- [ ] Event registration
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Event analytics
- [ ] Multi-language support
- [ ] Calendar export (iCal)

## 📈 Version History

- **1.0.0** (2024-01-01)
  - Initial release
  - Admin panel with CRUD operations
  - Public event pages
  - Rich content editor
  - Image galleries
  - Security features

---

**Built with ❤️ using React, Node.js, and MySQL**

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

For quick commands, see [QUICK_START.md](QUICK_START.md)
