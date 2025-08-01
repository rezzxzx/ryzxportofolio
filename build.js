// Production build script for hosting compatibility
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for production deployment...');

try {
  // Clean previous builds
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Build the application
  console.log('📦 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create deployment files
  console.log('📄 Creating deployment configuration...');
  
  // Create _redirects for Netlify SPA routing
  const redirectsContent = `/*    /index.html   200`;
  fs.writeFileSync(path.join('dist', 'public', '_redirects'), redirectsContent);

  // Create vercel.json for Vercel deployment
  const vercelConfig = {
    "version": 2,
    "builds": [
      {
        "src": "dist/index.js",
        "use": "@vercel/node"
      },
      {
        "src": "dist/public/**/*",
        "use": "@vercel/static"
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "dist/index.js"
      },
      {
        "src": "/(.*)",
        "dest": "dist/public/$1"
      }
    ]
  };
  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

  // Create netlify.toml for Netlify deployment
  const netlifyConfig = `[build]
  publish = "dist/public"
  command = "npm run build"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "npm run dev"
  port = 5000
`;
  fs.writeFileSync('netlify.toml', netlifyConfig);

  console.log('✅ Build completed successfully!');
  console.log('\n📋 Deployment options:');
  console.log('• Vercel: Run "vercel" or upload the project');
  console.log('• Netlify: Upload the dist/public folder or connect Git');
  console.log('• Static hosts: Upload dist/public folder');
  console.log('• Node.js hosts: Upload entire project and run "npm start"');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}