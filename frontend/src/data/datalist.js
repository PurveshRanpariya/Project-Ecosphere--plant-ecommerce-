// Using reliable online images instead of local ones
const packingImg = "https://cdn-icons-png.flaticon.com/128/411/411763.png";
const indoorplantImg = "https://cdn-icons-png.flaticon.com/128/628/628324.png";
const plantpotImg = "https://cdn-icons-png.flaticon.com/128/3063/3063635.png";

const featurelists = [
  {
    id: "f1",
    title: "Safe Packaging, Free Replacements",
    description:
      "Securely delivered, with complimentary replacements if needed.",
    imgsrc: packingImg,
  },
  {
    id: "f2",
    title: "Curated Plant Collection",
    description: "Handpicked, diverse plants for every level of green thumb.",
    imgsrc: indoorplantImg,
  },
  {
    id: "f3",
    title: "Healthy, Sustainable Plants",
    description:
      "Lush, eco-friendly indoor plants nurtured for vitality and well-being.",
    imgsrc: plantpotImg,
  },
];

const testimoniallist = [
  {
    id: "t1",
    name: "Jane Patternson",
    avatarurl: "https://randomuser.me/api/portraits/women/11.jpg",
    message:
      "I was able to find everything I needed and found the website very easy to use. Great to be able to order everything I needed from the comfort of my home and the delivery was extremely quick. I would definitely use them again!",
  },
  {
    id: "t2",
    name: "Rachin Ravindra",
    avatarurl: "https://randomuser.me/api/portraits/men/6.jpg",
    message:
      "I recently purchased some indoor plants from PurePlantsParadise and I'm so glad I did! The prices were very reasonable and the customer service was outstanding. They answered all my questions quickly and were very helpful. I'm so happy with my purchase and would definitely recommend them to anyone looking for indoor plants.",
  },
  {
    id: "t3",
    name: "Abhishek Kadu",
    avatarurl: "https://randomuser.me/api/portraits/men/39.jpg",
    message:
      "I recently ordered a few plants from PurePlantsParadise and I was really impressed with the service. The delivery was really fast and the packing was really good. The plants arrived in perfect condition.",
  },
];

export { featurelists, testimoniallist };
