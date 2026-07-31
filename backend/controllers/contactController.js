import { validationResult } from 'express-validator';

export const submitContactForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, interest, message, recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please complete the reCAPTCHA verification.' 
      });
    }

    // 1. Verify reCAPTCHA token with Google Siteverify API
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const captchaRes = await fetch(verifyUrl, { method: 'POST' });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed. Bot detected or invalid token.',
        errorCodes: captchaData['error-codes'] || []
      });
    }

    // 2. reCAPTCHA verified! Now submit form data to Google Forms server-side
    const googleFormUrl = process.env.GOOGLE_FORM_URL || "https://docs.google.com/forms/d/e/1FAIpQLSdDRLf8Fjde4Y-q1oUmoa_5JAbmAFp5TeG0RV3qjyVL3Aabhg/formResponse";

    const params = new URLSearchParams();
    params.append('entry.2050372848', name || '');
    params.append('entry.608487628', email || '');
    params.append('entry.278774456', phone || '');
    params.append('entry.1990273286', interest || '');
    params.append('entry.1454859148', message || '');

    const googleRes = await fetch(googleFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (googleRes.status < 400) {
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been successfully submitted.'
      });
    } else {
      console.error('Google Forms submission status:', googleRes.status);
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been submitted.'
      });
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    next(error);
  }
};
