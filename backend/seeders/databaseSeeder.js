require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/category");
const { Product, ProductDetails } = require("../models/product");
const Attribute = require("../models/attributes");
const AdminUser = require("../models/adminuser");
const bcrypt = require("bcrypt");

// Local plant images - Using actual filenames from Images folder
const plantImages = {
  // Indoor Plants
  monstera: "/src/assets/Images/Monstera Deliciosa.webp",
  snakePlant: "/src/assets/Images/Snake Plant (Sansevieria).jpg",
  fiddleLeaf: "/src/assets/Images/Fiddle Leaf Fig.png", // Updated extension to png
  pothos: "/src/assets/Images/Golden Pothos.jpg",
  philodendron: "/src/assets/Images/Heartleaf Philodendron.jpg",
  rubberPlant: "/src/assets/Images/Rubber Plant (Ficus Elastica).webp",
  peacelily: "/src/assets/Images/Peace Lily.webp",
  zz: "/src/assets/Images/ZZ Plant.png", // Updated extension to png
  
  // Outdoor Plants
  rose: "/src/assets/Images/Red Rose Bush.webp",
  lavender: "/src/assets/Images/English Lavender.jpg",
  sunflower: "/src/assets/Images/Giant Sunflower.jpg",
  marigold: "/src/assets/Images/Marigold Mix.jpg",
  jasmine: "/src/assets/Images/Star Jasmine Vine.png", // Updated extension to png
  bougainvillea: "/src/assets/Images/Bougainvillea.jpg",
  
  // Succulents
  jade: "/src/assets/Images/Jade Plant.webp",
  aloe: "/src/assets/Images/Aloe Vera.png", // Updated extension to png
  echeveria: "/src/assets/Images/Echeveria Lola.jpg",
  cactus: "/src/assets/Images/Barrel Cactus.jpg",
  haworthia: "/src/assets/Images/Haworthia Zebra Plant.jpg",
  sedum: "/src/assets/Images/Sedum Variety Pack.jpg",
  
  // Pots & Planters
  ceramicPot: "/src/assets/Images/Ceramic Planter Set.jpg",
  terracottaPot: "/src/assets/Images/Terracotta Pot Collection.jpg",
  hangingPot: "/src/assets/Images/Hanging Macrame Planter.jpg",
  modernPot: "/src/assets/Images/Modern Geometric Planter.jpg",
  
  // Seeds
  tomatoSeeds: "/src/assets/Images/Heirloom Tomato Seeds Collection.jpg",
  herbSeeds: "/src/assets/Images/Complete Herb Garden Starter Kit.jpg",
  flowerSeeds: "/src/assets/Images/Native Wildflower Meadow Mix.jpg",
  vegetableSeeds: "/src/assets/Images/Organic Vegetable Garden Essentials.jpg",
  lettuce: "/src/assets/Images/Lettuce Salad Bowl Mix.jpg",
  carrot: "/src/assets/Images/Rainbow Carrot Seeds Mix.jpg",
  basil: "/src/assets/Images/Complete Herb Garden Starter Kit.jpg",
  pepper: "/src/assets/Images/Pepper Seeds Hot Mix.jpg",
  beans: "/src/assets/Images/Climbing Bean Collection.jpg",
  
  // Gardening Tools
  pruningShears: "/src/assets/Images/Professional Pruning Shears Set.jpg",
  handTools: "/src/assets/Images/Stainless Steel Hand Tool Set.gif",
  wateringCan: "/src/assets/Images/Premium Copper Watering Set.webp",
  gardenHose: "/src/assets/Images/Garden Hose Nozzle Spray Gun.jpg",
  fertilizer: "/src/assets/Images/Organic Vegetable Garden Essentials.jpg",
  seeds: "/src/assets/Images/Native Wildflower Meadow Mix.jpg",
  microgreens: "/src/assets/Images/Microgreens Starter Collection.jpg",
  cucumber: "/src/assets/Images/Container Garden Vegetable Mix.jpg",
  spinach: "/src/assets/Images/Lettuce Salad Bowl Mix.jpg",
  gloves: "/src/assets/Images/Stainless Steel Hand Tool Set.gif",
  shovel: "/src/assets/Images/Ergonomic Long Handle Shovel.jpg"
};

// Category banner images - Using existing images
const categoryBanners = {
  indoor: "/src/assets/Images/indoor_plants.jpg",
  outdoor: "/src/assets/Images/products_banner.jpg",
  succulents: "/src/assets/Images/Barrel Cactus.jpg",
  pots: "/src/assets/Images/pots.jpg",
  seeds: "/src/assets/Images/seeds.jpg",
  tools: "/src/assets/Images/garden_tools.jpg"
};

const sampleCategories = [
  {
    title: "Indoor Plants",
    categoriesid: "indoor-plants",
    description: "Beautiful indoor plants to brighten up your home and purify the air",
    category_bannerurl: categoryBanners.indoor,
    thumbnail_imageurl: "/src/assets/Images/indoor_plants.jpg",
    status: "enabled",
    ismenuinclude: "yes"
  },
  {
    title: "Outdoor Plants",
    categoriesid: "outdoor-plants", 
    description: "Hardy outdoor plants and flowers for your garden and landscape",
    category_bannerurl: categoryBanners.outdoor,
    thumbnail_imageurl: "/src/assets/Images/products_banner.jpg",
    status: "enabled",
    ismenuinclude: "yes"
  },
  {
    title: "Succulents",
    categoriesid: "succulents",
    description: "Low-maintenance succulent plants perfect for busy lifestyles",
    category_bannerurl: categoryBanners.succulents,
    thumbnail_imageurl: "/src/assets/Images/Barrel Cactus.jpg",
    status: "enabled", 
    ismenuinclude: "yes"
  },
  {
    title: "Pots & Planters",
    categoriesid: "pots-planters",
    description: "Stylish pots, planters and containers for all your plants",
    category_bannerurl: categoryBanners.pots,
    thumbnail_imageurl: "/src/assets/Images/pots.jpg",
    status: "enabled",
    ismenuinclude: "yes"
  },
  {
    title: "Seeds",
    categoriesid: "seeds",
    description: "Premium quality seeds for growing your own plants from scratch",
    category_bannerurl: categoryBanners.seeds,
    thumbnail_imageurl: "/src/assets/Images/seeds.jpg",
    status: "enabled",
    ismenuinclude: "yes"
  },
  {
    title: "Gardening Tools",
    categoriesid: "gardening-tools",
    description: "Professional quality tools and equipment for all your gardening needs",
    category_bannerurl: categoryBanners.tools,
    thumbnail_imageurl: "/src/assets/Images/garden_tools.jpg",
    status: "enabled",
    ismenuinclude: "yes"
  }
];

