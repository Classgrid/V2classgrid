const fs = require('fs');
let content = fs.readFileSync('src/services/email-templates.service.js', 'utf8');
const marker = 'export const getNewDeviceOtpPlainText = (userName, otp) => {';
const index = content.indexOf(marker);

if (index !== -1) {
  const endOfFunc = content.indexOf('};', index) + 2;
  
  content = content.substring(0, endOfFunc) + '\n\n// -------------------------------------------------------------\n// APP REQUIRED EMAIL (Sent when blocking mobile browser login)\n// -------------------------------------------------------------\nexport const getMobileAppRequiredEmailHtml = (email) => {\n  return `\n    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">\n      <h2 style="color: #b71c1c;">Action Required: Download Classgrid App</h2>\n      <p>Hi there,</p>\n      <p>We noticed you tried to log into Classgrid from a mobile web browser. For security, GPS location tracking, and attendance verification, <strong>mobile web access is strictly disabled</strong>.</p>\n      <p>You must download the official Classgrid Android App to mark your attendance and access your classroom.</p>\n      <a href="https://cdn.classgrid.in/v2classgrid.apk" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 15px;">Download Classgrid App</a>\n      <p style="margin-top: 25px; font-size: 13px; color: #666;"><em>Note: If you are using a laptop or desktop computer, you may ignore this message and log in normally.</em></p>\n    </div>\n  `;\n};\n\nexport const getMobileAppRequiredEmailPlainText = (email) => {\n  return `Action Required: Download Classgrid App\n\nHi there,\n\nWe noticed you tried to log into Classgrid from a mobile web browser. For security, GPS location tracking, and attendance verification, mobile web access is strictly disabled.\n\nYou must download the official Classgrid Android App to mark your attendance and access your classroom.\n\nDownload Link: https://cdn.classgrid.in/v2classgrid.apk\n\nNote: If you are using a laptop or desktop computer, you may ignore this message and log in normally.`;\n};\n';
  
  fs.writeFileSync('src/services/email-templates.service.js', content, 'utf8');
  console.log('Fixed');
} else {
  console.log('Marker not found');
}
