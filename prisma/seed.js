const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seller = await prisma.user.findFirst();

async function seedProducts() {
  try {

    await prisma.products.create({
      data: {
        title: "Brown Leather Bag",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/7/800/800",
        price: 2500, // EG: 25.00
        category: "Recommend",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "School Books",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/20/800/800",
        price: 1999,
        category: "Women Clothes",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Women's White Shoes",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/21/800/800",
        price: 9999,
        category: "Watches",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Old Book",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/24/800/800",
        price: 5999,
        category: "Bags",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Cuban Mug",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/24/800/800",
        price: 1299,
        category: "Men clothes",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Barrel of Oil",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/34/800/800",
        price: 6589,
        category: "Education & Office supplies",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Camera Gadgets",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/36/800/800",
        price: 22499,
        category: "Sports & Outdoor",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Old Record Player",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/39/800/800",
        price: 23599,
        category: "Home appliances",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Dinner Table",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/42/800/800",
        price: 8999,
        category: "Jewelry & Accessories",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Mac Book Pro",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/48/800/800",
        price: 159599,
        category: "Automotive & Motorcycle",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Light House",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/58/800/800",
        price: 999599,
        category: "Toys & Hobbies",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Computer with accessories",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/60/800/800",
        price: 9699,
        category: "Shoes",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Cup of Tea",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/60/800/800",
        price: 125,
        category: "Halloween",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Playstation Controller",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/96/800/800",
        price: 1599,
        category: "Hair wigs",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Rasberries",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/102/800/800",
        price: 259,
        category: "Furniture",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Old Car",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/111/800/800",
        price: 104959,
        category: "Beauty & Health",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Mac Mini",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/119/800/800",
        price: 99999,
        category: "Recommend",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Old Bench",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/129/800/800",
        price: 8999,
        category: "Recommend",
        sellerId: seller.id,
      },
    });

    await prisma.products.create({
      data: {
        title: "Broken Cars",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/133/800/800",
        price: 256595,
        category: "Recommend",
        sellerId: seller.id,
      
      },
    });

    await prisma.products.create({
      data: {
        title: "Guitar",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://picsum.photos/id/145/800/800",
        price: 12595,
        category: "Recommend",
        sellerId: seller.id,
      },
    });


    
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
