import heroCourtyardImg from '../assets/images/hero_vrindavan_courtyard_1794648612641.jpg';
import ambianceChaiImg from '../assets/images/ambiance_brass_chai_1794648613708.jpg';
import galleryBrunchImg from '../assets/images/gallery_artisan_thali_1794648613329.jpg';
import galleryRoasteryImg from '../assets/images/gallery_roastery_bar_1794648614183.jpg';
import galleryGardenImg from '../assets/images/gallery_garden_seating_1794648613989.jpg';

export type MenuCategory =
  | 'Chai & Coffee'
  | 'Small Plates'
  | 'Brunch & Bowls'
  | 'Sweets';

export interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly category: MenuCategory;
  readonly priceInr: number;
  readonly dietaryNote: string;
  readonly description: string;
  readonly isHouseFavorite?: boolean;
}

export interface GalleryItem {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly title: string;
  readonly caption: string;
  readonly aspect: 'landscape' | 'portrait';
}

export interface CafeHourRow {
  readonly days: string;
  readonly time: string;
}

export interface SeatingZone {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
}

/**
 * Central configuration for Vrindavan Cafe.
 * Update `ownerWhatsApp` (country code + digits, no + or spaces) and
 * address fields with your final cafe details before deploying.
 */
export const CAFE_INFO = Object.freeze({
  name: 'Vrindavan Cafe',
  subtitle: 'Botanical Courtyard Kitchen & Slow-Brewed Chai',
  ownerWhatsApp: '919963344874',
  displayPhone: '09963344874',
  email: 'hello@vrindavancafe.in',
  addressLine1: '3-208, Old Adavivaram, Sri Sai Nagar',
  addressLine2: 'Simhachalam, Visakhapatnam, Adavivaram, Andhra Pradesh 530028',
  landmark: 'Sri Sai Nagar, Old Adavivaram · Simhachalam',
  parkingNote: 'Dedicated two-wheeler & car parking beside the cafe entrance.',
  googleMapsUrl: 'https://maps.app.goo.gl/XA5t87T4ZS8ToCBYA',
  deliveryFeeInr: 40,
  freeDeliveryThresholdInr: 600,
  fssaiNumber: 'Pending Owner FSSAI Registration No.',
  gstinNumber: 'Unregistered / Update if GST Applicable',
  demoDisclosure:
    'Pre-launch / sample menu preview: confirm final dish availability, prices, and FSSAI details directly with the cafe owner via WhatsApp.',
  hours: Object.freeze<CafeHourRow[]>([
    { days: 'Monday – Friday', time: '7:30 AM – 10:00 PM' },
    { days: 'Saturday – Sunday', time: '7:00 AM – 10:30 PM' },
  ]),
});

export const MENU_CATEGORIES: readonly ('All' | MenuCategory)[] = Object.freeze([
  'All',
  'Chai & Coffee',
  'Small Plates',
  'Brunch & Bowls',
  'Sweets',
]);

export const MENU_ITEMS: readonly MenuItem[] = Object.freeze([
  Object.freeze({
    id: 'chai-tulsi-masala',
    name: 'Tulsi Ginger Masala Chai',
    category: 'Chai & Coffee',
    priceInr: 140,
    dietaryNote: 'Fresh Brewed · Brass Kettle',
    description:
      'Assam single-estate tea simmered with crushed green cardamom, fresh ginger root, and courtyard tulsi leaves.',
    isHouseFavorite: true,
  }),
  Object.freeze({
    id: 'coffee-cardamom-rose',
    name: 'Iced Rose Cardamom Latte',
    category: 'Chai & Coffee',
    priceInr: 210,
    dietaryNote: 'Chilled · Double Shot',
    description:
      'Chilled Chikmagalur arabica espresso layered over cold milk, house rose-petal syrup, and freshly ground cardamom.',
    isHouseFavorite: true,
  }),
  Object.freeze({
    id: 'coffee-pour-over',
    name: 'Estate Single-Origin Pour Over',
    category: 'Chai & Coffee',
    priceInr: 190,
    dietaryNote: 'Vegan · Hand Poured',
    description:
      'Clean, floral V60 filter brew highlighting notes of toasted almond, jaggery, and wild orange blossom.',
  }),
  Object.freeze({
    id: 'chai-kesar-badam',
    name: 'Saffron Badam Milk',
    category: 'Chai & Coffee',
    priceInr: 180,
    dietaryNote: 'Gluten-Free · Served Warm',
    description:
      'Slow-reduced milk infused with Kashmir saffron strands, stone-ground almonds, and roasted pistachio slivers.',
  }),
  Object.freeze({
    id: 'plate-paneer-flatbread',
    name: 'Grilled Paneer & Herb Flatbread',
    category: 'Small Plates',
    priceInr: 340,
    dietaryNote: 'Sattvic Option · Stone Baked',
    description:
      'Blistered sourdough flatbread topped with marinated cottage cheese, fresh coriander, red chilli flakes, and lime.',
    isHouseFavorite: true,
  }),
  Object.freeze({
    id: 'plate-lotus-stem',
    name: 'Crisp Lotus Stem & Mint Chutney',
    category: 'Small Plates',
    priceInr: 260,
    dietaryNote: 'Vegan · Shareable',
    description:
      'Thinly sliced lotus stem tossed in roasted cumin, amchur, and pomegranate served with garden mint chutney.',
  }),
  Object.freeze({
    id: 'plate-avocado-cumin',
    name: 'Avocado & Roasted Cumin Toast',
    category: 'Small Plates',
    priceInr: 290,
    dietaryNote: 'Vegan · Country Sourdough',
    description:
      'Thick-cut toasted country loaf with smashed avocado, flaky sea salt, toasted sesame, and lemon zest.',
  }),
  Object.freeze({
    id: 'bowl-sweet-potato',
    name: 'Spiced Sweet Potato & Pomegranate Bowl',
    category: 'Brunch & Bowls',
    priceInr: 310,
    dietaryNote: 'Gluten-Free · High Fiber',
    description:
      'Charred sweet potato cubes glazed in tamarind-jaggery reduction over herbed quinoa, greens, and fresh ruby arils.',
    isHouseFavorite: true,
  }),
  Object.freeze({
    id: 'bowl-courtyard-thali',
    name: 'Courtyard Morning Platter',
    category: 'Brunch & Bowls',
    priceInr: 390,
    dietaryNote: '100% Vegetarian · Chef Selection',
    description:
      'Warm sourdough toast, cultured butter, herb flatbread, spiced root vegetables, and green chutney for slow mornings.',
  }),
  Object.freeze({
    id: 'sweet-besan-tart',
    name: 'Warm Besan & Pistachio Tart',
    category: 'Sweets',
    priceInr: 220,
    dietaryNote: 'House Baked · Nut Rich',
    description:
      'Roasted gram-flour frangipane baked in a flaky butter shell with cardamom glaze and crushed green pistachios.',
  }),
  Object.freeze({
    id: 'sweet-kesar-cheesecake',
    name: 'Kesar Pista Baked Cheesecake',
    category: 'Sweets',
    priceInr: 260,
    dietaryNote: 'Eggless · Daily Batch',
    description:
      'Velvety saffron-infused baked cheesecake on a spiced digestive crust finished with rose petals.',
  }),
]);

