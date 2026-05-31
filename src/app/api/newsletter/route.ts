import GetSureMongoClient, { MONGO_DB_NAME } from '@/lib/mongo.client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        if (!name || typeof name !== 'string') {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const SureMongoClient = await GetSureMongoClient();
        const db = SureMongoClient.db(MONGO_DB_NAME);
        const collection = db.collection('newsletter_signups');

        // Check for duplicate
        const existing = await collection.findOne({
            email: email.trim().toLowerCase(),
        });

        if (existing) {
            return NextResponse.json(
                { message: 'Already subscribed!' },
                { status: 200 }
            );
        }

        await collection.insertOne({
            name: name.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: 'Subscribed successfully!' },
            { status: 201 }
        );
    } catch (err) {
        console.error('Newsletter signup error:', err);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
