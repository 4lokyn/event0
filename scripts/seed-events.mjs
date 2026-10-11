// Seeds ~20 mock events using the venues already in the DB.
// Run: node --env-file=.env.local scripts/seed-events.mjs
// Safe to re-run: events are upserted by slug, existing events are not touched.
import mongoose from 'mongoose';

const events = [
    ['Arctic Monkeys', '2026-10-17', 'Indie rock heavyweights return with a full-length set spanning AM to their latest record.'],
    ['Riblja Čorba', '2026-10-24', 'Legendary Belgrade rock band playing all the classics from four decades on the road.'],
    ['Daft Punk Tribute', '2026-10-31', 'A Halloween night of robot helmets, lasers and non-stop French house.'],
    ['Billie Eilish', '2026-11-05', 'An intimate arena show with stripped-back arrangements and a stunning light design.'],
    ['Bajaga i Instruktori', '2026-11-12', 'Sing-along evening with one of the most loved bands of the ex-Yu rock scene.'],
    ['Massive Attack', '2026-11-19', 'Trip-hop pioneers bring their immersive audiovisual show to town.'],
    ['Dua Lipa', '2026-11-26', 'Pop hits, big choreography and a dance floor that never stops.'],
    ['Partibrejkers', '2026-12-03', 'Raw garage rock energy from Belgrade’s most untamed live band.'],
    ['The Weeknd', '2026-12-10', 'After Hours til Dawn: a cinematic stadium production with fireworks.'],
    ['Jazz Night: Trio Balkan', '2026-12-17', 'Smoky jazz club atmosphere with Balkan folk melodies reimagined.'],
    ['New Year’s Eve Rave', '2026-12-31', 'Five DJs, two stages and a countdown you will not forget.'],
    ['Hozier', '2027-01-14', 'Soulful folk-rock and a voice that fills every corner of the hall.'],
    ['Van Gogh', '2027-01-21', 'Domestic rock favourites celebrate thirty years of hits.'],
    ['Tame Impala', '2027-01-28', 'Psychedelic grooves and hypnotic visuals from Kevin Parker and band.'],
    ['Disciplina Kičme', '2027-02-04', 'Bass-driven punk funk from a cult band of the Yugoslav new wave.'],
    ['Florence + The Machine', '2027-02-11', 'Theatrical, euphoric and loud: a night of dramatic indie anthems.'],
    ['Ekatarina Velika Tribute', '2027-02-18', 'Musicians and friends pay tribute to EKV’s timeless catalogue.'],
    ['Kendrick Lamar', '2027-02-25', 'Grammy-winning rapper performing tracks from across his discography.'],
    ['Stand-up & Music Night', '2027-03-04', 'Comedians and acoustic acts share the stage for one relaxed evening.'],
    ['Exit Warm-up Party', '2027-03-11', 'Get ready for festival season with a lineup of regional DJs.'],
];

const slugify = (name, date) =>
    `${name}-${date.slice(0, 7)}`
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

await mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.db;

const venues = await db.collection('venues').find({}, { projection: { _id: 1 } }).toArray();
if (!venues.length) {
    console.error('No venues in the DB. Add at least one venue first.');
    process.exit(1);
}

const ops = events.map(([name, date, description], i) => {
    const slug = slugify(name, date);
    return {
        updateOne: {
            filter: { slug },
            update: {
                $set: {
                    name,
                    description,
                    date: new Date(`${date}T00:00:00.000Z`),
                    venue: venues[i % venues.length]._id,
                    slug,
                },
            },
            upsert: true,
        },
    };
});

const res = await db.collection('events').bulkWrite(ops);
console.log(`Inserted ${res.upsertedCount}, updated ${res.modifiedCount}.`);

await mongoose.disconnect();