export const HERO_MEDIA = Object.freeze({
  src: heroCourtyardImg,
  alt: 'Sunlit limestone courtyard of Vrindavan Cafe with potted tulsi plants, jasmine vines, and dark teak dining tables.',
  ambianceSrc: ambianceChaiImg,
  ambianceAlt: 'Steaming artisanal masala chai in a stoneware cup beside a brushed brass kettle and whole cardamom pods.',
});

export const GALLERY_ITEMS: readonly GalleryItem[] = Object.freeze([
  Object.freeze({
    id: 'gal-courtyard',
    src: heroCourtyardImg,
    alt: 'Open-air limestone courtyard surrounded by tulsi and jasmine greenery at Vrindavan Cafe',
    title: 'The Tulsi Courtyard',
    caption: 'Sunlit sandstone archways, potted tulsi, and unhurried teakwood tables.',
    aspect: 'landscape',
  }),
  Object.freeze({
    id: 'gal-garden',
    src: galleryGardenImg,
    alt: 'Shaded pergola seating with climbing jasmine vines and two iced rose cardamom lattes',
    title: 'Jasmine Pergola Seating',
    caption: 'Dappled afternoon shade paired with chilled rose-cardamom lattes.',
    aspect: 'portrait',
  }),
  Object.freeze({
    id: 'gal-brunch',
    src: galleryBrunchImg,
    alt: 'Vegetarian brunch spread with grilled paneer flatbread, spiced sweet potato, mint chutney, and sourdough toast',
    title: 'Seasonal Vegetarian Plates',
    caption: 'Stone-baked herb flatbreads, spiced sweet potatoes, and house chutneys.',
    aspect: 'landscape',
  }),
  Object.freeze({
    id: 'gal-roastery',
    src: galleryRoasteryImg,
    alt: 'Specialty pour-over coffee and tea bar inside a stone-walled cafe interior',
    title: 'The Slow-Brew Bar',
    caption: 'Hand-poured V60 filter coffee and small-batch estate infusions.',
    aspect: 'landscape',
  }),
  Object.freeze({
    id: 'gal-chai',
    src: ambianceChaiImg,
    alt: 'Brushed brass kettle beside a stoneware cup of steaming masala chai and green cardamom',
    title: 'Brass-Kettle Masala Chai',
    caption: 'Freshly crushed green cardamom, ginger, and tulsi simmered to order.',
    aspect: 'landscape',
  }),
]);

export const SEATING_ZONES: readonly SeatingZone[] = Object.freeze([
  Object.freeze({
    id: 'Garden',
    label: 'Garden',
    detail: 'Open-air garden courtyard seating surrounded by greenery and shade',
  }),
  Object.freeze({
    id: 'Indoor',
    label: 'Indoor',
    detail: 'Cool indoor dining lounge near the chai and coffee bar',
  }),
  Object.freeze({
    id: 'No Preference',
    label: 'No Preference',
    detail: 'Best available table on arrival',
  }),
]);

export const RESERVATION_TIME_SLOTS: readonly string[] = Object.freeze([
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
]);
