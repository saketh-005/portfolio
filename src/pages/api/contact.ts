import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

// Initialize Resend with environment variable
const resendApiKey = process.env.RESEND_API_KEY;

// CORS middleware
const allowCors = (fn: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-V, Authorization'
  );
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return await fn(req, res);
};

// Main handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check for API key
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Email service is not properly configured.'
    });
  }

  const resend = new Resend(resendApiKey);

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'All fields are required',
      fields: {
        name: !name ? 'Name is required' : undefined,
        email: !email ? 'Email is required' : undefined,
        message: !message ? 'Message is required' : undefined
      }
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Validation failed',
      details: 'Please provide a valid email address'
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'saketh.jangala@outlook.com',
      replyTo: email,
      subject: `New message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1976d2; margin-top: 0;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #1976d2;">
            <h3 style="margin-top: 0; color: #1976d2;">Message:</h3>
            <p style="white-space: pre-wrap; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ 
        error: 'Failed to send message',
        details: error.message || 'Email service error'
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: {
        id: data?.id,
        email: email // Use the email from the form since data.to isn't available in the response
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

// Apply CORS to our handler
export default allowCors(handler);
