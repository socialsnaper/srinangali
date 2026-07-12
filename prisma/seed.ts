import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'Admin@123',
    12
  );

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@srinangalioverseas.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@srinangalioverseas.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created');

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      freeShippingAbove: 500,
      shippingCost: 60,
      gstPercentage: 5,
    },
  });
  console.log('✅ Site settings created');

  // Rice Products
  const riceProducts = [
    {
      name: 'Silver Pulav Rice',
      slug: 'silver-pulav-rice',
      category: 'RICE',
      description:
        'Premium quality Silver Pulav Rice from Sri Nangali Overseas. Perfect for biryanis and pulao dishes. Long grain, aromatic rice that cooks to perfection every time.',
      price: 85,
      mrp: 100,
      stock: 500,
      isFeatured: true,
      tags: JSON.stringify(['pulav', 'rice', 'premium']),
    },
    {
      name: 'Silver 1121 Steam Basmati Rice',
      slug: 'silver-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Finest Silver grade 1121 Steam Basmati Rice. Known for its extra-long grain, royal aroma, and excellent cooking properties. The preferred choice for top restaurants and households.',
      price: 120,
      mrp: 145,
      stock: 800,
      isFeatured: true,
      tags: JSON.stringify(['basmati', '1121', 'steam', 'premium']),
    },
    {
      name: 'Shakti 1121 Steam Basmati Rice',
      slug: 'shakti-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Shakti brand 1121 Steam Basmati Rice — full of natural aroma and taste. Every grain cooks fluffy and separate, making it ideal for biryani and festive meals.',
      price: 110,
      mrp: 130,
      stock: 600,
      isFeatured: false,
      tags: JSON.stringify(['basmati', '1121', 'steam', 'shakti']),
    },
    {
      name: 'Diamond 1121 Steam Basmati Rice',
      slug: 'diamond-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Diamond quality 1121 Steam Basmati Rice. Sourced from the finest paddy fields, this rice offers a rich, nutty flavor and superior elongation after cooking.',
      price: 130,
      mrp: 155,
      stock: 400,
      isFeatured: true,
      tags: JSON.stringify(['basmati', '1121', 'steam', 'diamond', 'premium']),
    },
    {
      name: 'Gold 1121 Steam Basmati Rice',
      slug: 'gold-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Gold grade 1121 Steam Basmati Rice. Premium quality with extra-long grains that stay separate and fluffy after cooking. Perfect for special occasions.',
      price: 140,
      mrp: 165,
      stock: 350,
      isFeatured: true,
      tags: JSON.stringify(['basmati', '1121', 'gold', 'premium', 'export']),
    },
    {
      name: 'Amrit 1121 Steam Basmati Rice',
      slug: 'amrit-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Amrit brand 1121 Steam Basmati Rice. Pure, natural goodness in every grain. Excellent aroma and taste that brings the authentic Indian biryani experience.',
      price: 115,
      mrp: 138,
      stock: 450,
      isFeatured: false,
      tags: JSON.stringify(['basmati', '1121', 'amrit', 'steam']),
    },
    {
      name: 'Sangam 1121 Steam Basmati Rice',
      slug: 'sangam-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Sangam 1121 Steam Basmati Rice — where tradition meets quality. Naturally aged for enhanced aroma, this rice is a staple in gourmet Indian cuisine.',
      price: 118,
      mrp: 140,
      stock: 380,
      isFeatured: false,
      tags: JSON.stringify(['basmati', '1121', 'sangam', 'aged']),
    },
    {
      name: 'Anmol 1121 Steam Basmati Rice',
      slug: 'anmol-1121-steam-basmati-rice',
      category: 'RICE',
      description:
        'Anmol 1121 Steam Basmati Rice — priceless quality at every meal. Sourced from certified paddy farms, processed with state-of-the-art milling technology.',
      price: 112,
      mrp: 135,
      stock: 420,
      isFeatured: false,
      tags: JSON.stringify(['basmati', '1121', 'anmol']),
    },
  ];

  // Pulses Products
  const pulsesProducts = [
    {
      name: 'Chana Dal',
      slug: 'chana-dal',
      category: 'PULSES',
      description:
        'Premium quality Chana Dal (Split Bengal Gram). Clean, polished, and full of protein. Perfect for dal, besan, and various Indian snacks.',
      price: 95,
      mrp: 112,
      stock: 300,
      isFeatured: true,
      tags: JSON.stringify(['chana', 'dal', 'pulses', 'protein']),
    },
    {
      name: 'Kala Chana',
      slug: 'kala-chana',
      category: 'PULSES',
      description:
        'Premium Kala Chana (Black Chickpea). Rich in protein and fiber, these whole black chickpeas are great for curries and salads.',
      price: 90,
      mrp: 108,
      stock: 250,
      isFeatured: false,
      tags: JSON.stringify(['kala chana', 'black chickpea', 'protein']),
    },
    {
      name: 'Rajma Red Sharmili',
      slug: 'rajma-red-sharmili',
      category: 'PULSES',
      description:
        'Sharmili variety Red Kidney Beans. Meaty texture and rich flavor, perfect for the classic Punjabi Rajma dish.',
      price: 135,
      mrp: 160,
      stock: 200,
      isFeatured: true,
      tags: JSON.stringify(['rajma', 'kidney beans', 'red', 'punjabi']),
    },
    {
      name: 'Moong Sabut',
      slug: 'moong-sabut',
      category: 'PULSES',
      description:
        'Whole Green Moong (Sabut Moong Dal). A nutritious powerhouse, ideal for sprouting, soups, and wholesome dals.',
      price: 100,
      mrp: 120,
      stock: 280,
      isFeatured: false,
      tags: JSON.stringify(['moong', 'green gram', 'whole', 'healthy']),
    },
    {
      name: 'Masoor Sabut',
      slug: 'masoor-sabut',
      category: 'PULSES',
      description:
        'Whole Masoor (Brown Lentils). Earthy, rich flavor. Great for soups, stews, and traditional Indian dals.',
      price: 88,
      mrp: 105,
      stock: 320,
      isFeatured: false,
      tags: JSON.stringify(['masoor', 'lentils', 'whole', 'brown']),
    },
    {
      name: 'Lobiya (Rongi)',
      slug: 'lobiya-rongi',
      category: 'PULSES',
      description:
        'Black-eyed Peas (Lobiya/Rongi). Nutritious and versatile, perfect for curries, salads, and rice dishes.',
      price: 105,
      mrp: 125,
      stock: 190,
      isFeatured: false,
      tags: JSON.stringify(['lobiya', 'rongi', 'black-eyed peas']),
    },
    {
      name: 'Masoor Dal Bold',
      slug: 'masoor-dal-bold',
      category: 'PULSES',
      description:
        'Bold grade Masoor Dal (Red Lentils). Larger grains for a hearty dal. Cooks quickly and is rich in iron and protein.',
      price: 92,
      mrp: 110,
      stock: 260,
      isFeatured: false,
      tags: JSON.stringify(['masoor', 'dal', 'red', 'bold', 'lentils']),
    },
    {
      name: 'Urad Dhuli',
      slug: 'urad-dhuli',
      category: 'PULSES',
      description:
        'Washed and split Urad Dal (White Lentils). Essential for idli, dosa batter, and creamy Dal Makhani.',
      price: 130,
      mrp: 155,
      stock: 180,
      isFeatured: false,
      tags: JSON.stringify(['urad', 'dhuli', 'white lentils', 'idli', 'dosa']),
    },
    {
      name: 'Urad Chilka',
      slug: 'urad-chilka',
      category: 'PULSES',
      description:
        'Split Urad with skin (Chilka). Retains the natural goodness and fiber of the husk, great for traditional dals.',
      price: 120,
      mrp: 145,
      stock: 170,
      isFeatured: false,
      tags: JSON.stringify(['urad', 'chilka', 'split', 'husk']),
    },
    {
      name: 'Kabuli Chana Bold',
      slug: 'kabuli-chana-bold',
      category: 'PULSES',
      description:
        'Large and bold Kabuli Chana (White Chickpeas). Premium size for an impressive presentation in dishes like Chhole Bhature.',
      price: 145,
      mrp: 172,
      stock: 220,
      isFeatured: true,
      tags: JSON.stringify(['kabuli chana', 'chickpeas', 'bold', 'large']),
    },
    {
      name: 'Kabuli Chana Small',
      slug: 'kabuli-chana-small',
      category: 'PULSES',
      description:
        'Small size Kabuli Chana. Economical and equally nutritious, perfect for hummus, curries, and snacks.',
      price: 125,
      mrp: 150,
      stock: 230,
      isFeatured: false,
      tags: JSON.stringify(['kabuli chana', 'chickpeas', 'small']),
    },
    {
      name: 'Rajma Chitra',
      slug: 'rajma-chitra',
      category: 'PULSES',
      description:
        'Chitra Rajma (Speckled Kidney Beans). A popular variety with a creamy texture and mild flavor, loved across North India.',
      price: 140,
      mrp: 168,
      stock: 160,
      isFeatured: false,
      tags: JSON.stringify(['rajma', 'chitra', 'speckled', 'kidney beans']),
    },
    {
      name: 'Rajma Red Pahari',
      slug: 'rajma-red-pahari',
      category: 'PULSES',
      description:
        'Pahari Red Rajma from the hills of Uttarakhand. Distinctively small and dark, with a robust, earthy flavor prized by connoisseurs.',
      price: 175,
      mrp: 210,
      stock: 120,
      isFeatured: false,
      tags: JSON.stringify(['rajma', 'pahari', 'hill', 'red', 'premium']),
    },
    {
      name: 'Masoor Dal Small',
      slug: 'masoor-dal-small',
      category: 'PULSES',
      description:
        'Small grain Masoor Dal. Cooks faster than bold grade, tender and flavorful. A daily staple in Indian kitchens.',
      price: 86,
      mrp: 103,
      stock: 300,
      isFeatured: false,
      tags: JSON.stringify(['masoor', 'dal', 'small', 'lentils']),
    },
    {
      name: 'Moong Dhuli',
      slug: 'moong-dhuli',
      category: 'PULSES',
      description:
        'Washed and split Moong Dal (Yellow Lentils). Light, easy to digest. Perfect for patients, babies, and healthy everyday cooking.',
      price: 105,
      mrp: 126,
      stock: 270,
      isFeatured: false,
      tags: JSON.stringify(['moong', 'dhuli', 'yellow', 'light', 'healthy']),
    },
    {
      name: 'Rajma Red Long',
      slug: 'rajma-red-long',
      category: 'PULSES',
      description:
        'Long Red Kidney Beans. A large, meaty variety perfect for hearty curries, soups, and Mexican-style dishes.',
      price: 138,
      mrp: 165,
      stock: 150,
      isFeatured: false,
      tags: JSON.stringify(['rajma', 'red', 'long', 'kidney beans']),
    },
    {
      name: 'Moong Chilka',
      slug: 'moong-chilka',
      category: 'PULSES',
      description:
        'Split Moong with skin (Chilka Moong). Retains the nutritional benefits of the green skin. Great for khichdi and crispy papads.',
      price: 98,
      mrp: 118,
      stock: 240,
      isFeatured: false,
      tags: JSON.stringify(['moong', 'chilka', 'split', 'green']),
    },
    {
      name: 'Arhar Dal Bold',
      slug: 'arhar-dal-bold',
      category: 'PULSES',
      description:
        'Bold grade Arhar Dal (Toor Dal / Pigeon Pea). The most consumed dal in India. Nutty flavor and creamy texture, ideal for sambar and tadka dal.',
      price: 115,
      mrp: 138,
      stock: 400,
      isFeatured: true,
      tags: JSON.stringify(['arhar', 'toor', 'pigeon pea', 'bold', 'sambar']),
    },
    {
      name: 'Arhar Dal Small',
      slug: 'arhar-dal-small',
      category: 'PULSES',
      description:
        'Small grain Arhar Dal. Quick cooking, rich in protein. A daily household essential across India.',
      price: 108,
      mrp: 130,
      stock: 350,
      isFeatured: false,
      tags: JSON.stringify(['arhar', 'toor', 'small', 'dal']),
    },
    {
      name: 'Urad Sabut',
      slug: 'urad-sabut',
      category: 'PULSES',
      description:
        'Whole Black Gram (Sabut Urad). The key ingredient in Dal Makhani. Rich in protein and minerals, slow-cooked for the best flavor.',
      price: 125,
      mrp: 150,
      stock: 200,
      isFeatured: false,
      tags: JSON.stringify(['urad', 'sabut', 'whole', 'black gram', 'dal makhani']),
    },
  ];

  // Insert all products
  console.log('🌾 Seeding Rice products...');
  for (const product of riceProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log('🫘 Seeding Pulses products...');
  for (const product of pulsesProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const totalProducts = riceProducts.length + pulsesProducts.length;
  console.log(`✅ ${totalProducts} products seeded successfully`);
  console.log('\n📋 Seed complete! Summary:');
  console.log(`  - Rice products: ${riceProducts.length}`);
  console.log(`  - Pulses products: ${pulsesProducts.length}`);
  console.log(`  - Admin email: ${process.env.ADMIN_EMAIL || 'admin@srinangalioverseas.com'}`);
  console.log(`  - Admin password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