const sampleProducts = [
  // Indoor Plants (10 products)
  {
    productname: "Monstera Deliciosa",
    sku: "MON-DEL-001",
    price: 2499,
    oldprice: 2999,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.monstera,
    tag: "popular",
    categoryIndex: 0,
    details: {
      short_description: "Beautiful split-leaf plant perfect for indoor decoration",
      description: "The Monstera Deliciosa is a stunning indoor plant known for its distinctive split leaves. It's easy to care for and adds a tropical feel to any space. This plant thrives in bright, indirect light and requires moderate watering. As it grows, the leaves develop beautiful natural splits and holes, making it a conversation piece in any room.",
      weight: 2.5,
      mediaurl: [
        plantImages.monstera,
        "/src/assets/Images/Monstera Deliciosa.webp",
        "/src/assets/Images/Golden Pothos.jpg"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 25,
      stock_availability: "yes"
    }
  },
  {
    productname: "Snake Plant (Sansevieria)",
    sku: "SNA-PLA-001", 
    price: 1299,
    oldprice: 1599,
    ratingstar: 4.8,
    featuredimageUrl: plantImages.snakePlant,
    tag: "bestseller",
    categoryIndex: 0,
    details: {
      short_description: "Low-maintenance air-purifying plant perfect for beginners",
      description: "The Snake Plant (Sansevieria) is perfect for beginners and busy plant parents. It's extremely low-maintenance, tolerates low light conditions, and is known for its exceptional air-purifying qualities. Perfect for bedrooms, offices, and any space that needs a touch of green without the fuss.",
      weight: 1.8,
      mediaurl: [
        plantImages.snakePlant,
        "/src/assets/Images/Peace Lily.webp"
      ],
      status: "enabled",
      mangestock: "yes", 
      quantity: 40,
      stock_availability: "yes"
    }
  },
  {
    productname: "Fiddle Leaf Fig",
    sku: "FID-FIG-001",
    price: 3299,
    oldprice: 3799,
    ratingstar: 4.2,
    featuredimageUrl: plantImages.fiddleLeaf,
    tag: "trending",
    categoryIndex: 0,
    details: {
      short_description: "Elegant large-leafed indoor tree for statement decor",
      description: "The Fiddle Leaf Fig is a popular choice for interior decorating and Instagram-worthy plant collections. With its large, violin-shaped leaves, it makes a bold statement in any room. Requires bright, indirect light and consistent care to thrive and maintain its gorgeous appearance.",
      weight: 4.0,
      mediaurl: [
        plantImages.fiddleLeaf,
        "/src/assets/Images/Rubber Plant (Ficus Elastica).webp",
        "/src/assets/Images/Heartleaf Philodendron.jpg"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 15,
      stock_availability: "yes"
    }
  },
  {
    productname: "Golden Pothos",
    sku: "POT-GOL-001",
    price: 899,
    oldprice: 1199,
    ratingstar: 4.6,
    featuredimageUrl: plantImages.pothos,
    tag: "easy-care",
    categoryIndex: 0,
    details: {
      short_description: "Trailing vine perfect for hanging baskets or shelves",
      description: "Golden Pothos is one of the easiest houseplants to grow, making it perfect for beginners. Its heart-shaped leaves with golden variegation trail beautifully from hanging baskets or cascade down from shelves. Very forgiving and grows quickly in various light conditions.",
      weight: 1.2,
      mediaurl: [
        plantImages.pothos,
        "https://picsum.photos/400/400?random=6"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 35,
      stock_availability: "yes"
    }
  },
  {
    productname: "Heartleaf Philodendron",
    sku: "PHI-HEA-001",
    price: 1099,
    oldprice: 1399,
    ratingstar: 4.4,
    featuredimageUrl: plantImages.philodendron,
    tag: "fast-growing",
    categoryIndex: 0,
    details: {
      short_description: "Fast-growing climbing plant with heart-shaped leaves",
      description: "The Heartleaf Philodendron is a classic houseplant known for its glossy, heart-shaped leaves and vigorous growth. It's very adaptable to different light conditions and can be trained to climb or allowed to trail. A great choice for adding instant green to any space.",
      weight: 1.5,
      mediaurl: [
        plantImages.philodendron,
        "https://picsum.photos/400/400?random=7"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 30,
      stock_availability: "yes"
    }
  },
  {
    productname: "Rubber Plant (Ficus Elastica)",
    sku: "RUB-PLA-001",
    price: 1899,
    oldprice: 2299,
    ratingstar: 4.3,
    featuredimageUrl: plantImages.rubberPlant,
    tag: "statement",
    categoryIndex: 0,
    details: {
      short_description: "Glossy-leafed tree with burgundy and green foliage",
      description: "The Rubber Plant is a striking indoor tree with large, glossy leaves that can be deep green or have burgundy tints. It's relatively easy to care for and makes an excellent statement plant. Can grow quite tall indoors with proper care and makes a beautiful focal point.",
      weight: 3.2,
      mediaurl: [
        plantImages.rubberPlant,
        "https://picsum.photos/400/400?random=8"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 20,
      stock_availability: "yes"
    }
  },
  {
    productname: "Peace Lily",
    sku: "PEA-LIL-001",
    price: 1599,
    oldprice: 1899,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.peacelily,
    tag: "flowering",
    categoryIndex: 0,
    details: {
      short_description: "Elegant flowering plant that blooms indoors",
      description: "The Peace Lily is a beautiful flowering houseplant that produces elegant white blooms regularly. It's known for its air-purifying qualities and ability to thrive in lower light conditions. The plant will tell you when it needs water by drooping slightly, making care very straightforward.",
      weight: 2.0,
      mediaurl: [
        plantImages.peacelily,
        "https://picsum.photos/400/400?random=9"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 25,
      stock_availability: "yes"
    }
  },
  {
    productname: "ZZ Plant (Zamioculcas Zamiifolia)",
    sku: "ZZ-PLA-001",
    price: 1799,
    oldprice: 2099,
    ratingstar: 4.7,
    featuredimageUrl: plantImages.zz,
    tag: "drought-tolerant",
    categoryIndex: 0,
    details: {
      short_description: "Ultra low-maintenance plant that tolerates neglect",
      description: "The ZZ Plant is virtually indestructible and perfect for those who travel frequently or forget to water plants. Its glossy, dark green leaves add a modern touch to any space. It can tolerate low light and infrequent watering, making it ideal for offices and low-light areas.",
      weight: 2.2,
      mediaurl: [
        plantImages.zz,
        "https://picsum.photos/400/400?random=10"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 28,
      stock_availability: "yes"
    }
  },

  // Outdoor Plants (8 products)
  {
    productname: "Red Rose Bush",
    sku: "ROS-RED-001",
    price: 1899,
    oldprice: 2299,
    ratingstar: 4.4,
    featuredimageUrl: plantImages.rose,
    tag: "fragrant",
    categoryIndex: 1,
    details: {
      short_description: "Classic red roses with intense fragrance",
      description: "Beautiful red rose bush that produces gorgeous, fragrant blooms throughout the growing season. Perfect for gardens, borders, or as a focal point. Requires full sun and regular watering but rewards you with stunning flowers and wonderful fragrance.",
      weight: 3.5,
      mediaurl: [
        plantImages.rose,
        "https://picsum.photos/400/400?random=11",
        "https://picsum.photos/400/400?random=12"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 20,
      stock_availability: "yes"
    }
  },
  {
    productname: "English Lavender",
    sku: "LAV-ENG-001",
    price: 1299,
    oldprice: 1599,
    ratingstar: 4.6,
    featuredimageUrl: plantImages.lavender,
    tag: "aromatic",
    categoryIndex: 1,
    details: {
      short_description: "Aromatic lavender perfect for gardens and crafts",
      description: "English Lavender is prized for its beautiful purple flowers and incredible fragrance. Perfect for herb gardens, borders, or containers. The flowers can be harvested and dried for potpourri, sachets, or culinary uses. Attracts bees and butterflies to your garden.",
      weight: 1.8,
      mediaurl: [
        plantImages.lavender,
        "https://picsum.photos/400/400?random=13"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 35,
      stock_availability: "yes"
    }
  },
  {
    productname: "Giant Sunflower",
    sku: "SUN-GIA-001",
    price: 699,
    oldprice: 899,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.sunflower,
    tag: "annual",
    categoryIndex: 1,
    details: {
      short_description: "Tall sunflower that can grow up to 10 feet",
      description: "Giant Sunflowers are fun to grow and create dramatic height in the garden. They can reach up to 10 feet tall with massive flower heads. Kids love watching them grow, and the seeds provide food for birds. Plant in full sun with plenty of space.",
      weight: 0.8,
      mediaurl: [
        plantImages.sunflower,
        "https://picsum.photos/400/400?random=14"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 50,
      stock_availability: "yes"
    }
  },
  {
    productname: "Marigold Mix",
    sku: "MAR-MIX-001",
    price: 599,
    oldprice: 799,
    ratingstar: 4.3,
    featuredimageUrl: plantImages.marigold,
    tag: "colorful",
    categoryIndex: 1,
    details: {
      short_description: "Bright, colorful flowers that bloom all season",
      description: "Marigolds are easy-to-grow annuals that provide continuous color from spring until frost. They come in vibrant shades of yellow, orange, and red. Great for borders, containers, and companion planting in vegetable gardens as they help deter pests.",
      weight: 1.0,
      mediaurl: [
        plantImages.marigold,
        "https://picsum.photos/400/400?random=15"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 45,
      stock_availability: "yes"
    }
  },
  {
    productname: "Star Jasmine Vine",
    sku: "JAS-STA-001",
    price: 1599,
    oldprice: 1899,
    ratingstar: 4.4,
    featuredimageUrl: plantImages.jasmine,
    tag: "climbing",
    categoryIndex: 1,
    details: {
      short_description: "Fragrant climbing vine with star-shaped flowers",
      description: "Star Jasmine is a beautiful climbing vine that produces masses of small, star-shaped, highly fragrant white flowers. Perfect for covering fences, trellises, or arbors. The sweet fragrance is especially strong in the evening hours.",
      weight: 2.5,
      mediaurl: [
        plantImages.jasmine,
        "https://picsum.photos/400/400?random=16"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 25,
      stock_availability: "yes"
    }
  },
  {
    productname: "Bougainvillea",
    sku: "BOU-MIX-001",
    price: 1799,
    oldprice: 2199,
    ratingstar: 4.2,
    featuredimageUrl: plantImages.bougainvillea,
    tag: "tropical",
    categoryIndex: 1,
    details: {
      short_description: "Vibrant tropical flowering vine",
      description: "Bougainvillea is a spectacular tropical plant known for its vibrant, papery bracts in shades of pink, purple, red, orange, or white. It's a vigorous grower that loves full sun and heat. Perfect for warm climates and can be trained as a vine or kept as a shrub.",
      weight: 3.0,
      mediaurl: [
        plantImages.bougainvillea,
        "https://picsum.photos/400/400?random=17"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 18,
      stock_availability: "yes"
    }
  },

  // Succulents (8 products)
  {
    productname: "Jade Plant",
    sku: "JAD-PLA-001",
    price: 699,
    oldprice: 899,
    ratingstar: 4.6,
    featuredimageUrl: plantImages.jade,
    tag: "lucky",
    categoryIndex: 2,
    details: {
      short_description: "Lucky succulent plant believed to bring prosperity",
      description: "The Jade Plant is considered a symbol of prosperity and good luck in many cultures. This beautiful succulent has thick, fleshy leaves and can live for decades with minimal care. It occasionally produces small white or pink flowers and makes an excellent houseplant or office plant.",
      weight: 0.8,
      mediaurl: [
        plantImages.jade,
        "https://picsum.photos/400/400?random=18"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 50,
      stock_availability: "yes"
    }
  },
  {
    productname: "Aloe Vera",
    sku: "ALO-VER-001",
    price: 599,
    oldprice: 799,
    ratingstar: 4.7,
    featuredimageUrl: plantImages.aloe,
    tag: "medicinal",
    categoryIndex: 2,
    details: {
      short_description: "Medicinal succulent with healing gel inside leaves",
      description: "Aloe Vera is not just beautiful but also has amazing healing properties. The clear gel inside the thick leaves can be used for minor cuts, burns, and skin irritation. Very easy to grow and maintain, requiring minimal water and care. A must-have plant for every home.",
      weight: 1.2,
      mediaurl: [
        plantImages.aloe,
        "https://picsum.photos/400/400?random=19"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 40,
      stock_availability: "yes"
    }
  },
  {
    productname: "Echeveria 'Lola'",
    sku: "ECH-LOL-001",
    price: 899,
    oldprice: 1199,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.echeveria,
    tag: "rosette",
    categoryIndex: 2,
    details: {
      short_description: "Beautiful rosette succulent with pink-tipped leaves",
      description: "Echeveria 'Lola' forms perfect rosettes of blue-green leaves with pink tips that intensify in bright light. This stunning succulent is perfect for containers, rock gardens, or as part of a succulent arrangement. Very drought tolerant and low maintenance.",
      weight: 0.5,
      mediaurl: [
        plantImages.echeveria,
        "https://picsum.photos/400/400?random=20"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 35,
      stock_availability: "yes"
    }
  },
  {
    productname: "Barrel Cactus",
    sku: "CAC-BAR-001",
    price: 1299,
    oldprice: 1599,
    ratingstar: 4.3,
    featuredimageUrl: plantImages.cactus,
    tag: "spiny",
    categoryIndex: 2,
    details: {
      short_description: "Classic desert cactus with prominent spines",
      description: "The Barrel Cactus is a classic desert plant with a distinctive round shape and prominent spines. It's extremely drought tolerant and can live for many years with minimal care. Occasionally produces colorful flowers at the top. Perfect for desert-themed gardens or collections.",
      weight: 2.0,
      mediaurl: [
        plantImages.cactus,
        "https://picsum.photos/400/400?random=21"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 25,
      stock_availability: "yes"
    }
  },
  {
    productname: "Haworthia Zebra Plant",
    sku: "HAW-ZEB-001",
    price: 799,
    oldprice: 999,
    ratingstar: 4.4,
    featuredimageUrl: plantImages.haworthia,
    tag: "striped",
    categoryIndex: 2,
    details: {
      short_description: "Small succulent with distinctive white stripes",
      description: "Haworthia Zebra Plant is a charming small succulent with thick, fleshy leaves marked by distinctive white horizontal stripes. It's perfect for windowsills, desks, or small containers. Very easy to care for and tolerates lower light than most succulents.",
      weight: 0.3,
      mediaurl: [
        plantImages.haworthia,
        "https://picsum.photos/400/400?random=22"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 45,
      stock_availability: "yes"
    }
  },
  {
    productname: "Sedum Variety Pack",
    sku: "SED-VAR-001",
    price: 1199,
    oldprice: 1499,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.sedum,
    tag: "collection",
    categoryIndex: 2,
    details: {
      short_description: "Collection of colorful trailing sedum varieties",
      description: "This variety pack includes multiple types of colorful sedum succulents, perfect for creating living walls, ground cover, or trailing from containers. Sedums are extremely hardy and drought tolerant, and many varieties change colors with the seasons.",
      weight: 1.5,
      mediaurl: [
        plantImages.sedum,
        "https://picsum.photos/400/400?random=23"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 30,
      stock_availability: "yes"
    }
  },

  // Pots & Planters (6 products)
  {
    productname: "Ceramic Planter Set",
    sku: "CER-PLA-001",
    price: 1599,
    oldprice: 1999,
    ratingstar: 4.3,
    featuredimageUrl: plantImages.ceramicPot,
    tag: "set",
    categoryIndex: 3,
    details: {
      short_description: "Set of 3 beautiful ceramic planters in different sizes",
      description: "Beautiful set of 3 ceramic planters in graduated sizes (small, medium, large). Each pot features drainage holes and matching saucers. The clean, modern design complements any decor style. Perfect for indoor plants and herb gardens.",
      weight: 2.8,
      mediaurl: [
        plantImages.ceramicPot,
        "https://picsum.photos/400/400?random=24"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 30,
      stock_availability: "yes"
    }
  },
  {
    productname: "Terracotta Pot Collection",
    sku: "TER-POT-001",
    price: 899,
    oldprice: 1199,
    ratingstar: 4.4,
    featuredimageUrl: plantImages.terracottaPot,
    tag: "classic",
    categoryIndex: 3,
    details: {
      short_description: "Classic terracotta pots in various sizes",
      description: "Traditional terracotta pots that provide excellent drainage and allow roots to breathe. The porous clay material helps prevent overwatering. Available in multiple sizes, these classic pots are perfect for both indoor and outdoor use.",
      weight: 3.2,
      mediaurl: [
        plantImages.terracottaPot,
        "https://picsum.photos/400/400?random=25"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 40,
      stock_availability: "yes"
    }
  },
  {
    productname: "Hanging Macrame Planter",
    sku: "HAN-MAC-001",
    price: 1299,
    oldprice: 1599,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.hangingPot,
    tag: "bohemian",
    categoryIndex: 3,
    details: {
      short_description: "Handwoven macrame hanging planter",
      description: "Beautiful handwoven macrame hanging planter that adds a bohemian touch to any space. Includes a ceramic pot insert and can accommodate plants of various sizes. Perfect for displaying trailing plants like pothos, ivy, or ferns.",
      weight: 1.5,
      mediaurl: [
        plantImages.hangingPot,
        "https://picsum.photos/400/400?random=26"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 25,
      stock_availability: "yes"
    }
  },
  {
    productname: "Modern Geometric Planter",
    sku: "MOD-GEO-001",
    price: 1899,
    oldprice: 2299,
    ratingstar: 4.2,
    featuredimageUrl: plantImages.modernPot,
    tag: "contemporary",
    categoryIndex: 3,
    details: {
      short_description: "Sleek geometric planter for modern interiors",
      description: "Contemporary geometric planter with clean lines and a modern aesthetic. Made from high-quality materials with a matte finish. Features a hidden drainage system and removable inner pot for easy plant care. Perfect for modern homes and offices.",
      weight: 2.5,
      mediaurl: [
        plantImages.modernPot,
        "https://picsum.photos/400/400?random=27"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 20,
      stock_availability: "yes"
    }
  },

  // Seeds (15 products)
  {
    productname: "Heirloom Tomato Seeds Collection",
    sku: "TOM-HEI-001",
    price: 599,
    oldprice: 799,
    ratingstar: 4.6,
    featuredimageUrl: plantImages.tomatoSeeds,
    tag: "heirloom",
    categoryIndex: 4,
    details: {
      short_description: "Premium heirloom tomato varieties for exceptional flavor",
      description: "Collection of 5 heirloom tomato varieties including Cherokee Purple, Brandywine, Green Zebra, Black Krim, and Mortgage Lifter. These open-pollinated varieties produce incredibly flavorful tomatoes with unique colors and shapes. Save seeds for next year's garden. Germination rate: 85-95%. Days to maturity: 70-85 days.",
      weight: 0.1,
      mediaurl: [
        plantImages.tomatoSeeds,
        "https://picsum.photos/400/400?random=28",
        "https://picsum.photos/400/400?random=29"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 100,
      stock_availability: "yes"
    }
  },
  {
    productname: "Complete Herb Garden Starter Kit",
    sku: "HER-KIT-001",
    price: 799,
    oldprice: 999,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.herbSeeds,
    tag: "collection",
    categoryIndex: 4,
    details: {
      short_description: "Everything you need for a thriving herb garden",
      description: "Comprehensive herb garden kit with 8 essential culinary herbs: Basil, Parsley, Cilantro, Oregano, Thyme, Rosemary, Sage, and Chives. Includes biodegradable pots, plant markers, growing guide, and harvesting tips. Perfect for kitchen windowsills or outdoor herb gardens. All seeds are organic and non-GMO.",
      weight: 0.3,
      mediaurl: [
        plantImages.herbSeeds,
        "https://picsum.photos/400/400?random=30",
        "https://picsum.photos/400/400?random=31"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 80,
      stock_availability: "yes"
    }
  },
  {
    productname: "Native Wildflower Meadow Mix",
    sku: "WIL-MEA-001",
    price: 899,
    oldprice: 1199,
    ratingstar: 4.4,
    featuredimageUrl: plantImages.flowerSeeds,
    tag: "native",
    categoryIndex: 4,
    details: {
      short_description: "Create a pollinator paradise with native wildflowers",
      description: "Carefully selected blend of 20+ native wildflower species including Cosmos, Black-Eyed Susan, Purple Coneflower, Bee Balm, and Zinnias. Creates a beautiful, low-maintenance meadow that attracts butterflies, bees, and beneficial insects. Covers up to 500 sq ft. Blooms from spring through fall with successive plantings.",
      weight: 0.2,
      mediaurl: [
        plantImages.flowerSeeds,
        "https://picsum.photos/400/400?random=32",
        "https://picsum.photos/400/400?random=33"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 60,
      stock_availability: "yes"
    }
  },
  {
    productname: "Organic Vegetable Garden Essentials",
    sku: "VEG-ESS-001",
    price: 1099,
    oldprice: 1399,
    ratingstar: 4.5,
    featuredimageUrl: plantImages.vegetableSeeds,
    tag: "organic",
    categoryIndex: 4,
    details: {
      short_description: "Certified organic vegetable seeds for healthy eating",
      description: "Beginner-friendly collection of 10 organic vegetable varieties: Lettuce, Spinach, Radishes, Carrots, Green Beans, Peas, Kale, Swiss Chard, Arugula, and Cucumber. All seeds are certified organic, non-GMO, and selected for easy growing. Includes planting calendar and companion planting guide.",
      weight: 0.4,
      mediaurl: [
        plantImages.vegetableSeeds,
        "https://picsum.photos/400/400?random=34",
        "https://picsum.photos/400/400?random=35"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 70,
      stock_availability: "yes"
    }
  },
  {
    productname: "Giant Sunflower Seeds",
    sku: "SUN-SEE-001",
    price: 399,
    oldprice: 549,
    ratingstar: 4.7,
    featuredimageUrl: "https://picsum.photos/400/400?random=36",
    tag: "giant",
    categoryIndex: 4,
    details: {
      short_description: "Grow sunflowers up to 12 feet tall with massive blooms",
      description: "Mammoth sunflower variety that can reach 12+ feet in height with flower heads up to 18 inches across. Kids love watching these giants grow! Seeds can be harvested for eating or bird feeding. Easy to grow in full sun. Germination: 7-14 days. Maturity: 110-120 days.",
      weight: 0.15,
      mediaurl: [
        "https://picsum.photos/400/400?random=37",
        "https://picsum.photos/400/400?random=38"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 120,
      stock_availability: "yes"
    }
  },
  {
    productname: "Rainbow Carrot Seeds Mix",
    sku: "CAR-RAI-001",
    price: 449,
    oldprice: 599,
    ratingstar: 4.3,
    featuredimageUrl: "https://picsum.photos/400/400?random=39",
    tag: "colorful",
    categoryIndex: 4,
    details: {
      short_description: "Purple, yellow, orange, and white carrot varieties",
      description: "Fun mix of rainbow carrot varieties including Purple Haze, Solar Yellow, Atomic Red, and Lunar White. Sweet, crunchy carrots in amazing colors that kids love to grow and eat. Rich in antioxidants and vitamins. Perfect for containers or garden beds. Days to maturity: 65-75 days.",
      weight: 0.08,
      mediaurl: [
        "https://picsum.photos/400/400?random=40",
        "https://picsum.photos/400/400?random=41"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 90,
      stock_availability: "yes"
    }
  },
  {
    productname: "Butterfly Garden Flower Mix",
    sku: "BUT-FLO-001",
    price: 649,
    oldprice: 849,
    ratingstar: 4.6,
    featuredimageUrl: "https://picsum.photos/400/400?random=42",
    tag: "pollinator",
    categoryIndex: 4,
    details: {
      short_description: "Attract butterflies with this special flower blend",
      description: "Specially formulated mix of nectar-rich flowers including Zinnia, Marigold, Cosmos, Alyssum, and Lantana. Designed to attract and support butterfly populations throughout the growing season. Creates a stunning display while supporting local wildlife. Covers 200 sq ft.",
      weight: 0.12,
      mediaurl: [
        "https://picsum.photos/400/400?random=43",
        "https://picsum.photos/400/400?random=44"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 75,
      stock_availability: "yes"
    }
  },
  {
    productname: "Microgreens Starter Collection",
    sku: "MIC-STA-001",
    price: 749,
    oldprice: 999,
    ratingstar: 4.4,
    featuredimageUrl: "https://picsum.photos/400/400?random=45",
    tag: "superfood",
    categoryIndex: 4,
    details: {
      short_description: "Nutrient-dense microgreens ready in 7-14 days",
      description: "Complete microgreens kit with 6 varieties: Broccoli, Radish, Pea Shoots, Sunflower, Wheatgrass, and Red Cabbage. Packed with vitamins and minerals - up to 40x more nutrients than mature vegetables! Includes growing trays and instructions. Perfect for year-round indoor growing.",
      weight: 0.25,
      mediaurl: [
        "https://picsum.photos/400/400?random=46",
        "https://picsum.photos/400/400?random=47"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 65,
      stock_availability: "yes"
    }
  },
  {
    productname: "Pepper Seeds Hot Mix",
    sku: "PEP-HOT-001",
    price: 549,
    oldprice: 749,
    ratingstar: 4.5,
    featuredimageUrl: "https://picsum.photos/400/400?random=48",
    tag: "spicy",
    categoryIndex: 4,
    details: {
      short_description: "Fiery hot pepper collection for spice lovers",
      description: "Heat lovers rejoice! Collection includes Jalapeño, Serrano, Habanero, Thai Chili, and Ghost Pepper seeds. Range from mild to extremely hot. Perfect for making hot sauces, salsas, and adding heat to cooking. Includes heat scale guide and handling safety tips. Days to maturity: 70-90 days.",
      weight: 0.06,
      mediaurl: [
        "https://picsum.photos/400/400?random=49",
        "https://picsum.photos/400/400?random=50"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 85,
      stock_availability: "yes"
    }
  },
  {
    productname: "Climbing Bean Collection",
    sku: "BEA-CLI-001",
    price: 499,
    oldprice: 649,
    ratingstar: 4.2,
    featuredimageUrl: "https://picsum.photos/400/400?random=51",
    tag: "climbing",
    categoryIndex: 4,
    details: {
      short_description: "Vertical garden beans for small spaces",
      description: "Space-saving collection of climbing beans including Purple Podded Pole, Scarlet Runner, and Romano Italian. Perfect for vertical gardens, trellises, and small spaces. Provides both beautiful flowers and delicious beans. Can reach 6-8 feet high. Days to maturity: 55-65 days.",
      weight: 0.2,
      mediaurl: [
        "https://picsum.photos/400/400?random=52",
        "https://picsum.photos/400/400?random=53"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 95,
      stock_availability: "yes"
    }
  },
  {
    productname: "Lettuce Salad Bowl Mix",
    sku: "LET-SAL-001",
    price: 379,
    oldprice: 499,
    ratingstar: 4.4,
    featuredimageUrl: "https://picsum.photos/400/400?random=54",
    tag: "fast-growing",
    categoryIndex: 4,
    details: {
      short_description: "Gourmet lettuce mix for continuous harvests",
      description: "Gourmet blend of 8 lettuce varieties including Oak Leaf, Buttercrunch, Red Sails, and Arugula. Perfect for cut-and-come-again harvesting. Plant every 2 weeks for continuous fresh salads. Great for containers and small gardens. Ready to harvest in just 30-45 days.",
      weight: 0.05,
      mediaurl: [
        "https://picsum.photos/400/400?random=55",
        "https://picsum.photos/400/400?random=56"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 110,
      stock_availability: "yes"
    }
  },
  {
    productname: "Pumpkin & Squash Collection",
    sku: "PUM-SQU-001",
    price: 699,
    oldprice: 899,
    ratingstar: 4.3,
    featuredimageUrl: "https://picsum.photos/400/400?random=57",
    tag: "fall-harvest",
    categoryIndex: 4,
    details: {
      short_description: "Fall harvest favorites for autumn decorating",
      description: "Perfect for fall gardens! Includes Sugar Pie Pumpkin, Acorn Squash, Butternut Squash, and Delicata Squash. Great for cooking, baking, and autumn decorations. Vining varieties need space but produce abundant harvests. Store well for winter use. Days to maturity: 90-120 days.",
      weight: 0.3,
      mediaurl: [
        "https://picsum.photos/400/400?random=58",
        "https://picsum.photos/400/400?random=59"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 55,
      stock_availability: "yes"
    }
  },
  {
    productname: "Edible Flower Seeds Mix",
    sku: "EDI-FLO-001",
    price: 579,
    oldprice: 749,
    ratingstar: 4.1,
    featuredimageUrl: "https://picsum.photos/400/400?random=60",
    tag: "edible",
    categoryIndex: 4,
    details: {
      short_description: "Beautiful flowers you can eat - perfect for garnishes",
      description: "Unique collection of edible flowers including Nasturtiums, Calendula, Violas, Borage, and Chamomile. Add color and flavor to salads, cocktails, and desserts. All varieties are completely safe to eat and have unique flavors from peppery to sweet. Includes culinary guide.",
      weight: 0.1,
      mediaurl: [
        "https://picsum.photos/400/400?random=61",
        "https://picsum.photos/400/400?random=62"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 70,
      stock_availability: "yes"
    }
  },
  {
    productname: "Container Garden Vegetable Mix",
    sku: "CON-VEG-001",
    price: 849,
    oldprice: 1099,
    ratingstar: 4.5,
    featuredimageUrl: "https://picsum.photos/400/400?random=63",
    tag: "container",
    categoryIndex: 4,
    details: {
      short_description: "Perfect vegetables for pots and small spaces",
      description: "Specially selected compact varieties perfect for container gardening: Cherry Tomatoes, Dwarf Peas, Bush Beans, Baby Carrots, Compact Kale, and Mini Bell Peppers. Ideal for patios, balconies, and small gardens. Includes container sizing guide and spacing recommendations.",
      weight: 0.18,
      mediaurl: [
        "https://picsum.photos/400/400?random=64",
        "https://picsum.photos/400/400?random=65"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 60,
      stock_availability: "yes"
    }
  },
  {
    productname: "Sprouting Seeds Healthy Mix",
    sku: "SPR-HEA-001",
    price: 629,
    oldprice: 799,
    ratingstar: 4.6,
    featuredimageUrl: "https://picsum.photos/400/400?random=66",
    tag: "superfood",
    categoryIndex: 4,
    details: {
      short_description: "Nutrient-packed sprouting seeds for year-round nutrition",
      description: "Health-focused collection of sprouting seeds including Alfalfa, Mung Bean, Broccoli, Clover, and Fenugreek. Sprouts are nutritional powerhouses ready in just 3-7 days. No soil needed - just water! Includes sprouting jar and detailed instructions. Perfect for winter nutrition.",
      weight: 0.22,
      mediaurl: [
        "https://picsum.photos/400/400?random=67",
        "https://picsum.photos/400/400?random=68"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 80,
      stock_availability: "yes"
    }
  },

  // Gardening Tools (12 products)
  {
    productname: "Professional Pruning Shears Set",
    sku: "PRU-PRO-001",
    price: 2499,
    oldprice: 2999,
    ratingstar: 4.7,
    featuredimageUrl: "https://picsum.photos/400/400?random=69",
    tag: "professional",
    categoryIndex: 5,
    details: {
      short_description: "High-quality steel pruning shears for precise cuts",
      description: "Professional-grade pruning shears made from high-carbon steel with ergonomic handles. Perfect for deadheading flowers, pruning small branches, and harvesting herbs. Features a safety lock, blade cleaner, and comfortable cushioned grips. Includes leather holster for convenient storage.",
      weight: 0.8,
      mediaurl: [
        "https://picsum.photos/400/400?random=70",
        "https://picsum.photos/400/400?random=71"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 45,
      stock_availability: "yes"
    }
  },
  {
    productname: "Stainless Steel Hand Tool Set",
    sku: "HAN-STE-001",
    price: 1899,
    oldprice: 2399,
    ratingstar: 4.6,
    featuredimageUrl: "https://picsum.photos/400/400?random=72",
    tag: "essential",
    categoryIndex: 5,
    details: {
      short_description: "Complete 3-piece hand tool set for all gardening tasks",
      description: "Essential gardening set includes hand trowel, cultivator, and weeder. Made from rust-resistant stainless steel with comfortable wooden handles. Perfect for planting, weeding, and soil cultivation. Tools feature measurement markings and hanging holes for storage.",
      weight: 1.2,
      mediaurl: [
        "https://picsum.photos/400/400?random=73",
        "https://picsum.photos/400/400?random=74"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 60,
      stock_availability: "yes"
    }
  },
  {
    productname: "Premium Copper Watering Can",
    sku: "WAT-COP-001",
    price: 3499,
    oldprice: 4199,
    ratingstar: 4.5,
    featuredimageUrl: "https://picsum.photos/400/400?random=75",
    tag: "premium",
    categoryIndex: 5,
    details: {
      short_description: "Beautiful copper watering can with detachable rose head",
      description: "Elegant copper watering can that develops a beautiful patina over time. Holds 1.5 gallons and features a detachable fine rose head for gentle watering of seedlings. Long spout provides excellent reach and control. Perfect for both indoor and outdoor plants.",
      weight: 2.8,
      mediaurl: [
        "https://picsum.photos/400/400?random=76",
        "https://picsum.photos/400/400?random=77"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 25,
      stock_availability: "yes"
    }
  },
  {
    productname: "Ergonomic Long Handle Shovel",
    sku: "SHO-ERG-001",
    price: 2799,
    oldprice: 3299,
    ratingstar: 4.4,
    featuredimageUrl: "https://picsum.photos/400/400?random=78",
    tag: "ergonomic",
    categoryIndex: 5,
    details: {
      short_description: "Ergonomic design reduces strain during digging and planting",
      description: "Professional-grade shovel with ergonomic curved handle design that reduces back strain. Features a sharp, durable steel blade perfect for digging, edging, and transplanting. Comfortable grip handle with non-slip coating. Built to last for years of heavy use.",
      weight: 3.5,
      mediaurl: [
        "https://picsum.photos/400/400?random=79",
        "https://picsum.photos/400/400?random=80"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 35,
      stock_availability: "yes"
    }
  },
  {
    productname: "Garden Hose Nozzle Spray Gun",
    sku: "HOE-NOZ-001",
    price: 1299,
    oldprice: 1699,
    ratingstar: 4.3,
    featuredimageUrl: "https://picsum.photos/400/400?random=81",
    tag: "versatile",
    categoryIndex: 5,
    details: {
      short_description: "Multi-pattern spray nozzle with adjustable pressure control",
      description: "Versatile spray nozzle with 7 different patterns from gentle mist to powerful jet. Features adjustable pressure control and comfortable trigger with lock mechanism. Perfect for watering delicate seedlings or cleaning garden tools. Durable metal construction with rubber grip.",
      weight: 0.6,
      mediaurl: [
        "https://picsum.photos/400/400?random=82",
        "https://picsum.photos/400/400?random=83"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 50,
      stock_availability: "yes"
    }
  },
  {
    productname: "Heavy Duty Garden Rake",
    sku: "RAK-HEA-001",
    price: 2199,
    oldprice: 2699,
    ratingstar: 4.5,
    featuredimageUrl: "https://picsum.photos/400/400?random=84",
    tag: "durable",
    categoryIndex: 5,
    details: {
      short_description: "Heavy-duty steel rake for lawn and garden maintenance",
      description: "Professional heavy-duty rake with 16 steel tines perfect for gathering leaves, spreading mulch, and leveling soil. Long hardwood handle provides excellent leverage and comfort. Reinforced head construction ensures years of reliable use. Essential tool for fall cleanup and garden preparation.",
      weight: 2.2,
      mediaurl: [
        "https://picsum.photos/400/400?random=85",
        "https://picsum.photos/400/400?random=86"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 40,
      stock_availability: "yes"
    }
  },
  {
    productname: "Telescoping Pole Pruner",
    sku: "PRU-TEL-001",
    price: 4499,
    oldprice: 5299,
    ratingstar: 4.2,
    featuredimageUrl: "https://picsum.photos/400/400?random=87",
    tag: "extendable",
    categoryIndex: 5,
    details: {
      short_description: "Reach high branches safely with telescoping design",
      description: "Telescoping pole pruner extends from 6 to 12 feet for safe pruning of high branches. Features sharp bypass cutting head and rope-operated mechanism. Lightweight aluminum construction with comfortable foam grips. Perfect for fruit trees, ornamental trees, and hard-to-reach areas.",
      weight: 3.8,
      mediaurl: [
        "https://picsum.photos/400/400?random=88",
        "https://picsum.photos/400/400?random=89"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 20,
      stock_availability: "yes"
    }
  },
  {
    productname: "Garden Tool Storage Caddy",
    sku: "STO-CAD-001",
    price: 1799,
    oldprice: 2199,
    ratingstar: 4.4,
    featuredimageUrl: "https://picsum.photos/400/400?random=90",
    tag: "organization",
    categoryIndex: 5,
    details: {
      short_description: "Portable organizer for all your gardening tools",
      description: "Convenient tool caddy with multiple compartments for organizing hand tools, gloves, seeds, and supplies. Features a comfortable carrying handle and removable tool holders. Made from durable canvas with reinforced bottom. Keeps your tools organized and easily portable around the garden.",
      weight: 1.5,
      mediaurl: [
        "https://picsum.photos/400/400?random=91",
        "https://picsum.photos/400/400?random=92"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 55,
      stock_availability: "yes"
    }
  },
  {
    productname: "Digital Soil pH Meter",
    sku: "SOI-PH-001",
    price: 1599,
    oldprice: 1999,
    ratingstar: 4.1,
    featuredimageUrl: "https://picsum.photos/400/400?random=93",
    tag: "digital",
    categoryIndex: 5,
    details: {
      short_description: "Accurate digital measurement of soil pH and moisture",
      description: "Professional digital soil meter that measures pH levels, moisture content, and light intensity. Essential for determining optimal growing conditions for different plants. Easy-to-read LCD display with probe that requires no batteries. Includes growing guide for optimal pH ranges.",
      weight: 0.4,
      mediaurl: [
        "https://picsum.photos/400/400?random=94",
        "https://picsum.photos/400/400?random=95"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 75,
      stock_availability: "yes"
    }
  },
  {
    productname: "Knee Pads and Garden Kneeler",
    sku: "KNE-PAD-001",
    price: 2299,
    oldprice: 2799,
    ratingstar: 4.6,
    featuredimageUrl: "https://picsum.photos/400/400?random=96",
    tag: "comfort",
    categoryIndex: 5,
    details: {
      short_description: "Protect your knees with comfortable padded kneeler",
      description: "Comfortable foam garden kneeler that doubles as a seat when flipped over. Includes detachable knee pads for extra protection. Features built-in tool storage pockets and carrying handles. Weather-resistant material that's easy to clean. Makes gardening more comfortable for extended periods.",
      weight: 2.1,
      mediaurl: [
        "https://picsum.photos/400/400?random=97",
        "https://picsum.photos/400/400?random=98"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 30,
      stock_availability: "yes"
    }
  },
  {
    productname: "Professional Garden Gloves Set",
    sku: "GLO-PRO-001",
    price: 899,
    oldprice: 1199,
    ratingstar: 4.5,
    featuredimageUrl: "https://picsum.photos/400/400?random=99",
    tag: "protection",
    categoryIndex: 5,
    details: {
      short_description: "Set of 3 pairs for different gardening tasks",
      description: "Professional glove set includes lightweight nitrile-coated gloves for general use, heavy-duty leather gloves for pruning, and waterproof gloves for wet work. All feature excellent grip and dexterity. Breathable materials prevent hand fatigue. Available in multiple sizes.",
      weight: 0.5,
      mediaurl: [
        "https://picsum.photos/400/400?random=100",
        "https://picsum.photos/400/400?random=101"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 80,
      stock_availability: "yes"
    }
  },
  {
    productname: "Wheelbarrow Heavy Duty Steel",
    sku: "WHE-HEA-001",
    price: 8999,
    oldprice: 10999,
    ratingstar: 4.3,
    featuredimageUrl: "https://picsum.photos/400/400?random=102",
    tag: "heavy-duty",
    categoryIndex: 5,
    details: {
      short_description: "Heavy-duty steel wheelbarrow for large gardening projects",
      description: "Professional-grade wheelbarrow with 6 cubic foot steel tray and pneumatic tire for smooth transport over rough terrain. Features reinforced steel frame and comfortable padded handles. Perfect for moving soil, mulch, plants, and tools around large gardens. Assembly required.",
      weight: 25.0,
      mediaurl: [
        "https://picsum.photos/400/400?random=103",
        "https://picsum.photos/400/400?random=104"
      ],
      status: "enabled",
      mangestock: "yes",
      quantity: 15,
      stock_availability: "yes"
    }
  }
];

const sampleAttributes = [
  {
    name: "Plant Size",
    attribute_code: "plant_size",
    attribute_options: [
      { value: "Small" },
      { value: "Medium" },
      { value: "Large" },
      { value: "Extra Large" }
    ],
    display_customer: "yes"
  },
  {
    name: "Light Requirements", 
    attribute_code: "light_req",
    attribute_options: [
      { value: "Low Light" },
      { value: "Medium Light" },
      { value: "Bright Light" },
      { value: "Direct Sunlight" }
    ],
    display_customer: "yes"
  },
  {
    name: "Water Requirements",
    attribute_code: "water_req", 
    attribute_options: [
      { value: "Low Water" },
      { value: "Medium Water" },
      { value: "High Water" }
    ],
    display_customer: "yes"
  }
];

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_SERVER_KEY);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Category.deleteMany({});
    await Product.deleteMany({});
    await ProductDetails.deleteMany({});
    await Attribute.deleteMany({});
    await AdminUser.deleteMany({});
    
    // Seed Categories
    console.log("📂 Seeding categories...");
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Seed Attributes with category references
    console.log("🏷️ Seeding attributes...");
    const attributesWithCategories = sampleAttributes.map(attr => ({
      ...attr,
      attribute_group: createdCategories[0]._id // Associate with first category
    }));
    const createdAttributes = await Attribute.insertMany(attributesWithCategories);
    console.log(`✅ Created ${createdAttributes.length} attributes`);

    // Seed Products and Product Details
    console.log("🪴 Seeding products...");
    for (let i = 0; i < sampleProducts.length; i++) {
      const productData = sampleProducts[i];
      const categoryIndex = productData.categoryIndex;
      
      // Create product
      const product = new Product({
        productname: productData.productname,
        sku: productData.sku,
        price: productData.price,
        oldprice: productData.oldprice,
        categories: [createdCategories[categoryIndex]._id],
        attributes: [
          {
            value: createdAttributes[0]._id,
            label: "Medium"
          },
          {
            value: createdAttributes[1]._id, 
            label: "Medium Light"
          }
        ],
        ratingstar: productData.ratingstar,
        featuredimageUrl: productData.featuredimageUrl,
        tag: productData.tag
      });

      const savedProduct = await product.save();

      // Create product details
      const productDetails = new ProductDetails({
        product_id: savedProduct._id,
        short_description: productData.details.short_description,
        description: productData.details.description,
        weight: productData.details.weight,
        mediaurl: productData.details.mediaurl,
        status: productData.details.status,
        mangestock: productData.details.mangestock,
        quantity: productData.details.quantity,
        stock_availability: productData.details.stock_availability
      });

      const savedDetails = await productDetails.save();
      
      // Update product with details reference
      savedProduct.productdetails = savedDetails._id;
      await savedProduct.save();
    }
    
    console.log(`✅ Created ${sampleProducts.length} products with details`);

    // Create admin user
    console.log("👤 Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const adminUser = new AdminUser({
      email: "admin@pureplantparadise.com",
      hashedpassword: hashedPassword,
      isAdmin: true
    });
    await adminUser.save();
    console.log("✅ Created admin user (admin@pureplantparadise.com / admin123)");

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Products: ${sampleProducts.length}`); 
    console.log(`- Attributes: ${createdAttributes.length}`);
    console.log(`- Admin User: 1`);
    console.log("\n🔐 Admin Login:");
    console.log("Email: admin@pureplantparadise.com");
    console.log("Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
