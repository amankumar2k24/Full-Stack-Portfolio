/**
 * One-shot script to fix wrong stat values in MongoDB.
 * Run: node fix-stats-values.js
 */
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://amankumar2k15:amankumar2662@clustor0.9bcinws.mongodb.net/portfolio';

const CORRECT_VALUES = [
    { key: 'years_experience',   value: '3.5+' },
    { key: 'projects_completed', value: '20+'  },
    { key: 'happy_clients',      value: '10+'  },
    { key: 'code_commits',       value: '2000+'},
];

async function main() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db('portfolio');
    const col = db.collection('stats');

    // Show current state
    const all = await col.find({}).toArray();
    console.log('📊 Current stats in DB:');
    all.forEach(s => console.log(`  ${s.key}: "${s.value}" (active: ${s.isActive})`));
    console.log('');

    // Apply corrections
    for (const { key, value } of CORRECT_VALUES) {
        const result = await col.updateOne({ key }, { $set: { value } });
        if (result.matchedCount > 0) {
            console.log(`✅ Updated [${key}] → "${value}"`);
        } else {
            console.log(`⚠️  Not found: [${key}] — inserting with correct value`);
            await col.insertOne({
                key,
                label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                value,
                icon: 'Award',
                color: '#3b82f6',
                order: 0,
                isActive: true,
            });
        }
    }

    // Verify
    console.log('\n📊 Stats after fix:');
    const updated = await col.find({}).sort({ order: 1 }).toArray();
    updated.forEach(s => console.log(`  ${s.key}: "${s.value}" (active: ${s.isActive})`));

    await client.close();
    console.log('\n🎉 Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
