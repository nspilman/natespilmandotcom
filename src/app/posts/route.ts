// app/api/posts/route.ts

import { getPosts } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  try {
    const posts = getPosts(limit).map(({ title, date, description, slug }) => ({
      title,
      date,
      description,
      slug,
    }));
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get posts' },
      { status: 500 }
    );
  }
}
