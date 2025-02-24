// app/api/posts/route.ts

import { getPosts } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  try {
    const posts = getPosts(limit).map(post => {
      return {
        title: post.frontmatter.title,
        date: post.frontmatter.date,
        description: post.frontmatter.description,
        slug: post.fields.slug
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get posts' },
      { status: 500 }
    );
  }
}
