import { PhotoType, PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Nike Dunk Low Union Passport Pack Court Purple',
      price: 240,
      description:
        'The Nike Dunk Low Union LA Passport Pack Court Purple draws a resemblance to the 1999 Nike Dunk High CO.JP City Pack. Beneath a tear-away ripstop shroud, it features a Court Purple and white smooth leather construction. From there, a Union LA Frontman logo on the heel and "UN|LA" quarter panel tabs add the finishing touch.',
      photos: [
        {
          url: 'dunkunionpurple-main.png',
          type: 'MAIN',
        },
        {
          url: 'dunkunionpurple-left.png',
          type: 'LEFT',
        },
        {
          url: 'dunkunionpurple-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '41a3d124-f4b7-4089-8728-44e2939474f2',
      name: 'Nike Vaporwaffle  sacai Black White',
      price: 1000,
      description:
        'The Nike Sacai Vaporwaffle Black / White takes cues from the Swoosh’s original Waffle sole and flips it on its head by adding a thicker, stacked midsole that peeks out from the heel. Next, the upper shares similarities with the Nike Cortez, but swaps out the traditional leather with black suede and mesh to its entirety for breathability. Just like their past projects with Nike, Sacai adds both a second Swoosh in white and tongue to the sneaker, continuing their layered motif. ',
      photos: [
        {
          url: 'sacaivapor-main.png',
          type: 'MAIN',
        },
        {
          url: 'sacaivapor-left.png',
          type: 'LEFT',
        },
        {
          url: 'sacaivapor-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '70446fe8-4e67-4a7d-8e47-d1fd86677d89',
      name: 'adidas Ultra Boost Uncaged White Multi',
      price: 140,
      description:
        'The adidas Ultra Boost Uncaged White Multi is a sleek and stylish running shoe that offers both comfort and performance. The shoe features a white Primeknit upper with a multi-colored pattern, providing a unique and eye-catching look. The Boost midsole provides exceptional cushioning and energy return, while the Continental rubber outsole offers excellent traction on a variety of surfaces. The shoe also features a sock-like fit for added comfort and support.',
      photos: [
        {
          url: 'ub-main.png',
          type: 'MAIN',
        },
        {
          url: 'ub-left.png',
          type: 'LEFT',
        },
        {
          url: 'ub-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Nike Dunk Low Union Passport Pack Argon',
      price: 250,
      description:
        'Commemorating Chris Gibbs rarest Dunk pick-ups from his travels to Japan in the early 2000s, the Nike Dunk Low Union LA Passport Pack Argon takes cues from the 2001 Nike Dunk Low CO.JP Argon. It arrives with a tonal blue smooth leather construction that is wrapped in a tear-away, semi-translucent ripstop nylon covering. From there, a Union LA Frontman logo on the heel and UN|LA quarter panel tabs add the finishing touch.',
      photos: [
        {
          url: 'dunkunionargon-main.png',
          type: 'MAIN',
        },
        {
          url: 'dunkunionargon-left.png',
          type: 'LEFT',
        },
        {
          url: 'dunkunionargon-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'New Balance 2002R Salehe Bembury Water Be The Guide',
      price: 300,
      description:
        'Inspired by aquatic journeys, the New Balance 2002R Salehe Bembury Water Be The Guide features a pale orange mesh upper with hairy cyan suede overlays and dark green velour New Balance logos. A speckled white sole and lime green heel patch adds the finishing touches.',
      photos: [
        {
          url: 'nbsalehe-main.png',
          type: 'MAIN',
        },
        {
          url: 'nbsalehe-left.png',
          type: 'LEFT',
        },
        {
          url: 'nbsalehe-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'New Balance 2002R Protection Pack Distressed',
      price: 160,
      description:
        'The New Balance 2002R Protection Pack Distressed is made using NB white and gum color. The shoe has white shades on the upper and the gum color on the underfoot. It also features mesh and suede in neutral NB white. It is intentionally distressed, having smears and markings laid over its top. Additionally, it has standard laces and the New Balance logo on both sides of the shoe.',
      photos: [
        {
          url: 'nb2002diss-main.png',
          type: 'MAIN',
        },
        {
          url: 'nb2002diss-left.png',
          type: 'LEFT',
        },
        {
          url: 'nb2002diss-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'adidas Forum Buckle Low Bad Bunny Blue Tint',
      price: 350,
      description:
        'These adidas blue tint shoes have leather and suede uppers. They feature a black heavy-duty metal buckle on each side secured onto the nylon straps of the shoes. The shoes have a shoe-heel drawstring chord, detachable double-stacked tongue with Bad Bunny’s branding, a protruding foam piece on the collars, icy blue rubber outsoles, partially translucent midsoles, and soft yellow and pink laces completing the design.',
      photos: [
        {
          url: 'badbunny-main.png',
          type: 'MAIN',
        },
        {
          url: 'badbunny-left.png',
          type: 'LEFT',
        },
        {
          url: 'badbunny-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '42c3e0a1-93e5-419c-8270-8c8ff848dd02',
      name: 'Nike Dunk High AMBUSH Deep Royal',
      price: 250,
      description:
        'Adding to their collection of idiosyncratic Nike Dunks, Nike and AMBUSH bring a Deep Royal colorway to the unique silhouette. An exaggerated black Swoosh extends towards the heel and from there, bold AMBUSH branding projects off an elevated heel cap. Lastly, Deep Royal leather overlays are stacked on white leather panels to complete the design.',
      photos: [
        {
          url: 'dunkambush-main.png',
          type: 'MAIN',
        },
        {
          url: 'dunkambush-left.png',
          type: 'LEFT',
        },
        {
          url: 'dunkambush-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '0b925cf4-2c1f-4a53-b84c-ec805cf81408',
      name: 'Nike LD Waffle sacai Varsity Blue',
      price: 400,
      description:
        'Might need more drip than syrup after copping the Nike LD Waffle Sacai Varsity Blue. This Nike LD comes with a red upper plus blue accents, yellow Nike "Swoosh", Silver Nike "Swoosh", white midsole, and a black sole.',
      photos: [
        {
          url: 'sacaild-main.png',
          type: 'MAIN',
        },
        {
          url: 'sacaild-left.png',
          type: 'LEFT',
        },
        {
          url: 'sacaild-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '7efb113d-6f72-42a3-b6c4-b1579f4c4e5c',
      name: 'adidas Yeezy Foam RNNR Stone Sage',
      price: 150,
      description:
        'The adidas Yeezy Foam RNNR Stone Sage features a sculptural EVA foam and algae blended construction that arrives in a Stone Sage monochromatic color scheme. From there, a grooved outsole provides traction and support.',
      photos: [
        {
          url: 'foamrnr-main.png',
          type: 'MAIN',
        },
        {
          url: 'foamrnr-left.png',
          type: 'LEFT',
        },
        {
          url: 'foamrnr-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '89dd018d-f3e8-4918-bffb-5300b271bc47',
      name: 'Converse Geo Forma Boot A-COLD-WALL Lily White',
      price: 140,
      description:
        'It features a stretch bootie upper construction alongside a lugged outsole for traction. The entire shoe is in colored in a lily white hue on the upper and the sole. Besides its boot construction, the sneaker boasts a zip-up shroud and elevated, lugged outsole. At the collar, this Geo Converse pair has a TPU fuse with "A COLD WALL" printed in a styled typographic. Its heel stays and sock liners features Counter Climate branding.',
      photos: [
        {
          url: 'convacw-main.png',
          type: 'MAIN',
        },
        {
          url: 'convacw-left.png',
          type: 'LEFT',
        },
        {
          url: 'convacw-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '68cdc2e0-502c-4d1b-a4e0-db2a1d4d2d00',
      name: 'adidas Yeezy 700 V3 Azael ',
      price: 220,
      description:
        'This 700 V3 is composed of an azael upper composed of monofilament engineered mesh with RPU overlays for structure and durability. The RPU cage has glow-in-the-dark features, along with 3M reflective detailing on the toe. The EVA midsole and herringbone rubber outsole completes the design.',
      photos: [
        {
          url: 'yzyazael-main.png',
          type: 'MAIN',
        },
        {
          url: 'yzyazael-left.png',
          type: 'LEFT',
        },
        {
          url: 'yzyazael-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '82c55a8a-a308-4bc5-ba41-746ee0515851',
      name: 'adidas Yeezy 700 V3 Mono Safflower',
      price: 200,
      description:
        'With a yellow and tonal grey Primeknit upper atop a thick EVA foam sole, the adidas Yeezy 700 V3 Mono Safflower is almost identical to the original Safflower release. However, there is one key difference: instead of a stark white TPU lace caging unit, the Mono Safflower opts for a glow-in-the-dark, cream styling, matching the warm look of the sole. ',
      photos: [
        {
          url: 'yzysafflower-main.png',
          type: 'MAIN',
        },
        {
          url: 'yzysafflower-left.png',
          type: 'LEFT',
        },
        {
          url: 'yzysafflower-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '238a8a37-28f8-4329-9d9b-685adeac8b77',
      name: 'adidas Yeezy Boost 350 V2 Zebra',
      price: 300,
      description:
        'Debuted in 2017, the adidas Yeezy Boost 350 V2 Zebra is known as one of the most renowned colorways in the Yeezy line. It features a white and black marbled Primeknit upper with a white side-stripe and red "SPLY-350" text. At the base, a cushioned Boost sole provides comfort and support.',

      photos: [
        {
          url: 'yzyzebra-main.png',
          type: 'MAIN',
        },
        {
          url: 'yzyzebra-left.png',
          type: 'LEFT',
        },
        {
          url: 'yzyzebra-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '31e11a99-c602-4da1-830a-b4cd882cdbb0',
      name: 'adidas Yeezy 500 Super Moon Yellow',
      price: 230,
      description:
        'These new Yeezy 500 Super Moon Yellows are coming in hotter than a Jackson Hole bonfire. The latest colorway in the Yeezy 500 line, these use adiPrene cushioning in place of BOOST and feature a chunkier look that will grow on you (trust us). This all-moon yellow pair was the first colorway that dropped, as part of the Yeezy season 6 bundle, followed by a wider release in June of 2018. Fans of Ye need to make "No Mistakes" and add this Yeezy 500 colorway into the collection asap.',
      photos: [
        {
          url: 'yzymoon-main.png',
          type: 'MAIN',
        },
        {
          url: 'yzymoon-left.png',
          type: 'LEFT',
        },
        {
          url: 'yzymoon-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'df5e935f-64bb-4685-a525-b8c240401d37',
      name: 'New Balance 1906D Protection Pack Reflection',
      price: 160,
      description:
        'Textured suede overlays embellish the breathable mesh uppers, giving an air of intentional imperfection - or artistic erosion. An ABZORB midsole sits underfoot - delivering a protective and responsive feel with unparalleled arch support, while signature branding can be found on the tongue, sidewalls, and heel to complete the look.',
      photos: [
        {
          url: 'nb1906-main.png',
          type: 'MAIN',
        },
        {
          url: 'nb1906-left.png',
          type: 'LEFT',
        },
        {
          url: 'nb1906-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'd6b9058e-4dcb-4aef-bdb9-9183bb5b3cbb',
      name: 'adidas Yeezy Boost 350 V2 Beluga Reflective',
      price: 210,
      description:
        'The adidas Yeezy Boost 350 V2 Beluga Reflective builds off of the original Beluga colorway by adding reflective qualities and speckled orange accents to its Primeknit upper. Signature details like a Boost sole and orange side stripe complete the design. ',
      photos: [
        {
          url: 'yzybeluga-main.png',
          type: 'MAIN',
        },
        {
          url: 'yzybeluga-left.png',
          type: 'LEFT',
        },
        {
          url: 'yzybeluga-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'bef4511a-c222-4159-96cb-8bbfdb0563a5',
      name: 'adidas Yeezy Boost 350 V2 MX Rock',
      price: 200,
      description:
        'The adidas Yeezy Boost 350 V2 MX Rock features a marbled black, grey, and brown Primeknit upper styled in a pattern similar to the Yeezy 350 V2 MX Oat, only with dark tones. In signature fashion, a cushioned Boost sole, heel tab, and mesh side stripe complete the design. ',
      photos: [
        {
          url: 'yzyrock-main.png',
          type: 'MAIN',
        },
        {
          url: 'yzyrock-left.png',
          type: 'LEFT',
        },
        {
          url: 'yzyrock-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'f6cd83d6-277a-421d-81ab-6acb7fc67095',
      name: 'Nike Air Force 1 LX Tear Away',
      price: 100,
      description:
        'The  Nike Air Force 1 LX Tear Away features a white corduroy upper with ivory twill overlays and white swooshes on the right shoe and a multicolored design on the left shoe. From there, a gray platform outsole and "AIR" branding below the front part of the heel complete the design.  ',
      photos: [
        {
          url: 'af1tear-main.png',
          type: 'MAIN',
        },
        {
          url: 'af1tear-left.png',
          type: 'LEFT',
        },
        {
          url: 'af1tear-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: '41a2041a-761e-48bb-aedf-47ee9e255b58',
      name: 'Nike Air Force 1 Low Drake NOCTA Certified Lover Boy',
      price: 120,
      description:
        'Previously dubbed "Certified Lover Boy," the new premium Drake-inspired AF1 is now known as the "Love You Forever." This sentiment is inspired by Drake’s favorite childhood book with subtle added details of complimentary hearts and a scripted "Love You Forever" on the midsole. Additional design elements include customized laces, NOCTA logo on left heel, and a new perforation pattern on toe box.  ',
      photos: [
        {
          url: 'af1d-main.png',
          type: 'MAIN',
        },
        {
          url: 'af1d-left.png',
          type: 'LEFT',
        },
        {
          url: 'af1d-right.png',
          type: 'RIGHT',
        },
      ],
    },
    {
      id: 'ff1cd3b5-a7f0-4ef9-90e5-d434b3105639',
      name: 'Jordan 4 Retro Union Off Noir',
      price: 600,
      description:
        'The Air Jordan 4 Union LA Off Noir features a mixture of materials and colors. The upper is constructed out of black, white, and blue mesh, suede, and nylon. Hits of, what looks like infrared, can be found on the Nike Air heel and the tip of the wings. ',
      photos: [
        {
          url: 'j4union-main.png',
          type: 'MAIN',
        },
        {
          url: 'j4union-left.png',
          type: 'LEFT',
        },
        {
          url: 'j4union-right.png',
          type: 'RIGHT',
        },
      ],
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map(async (productData) => {
      const { photos, ...product } = productData;
      return await db.product.create({
        data: {
          ...product,
          photos: {
            create: photos.map((photo) => ({
              url: photo.url,
              type: photo.type as PhotoType,
            })),
          },
        },
        include: {
          photos: true,
        },
      });
    }),
  );
}

seed();
