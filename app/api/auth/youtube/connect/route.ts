import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL + '/api/auth/callback/youtube'
);

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const scopes = [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.force-ssl'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      state: session.user.email,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating YouTube OAuth URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate YouTube OAuth URL' },
      { status: 500 }
    );
  }
}
