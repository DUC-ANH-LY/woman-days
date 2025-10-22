# Vietnamese Women's Day Gift Card Website

A beautiful, cute website for Vietnamese Women's Day (8/3) that allows users to create personalized love cards with QR codes. Built with Node.js, EJS, and MySQL.

## Features

- 💖 **Cute Vietnamese Design**: Pink, love-themed interface with floating hearts
- 🎨 **Multiple Templates**: Three beautiful card templates (Pink Hearts, Floral Garden, Romantic Sunset)
- 🤖 **AI Message Generation**: Google Gemini AI generates personalized Vietnamese love messages
- 📱 **QR Code Generation**: Each gift card gets a unique QR code for easy sharing
- 📸 **Image Upload**: Optional image upload with validation (max 5MB)
- 📱 **Responsive Design**: Works perfectly on mobile and desktop
- 🌐 **Vietnamese Language**: Fully localized in Vietnamese

## Screenshots

The website features:
- Landing page with rotating Vietnamese love messages
- Modal form for creating gift cards
- Beautiful gift card display with templates
- QR code generation and sharing functionality

## Installation

### Prerequisites

- Docker and Docker Compose
- Google Gemini API key (for AI message generation)
- Domain name (for production deployment)

### Quick Start with Docker

#### Development Environment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd womens-day-gift
   ```

2. **Setup development environment**
   ```bash
   # Make scripts executable
   chmod +x scripts/*.sh
   
   # Run development setup
   ./scripts/dev-setup.sh
   ```
   
   Or use Makefile:
   ```bash
   make setup-dev
   ```

3. **Configure environment**
   - Edit `.env` file with your GEMINI_API_KEY
   - The script will create a default `.env` file if it doesn't exist

4. **Access the website**
   - Website: `http://localhost:3000`
   - phpMyAdmin: `http://localhost:8080`

#### Production Environment

1. **Setup production environment**
   ```bash
   # Copy production environment template
   cp env.prod.example .env.prod
   
   # Edit .env.prod with your actual values
   nano .env.prod
   
   # Run production setup
   ./scripts/setup-production.sh your-domain.com your-email@example.com
   ```

2. **Configure DNS**
   - Point your domain to your server's IP address
   - Wait for DNS propagation

3. **Access the website**
   - Your website will be available at `https://your-domain.com`

### Manual Installation (without Docker)

#### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- Google Gemini API key (for AI message generation)

#### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd womens-day-gift
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a MySQL database named `womens_day_gifts`
   - Run the SQL script in `database.sql` to create the required table
   - Or the application will auto-create the database and table on first run

4. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=womens_day_gifts
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   BASE_URL=http://localhost:3000
   ```

5. **Start the application**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Access the website**
   Open your browser and go to `http://localhost:3000`

## Usage

### Creating a Gift Card

1. **Visit the homepage** - You'll see a cute landing page with rotating Vietnamese love messages
2. **Click "Tạo Yêu Thương"** - Opens the gift creation modal
3. **Fill in the form**:
   - **Người nhận**: Name of the recipient
   - **Người gửi**: Your name
   - **Tin nhắn yêu thương**: Love message (can use AI generation)
   - **Chọn mẫu thiệp**: Choose from 3 beautiful templates
   - **Ảnh kèm theo**: Optional image upload
4. **Submit** - Creates the gift card and shows QR code

### AI Message Generation

- Select the relationship type (Mom, Girlfriend, Wife, etc.)
- Click "Tạo bằng AI" to generate a personalized Vietnamese message
- Edit the generated message if needed

### Sharing Gift Cards

- Each gift card gets a unique URL: `/gift/{uuid}`
- QR code is generated for easy mobile sharing
- Copy link button for manual sharing

## Templates

### 1. Pink Hearts (💖 Trái Tim Hồng)
- Soft pink gradient background
- Floating heart decorations
- Perfect for romantic messages

### 2. Floral Garden (🌸 Vườn Hoa)
- Light green gradient background
- Flower decorations
- Great for family and friends

### 3. Romantic Sunset (🌅 Hoàng Hôn Lãng Mạn)
- Warm orange/yellow gradient
- Cloud decorations
- Elegant and sophisticated

## API Endpoints

- `GET /` - Homepage
- `POST /api/generate-message` - Generate AI message
- `POST /create-gift` - Create new gift card
- `GET /gift/:uuid` - Display gift card
- `GET /success` - Success page with QR code

## Database Schema

```sql
CREATE TABLE gifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    receiver VARCHAR(255) NOT NULL,
    sender VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    image_path VARCHAR(255),
    template VARCHAR(50) DEFAULT 'pink_hearts',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## File Structure

```
/
├── server.js              # Main Express application
├── package.json           # Dependencies and scripts
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Development Docker Compose
├── docker-compose.prod.yml # Production Docker Compose
├── Makefile               # Convenient commands
├── .env                   # Development environment
├── .env.prod              # Production environment
├── env.example            # Environment template
├── env.prod.example       # Production environment template
├── database.sql           # Database setup script
├── README.md              # This file
├── config/
│   └── db.js              # Database configuration
├── views/                 # EJS templates
│   ├── index.ejs          # Homepage
│   ├── gift.ejs           # Gift card display
│   ├── success.ejs        # Success page
│   └── error.ejs          # Error page
├── public/                # Static assets
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── main.js        # Client-side JavaScript
│   └── uploads/           # Uploaded images
├── nginx/                 # Nginx configuration
│   ├── nginx.conf         # Main nginx config
│   └── conf.d/
│       ├── default.conf   # Production nginx config
│       └── ssl-template.conf # SSL template
├── certbot/               # SSL certificates
│   ├── conf/              # SSL certificates
│   └── www/               # Webroot for challenges
├── scripts/               # Deployment scripts
│   ├── dev-setup.sh       # Development setup
│   ├── setup-production.sh # Production setup
│   ├── init-letsencrypt.sh # SSL initialization
│   └── renew-ssl.sh       # SSL renewal
└── logs/                  # Application logs
    └── nginx/             # Nginx logs
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, HTML5, CSS3, JavaScript
- **Database**: MySQL
- **AI**: Google Gemini API
- **File Upload**: Multer
- **QR Code**: qrcode library
- **Styling**: Custom CSS with Google Fonts
- **Containerization**: Docker, Docker Compose
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt, Certbot
- **Process Management**: Docker containers

## Features in Detail

### Vietnamese Localization
- All text is in Vietnamese
- Vietnamese fonts (Quicksand, Pacifico)
- Cultural appropriate design elements

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

### Security Features
- File upload validation
- SQL injection prevention
- XSS protection
- File size limits

### User Experience
- Smooth animations
- Loading states
- Error handling
- Form validation
- Auto-save functionality

## Docker Commands

### Development Commands
```bash
# Start development environment
make dev
# or
docker-compose up -d

# View development logs
make dev-logs
# or
docker-compose logs -f

# Stop development environment
make dev-stop
# or
docker-compose down
```

### Production Commands
```bash
# Start production environment
make prod
# or
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# View production logs
make prod-logs
# or
docker-compose -f docker-compose.prod.yml logs -f

# Stop production environment
make prod-stop
# or
docker-compose -f docker-compose.prod.yml down
```

### SSL Certificate Management
```bash
# Initialize SSL certificates (first time setup)
make ssl-init
# or
./scripts/init-letsencrypt.sh your-domain.com your-email@example.com

# Renew SSL certificates (run via cron)
make ssl-renew
# or
./scripts/renew-ssl.sh
```

### Utility Commands
```bash
# Build Docker images
make build

# Clean up Docker containers and images
make clean

# View all logs
make logs

# Restart all services
make restart

# Stop all services
make stop
```

## Deployment

### Production Environment Variables
Create `.env.prod` file with:
```env
NODE_ENV=production
DB_HOST=mysql
DB_USER=womens_day_user
DB_PASSWORD=your_secure_database_password
DB_NAME=womens_day_gifts
GEMINI_API_KEY=your_gemini_api_key
DOMAIN=your-domain.com
EMAIL=your-email@example.com
PORT=3000
```

### Production Setup Steps

1. **Server Requirements**
   - Ubuntu 20.04+ or similar Linux distribution
   - Docker and Docker Compose installed
   - Domain name pointing to your server
   - Ports 80 and 443 open

2. **Quick Production Setup**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd womens-day-gift
   
   # Setup production environment
   make setup-prod
   ```

3. **Manual Production Setup**
   ```bash
   # Copy environment template
   cp env.prod.example .env.prod
   
   # Edit with your values
   nano .env.prod
   
   # Generate SSL configuration
   sed "s/your-domain.com/your-actual-domain.com/g" nginx/conf.d/ssl-template.conf > nginx/conf.d/default.conf
   
   # Start services
   docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
   
   # Initialize SSL certificates
   ./scripts/init-letsencrypt.sh your-domain.com your-email@example.com
   ```

### SSL Certificate Auto-Renewal

The setup script automatically configures a cron job for SSL certificate renewal:
```bash
# Check cron job
crontab -l

# Manual renewal
./scripts/renew-ssl.sh
```

### Monitoring and Maintenance

```bash
# View application logs
docker-compose -f docker-compose.prod.yml logs -f app

# View nginx logs
docker-compose -f docker-compose.prod.yml logs -f nginx

# Check service status
docker-compose -f docker-compose.prod.yml ps

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Update application
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

### Production Considerations
- SSL certificates auto-renew via cron job
- Nginx reverse proxy with security headers
- Database backups (configure separately)
- Monitor application logs
- Regular security updates
- Firewall configuration (ports 80, 443)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own Women's Day celebrations!

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Happy Vietnamese Women's Day! Chúc mừng ngày 8/3! 💖**
