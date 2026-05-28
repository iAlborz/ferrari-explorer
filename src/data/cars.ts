export type Tag =
  | "halo"
  | "icona"
  | "few-off"
  | "one-off"
  | "coach-built"
  | "limited"
  | "special-projects"
  | "upcoming";

export type Variation = {
  id: string;
  name: string;
  year: string;
  power?: string;
  description: string;
};

export type Model = {
  id: string;
  name: string;
  year: string;
  image: string;
  tagline: string;
  description: string;
  tags: Tag[];
  variations: Variation[];
  comingSoon?: boolean;
};

export type Category = {
  id: string;
  name: string;
  blurb: string;
  models: Model[];
};

export type Brand = {
  id: string;
  name: string;
  tagline: string;
  categories: Category[];
};

const img = (slug: string) => `/cars/${slug}.jpg`;

export const FERRARI: Brand = {
  id: "ferrari",
  name: "Ferrari",
  tagline: "Cavallino Rampante",
  categories: [

    // ─────────────────────────────────────────────────────────────
    // 1. HALO
    // ─────────────────────────────────────────────────────────────
    {
      id: "halo",
      name: "Halo",
      blurb: "Once-per-decade limited flagships. Each one a technological watershed — from the 288 GTO to the F80, every Halo marks the furthest Ferrari could push the state of the art.",
      models: [
        {
          id: "288-gto",
          name: "288 GTO",
          year: "1984–1987",
          image: img("288-gto"),
          tagline: "Homologation special. The car that launched a dynasty.",
          description: "Homologation special (Type F114) based on the 308 GTB, conceived for Group B racing. Nicola Materazzi designed the twin-turbo 2.9 L V8 producing 400 hp. Enzo Ferrari gifted several to F1 drivers — Alboreto, Lauda, Rosberg. Its DNA ran straight to the F40. 273 built.",
          tags: ["halo", "limited"],
          variations: [
            { id: "288-gto", name: "288 GTO", year: "1984–1987", power: "400 hp", description: "Road car. 273 built." },
            { id: "288-gto-evo", name: "288 GTO Evoluzione", year: "1986", power: "650 hp", description: "Group B prototype — five built plus one prototype. 940 kg, 225 mph. Group B cancelled before it raced. Directly fathered the F40." },
          ],
        },
        {
          id: "f40",
          name: "F40",
          year: "1987–1992",
          image: img("f40"),
          tagline: "Enzo's last car. No carpets, no mercy.",
          description: "Developed from the GTO Evoluzione, purely performance-focused with no concessions to luxury. Designed by Pietro Camardella under Pininfarina. Unveiled summer 1987. The first production car to break 200 mph. 1,315 built.",
          tags: ["halo", "limited"],
          variations: [
            { id: "f40", name: "F40", year: "1987–1992", power: "478 hp", description: "Street car. 1,315 built." },
            { id: "f40-lm", name: "F40 LM", year: "1989–1994", power: "720 hp", description: "Le Mans-spec racing variant by Michelotto. Jean Alesi drove to third at Laguna Seca. 19 built." },
            { id: "f40-competizione", name: "F40 Competizione", year: "1989–1996", power: "700 hp", description: "Won the 4 Hours of Vallelunga (1994) and Anderstorp (1995, 1996) in BPR Global GT Series. 3 built." },
          ],
        },
        {
          id: "f50",
          name: "F50",
          year: "1995–1997",
          image: img("f50"),
          tagline: "An F1 engine with a license plate.",
          description: "Mid-engine targa (Type F130). 4.7 L naturally aspirated 60-valve V12 derived from the Ferrari 641 F1 car, bolted to the chassis as a stressed member. Design evolved from the 1989 Mythos concept. 349 built — one fewer than demand to preserve exclusivity.",
          tags: ["halo", "limited"],
          variations: [
            { id: "f50", name: "F50", year: "1995–1997", power: "513 hp", description: "Street car. 349 built. Ferrari initially leased many to clients to prevent flipping." },
            { id: "f50-gt", name: "F50 GT", year: "1995", power: "750 hp", description: "Racing derivative co-developed with Dallara and Michelotto for BPR against the McLaren F1 GTR. Programme cancelled before it raced. 3 built." },
          ],
        },
        {
          id: "enzo",
          name: "Enzo Ferrari",
          year: "2002–2004",
          image: img("enzo"),
          tagline: "Named after the founder. Carbon body, F1 paddle-shift.",
          description: "Carbon-fibre body styled by Ken Okuyama of Pininfarina. 660 hp V12, 0–60 in 3.14 sec. F1-derived paddle-shift. The first Ferrari Halo named after the founder. 399 built plus one for the Pope.",
          tags: ["halo", "limited"],
          variations: [
            { id: "enzo", name: "Enzo Ferrari", year: "2002–2004", power: "651 hp", description: "Production model. 399 + 1 built." },
            { id: "fxx", name: "FXX", year: "2005–2007", power: "789 hp", description: "Track-only XX Programme car based on the Enzo. 800 hp+ naturally aspirated V12. 30 built." },
            { id: "p4-5", name: "P4/5 by Pininfarina", year: "2006", power: "651 hp", description: "Unique road-legal barchetta on the Enzo chassis, built for James Glickenhaus by Pininfarina. Named after the legendary 330 P4." },
          ],
        },
        {
          id: "laferrari",
          name: "LaFerrari",
          year: "2013–2016",
          image: img("laferrari"),
          tagline: "Ferrari's first hybrid. 963 hp. The end of the analogue Halo.",
          description: "Ferrari's first series-production hybrid: 6.3 L V12 with KERS electric motor producing 963 hp combined. Aerodynamics developed with the F1 team. The last purely V12 Halo car — and the car that made the argument for electrification. 499 coupés built.",
          tags: ["halo", "limited"],
          variations: [
            { id: "laferrari", name: "LaFerrari", year: "2013–2016", power: "963 hp", description: "Coupé. 499 built." },
            { id: "laferrari-aperta", name: "LaFerrari Aperta", year: "2016–2018", power: "963 hp", description: "Open-top celebrating Ferrari's 70th anniversary. 209 built — strictly invitation-only." },
            { id: "fxx-k", name: "FXX K", year: "2015–2017", power: "1,050 hp", description: "Track-only XX Programme car based on LaFerrari. 1,050 hp combined ICE + electric. 42 built." },
            { id: "fxx-k-evo", name: "FXX K Evo", year: "2017–2019", power: "1,050 hp", description: "Evolution for FXX-K owners — revised aerodynamics, more downforce. 40 built." },
          ],
        },
        {
          id: "f80",
          name: "F80",
          year: "2024–",
          image: img("f80"),
          tagline: "1,200 hp. The new Halo drops the V12.",
          description: "The first Ferrari Halo to move away from the V12. Twin-turbo 3.0 L V6 with three electric motors, butterfly doors, active suspension, and ground-effect underbody — all derived from F1 technology. 799 to be built. All slots sold before the reveal.",
          tags: ["halo", "limited"],
          variations: [
            { id: "f80", name: "F80", year: "2024–", power: "1,200 hp", description: "799 build slots. All sold before reveal." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 2. MID-ENGINE FLAT-12
    // ─────────────────────────────────────────────────────────────
    {
      id: "mid-flat12",
      name: "Mid-engine Flat-12",
      blurb: "Ferrari's pre-V8 sports car era. The Berlinetta Boxer pioneered the mid-engine layout on the road; the Testarossa took it to its iconic — and final — conclusion.",
      models: [
        {
          id: "berlinetta-boxer",
          name: "Berlinetta Boxer",
          year: "1973–1984",
          image: img("berlinetta-boxer"),
          tagline: "Ferrari's first mid-engine road car. The flat-12 begins.",
          description: "Unveiled at the 1973 Paris Motor Show during the oil crisis — Ferrari's first production mid-engine road car. A horizontally opposed 12-cylinder (flat-12) engine mounted behind the driver. Replaced the front-engine 365 GTB/4 Daytona. Produced across three generations over 11 years.",
          tags: [],
          variations: [
            { id: "365-gt4-bb", name: "365 GT4 BB", year: "1973–1976", power: "344 hp", description: "First production Berlinetta Boxer. 4.4 L flat-12. 387 built." },
            { id: "512-bb", name: "512 BB", year: "1976–1981", power: "360 hp", description: "5.0 L flat-12 with wider bodywork and revised styling. 929 built." },
            { id: "512-bbi", name: "512 BBi", year: "1981–1984", power: "340 hp", description: "Fuel-injected evolution via Bosch K-Jetronic. Cleaner emissions, slightly softer character. 1,007 built." },
            { id: "512-bb-lm", name: "512 BB LM", year: "1978–1981", power: "460 hp", description: "Le Mans racing version. Competed at Le Mans 1978–1982." },
          ],
        },
        {
          id: "testarossa",
          name: "Testarossa",
          year: "1984–1996",
          image: img("testarossa"),
          tagline: "Side strakes. Flat-12. The icon of an era.",
          description: "Premiered at the 1984 Paris Auto Show as successor to the 512 BB. The Testarossa's dramatic side strakes — functional ducts for the rear-mounted radiators — became one of the most recognised design details in automotive history. Evolved through three names over 12 years.",
          tags: [],
          variations: [
            { id: "testarossa-std", name: "Testarossa", year: "1984–1991", power: "390 hp", description: "4.9 L flat-12. Produced ~7,177 across the full family." },
            { id: "512-tr", name: "512 TR", year: "1992–1994", power: "428 hp", description: "Revised engine, new interior, improved handling. 2,261 built." },
            { id: "f512-m", name: "F512 M", year: "1995–1996", power: "440 hp", description: "Final evolution — Modified (M) version with revised front and rear styling. 501 built. The last mid-engine flat-12 Ferrari." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 3. MID-ENGINE V8
    // ─────────────────────────────────────────────────────────────
    {
      id: "mid-v8",
      name: "Mid-engine V8",
      blurb: "The sports berlinetta lineage — Ferrari's core performance car, continuously evolved from the Dino to the F8 Tributo across five decades and nine generations.",
      models: [
        {
          id: "dino-246",
          name: "Dino 246 GT",
          year: "1969–1974",
          image: img("308-gtb"),
          tagline: "The Dino. Mid-engine. The car that made it possible.",
          description: "Sold without the Ferrari badge under the 'Dino' sub-brand — named after Enzo's son Alfredino. The 246 GT was Ferrari's first mid-engine production sports car intended for volume sale. Its 2.4 L V6 and Pininfarina body established the proportions the 308 and every car that followed would inherit.",
          tags: [],
          variations: [
            { id: "dino-246-gt", name: "Dino 246 GT", year: "1969–1974", power: "195 hp", description: "Coupé. 2,487 built." },
            { id: "dino-246-gts", name: "Dino 246 GTS", year: "1972–1974", power: "195 hp", description: "Targa-roof version. 1,274 built." },
          ],
        },
        {
          id: "308-gtb",
          name: "308 GTB / GTS",
          year: "1975–1985",
          image: img("308-gtb"),
          tagline: "The car that made Ferrari a household name.",
          description: "Pininfarina-designed, mid-engined, and originally built in fibreglass. The 308 turned the sports berlinetta into a Ferrari staple — and into global shorthand for 'supercar' via Magnum P.I. The first Ferrari to reach truly global cultural recognition.",
          tags: [],
          variations: [
            { id: "308-gtb-vetroresina", name: "308 GTB 'Vetroresina'", year: "1975–1977", power: "255 hp", description: "Original fibreglass body. 712 built." },
            { id: "308-gtb-steel", name: "308 GTB", year: "1977–1985", power: "240 hp", description: "Steel body replacement from 1977. European 4-valve version later raised output." },
            { id: "308-gts", name: "308 GTS", year: "1977–1985", power: "240 hp", description: "Targa-top version. The Magnum P.I. car." },
            { id: "308-qv", name: "308 GTB/GTS Quattrovalvole", year: "1982–1985", power: "240 hp", description: "Four-valve heads reclaimed power lost to emissions controls." },
          ],
        },
        {
          id: "328",
          name: "328 GTB / GTS",
          year: "1985–1989",
          image: img("308-gtb"),
          tagline: "The 308, grown up. 270 hp, subtly restyled.",
          description: "A refined evolution of the 308 with a larger 3.2 L V8 delivering 270 hp, updated Pininfarina styling, and a more polished interior. The 328 is one of the best-loved Ferraris — widely considered the peak of the classic mid-V8 era before electronic management arrived.",
          tags: [],
          variations: [
            { id: "328-gtb", name: "328 GTB", year: "1985–1989", power: "270 hp", description: "Coupé. 1,344 built." },
            { id: "328-gts", name: "328 GTS", year: "1985–1989", power: "270 hp", description: "Targa. 6,068 built — the most popular variant." },
          ],
        },
        {
          id: "348",
          name: "348",
          year: "1989–1994",
          image: img("f355"),
          tagline: "The bridge between the 328 and the F355.",
          description: "New platform, new engine mounting (longitudinal, like the Testarossa), and Pininfarina styling that previewed the direction of the F355. The 348 was criticised on launch for handling imbalance, but later revisions addressed the issues — and the Spider remains one of Ferrari's most elegant open cars.",
          tags: [],
          variations: [
            { id: "348-tb", name: "348 tb", year: "1989–1993", power: "300 hp", description: "Berlinetta. 2,894 built." },
            { id: "348-ts", name: "348 ts", year: "1989–1993", power: "300 hp", description: "Targa. 4,230 built." },
            { id: "348-spider", name: "348 Spider", year: "1993–1995", power: "300 hp", description: "Full convertible, introduced to replace the targa. 1,090 built." },
            { id: "348-challenge", name: "348 Challenge", year: "1993–1994", power: "320 hp", description: "Single-make series version, predecessor to the Ferrari Challenge programme." },
          ],
        },
        {
          id: "f355",
          name: "F355",
          year: "1994–1999",
          image: img("f355"),
          tagline: "Five valves per cylinder. The car that set the template.",
          description: "Replaced the 348. 3.5 L V8 with five valves per cylinder, 375 hp, flat-plane crank to 8,500 rpm. First Ferrari with an optional F1 paddle-shift gearbox (1997). Set the formula — chassis, aero, engine character — that every mid-V8 Ferrari since has followed.",
          tags: [],
          variations: [
            { id: "f355-berlinetta", name: "F355 Berlinetta", year: "1994–1999", power: "375 hp", description: "Closed coupé. 4,871 built." },
            { id: "f355-spider", name: "F355 Spider", year: "1995–1999", power: "375 hp", description: "Full convertible — Ferrari's first power-folding cloth roof. 3,717 built." },
            { id: "f355-gts", name: "F355 GTS", year: "1995–1999", power: "375 hp", description: "Removable targa roof. 2,577 built." },
            { id: "f355-f1", name: "F355 F1", year: "1997–1999", power: "375 hp", description: "First road car with Ferrari's paddle-shift semi-automatic gearbox." },
          ],
        },
        {
          id: "360-modena",
          name: "360 Modena",
          year: "1999–2005",
          image: img("360-modena"),
          tagline: "All-aluminium. The wedge era ends.",
          description: "All-aluminium chassis and body — a clean break from the previous steel spaceframe. 400 hp V8, fully exposed engine bay through a glass cover. The 360 broke the wedge era for good and reset Ferrari design on the curved path it still walks. 8,800 coupés built.",
          tags: [],
          variations: [
            { id: "360-modena", name: "360 Modena", year: "1999–2005", power: "400 hp", description: "Berlinetta. 8,800 built." },
            { id: "360-spider", name: "360 Spider", year: "2001–2005", power: "400 hp", description: "Soft-top convertible. 7,565 built." },
            { id: "360-cs", name: "360 Challenge Stradale", year: "2003–2005", power: "425 hp", description: "Track-focused road-legal homologation. 110 kg lighter, Lexan windows. 1,274 built." },
          ],
        },
        {
          id: "f430",
          name: "F430",
          year: "2004–2009",
          image: img("f430"),
          tagline: "The manettino arrives. Ferrari's electronics, made visible.",
          description: "F1-derived steering-wheel toggle for chassis modes, E-Diff, and a 4.3 L flat-plane V8. The F430 made Ferrari's technology ladder finally legible from the driver's seat. 3,327 coupés built.",
          tags: [],
          variations: [
            { id: "f430", name: "F430", year: "2004–2009", power: "490 hp", description: "Berlinetta. 3,327 built." },
            { id: "f430-spider", name: "F430 Spider", year: "2005–2009", power: "490 hp", description: "Open. 4,094 built." },
            { id: "430-scuderia", name: "430 Scuderia", year: "2007–2009", power: "503 hp", description: "Track-edged: 100 kg lighter, carbon-ceramic brakes standard, Schumacher development input." },
            { id: "scuderia-spider-16m", name: "Scuderia Spider 16M", year: "2008–2009", power: "503 hp", description: "Open Scuderia celebrating Ferrari's 16th Formula 1 Constructors' Championship. 499 built." },
          ],
        },
        {
          id: "458-italia",
          name: "458 Italia",
          year: "2009–2015",
          image: img("458-italia"),
          tagline: "The last great naturally aspirated mid-V8.",
          description: "570 hp naturally aspirated 4.5 L V8 to 9,000 rpm, dual-clutch gearbox, all-new aerodynamic design. The 458 won every road test it entered. Still widely regarded as the benchmark mid-engine sports car of its generation.",
          tags: [],
          variations: [
            { id: "458-italia", name: "458 Italia", year: "2009–2015", power: "562 hp", description: "Coupé." },
            { id: "458-spider", name: "458 Spider", year: "2011–2015", power: "562 hp", description: "Retractable aluminium hardtop." },
            { id: "458-speciale", name: "458 Speciale", year: "2013–2015", power: "597 hp", description: "Track-tuned: 1,290 kg, most powerful naturally aspirated V8 per litre at launch. Active aero, side-slip control debut." },
            { id: "458-speciale-a", name: "458 Speciale A", year: "2014–2015", power: "597 hp", description: "Open Speciale. 499 built." },
          ],
        },
        {
          id: "488-gtb",
          name: "488 GTB",
          year: "2015–2019",
          image: img("488-gtb"),
          tagline: "Turbocharged — and unrepentant.",
          description: "Twin-turbo 3.9 L V8, 670 hp — the turbo's return to a Ferrari road car after 20 years. IHI twin-scroll turbos engineered for throttle response that felt naturally aspirated. The Pista became a high-water mark for chassis dynamics.",
          tags: [],
          variations: [
            { id: "488-gtb", name: "488 GTB", year: "2015–2019", power: "661 hp", description: "Coupé." },
            { id: "488-spider", name: "488 Spider", year: "2015–2019", power: "661 hp", description: "Retractable hardtop." },
            { id: "488-pista", name: "488 Pista", year: "2018–2019", power: "720 hp", description: "Pista = track. 90 kg lighter, carbon bodywork, 50 hp more." },
            { id: "488-pista-spider", name: "488 Pista Spider", year: "2018–2019", power: "720 hp", description: "Open Pista." },
          ],
        },
        {
          id: "f8-tributo",
          name: "F8 Tributo",
          year: "2019–2023",
          image: img("f8-tributo"),
          tagline: "A tribute to the V8. The last pure-ICE mid-engine Ferrari.",
          description: "The 488 Pista engine (720 hp) in a revised S-Duct aerodynamic body. The F8 was the final naturally evolved non-hybrid mid-V8 Ferrari, closing the line that began with the Dino in 1969.",
          tags: [],
          variations: [
            { id: "f8-tributo", name: "F8 Tributo", year: "2019–2023", power: "710 hp", description: "Coupé." },
            { id: "f8-spider", name: "F8 Spider", year: "2020–2023", power: "710 hp", description: "Open." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 4. MID-ENGINE V8 HYBRID
    // ─────────────────────────────────────────────────────────────
    {
      id: "mid-v8-hybrid",
      name: "Mid-engine V8 Hybrid",
      blurb: "The V8 sports berlinetta lineage enters the hybrid era. The SF90 Stradale carries the torch from the F8, adding three electric motors and AWD — the same spirit, electrified.",
      models: [
        {
          id: "sf90-stradale",
          name: "SF90 Stradale",
          year: "2020–",
          image: img("sf90"),
          tagline: "986 hp. Ferrari's first plug-in hybrid. The V8 line goes electric.",
          description: "Ferrari's first series-production plug-in hybrid. 4.0 L twin-turbo V8 plus three electric motors (one rear, two front) — 986 hp combined, AWD. Named after Scuderia Ferrari's 90th anniversary. The direct continuation of the V8 mid-engine sports car lineage, now fully hybridised.",
          tags: [],
          variations: [
            { id: "sf90-stradale", name: "SF90 Stradale", year: "2020–", power: "986 hp", description: "Berlinetta. Ferrari's first AWD road car." },
            { id: "sf90-spider", name: "SF90 Spider", year: "2021–", power: "986 hp", description: "Retractable hardtop spider." },
            { id: "sf90-xx-stradale", name: "SF90 XX Stradale", year: "2024–", power: "1,030 hp", description: "Track-focused XX variant. Fixed rear spoiler, active aerodynamics. 799 built." },
            { id: "sf90-xx-spider", name: "SF90 XX Spider", year: "2024–", power: "1,030 hp", description: "Open XX variant. 599 built." },
          ],
        },
        {
          id: "849-testarossa",
          name: "849 Testarossa",
          year: "2026–",
          image: img("849-testarossa"),
          tagline: "Next-generation V8 hybrid. The name lives on.",
          description: "Upcoming successor to the SF90 Stradale. The 849 Testarossa name pays tribute to the iconic flat-12 Testarossa of the 1980s while representing a new generation of the V8 hybrid mid-engine sports car.",
          tags: ["upcoming"],
          variations: [
            { id: "849-testarossa", name: "849 Testarossa", year: "2026–", description: "Coupé. Hybrid V8." },
            { id: "849-testarossa-spider", name: "849 Testarossa Spider", year: "2026–", description: "Open spider variant." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 5. MID-ENGINE V6 HYBRID  (new lineage)
    // ─────────────────────────────────────────────────────────────
    {
      id: "mid-v6-hybrid",
      name: "Mid-engine V6 Hybrid",
      blurb: "A new lineage, not a continuation. The 296 introduced Ferrari's first 120° V6 in production history — a clean-sheet platform that defines a separate lineage from the V8 cars.",
      models: [
        {
          id: "296-gtb",
          name: "296 GTB",
          year: "2022–",
          image: img("296-gtb"),
          tagline: "Brand-new V6. Brand-new lineage. 830 hp.",
          description: "Ferrari's first 120-degree V6 in production history, paired with a rear-axle electric motor producing 830 hp combined. 25 km of EV range. An entirely new platform — not derived from the F8 or SF90. The 296 defines a separate lineage from the V8 sports cars.",
          tags: [],
          variations: [
            { id: "296-gtb", name: "296 GTB", year: "2022–", power: "830 hp", description: "Berlinetta. Optional Assetto Fiorano package adds Multimatic dampers, titanium exhaust, lighter carbon trim." },
            { id: "296-gts", name: "296 GTS", year: "2023–", power: "830 hp", description: "Retractable hardtop spider." },
            { id: "296-speciale", name: "296 Speciale", year: "2025–", power: "880 hp", description: "Track-focused special edition — spiritual successor to the 458 Speciale and 488 Pista." },
            { id: "296-speciale-piloti", name: "296 Speciale Piloti Ferrari", year: "2025–", power: "880 hp", description: "Tailor Made configuration unveiled at Le Mans 2025 honouring Ferrari WEC successes." },
            { id: "296-speciale-a", name: "296 Speciale A", year: "2026–", power: "880 hp", description: "Open spider version of the 296 Speciale. Follows the 458 Speciale A and 488 Pista Spider tradition.", },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 6. MID-ENGINE V8 2+2
    // ─────────────────────────────────────────────────────────────
    {
      id: "mid-v8-2plus2",
      name: "Mid-engine V8 2+2",
      blurb: "Ferrari's mid-engine 2+2 lineage — designed to carry four, powered like a sports car. From the Dino GT4 to the Mondial, these were Ferrari's practical mid-engine cars.",
      models: [
        {
          id: "308-gt4",
          name: "Dino 308 GT4",
          year: "1973–1980",
          image: img("308-gt4"),
          tagline: "Ferrari's first mid-engine 2+2. Designed by Bertone.",
          description: "Ferrari's first mid-engine 2+2, and unusually, the only production Ferrari of the era designed by Bertone rather than Pininfarina. Originally sold under the Dino sub-brand without a Ferrari badge. The 308 GT4 was more practical than any mid-engine Ferrari before it — and more controversial to look at.",
          tags: [],
          variations: [
            { id: "308-gt4", name: "308 GT4", year: "1973–1980", power: "255 hp", description: "3.0 L V8, 2+2 seating. Bertone body." },
            { id: "208-gt4", name: "208 GT4", year: "1975–1980", power: "170 hp", description: "Italian-market version with 2.0 L V8 to avoid luxury tax. 208 built." },
          ],
        },
        {
          id: "mondial",
          name: "Mondial",
          year: "1980–1993",
          image: img("mondial"),
          tagline: "Four seats, mid-engine. The most practical Ferrari of its era.",
          description: "Four-seat mid-engine GT designed by Pininfarina. Criticised on launch for underwhelming performance in base form, the Mondial was systematically improved through five variants over 13 years — the final Mondial t, with its transverse gearbox, became genuinely enjoyable to drive.",
          tags: [],
          variations: [
            { id: "mondial-8", name: "Mondial 8", year: "1980–1982", power: "214 hp", description: "Original version. 840 built. Criticised for modest performance at launch." },
            { id: "mondial-qv", name: "Mondial Quattrovalvole", year: "1982–1985", power: "240 hp", description: "Four-valve heads — significant improvement. Cabriolet also available. 1,145 built." },
            { id: "mondial-qv-cab", name: "Mondial QV Cabriolet", year: "1983–1985", power: "240 hp", description: "Open cabriolet version of the QV. 629 built." },
            { id: "mondial-32", name: "Mondial 3.2", year: "1985–1988", power: "270 hp", description: "3.2 L V8, coupe and cabriolet. Further performance improvement." },
            { id: "mondial-t", name: "Mondial t", year: "1988–1993", power: "300 hp", description: "Transversely mounted gearbox improved weight distribution dramatically. Best-driving Mondial by far." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 7. FRONT-ENGINE V12 BERLINETTA
    // ─────────────────────────────────────────────────────────────
    {
      id: "front-v12",
      name: "Front-engine V12 2 Seater",
      blurb: "The modern V12 grand tourer — long bonnet, V12 up front, two seats. From the 550 Maranello to the 12Cilindri.",
      models: [
        {
          id: "550-maranello",
          name: "550 Maranello",
          year: "1996–2002",
          image: img("550-maranello"),
          tagline: "The V12 GT comes home after 23 years.",
          description: "After 23 years of mid-engine flagships (BB, Testarossa), Ferrari returned the front-engine V12 to the top of the road-car range. Type F133, 485 hp, 320 km/h. Six-speed gated manual. Re-established the modern Ferrari GT template.",
          tags: [],
          variations: [
            { id: "550-maranello", name: "550 Maranello", year: "1996–2002", power: "485 hp", description: "Coupé." },
            { id: "550-barchetta", name: "550 Barchetta Pininfarina", year: "2000–2001", power: "485 hp", description: "Roofless open barchetta with fabric tonneau. 448 built for Pininfarina's 70th anniversary." },
            { id: "550-gts", name: "550 GTS", year: "1998", power: "520 hp", description: "GT-class racing version by Prodrive for international GT competition." },
          ],
        },
        {
          id: "575m",
          name: "575M Maranello",
          year: "2002–2006",
          image: img("575m"),
          tagline: "The 550, refined. F1 paddle-shift arrives.",
          description: "Updated 550 with a 515 hp 5.75 L V12, improved F1 paddle-shift option, and revised suspension. 2,056 built.",
          tags: [],
          variations: [
            { id: "575m", name: "575M Maranello", year: "2002–2006", power: "515 hp", description: "Coupé. 2,056 built." },
            { id: "575-superamerica", name: "Superamerica", year: "2005–2006", power: "532 hp", description: "Unique Revolving Laminar electrochromic glass roof. 559 built." },
            { id: "575-gtz", name: "575 GTZ", year: "2006", power: "515 hp", description: "One-off Zagato-bodied coupé on the 575M chassis." },
          ],
        },
        {
          id: "599-gtb",
          name: "599 GTB Fiorano",
          year: "2006–2012",
          image: img("599-gtb"),
          tagline: "The Enzo's V12, in a GT.",
          description: "Type F141. Front-mid-engine 6.0 L V12 (620 hp) derived from the Enzo, magnetorheological dampers, F1-Trac. Named after the Fiorano circuit. Folded Ferrari's halo technology into a grand tourer.",
          tags: [],
          variations: [
            { id: "599-gtb", name: "599 GTB Fiorano", year: "2006–2012", power: "612 hp", description: "Coupé." },
            { id: "599-gto", name: "599 GTO", year: "2010–2012", power: "661 hp", description: "Only the third road car to carry the GTO name. 599 built." },
            { id: "599-sa-aperta", name: "SA Aperta", year: "2010–2011", power: "661 hp", description: "Open spider celebrating Pininfarina's 80th anniversary. 80 built." },
            { id: "599xx", name: "599XX", year: "2010–2011", power: "700 hp", description: "Track-only XX Programme car. 700 hp+. 29 built." },
          ],
        },
        {
          id: "f12berlinetta",
          name: "F12berlinetta",
          year: "2012–2017",
          image: img("f12berlinetta"),
          tagline: "730 hp, naturally aspirated. The high-water mark.",
          description: "Type F152. 6.3 L direct-injection V12, 'aero bridge' channelling air over the bonnet. The high-water mark for a naturally aspirated V12 GT — and the F12tdf set track records the 812 still chases.",
          tags: [],
          variations: [
            { id: "f12berlinetta", name: "F12berlinetta", year: "2012–2017", power: "730 hp", description: "Berlinetta." },
            { id: "f12tdf", name: "F12tdf", year: "2015–2017", power: "769 hp", description: "Tour de France tribute. Four-wheel independent steering. 799 built." },
            { id: "f60-america", name: "F60 America", year: "2014", power: "730 hp", description: "US-market open barchetta celebrating 60 years of Ferrari in America. 10 built." },
          ],
        },
        {
          id: "812-superfast",
          name: "812 Superfast",
          year: "2017–2023",
          image: img("812-superfast"),
          tagline: "800 hp. 8,500 rpm. The last analogue front-V12.",
          description: "Type F152M. 6.5 L, 800 hp at 8,500 rpm. Electric power steering — first Ferrari — and four-wheel steering. The 812 family is the final chapter of the analogue front-engine V12 berlinetta.",
          tags: [],
          variations: [
            { id: "812-superfast", name: "812 Superfast", year: "2017–2023", power: "789 hp", description: "Coupé." },
            { id: "812-gts", name: "812 GTS", year: "2019–2023", power: "789 hp", description: "Folding hardtop spider. First series-production front-V12 spider in over 50 years." },
            { id: "812-competizione", name: "812 Competizione", year: "2021–2022", power: "830 hp", description: "9,500 rpm redline — highest ever for a Ferrari naturally aspirated road-car V12. 999 built." },
            { id: "812-competizione-a", name: "812 Competizione A", year: "2021–2022", power: "830 hp", description: "Open Competizione. 599 built." },
          ],
        },
        {
          id: "12cilindri",
          name: "12Cilindri",
          year: "2024–",
          image: img("12cilindri"),
          tagline: "Successor to the 812. 75 years of the V12, celebrated.",
          description: "Successor to the 812 Superfast, celebrating 75 years of Ferrari V12 road cars. 830 hp naturally aspirated 6.5 L V12, revised chassis with refined active aerodynamics.",
          tags: [],
          variations: [
            { id: "12cilindri", name: "12Cilindri", year: "2024–", power: "830 hp", description: "Berlinetta." },
            { id: "12cilindri-spider", name: "12Cilindri Spider", year: "2024–", power: "830 hp", description: "Retractable hardtop spider." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 7b. FRONT-ENGINE V12 2 SEATER — VINTAGE
    // ─────────────────────────────────────────────────────────────
    {
      id: "front-v12-vintage",
      name: "Front-engine V12 2 Seater",
      blurb: "Ferrari's foundational era — front-V12 grand tourers from 1947 to 1974.",
      models: [
        {
          id: "inter",
          name: "Inter",
          year: "1947–1950",
          image: "",
          tagline: "One of Ferrari's first road-going coachbuilt GTs.",
          description: "Ferrari's earliest road cars carrying the 'Inter' name.",
          tags: [],
          variations: [],
          comingSoon: true,
        },
        {
          id: "america",
          name: "America",
          year: "1950–1959",
          image: "",
          tagline: "Big V12s built for the American market.",
          description: "America series: 340/342/375/410/400 Superamerica and 410 Superfast. Coachbuilt grand tourers tailored to US buyers.",
          tags: [],
          variations: [],
          comingSoon: true,
        },
        {
          id: "250",
          name: "250",
          year: "1953–1964",
          image: "",
          tagline: "The 250 lineage — GTO, SWB, Lusso, California.",
          description: "The 250 family defined the golden age of Ferrari: 250 GT Berlinetta, SWB, 250 GTO, GT California Spider, Lusso, and the Le Mans-winning 250 LM.",
          tags: [],
          variations: [],
          comingSoon: true,
        },
        {
          id: "275",
          name: "275",
          year: "1964–1968",
          image: "",
          tagline: "First Ferrari with independent rear suspension.",
          description: "275 GTB, GTB/4, GTS — the successor to the 250 GT lineage, with independent rear suspension and (for the GTB/4) a four-cam V12.",
          tags: [],
          variations: [],
          comingSoon: true,
        },
        {
          id: "330",
          name: "330",
          year: "1963–1968",
          image: img("330"),
          tagline: "Big-block V12 GT — 330 GT 2+2, GTC, GTS.",
          description: "330 family: 4.0 L V12 grand tourers. The GTC two-seater berlinetta and matching GTS spider, plus the 330 GT 2+2.",
          tags: [],
          variations: [],
        },
        {
          id: "365-gtb4",
          name: "365 GTB/4 'Daytona'",
          year: "1968–1974",
          image: img("365-daytona"),
          tagline: "The last great front-engine Ferrari before the mid-engine era.",
          description: "Unofficially named 'Daytona' after Ferrari's 1-2-3 at the 1967 Daytona 24 Hours. 4.4 L V12, 352 hp, and a top speed exceeding 280 km/h — the fastest production car in the world at launch. Pininfarina designed the definitive Italian GT silhouette. 1,383 coupés and 125 spiders built.",
          tags: [],
          variations: [
            { id: "365-gtb4", name: "365 GTB/4 'Daytona'", year: "1968–1974", power: "352 hp", description: "Coupé. 1,383 built." },
            { id: "365-gts4", name: "365 GTS/4 'Daytona' Spider", year: "1969–1973", power: "352 hp", description: "Open spider. 125 built — one of the most valuable classic Ferraris today." },
            { id: "365-gtb4-comp", name: "365 GTB/4 Competizione", year: "1971–1976", power: "400 hp", description: "GT4 class race version. Won its class at Le Mans multiple times." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 8. FRONT-ENGINE V12 4-DOOR
    // ─────────────────────────────────────────────────────────────
    {
      id: "front-v12-4door",
      name: "Front-engine V12 4-door",
      blurb: "Ferrari's first four-door, four-seat car — and its first SUV. The Purosangue stands alone in the Ferrari range.",
      models: [
        {
          id: "purosangue",
          name: "Purosangue",
          year: "2023–",
          image: img("purosangue"),
          tagline: "Ferrari's first four-door. First SUV. Still a V12.",
          description: "Ferrari's first-ever four-door, four-seater — and its first SUV. 715 hp naturally aspirated V12, front-mid-mounted. Unveiled at Teatro del Silenzio in Lajatico, Pisa. A deliberate statement: Ferrari's most accessible car still gets the V12.",
          tags: [],
          variations: [
            { id: "purosangue", name: "Purosangue", year: "2023–", power: "715 hp", description: "V12, AWD, four doors." },
            { id: "purosangue-hs", name: "Purosangue Handling Speciale", year: "2027–", description: "Optional performance configuration with revised suspension tuning for a sharper dynamic character." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 9. FRONT-ENGINE V12 GT  (2+2)
    // ─────────────────────────────────────────────────────────────
    {
      id: "front-v12-gt",
      name: "Front-engine V12 GT",
      blurb: "Four seats, twelve cylinders, real luggage. Ferrari's 2+2 grand tourer lineage — from the 456 GT to the GTC4Lusso.",
      models: [
        {
          id: "456-gt",
          name: "456 GT",
          year: "1992–2003",
          image: img("456-gt"),
          tagline: "Four seats. V12. Gated manual. The real Ferrari GT.",
          description: "Ferrari's 2+2 grand tourer for the 1990s. 4.5 L V12, available in GT (manual) and GTA (automatic). Evolved into the 456M in 1998. The last pure-manual V12 Ferrari 2+2.",
          tags: [],
          variations: [
            { id: "456-gt", name: "456 GT", year: "1992–1997", power: "436 hp", description: "Gated 6-speed manual. 1,548 built." },
            { id: "456-gta", name: "456 GTA", year: "1992–1997", power: "436 hp", description: "4-speed automatic. 403 built." },
            { id: "456m-gt", name: "456M GT", year: "1998–2003", power: "436 hp", description: "Modificata — updated interior and suspension. 688 built." },
            { id: "456m-gta", name: "456M GTA", year: "1998–2003", power: "436 hp", description: "Automatic Modificata. 650 built." },
          ],
        },
        {
          id: "612-scaglietti",
          name: "612 Scaglietti",
          year: "2004–2011",
          image: img("612-scaglietti"),
          tagline: "Named for Ferrari's historic coachbuilder.",
          description: "Aluminium spaceframe, 5.7 L V12 mounted ahead of the cabin. Named for Sergio Scaglietti. The 612 gave the four-seat Ferrari the dynamics it had previously lacked.",
          tags: [],
          variations: [
            { id: "612-scaglietti", name: "612 Scaglietti", year: "2004–2011", power: "533 hp", description: "Standard 2+2." },
            { id: "612-sessanta", name: "612 Sessanta", year: "2007", power: "533 hp", description: "60th anniversary edition. 60 built." },
          ],
        },
        {
          id: "ff",
          name: "FF",
          year: "2011–2016",
          image: img("ff"),
          tagline: "Ferrari Four. First 4WD. First shooting brake.",
          description: "Ferrari's first 4WD production car and first shooting brake body style. V12 plus a Power Transfer Unit driving the front wheels. Practical, fast, and divisive — but the beginning of Ferrari thinking about all-weather usability.",
          tags: [],
          variations: [
            { id: "ff", name: "FF", year: "2011–2016", power: "651 hp", description: "V12 4WD shooting brake." },
          ],
        },
        {
          id: "gtc4lusso",
          name: "GTC4Lusso",
          year: "2016–2020",
          image: img("gtc4lusso"),
          tagline: "Successor to the FF. Four-wheel drive and four-wheel steering.",
          description: "Four seats, AWD, four-wheel steering, hatchback body. The GTC4Lusso refined the FF formula with a new interior architecture. Ferrari's only modern shooting brake — and a brilliant winter car. Also offered with a turbo V8.",
          tags: [],
          variations: [
            { id: "gtc4lusso", name: "GTC4Lusso", year: "2016–2020", power: "680 hp", description: "V12 AWD." },
            { id: "gtc4lusso-t", name: "GTC4Lusso T", year: "2016–2020", power: "602 hp", description: "Twin-turbo V8, rear-wheel drive only." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 10. FRONT-ENGINE V8 GT
    // ─────────────────────────────────────────────────────────────
    {
      id: "front-v8-gt",
      name: "Front-engine V8 GT",
      blurb: "The accessible Ferrari — front-engine, folding roof, V8 soundtrack. Built to widen the audience without compromising the badge.",
      models: [
        {
          id: "california",
          name: "California",
          year: "2008–2017",
          image: img("california"),
          tagline: "Ferrari's first front-V8 road car. First folding metal roof.",
          description: "Ferrari's first front-engine V8 road car, first folding metal hardtop, first DCT in a Ferrari production car. Built specifically to widen the customer base. Replaced mid-generation with a turbocharged V8 in the California T.",
          tags: [],
          variations: [
            { id: "california", name: "California", year: "2008–2014", power: "454 hp", description: "Naturally aspirated 4.3 L V8." },
            { id: "california-30", name: "California 30", year: "2012–2014", power: "483 hp", description: "Mid-cycle refresh: +30 hp, −30 kg." },
            { id: "california-t", name: "California T", year: "2014–2017", power: "552 hp", description: "Turbocharged 3.9 L V8 — first turbo Ferrari since the F40." },
          ],
        },
        {
          id: "portofino",
          name: "Portofino",
          year: "2017–2021",
          image: img("portofino"),
          tagline: "The California, grown up.",
          description: "All-new platform, sharper styling, retuned chassis. The Portofino corrected what the California was always teased for. Updated to the Portofino M (Modificata) in 2020 with an 8-speed DCT and Race mode.",
          tags: [],
          variations: [
            { id: "portofino", name: "Portofino", year: "2017–2020", power: "591 hp", description: "Original turbo V8." },
            { id: "portofino-m", name: "Portofino M", year: "2020–2021", power: "612 hp", description: "Modificata: 8-speed DCT, +20 hp, Race mode." },
          ],
        },
        {
          id: "roma",
          name: "Roma",
          year: "2019–",
          image: img("roma"),
          tagline: "La Nuova Dolce Vita. Understated, deliberately.",
          description: "Gran turismo coupé with a stripped-down design language — no needless creases, almost no badges. Inspired by 1950s–60s Ferrari elegance. 620 hp twin-turbo V8.",
          tags: [],
          variations: [
            { id: "roma", name: "Roma", year: "2019–", power: "612 hp", description: "Coupé." },
            { id: "roma-spider", name: "Roma Spider", year: "2023–", power: "612 hp", description: "Fabric soft-top — Ferrari's first front-engine fabric roof since the 365 GTS/4 Daytona." },
          ],
        },
        {
          id: "amalfi",
          name: "Amalfi",
          year: "2026–",
          image: img("amalfi"),
          tagline: "Roma's successor. Named after the coast.",
          description: "Successor to the Roma. Front-engine V8 2+2 GT named after the Amalfi Coast. Continues the accessible Ferrari GT lineage that began with the California.",
          tags: ["upcoming"],
          variations: [
            { id: "amalfi", name: "Amalfi", year: "2026–", description: "Coupé." },
            { id: "amalfi-spider", name: "Amalfi Spider", year: "2027–", description: "Open variant." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 11. ICONA
    // ─────────────────────────────────────────────────────────────
    {
      id: "icona",
      name: "Icona",
      blurb: "Coach-built Icona series cars — modern interpretations of Ferrari's greatest historic moments. Each one is strictly limited and invitation-only.",
      models: [
        {
          id: "monza-sp1",
          name: "Monza SP1",
          year: "2019–2020",
          image: img("monza-sp1"),
          tagline: "Single-seat barchetta. No roof. No windscreen. 810 hp.",
          description: "First in the Icona series — a modern reading of Ferrari's 1950s barchettas. Carbon-fibre body, 812 Superfast V12 (810 hp), Virtual Wind Shield channelling air over the driver's helmet. 249 built as part of a combined 499-car run with the SP2.",
          tags: ["icona", "few-off", "limited"],
          variations: [
            { id: "monza-sp1", name: "Monza SP1", year: "2019–2020", power: "810 hp", description: "Single-seat. 249 built." },
          ],
        },
        {
          id: "monza-sp2",
          name: "Monza SP2",
          year: "2019–2020",
          image: img("monza-sp2"),
          tagline: "The Monza, for two.",
          description: "Second seat, second tonneau, same V12. The SP2 changes the aerodynamic balance just enough to feel like a different machine. 250 built.",
          tags: ["icona", "few-off", "limited"],
          variations: [
            { id: "monza-sp2", name: "Monza SP2", year: "2019–2020", power: "810 hp", description: "Two-seater. 250 built." },
          ],
        },
        {
          id: "daytona-sp3",
          name: "Daytona SP3",
          year: "2023–",
          image: img("sp3-daytona"),
          tagline: "Homage to the 1967 Daytona 1-2-3. Mid-engine V12. 840 hp.",
          description: "Third Icona car, celebrating Ferrari's legendary 1-2-3 finish at the 1967 Daytona 24 Hours. Open-top targa with bodywork referencing the 330 P3/P4 sports prototypes. Naturally aspirated 6.5 L V12 at 9,500 rpm. 599 built — all sold before the unveil.",
          tags: ["icona", "few-off", "limited"],
          variations: [
            { id: "daytona-sp3", name: "Daytona SP3", year: "2023–", power: "840 hp", description: "599 build slots. All sold before reveal." },
            { id: "daytona-sp3-tm", name: "Daytona SP3 'Tailor Made'", year: "2025–", power: "840 hp", description: "Bespoke Tailor Made configurations for individual clients." },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 12. EV
    // ─────────────────────────────────────────────────────────────
    {
      id: "ev",
      name: "EV",
      blurb: "Ferrari's electric future. The Luce is the first fully electric Ferrari — a new chapter that doesn't abandon what came before.",
      models: [
        {
          id: "luce",
          name: "Luce",
          year: "2027–",
          image: img("luce"),
          tagline: "Ferrari's first fully electric car.",
          description: "Ferrari's upcoming fully electric vehicle. The Luce represents a new chapter for the brand — a zero-emission Ferrari that carries the prancing horse values of performance and driver engagement into the electric era.",
          tags: ["upcoming"],
          variations: [
            { id: "luce", name: "Luce", year: "2027–", description: "Full EV. Four-door." },
          ],
        },
      ],
    },

  ],
};

// All models across all categories, flat
export function allModels(brand: Brand): Model[] {
  return brand.categories.flatMap((c) => c.models);
}

// Filter chips — cross-lineage queries
export type Filter = {
  id: string;
  label: string;
  blurb: string;
  matches: (m: Model) => boolean;
};

export const FILTERS: Filter[] = [
  {
    id: "halo",
    label: "Halo cars",
    blurb: "Ferrari's once-per-decade limited flagship supercars.",
    matches: (m) => m.tags.includes("halo"),
  },
  {
    id: "icona",
    label: "Icona series",
    blurb: "The coach-built Icona programme.",
    matches: (m) => m.tags.includes("icona"),
  },
  {
    id: "few-off",
    label: "Few-offs",
    blurb: "Built in small batches for a chosen few.",
    matches: (m) => m.tags.includes("few-off"),
  },
  {
    id: "upcoming",
    label: "Upcoming",
    blurb: "Models announced or confirmed but not yet in production.",
    matches: (m) => m.tags.includes("upcoming"),
  },
];
