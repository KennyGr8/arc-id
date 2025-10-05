import express from 'express';
import { renderEmail, Template, TemplateDataMap } from './renderEmail.js';

const app = express();

// Example data per template
const exampleData: Record<Template, TemplateDataMap[Template]> = {
  welcome: { userName: 'Kenny', dashboardLink: 'https://arcid.dev/dashboard' },
  verify: { userName: 'Kenny', verificationLink: 'https://arcid.dev/verify/123' },
  reset: { userName: 'Kenny', resetLink: 'https://arcid.dev/reset/123' },
  session: {
    userName: 'Kenny',
    location: 'Lagos, Nigeria',
    device: 'Chrome on Windows 10',
    time: new Date().toUTCString(),
    resetLink: 'https://arcid.dev/reset/123',
  },
  otp: { userName: 'Kenny', otpCode: '123456' },
};

app.get('/:template', async (req, res) => {
  const template = req.params.template as Template;

  if (!exampleData[template]) {
    return res.send('Template not found. Try /welcome, /verify, /reset, /session, /otp');
  }

  try {
    const html = await renderEmail(template, exampleData[template]);
    res.send(html);
  } catch (err) {
    res.status(500).send('Error rendering email template');
  }
});

app.listen(3001, () => {
  console.log('📧 Email preview running on http://localhost:3001/:template');
});
