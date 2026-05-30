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
            {
              id: "288-gto",
              name: "288 GTO",
              year: "1984-1987",
              power: "400 hp",
              description:
                "The Ferrari 288 GTO, officially designated as Type F114 and produced between 1984 and 1987 at Ferrari's Maranello factory, is a rare homologation special of the Ferrari 308 GTB, designed for Gran Turismo Omologata (homologated). Despite common historical reports, the 288 GTO was not initially conceived for the 1982 Group B Circuit Race series. At the time, Enzo Ferrari did not oversee the Road Car division, which was managed by General Director Eugenio Alzati and FIAT MD Vittorio Ghidella. It was in 1983, amid conversations with friends and clients who noted declining sales due to strong competition and the \"excessive gentrification\" of Ferrari models, that the idea began to take shape.\n\nTurbocharging, which had proved successful in Formula 1, influenced Ferrari to incorporate it into their road cars, especially in light of new tax laws impacting cars above 1999cc. The initial attempt was the 208 Turbo, which lacked an intercooler, leading to performance and reliability issues. Ferrari consulted Nicola Materazzi, a former Osella and Lancia engineer with expertise in forced induction, who joined Ferrari in 1979 after working on the 126 F1 car's turbo experiments. Materazzi endorsed the potential of a 3-liter turbocharged engine capable of delivering 330 bhp, eventually achieving a reliable 400 bhp from 3000cc, or 133 bhp per liter. Based on his reassurance and successful background, Enzo Ferrari trusted Materazzi to deliver on these promises, even half-jokingly suggesting he work on the 268 engine for the Lancia LC2 Group C racer, given its similar displacement and mechanical characteristics.",
            },
            {
              id: "288-gto-evo",
              name: "288 GTO Evoluzione",
              year: "1986",
              power: "650 hp",
              description:
                "Ferrari created six versions of the 288 GTO Evoluzione, which included five production models and one prototype, to compete in the now-defunct Group B racing series. Introduced in 1986, the Evoluzione was designed to meet the stringent requirements of Group B, with a production run initially planned for 20 cars to comply with homologation standards. However, with the cancellation of Group B, the project was discontinued as the Evoluzione was not suitable for any other racing category. The car featured a highly modified version of the 2.9 L V8 engine from the standard 288 GTO, equipped with twin-turbochargers that enabled it to produce 650 horsepower at 7,800 rpm. Weighing around 940 kg (2,072 lb), the Evoluzione could reach a top speed of 225 mph (362 km/h) and included advanced aerodynamic elements such as front canards, air channels, vents, a large carbon fiber rear spoiler, and several large NACA ducts. These design and mechanical features heavily influenced the development of the iconic F40.\n\nToday, all six units of the Evoluzione are believed to still exist, with one retained by Ferrari on display at their engine manufacturing facility in Maranello and another likely used as a prototype for the F40. Notably, several Formula 1 drivers have owned standard 288 GTOs, gifted or offered by Enzo Ferrari himself, including Michele Alboreto, Keke Rosberg, and Niki Lauda, with Lauda receiving the last of the 272 units produced. Michael Schumacher also acquired a 288 GTO in April 1996, which he registered with the number plate S GT 288.",
            },
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
            {
              id: "f40",
              name: "F40",
              year: "1987-1992",
              power: "478 hp",
              description:
                "In the mid-1980s, Nicola Materazzi presented to Enzo Ferrari the idea of showcasing the capability of new high-powered road cars through the Group B racing category, particularly given that such vehicles could no longer safely demonstrate their performance in everyday scenarios. Although Enzo Ferrari was not directly managing production at that time, Materazzi gained approval from General Manager Eugenio Alzati to develop what would become the GTO Evoluzione, albeit only during weekends, leading to a small team working alongside competitors like Porsche's 959 in FIA Group B. However, the discontinuation of Group B in 1986 left Ferrari with several Evoluzione cars and no competitive category to enter them. Despite this setback, a validation driver persuaded Enzo Ferrari to adapt these cars for road use, aiming to leave a legacy with his final sports car. This led to the development of the F40, a vehicle meant to be purely performance-focused, described by Ferrari's marketing as a response to customers desiring less luxury and more raw power. Contrasting with Porsche's 959, the F40 was not about pioneering future technologies but rather embracing simplicity and high performance rooted in Materazzi's extensive racing experience. The design of the F40, led by Pietro Camardella under Pininfarina's Aldo Brovarone, incorporated elements from the 288 GTO Evoluzione, with extensive development of mechanical components to ensure roadworthiness. Enzo Ferrari, eager to see the project completed swiftly, mandated an aggressive timeline that culminated in the unveiling of the F40 in the summer of 1987, reflecting both his and Materazzi's dedication to creating a straightforward yet formidable sports car.",
            },
            {
              id: "f40-lm",
              name: "F40 LM",
              year: "1987-1992",
              power: "720 hp",
              description:
                "Michelotto, a Ferrari specialist based in Padua known for their work on the GTO Evoluzione and the road-going F40, prepared three racing chassis for competition, though only two were actively raced. These two cars, with serial numbers 79890 and 79891, saw action as early as 1989, starting in the IMSA series at Laguna Seca Raceway in the GTO category. A notable moment came when Jean Alesi drove an LM evolution model to a third-place finish, behind two Audi 90s and ahead of other factory-backed competitors. However, the car retired after just eighteen laps in the subsequent race. Over the next IMSA season, the F40, driven by various guest drivers including Jean-Pierre Jabouille, Jacques Laffite, and Hurley Haywood, achieved three second places and one third place. Although the F40 did not return to IMSA in 1991, it remained a popular choice among privateers in various domestic GT series, such as JGTC. By 1994, the car entered the international scene, competing in the BPR Global GT Series; one car, driven by Strandell, notably won the 4 Hours of Vallelunga. The following year saw an increase to four competing F40s, developed by Pilot-Aldix Racing and Strandell under the Ferrari Club Italia banner, with a win at the 4 Hours of Anderstorp. Despite another win at Anderstorp in 1996, the F40, outpaced by the new McLaren F1 GTR, faded from competitive GT racing thereafter.",
            },
            {
              id: "f40-competizione",
              name: "F40 Competizione",
              year: "1987-1992",
              power: "700 hp",
              description:
                "Pilot-Aldix and Strandell campaigns under Ferrari Club Italia. Won the 4 Hours of Vallelunga (1994) and Anderstorp (1995, 1996) in BPR Global GT. 3 built.",
            },
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
            {
              id: "f50",
              name: "F50",
              year: "1995-1997",
              power: "513 hp",
              description:
                "The Ferrari F50 (Type F130) is a mid-engine sports car. Introduced in 1995, the car is a two-door, two seat targa top. The car is powered by a 4.7 L naturally aspirated Tipo F130B 60-valve V12 engine that was developed from the 3.5 L V12 used in the 1990 Ferrari 641 Formula One car. The car's design is an evolution of the 1989 Ferrari Mythos concept car.\n\nThe F50's engine predated the car; it was used in the Ferrari 333 SP for the American IMSA GT Championship in 1994, allowing it to become eligible for the stock engine World Sports Car category.",
            },
            {
              id: "f50-gt",
              name: "F50 GT",
              year: "1995",
              power: "750 hp",
              description:
                "The Ferrari F50 GT (also known as the Ferrari F50 GT1) is a racing derivative of the Ferrari F50, intended to compete in the BPR Global GT Series against other series rivals, such as the McLaren F1 GTR. After the series folded, Ferrari was unhappy with homologation specials such as the Porsche 911 GT1 being allowed in the newly formed FIA GT Championship and decided to cancel the project due to lack of funding to compete. The car was co-developed with Dallara and Michelotto.",
            },
            {
              id: "f50-bolide",
              name: "F50 Bolide",
              year: "1996",
              power: "513 hp",
              description:
                "A custom-made F50 variant named the Bolide was commissioned by the Sultan of Brunei in 1996 and delivered in the same year. It used the F1 derived V12 engine and the same chassis, but was completely redesigned due to the monocoque construction of the body on the F50. One car was produced in the coupe configuration. Very few images and no official performance statistics of this car are available. At least one car was produced in RHD for the Sultan, and was subsequently bought by a collector in Ireland.",
            },
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
            {
              id: "enzo",
              name: "Enzo",
              year: "2002",
              power: "651 hp",
              description:
                "The Ferrari Enzo, officially named the Enzo Ferrari, is a mid-engine sports car developed by Ferrari and introduced in 2002. Named after the company's founder, Enzo Ferrari, the car incorporates cutting-edge Formula One technology, including a carbon-fiber body, F1-style automated-shift manual transmission, and carbon-ceramic disc brakes. It also features advanced active aerodynamics, producing significant downforce to enhance stability at high speeds. The Enzo achieves 343 kilograms of downforce at 200 km/h, increasing to 775 kilograms at 300 km/h, before tapering to 585 kilograms at its top speed.\n\nDesigned by Ken Okuyama, the head of design at Pininfarina at the time, the Enzo was unveiled at the 2002 Paris Motor Show with a planned production run of 399 units. Ferrari extended invitations to existing customers, particularly those who had purchased the F40 and F50. In 2004, an additional, 400th Enzo was built and donated to the Vatican for charity, later auctioned for $1.1 million. In total, 498 units were produced, including three development mules, which used the bodywork of the Ferrari 348.\n\nThe Enzo is powered by a 6.0-liter V12 engine, the F140B, which produces 651 horsepower at 7,800 rpm and features a redline of 8,200 rpm. The engine layout is longitudinally mounted with a rear mid-engine, rear-wheel-drive configuration, ensuring optimal weight distribution. The car boasts a state-of-the-art F1 transmission with paddle shifters, capable of shifting gears in 150 milliseconds. This system, though advanced for its time, received some criticism for its abrupt shifting.\n\nPerformance-wise, the Enzo excels with a 0-100 km/h acceleration time of 3.14 seconds and a top speed of 355 km/h. Its impressive handling is supported by an independent suspension with push-rod-actuated shock absorbers, adjustable from the cabin, and robust Brembo disc brakes. The Enzo rides on 19-inch wheels fitted with Bridgestone Potenza tires, and the car's braking and handling capabilities are further enhanced by its aerodynamic design.\n\nIn terms of recognition, the Enzo has been lauded as one of the top sports cars of the 2000s by Sports Car International and ranked fourth in Motor Trend Classic's list of the greatest Ferraris of all time. Despite these accolades, its design has been polarizing, with some critics describing it as overly flashy. Nonetheless, the Ferrari Enzo remains a landmark in automotive engineering, celebrated for its performance, technological innovations, and connection to Ferrari's racing heritage.",
            },
            {
              id: "mc12",
              name: "MC12",
              year: "2004-2005",
              power: "630 hp",
              description:
                "The Maserati MC12 is a high-performance grand tourer designed for both road and track use, marking Maserati's return to international racing after a 37-year hiatus. Developed with input from the Ferrari Maserati Group, the MC12 benefits from cutting-edge technology and aerodynamic styling. Designed by Giugiaro with significant contributions from Frank Stephenson, the car combines elegance with aerodynamic efficiency. Its design and development emphasize performance, making it capable of exceeding 330 km/h and accelerating from 0 to 100 km/h in just 3.8 seconds.\n\nThe MC12's design is a blend of racing functionality and aesthetic appeal. It features a carbon fiber body and a stress-bearing chassis made from a carbon fiber and Nomex honeycomb sandwich, supported by aluminum sub-chassis. This construction ensures structural rigidity while keeping the car's weight down. The car's aerodynamic elements, such as the large rear wing, rear diffusers, and engine snorkel, have been meticulously developed to optimize downforce and internal fluid dynamics. The car's bonnet and wheel arches are formed from a single piece of molded carbon fiber, contributing to its sleek and functional design.\n\nUnder the hood, the MC12 is powered by a naturally aspirated 6.0-liter V12 engine producing 630 horsepower at 7,500 rpm and 652 Nm of torque at 5,500 rpm. This engine is paired with a six-speed Cambiocorsa transmission, which allows for computer-assisted gear selection through paddles behind the steering wheel. The car features two driving modes: Sport, which offers enhanced traction control for regular driving, and Race, which sharpens the car's performance for track use, including faster gear changes and activated ASR.\n\nThe MC12's interior combines high-tech materials with luxurious touches. The cabin features a removable hard top, allowing the car to convert from a coupe to a spider. The interior design balances simplicity with meticulous craftsmanship, featuring carbon fiber elements, perforated leather trim, and high-grip technical fabric. The dashboard centers around a prominent speedometer, with additional controls for the climate system and other functions placed conveniently on the central console. The seats, made from carbon fiber with high lateral containment, provide comfort and support, while the aluminum pedals and rubber mats underscore the car's sporty nature.\n\nIn summary, the Maserati MC12 is a blend of advanced engineering and elegant design, capable of delivering exhilarating performance on both road and track. Its development and styling reflect Maserati's racing heritage, while its technological innovations ensure it stands out as a modern high-performance vehicle.",
            },
            {
              id: "mc12-gt1",
              name: "MC12 GT1",
              year: "2004-2005",
              power: "630 hp",
              description:
                "The Maserati MC12's foray into the FIA GT Championship began in 2004 with three GT1 race cars. The AF Corse factory-backed team debuted the MC12 at Imola, but due to debated homologation issues, the FIA did not allow the MC12 to score points. Despite this, the team secured second and third places. At the next round in Oschersleben, Andrea Bertolini and Mika Salo won, marking the MC12's first victory. By the final round at Zhuhai, the FIA homologated the MC12s, allowing them to score points. The MC12 secured another victory, finishing seventh in the teams' championship.\n\nIn 2005, Maserati dominated the FIA GT Manufacturers Cup, scoring 239 points, nearly double that of their nearest competitor, Ferrari. Vitaphone Racing and JMB Racing, the two teams fielding MC12s, finished first and second in the Team Cup, respectively. Four MC12 drivers were contenders for the FIA GT Drivers' Title at the season's final race, but Gabriele Gardel of Ferrari ultimately clinched the title. The Maserati drivers finished within four points of first place.\n\nVitaphone Racing was Maserati's sole representative in the 2006 season, securing the Teams' Championship despite significant weight penalties. Bertolini and Bartels shared first place in the Drivers' Championship, but the manufacturers' cup went to Aston Martin. In 2007, Vitaphone Racing again won the GT1 Teams' Championship, with Scuderia Playteam and JMB Racing also competing with MC12s. Maserati won the Manufacturers' Cup, and Thomas Biagi claimed the Drivers' Championship.\n\nThe MC12 also had significant success in the Italian GT Championship. In 2005, Scuderia Playteam and Racing Box entered MC12s, finishing first and third overall. The following year, Playteam won again, and Racing Box came second. However, from 2007, GT1 cars were no longer permitted in the championship, prompting Playteam to move to the FIA GT Championship. Racing Box also won the non-championship 6 Hours of Vallelunga in 2005 and 2006.\n\nDespite controversies and regulatory challenges, the Maserati MC12 proved to be a formidable competitor, securing multiple championships and demonstrating Maserati's engineering prowess and resilience in the world of GT racing.",
            },
            {
              id: "mc12-corse",
              name: "MC12 Corse",
              year: "2004-2005",
              power: "755 hp",
              description:
                "Motorsport forms the core of Maserati's heritage, having spent over thirty years primarily building racing cars, with road cars produced mainly to fund their racing program. However, towards the end of the 1950s, Maserati shifted focus, and the subsequent decades saw the company struggle, culminating in its sale to longtime rival Ferrari in the late 1990s. Under Ferrari's stewardship, Maserati gradually recovered, and in 2004, the company announced a return to top-level racing.\n\nMaserati chose to enter GT racing, leveraging the expertise of the Ferrari Maserati Group. With no suitable candidate in Maserati's lineup, they utilized the chassis and drivetrain of the Ferrari Enzo. To meet GT1 class homologation requirements, Maserati planned to produce at least 25 units per year for two years. The resulting car, the MC12, was developed with assistance from Pininfarina, who designed a body optimized for racing. The MC12 differed significantly from the Enzo, featuring a detachable targa roof and a broader, more aerodynamic shape.\n\nHowever, early mistakes nearly derailed the MC12's racing career. The car exceeded the maximum width specified in regulations, and its racing version was revealed before the road-going model, suggesting it was developed primarily as a race car. This led to resistance from racing authorities, particularly the ACO, which oversees Le Mans. Despite these setbacks, the MC12 was eventually allowed to compete in the FIA GT Championship under specific conditions, including a smaller rear wing and a weight penalty. Maserati's MC12 debuted in the final rounds of the 2004 season, securing two wins and two second-place finishes, proving its competitiveness.\n\nDespite its success, the Maserati MC12 is often remembered for the controversy surrounding its homologation. The persistent efforts by Maserati to keep the car within regulatory boundaries, despite apparent deviations, suggest a deliberate attempt to push the rules. The MC12's legacy is thus marked by both its racing achievements and the regulatory challenges it faced, illustrating Maserati's determination and resilience in the world of motorsport.",
            },
            {
              id: "fxx",
              name: "FXX",
              year: "2005",
              power: "789 hp",
              description:
                "The Ferrari FXX is a high-performance race car introduced by Ferrari in 2005, based on the street-legal Enzo. Designed for track use only, the FXX incorporates advanced technology from the Enzo and further innovations from Ferrari and its suppliers. Owners participate in exclusive track events and receive detailed performance briefings from Ferrari. The car also shares some technology with the Maserati MC12 Corsa, developed by Ferrari's sister company.\n\nThe FXX's engine, derived from the Enzo's, has been enlarged to 6.3 liters, producing 800 horsepower at 8,500 rpm. The car's gearbox, incorporating Ferrari's latest F1 technology, shifts gears in under 100 milliseconds. It retains the Enzo's carbon-ceramic brake discs but features upgraded brake pads and custom-developed 19-inch slick tires. Comprehensive telemetry systems allow drivers to enhance their performance while providing Ferrari with valuable data to refine the FXX and future models.\n\nFerrari produced 30 FXX units, with the first 29 sold to selected customers and the 30th given to F1 World Champion Michael Schumacher upon his retirement in 2006. Schumacher's unique FXX features black paint without a stripe, red-trimmed wheels, matte exhaust tips, and his personal logo on the racing seats. Owners of the FXX participate in Ferrari's testing and development programs, with their cars maintained by Ferrari. The program grants exclusive access to Ferrari's latest technology and incorporates customer feedback into the development of future models.\n\nThe FXX features a longitudinal, rear-mounted 6.3-liter V12 engine, producing 790 horsepower and 506 lb-ft of torque. The car's construction includes a carbon fiber body over a carbon fiber tub with a rear alloy subframe. It has Brembo carbon-ceramic disc brakes, 19-inch wheels, and a sophisticated suspension system with adaptive dampers and electronic shock absorbers. The FXX can reach a top speed of 391 km/h.\n\nIn popular culture, Michael Schumacher's black FXX appeared on the BBC's Top Gear, where it set a lap record of 1 minute 10.7 seconds. However, the record was later removed because the car used slick racing tires, which are not street-legal.",
            },
            {
              id: "birdcage-75th",
              name: "Birdcage 75th",
              year: "2005",
              power: "700 hp",
              description:
                "The Maserati Birdcage 75th is a functional concept car designed and developed by Pininfarina, led by Lowie Vermeersch and including designers Jason Castriota and Giuseppe Randazzo, under the direction of Ken Okuyama. It was first introduced at the 2005 Geneva Auto Show. Named in honor of the classic Maserati Birdcage race cars of the 1960s and Pininfarina's 75th anniversary, the Birdcage 75th resulted from a collaboration between Maserati, Pininfarina, and Motorola to showcase their technical expertise. Remarkably, the car was completed in just two months, following a rapid design phase using 3D renderings.\n\nThe Birdcage 75th is built on the carbon fiber chassis of the Maserati MC12 GT1 race car and shares many components, most notably the Ferrari/Maserati F140 V12 engine from the MC12 and the Enzo. This mid-mounted engine produces 700 horsepower, contributing to the car's impressive performance capabilities. The exterior bodywork, made entirely of carbon fiber, features diffusers at the rear and two spoilers that automatically raise at speed to enhance aerodynamics. The extensive use of perspex for the windshield and canopy is necessary due to the driver's low-seated position, ensuring optimal visibility.\n\nThe design of the Birdcage 75th emphasizes both aesthetics and functionality. The front features a low nose with a large grille bearing the Trident emblem, slim LED headlights, and a splitter under the lower air intake. The rear is dominated by a transparent engine cover, showcasing the mid-mounted V12 engine, and a large diffuser with centrally positioned vertical tailpipes. The wheels, measuring 21 inches at the front and 22 inches at the rear, were specially designed for the car. A notable feature of the Birdcage 75th is the absence of traditional doors; instead, a bubble canopy, which includes much of the front bodywork, lifts to allow entry.\n\nThe interior of the Birdcage 75th, designed with input from Motorola, is a blend of high-tech and luxury. The seats are integrated into the chassis and upholstered in blue suede, complemented by a metal gear shifter and minimalistic controls on the central tunnel. The cabin includes a head-up display (HUD) projected onto a clear panel, showing information typically found on dashboard instruments. The steering wheel features a center-mounted control device similar to a cellphone, and the interior design highlights the tubular frame, reminiscent of the original Birdcage race cars. Rearview cameras replace conventional wing mirrors, further enhancing the car's futuristic appeal.\n\nAt its unveiling at the 2005 Geneva Motor Show, the Birdcage 75th captured public and critical acclaim, earning the Best Concept award from the show's organizers. It also received accolades such as Automobila Magazine's The Most Beautiful Car in the World (2005) and Louis Vuitton's Classic Concept (2006). Today, the Birdcage 75th is celebrated as one of Pininfarina's masterpieces and a stunning example of automotive design. It remains on display in Turin, Italy, where it can be viewed at Pininfarina's museum.",
            },
            {
              id: "p4-5",
              name: "P4/5 by Pininfarina",
              year: "2006",
              power: "660 hp",
              description:
                "The Ferrari P4/5, officially named the Ferrari P4/5 by Pininfarina, is a one-off sports car created by Pininfarina for American film director James Glickenhaus. Based on the Ferrari Enzo, the P4/5 was redesigned to evoke the styling of Ferrari's 1960s race cars, particularly the P Series. This project, costing Glickenhaus approximately $4 million, was unveiled in August 2006 at the Pebble Beach Concours d'Elegance.\n\nThe development of the P4/5 began in March 2005 when Glickenhaus was approached by Pininfarina with the idea of commissioning a unique car. The design process started with sketches by Jason Castriota and involved extensive computer-aided design and wind tunnel testing. The result was a car with over 200 custom components, all fitting perfectly due to precise virtual modeling. The P4/5 maintained the Enzo's engine and drivetrain but featured an entirely new carbon-fiber body.\n\nThe P4/5 is powered by a Ferrari F140 B V12 engine, similar to that in the Enzo, producing 660 horsepower at 7,800 rpm. The car retains the Enzo's six-speed automated manual transmission, but with improved aerodynamics, the P4/5 achieves a top speed of 375 km/h and accelerates from 0 to 100 km/h in 3.0 seconds. Its design includes elements from various historic Ferrari models, such as the Ferrari 512S rear window and the Ferrari 333 SP nose, enhancing both aesthetics and performance.\n\nThe interior of the P4/5 was customized to Glickenhaus's specifications, including an iPod nano stereo, a tablet PC for navigation and car diagnostics, and custom-molded seats tailored for Glickenhaus and his son. Pininfarina also improved the car's air conditioning and rearranged the wiring for easier servicing. The P4/5's carbon-fiber construction and meticulous design resulted in a car that is both lighter and more aerodynamic than the Enzo.\n\nDespite initial secrecy, the P4/5 was eventually recognized by Ferrari, and it was officially badged as a Ferrari. This collaboration highlighted Pininfarina's capability to create bespoke vehicles that honor Ferrari's legacy while pushing design boundaries. The P4/5 remains a unique testament to the artistry and engineering prowess of both Pininfarina and Ferrari.",
            },
            {
              id: "mc12-gt1-2006",
              name: "MC12 GT1",
              year: "2006",
              power: "630 hp",
              description:
                "The 2006 season saw Vitaphone Racing return as Maserati's sole representative in the FIA GT Championship, securing the Teams' Championship despite significant weight penalties under new regulations. Bertolini and Bartels shared first place in the Drivers' Championship, but the manufacturers' cup went to Aston Martin.\n\nIn 2007, Vitaphone Racing again won the GT1 Teams' Championship, with Scuderia Playteam and JMB Racing also competing with MC12s. Maserati won the Manufacturers' Cup, and Thomas Biagi claimed the Drivers' Championship. The 2008 season saw Vitaphone Racing return with MC12s for drivers including Andrea Bertolini, Michael Bartels, and newcomer Alexandre Negrão. They won another Teams' Championship and a Drivers' Championship for Bertolini and Bartels.\n\nIn 2009, Vitaphone Racing won their fifth consecutive Team Championship, with Bertolini and Bartels gaining their third Drivers' Championship. With the launch of the FIA GT1 World Championship in 2010, Maserati continued with Vitaphone Racing Team and Triple H Team Hegersport. Vitaphone won five races, securing the Drivers' and Teams' World Championships, though Maserati lost to Aston Martin in the Manufacturers' Trophy. The 2010 GT1 entry marked the MC12's final international competitive year.",
            },
            {
              id: "mc12-versione-corse",
              name: "MC12 Versione Corse",
              year: "2006",
              power: "755 hp",
              description:
                "In 2006, Maserati developed a limited-production series called the MC12 Versione Corse, aimed at private customers seeking the ultimate track experience. Derived from the MC12 GT1 racing car, which won the 2005 FIA GT World Endurance Championship, the Versione Corse was designed solely for non-competitive track use. This version was neither road-legal nor constrained by international GT racing regulations, making it a pure track car with exhilarating performance. The naturally aspirated V12 engine of the Versione Corse produced 755 horsepower, more than the Stradale road car and the GT1 race car, as it was not limited by intake air restrictors. With a weight of just over 2,500 pounds, the Versione Corse could accelerate from 0 to 200 km/h in just 6.4 seconds. Only 13 examples of the MC12 Versione Corse were built, consisting of one prototype and 12 customer vehicles.\n\nThe Maserati MC12 represented a significant chapter in the brand's storied history, harking back to its racing roots from the 1950s when legends like Stirling Moss and Juan Manuel Fangio secured international victories for the marque. During this era, Maserati was also known for producing highly desirable road cars that were fast, sophisticated, and glamorous, although these were secondary to their racing endeavors. By the late 20th century, Maserati had abandoned motorsport to focus on production models. However, at the beginning of the 21st century, Maserati made a dramatic return to its racing roots.\n\nUnveiled at the 74th Geneva International Motor Show in 2004, the Tipo M144 or MC12 (Maserati Corse, 12-cylinder) was the most extreme model to leave the Modena factory. Based on the Ferrari Enzo, substantial improvements were made to the engine, chassis, and aerodynamics. Powered by a 5,998 cc, 65-degree, 48-valve, dry-sump V-12 engine, the MC12 developed 630 horsepower at 7,500 rpm, achieving a top speed of 330 km/h. The carbon-fiber body was designed by Maserati Centro Stile, prioritizing function over beauty, bearing the hallmarks of a long-distance racer.\n\nThe MC12 Versione Corse, developed in late 2006, catered to wealthy enthusiasts seeking the ultimate track experience. Derived from the competition model, it was conceived as a track car, free from FIA regulations. Without intake restrictors, the Versione Corse's V12 engine produced 755 horsepower, making it the most potent Maserati ever. At 1,150 kilograms, it was almost 200 kilograms lighter than the Stradale. The car lacked traction control, stability control, and ABS, but its performance was electrifying, with the ability to reach 200 km/h from a standstill in 6.4 seconds. The Versione Corse offered full racing car dynamics in a user-friendly package, featuring carbon-ceramic brakes, a six-speed Cambiocorsa gearbox, and an integral roll cage.\n\nOnly 12 carefully selected customers were able to purchase the MC12 Versione Corse, each at a price of €1,000,000. One of these exclusive vehicles, designated '0008', was delivered to a customer in Germany in 2007. This car, like others in the series, was used sparingly and maintained meticulously, with an engine rebuild by former Maserati Corse mechanics in Modena and maintenance by marque specialist Formula Automobile in Denmark. The MC12 Versione Corse remains a highly coveted collector's item, exemplifying Maserati's racing heritage and engineering prowess.",
            },
            {
              id: "fxx-evolution",
              name: "FXX Evolution",
              year: "2008",
              power: "860 hp",
              description:
                "The Ferrari FXX Evoluzione is an advanced iteration of the original FXX, a track-only prototype car developed by Ferrari and first launched in June 2005. The FXX program, aimed at pushing the boundaries of Ferrari's technology and performance, was extended into 2008/2009 with the Evoluzione package. This update further enhanced the car's handling and performance, incorporating feedback from client test drivers and the invaluable input of seven-time Formula 1 World Champion Michael Schumacher.\n\nThe FXX Evoluzione boasts a more powerful 6.3-liter V12 engine, which now delivers an impressive 860 horsepower at 9,500 rpm. This upgrade, combined with a revised gearbox capable of shifting gears in just 60 milliseconds, allows the FXX Evoluzione to cut its lap time at Ferrari's Fiorano test track to under 1 minute and 16 seconds. The car's gear ratios were also adjusted to exploit the additional 1,000 rpm provided by the updated engine.\n\nSignificant improvements were made to the car's traction control system, which now offers nine different settings (plus an off position), allowing drivers to fine-tune the car's behavior on the track to suit their individual driving styles. The new system, developed with Ferrari's GES Racing Division, is less invasive and more adaptable, enhancing both performance and tire longevity. The suspension was modified with new front suspension geometry and a revised setup to complement the car's improved aerodynamics, which now feature a new rear diffuser, nolder, and rear flaps, increasing downforce by 25%.\n\nThe FXX Evoluzione package includes new 19-inch Bridgestone tires that offer improved durability and Brembo brakes with large Composite Ceramic Material (CCM) discs, which now ensure longer-lasting brake pads. Additionally, the package includes enhanced telemetry systems and the option for two extra video cameras to improve rear visibility without compromising aerodynamics.\n\nFerrari organized a series of track events for FXX Evoluzione owners for the 2008/2009 seasons, with six events each year across North America, Europe, and Asia. These events allow owners to drive their cars on some of the world's most prestigious circuits, supported by a dedicated team of Ferrari engineers, electronics experts, and mechanics. The FXX Evoluzione reflects Ferrari's commitment to advancing automotive technology through rigorous testing and client collaboration. The program not only provides an exclusive driving experience but also contributes to the development of future Ferrari models.",
            },
            {
              id: "millechili",
              name: "Ferrari Millechili",
              year: "2008",
              power: "602 hp",
              description:
                "Millechili, Italian for one thousand kilograms, is the code name for a prototype sports car to be manufactured by Ferrari. It was a lightweight version of the Enzo Ferrari that would borrow features from Formula One race cars, using the F430's aluminium space frame on a 104.3-inch (2,650 mm) wheelbase. The hybrid power train utilizing a V10 engine used in the car would exceed 602 hp. The car was mainly a technological concept with no intention of production.\n\nThe Millechili was developed in collaboration with the University of Modena and Reggio Emilia, faculty of Mechanical Engineering. Millechili Lab is a cross-project in which students are working on light-weight car design.",
            },
            {
              id: "gemballa-mig-u1",
              name: "GEMBALLA MIG-U1",
              year: "2010",
              power: "700 hp",
              description:
                "Over the past 27 years, Uwe Gemballa has established a stellar reputation for refining Porsche cars, becoming a well-known figure in the automotive world. Now, the company manager from Leonberg near Stuttgart has embarked on a new venture, transforming the Ferrari Enzo, one of the most potent super sports cars from Maranello, into the GEMBALLA MIG-U1. This unique edition is limited to just 25 individually produced cars, showcasing Gemballa's expertise and innovative approach to high-performance car modifications.\n\nThe Ferrari Enzo, introduced over a decade ago, remains a legendary figure in the world of super sports cars. With only 399 examples originally built, most surviving Enzos are now cherished by collectors, making sightings on the road increasingly rare. Among Enzo enthusiasts, the GEMBALLA MIG-U1 represents the 'Holy Grail.' This highly exclusive edition, limited to just five cars, is a testament to Gemballa's ability to push the boundaries of automotive engineering.\n\nGEMBALLA's modifications to the Ferrari Enzo include an increase in the V12 engine's power from 660 to 700 horsepower. The torque is also enhanced to 720 Nm, surpassing that of the ultra-rare, track-only FXX version. These performance enhancements are complemented by an aerodynamic body crafted entirely from carbon fiber. Developed in a wind tunnel, the new body components reduce drag and improve downforce, resulting in better stability at high speeds. The weight reduction, combined with the increased power, allows the MIG-U1 to accelerate from 0 to 100 km/h in just 3.1 seconds and achieve a top speed of over 360 km/h.\n\nThe GEMBALLA MIG-U1 stands out not only for its performance upgrades but also for its bespoke design. Each of the five cars in this limited edition features unique modifications tailored to the individual preferences of its owner. This level of customization, combined with the enhanced performance and striking design, ensures that the MIG-U1 remains a coveted masterpiece among supercar enthusiasts and collectors alike.",
            },
            {
              id: "zxx",
              name: "ZXX",
              year: "2015",
              power: "900 hp",
              description:
                "The Ferrari Enzo ZXX, the world's only street-legal Ferrari FXX, has made a triumphant return to ZR Auto in Calgary, Canada. After nearly a year of secrecy, the car has been unveiled with a brand new 6.4L engine installed by Edo Competition, delivering the power and aggressive driving experience that owner Zahir Rana had long desired. The ZXX now pushes over 900 horsepower, making it a true powerhouse on the streets.\n\nRana expressed his satisfaction with the upgrades, noting that the car wasn't perfect when he first received it back, but now it surpasses his expectations. With the new engine, the ZXX is not only more powerful but also more refined for everyday driving, as Rana envisioned. The car's return to Calgary coincides with the tail end of the driving season, but Rana wasted no time taking it for spirited drives in the nearby mountains before the snowfall.\n\nThe ZXX is no ordinary garage queen. Immediately after its return, the team at ZR Auto wrapped the car in Suntek paint protection film to preserve its pristine condition. Rana is known for driving his ZXX hard, and the enhancements made by Edo Competition ensure that it can handle whatever he throws at it.\n\nThe ZXX's journey has been remarkable. It was initially rebuilt by Edo Competition after a crash during the 2011 Targa Newfoundland, where it drove off the road and into the Atlantic Ocean. The rebuild transformed the car into the unique street-legal powerhouse it is today. With its new enhancements, the ZXX stands as a testament to high-performance engineering and a passion for pushing automotive boundaries.\n\nNext summer, the streets of Calgary will once again echo with the roar of the ZXX, as Rana plans to drive and enjoy his extraordinary car to the fullest. The return of the Enzo ZXX to ZR Auto marks a new chapter in its storied existence, blending everyday usability with track-level performance.",
            },
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
            {
              id: "360-modena",
              name: "360 Modena",
              year: "1999-2005",
              power: "400 hp",
              description:
                "The Ferrari 360 (Type F131) is a two-seater, mid-engine, rear-wheel drive sports car produced from 1999 to 2005. It succeeded the Ferrari F355 and was later replaced by the Ferrari F430. In collaboration with Alcoa, Ferrari developed a new all-aluminum space-frame chassis that was 40% stiffer and 28% lighter than the previous steel chassis, despite being larger in size. This change contributed to a reduction in overall weight and an improvement in acceleration, with the 0 to 100 km/h time reduced to 4.5 seconds.\n\nThe car's design marked a shift from the sharp angles and flip-up headlights of the past, featuring a new V8 engine with a 3.6-litre capacity and a power output of 400 horsepower. The first model released was the 360 Modena, followed by the 360 Spider and the high-performance Challenge Stradale. The latter included enhancements like carbon ceramic brakes, track-tuned suspension, and a power increase for better track performance.\n\nThe 360 Modena, named after Enzo Ferrari's birthplace, was produced until 2005.",
            },
            {
              id: "360-spider",
              name: "360 Spider",
              year: "2001-2005",
              power: "400 hp",
              description:
                "The Ferrari 360 Spider was introduced at the 2000 Geneva Motor Show. Designed with a convertible structure from the onset, the 360 Spider features enhancements to compensate for the loss of torsional rigidity typically associated with removing a coupe's roof. These enhancements include strengthened sills, a stiffened front floorpan, and a redesigned windscreen frame. Additional side reinforcements and a cross brace in front of the engine ensure the necessary dynamic rigidity and passenger safety is maintained through a strengthened windscreen frame and roll bars.\n\nThe Spider's design is characterized by a curvilinear waistline, with fairings that suggest the start of a roof and stable roll bars integrated within these raised areas. The use of light aluminum construction keeps the Spider only 60 kg heavier than the coupe. It showcases the same 3.6 L V8 engine as the Modena, capable of producing 400 horsepower, visible under a glass engine cover. To adapt to the convertible design, the engine's intake manifolds were repositioned closer together in the engine compartment, facilitated by larger side air intakes.\n\nPerformance-wise, the Spider's acceleration is slightly slower than the Modena due to the minor increase in weight, and the top speed is somewhat reduced. The electrically operated convertible top, which can be stowed away when not in use, is available in multiple colors including black, blue, grey, and beige.",
            },
            {
              id: "360-barchetta",
              name: "360 Barchetta",
              year: "2000",
              power: "400 hp",
              description:
                "The Ferrari 360 Barchetta is a unique one-off model based on the Ferrari 360 Spider, commissioned in 2000 by Gianni Agnelli as a wedding gift for Luca Cordero di Montezemolo, then chairman of Fiat and president of Ferrari. This special car retains many features of its base model, the 360 Spider, but with several distinctive modifications. The main alterations include the removal of the soft top system and roll bars, a different engine cover, and the installation of a visor instead of a full windshield to enhance airflow over the car.\n\nThe performance specifications of the Barchetta mirror those of the Spider, maintaining the same engine capabilities. Aesthetically, the car stands out with its Argento Nurburgring exterior paint complemented by red pinstriping. The interior is finished in black leather with cream fabric, and includes fabric seats with matching stitching. Notably, the dashboard is embroidered with the words \"360 Barchetta\" and the car is equipped with a paddle-shift gearbox.",
            },
            {
              id: "360-cs",
              name: "360 Challenge Stradale",
              year: "2003-2005",
              power: "425 hp",
              description:
                "The Challenge Stradale represents a track-focused version of the Ferrari 360 Modena, inspired by the racing series 360 Modena Challenge and the track-oriented Ferrari F355 \"Fiorano\". This model underscores Ferrari's commitment to enhancing track performance through meticulous improvements in handling, braking, and weight reduction, essential characteristics for racing. Designed with 20% track and 80% road use in mind, the Challenge Stradale boasts a modest 25 horsepower increase over the Modena, achieving 0 to 100 km/h acceleration in just 4.1 seconds.\n\nSignificant enhancements include an improved power-to-weight ratio, heightened throttle response, and better steering feedback. The integration of ceramic brakes from the Enzo and lighter components such as a sports exhaust system contribute to a 110 kg reduction in weight compared to the standard Modena, assuming all lightweight options are selected. These options include the removal of the radio, use of lexan door windows, and substitution of Alcantara for leather. Additional weight savings of 74 kg were achieved by using lighter bumpers, removing interior soundproofing, and standardizing carbon fiber seats.\n\nThe Challenge Stradale also features Brembo carbon ceramic brakes as standard, which not only reduce the car's weight by 16 kg but also enhance handling by minimizing unsprung weight and eliminating brake fade. Special lightweight BBS wheels further contribute to performance efficiency. While optional features like a stereo system and glass side windows can add back approximately 30 kg, the car remains significantly lighter and more agile, emphasizing its race-bred pedigree.",
            },
            {
              id: "360-cs-cornes",
              name: "360 Challenge Stradale 'Cornes Edition'",
              year: "2004",
              power: "425 hp",
              description:
                "The 'Cornes Edition' was made to celebrate 25 years of Cornes being the official importer of Ferrari's in Japan. The stand out features of this limited edition are the white rear grill and white rev counter along with the carbon fuel filler cap and paddle shift. These cars were also fitted with carbon ceramic brakes and gold brake callipers and each one has Michael Schumacher's signature on the door.",
            },
            {
              id: "360-challenge",
              name: "360 Challenge",
              year: "1999-2004",
              power: "405 hp",
              description:
                "The Ferrari 360 Challenge, derived from the 360 Modena, was a track-oriented variant designed specifically for the Ferrari Challenge racing series. Unlike its road car counterpart, the 360 Challenge was only available with an electrohydraulic-actuated automated manual transmission. At its launch, Ferrari touted the car's improved performance capabilities, with acceleration from 0 to 100 km/h in just 3.9 seconds, a notable 0.6 seconds faster than the standard Modena. The car featured enhanced aerodynamics, upgraded Brembo brakes with gold-colored calipers, and larger two-piece floating discs, along with specialized ABS software from Bosch. A lighter exhaust system contributed to a slight power increase over the standard engine.\n\nProduced in limited numbers with less than 200 units, the 360 Challenge was sold exclusively as a race car, with ownership conditional on participation in the Ferrari Challenge race series. This model marked a departure from previous Challenge versions, like the F355, which were essentially road cars modified for track use. The 360 Challenge boasted substantial improvements in handling and weight reduction, allowing it to significantly outperform the road version despite similar engine power.\n\nThe car's interior was completely reconfigured for racing, with the removal of the stereo, electric windows and locks, soundproofing, airbags, air conditioning, and even the handbrake. It was equipped with a single carbon-fibre racing seat, FIA-approved restraint harnesses, and a roll cage for increased safety. Additionally, a fire suppression system was installed. The instrument cluster was simplified to a monochrome LCD that displayed essential engine data. Racing dampers replaced the adaptive suspension of the road car, and the braking system was enhanced with larger brakes and additional cooling ducts to handle the rigors of racing.",
            },
            {
              id: "360-n-gt",
              name: "360 N-GT",
              year: "1999-2004",
              power: "547 hp",
              description:
                "The Ferrari 360 N-GT, a significantly tuned version of the 360 Challenge race car, was developed by Michelotto for the N-GT category in the FIA GT Championship. Recognized as the fastest iteration of the Ferrari 360, the engine of the N-GT, when unrestricted, generated over 547 horsepower, enabling top speeds around 310 km/h and acceleration from 0 to 97 km/h in approximately 3 seconds. This model marked the culmination of the collaboration between Ferrari and Michelotto, with its most recent notable performance being a victory at the 2011 Britcar Championship by SB Race Engineering.\n\nIn 2002, the 360 N-GT competed in the Australian Nations Cup Championship, managed by Prancing Horse Racing and driven by Australian racer John Bowe. The car finished third in the championship and was entered in the 2002 Bathurst 24 Hour race at Mount Panorama Circuit. It achieved pole position through driver Brad Jones, but faced mechanical issues with oil pressure that led to two engine changes during the race, ultimately forcing its retirement. Bowe continued to compete in the 360 N-GT, finishing second in the 2003 Nations Cup Championship. The car's final race was at the 2003 Bathurst 24 Hour, driven by a team that included David Brabham and Andrea Montermini. After performing strongly, running in third for several hours, the car was retired on lap 287.",
            },
            {
              id: "360-gt",
              name: "360 GT",
              year: "2001 - 2003",
              power: "436 hp",
              description:
                "The Ferrari 360 GT, a race-oriented version of the 360 Modena, was developed by Ferrari's Corse Clienti department in partnership with Michelotto Automobili to compete in the FIA N-GT class. The model debuted in the 2001 FIA GT Championship season, with Team JMB Giesse successfully winning both the N-GT Cup for Drivers and the N-GT Cup for Teams.\n\nProduced from 2002 to 2004, Ferrari manufactured 20 units of the 360 GT, making them available to customers through their Corse Clienti department. The 3.6-litre V8 engine of the 360 GT was enhanced to deliver 436 horsepower, representing a significant boost compared to the 360 Challenge models.\n\nThe 360 GT underwent extensive weight reduction measures beyond what was seen in the regular 360 Challenge versions. Efforts included lightening the wiring loom, which alone saved 7 kg, and removing non-essential components like air-conditioning brackets. The doors and front compartment lid were reconstructed using one-piece carbon fibre, contributing to a total weight reduction of 91 kg over the 360 Challenge, bringing the 360 GT's kerb weight down to 1,070 kg. To meet race regulations, ballast was added to adjust the car's weight to the mandated 1,100 kg limit.",
            },
            {
              id: "360-gtc",
              name: "360 GTC",
              year: "2003-2004",
              power: "472 hp",
              description:
                "The Ferrari 360 GTC was developed by Ferrari's Corse Clienti department in collaboration with Michelotto Automobili, replacing the earlier 360 GT model for competition in the N-GT class. Introduced in 2004, the 360 GTC carried forward the successful features of the 360 GT, including a sequential six-speed gearbox and an enhanced Magneti Marelli electronics package. It was homologated anew by the FIA/ACO, incorporating aerodynamic elements from the Challenge Stradale such as the front bumper, side skirts, engine cover, and a modified rear end. This redesign, informed by wind tunnel research, significantly improved vertical downforce through a new rear wing system.\n\nWeighing in at 1,100 kg with ballast, the 360 GTC also marked an advancement in engine performance. It featured a 3.6 L V8 engine, refined to improve fuel consumption while increasing power output. Originally, the 360 GT produced 445 horsepower, but the GTC increased this to 472 horsepower, even with 30.8 mm air restrictors required for N-GT class racing. Without these restrictors, the engine's power potential rises to around 550 horsepower.\n\nIn 2009, versions of the 360 GTC participated in international endurance races including events at Silverstone, Sebring, and Le Mans, driven by the Veloqx-Prodrive Racing team. These de-restricted, fully tuned versions of the GT-C demonstrated the model's capabilities on some of the world's most challenging circuits.",
            },
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
            {
              id: "f430",
              name: "F430",
              year: "2005",
              power: "490 hp",
              description:
                "The Ferrari F430, produced by Italian manufacturer Ferrari from 2004 to 2009, served as the successor to the Ferrari 360. Unveiled at the 2004 Paris Motor Show, this sports car marked an evolution in design and performance, leading to its replacement by the 458 in 2009.\n\nThe F430's design, a collaborative effort between Pininfarina and Frank Stephenson of Ferrari-Maserati, carried significant aerodynamic refinements from the 360. Although it maintained the same drag coefficient, the modifications significantly increased downforce. The F430 shared its basic structure with the 360, including the Alcoa Aluminium chassis, roofline, doors, and glass, but featured a distinctly different appearance that drew heavily on Ferrari's rich racing heritage. Notable design elements included the tail lights and engine cover vents from the Enzo, the Testarossa-style name inscription on the driver's side mirror, and large oval front bumper openings that echoed the Ferrari 156 \"shark nose\" model from the 1960s.",
            },
            {
              id: "f430-spider",
              name: "F430 Spider",
              year: "2005",
              power: "490 hp",
              description:
                "The F430 Spider, the convertible variant of the F430, debuted at the 2005 Geneva Motor Show and is Ferrari's 21st road-going convertible. Pininfarina designed the car using aerodynamic simulations similar to those used in Formula 1. The Spider features a two-stage folding roof that neatly tucks away above the engine bay. Although it shares the same interior and performance characteristics as the coupé, the Spider is slightly heavier, which reduces its top speed by 5 km/h compared to its hardtop counterpart.",
            },
            {
              id: "f430-spider-bio-fuel",
              name: "F430 Spider Bio Fuel",
              year: "2008",
              power: "490 hp",
              description:
                "The F430 Spider Bio Fuel, an ethanol-powered version of the F430 Spider, was showcased at the 2008 Detroit Auto Show. This model retains the standard 4.3-liter V8 engine, now producing 500 horsepower. It also achieves a 5% reduction in carbon dioxide emissions compared to the regular F430 Spider, aligning with more environmentally friendly performance standards.",
            },
            {
              id: "sp1",
              name: "SP1",
              year: "2008",
              power: "490 hp",
              description:
                "The SP1, Ferrari's newest supercar, marks the first vehicle designed under the company's own customization program. Designed by Fioravanti and built by Ferrari, the SP1 offers a shift in how Ferrari approaches bespoke vehicles. Unlike previous models like the 612 Kappa, 575 GTZ, G 50, and P4/5 by Pininfarina, which were outsourced and privately upgraded, the SP1 is both designed and sold directly by Ferrari.\n\nJapanese collector Junichiro Hiramatsu recently added the SP1 to his extensive collection of Ferraris, which includes various models and literature. With the launch of the Portfolio Program, Ferrari aims to keep customization in-house and discourage external upgrades, despite the higher cost associated with their bespoke offerings.",
            },
            {
              id: "430-scuderia",
              name: "430 Scuderia",
              year: "2008",
              power: "503 hp",
              description:
                "The 430 Scuderia, unveiled by Michael Schumacher at the 2007 Frankfurt Auto Show, succeeds the 360 Challenge Stradale. Designed to rival high-performance cars like the Porsche 911 GT2 and the Lamborghini Gallardo Superleggera, the 430 Scuderia is lighter and more powerful than the standard F430, boasting a horsepower of 503 at 8,500 rpm. The increase in power is attributed to a revised intake, exhaust, and an ion-sensing knock-detection system that enables a higher engine compression ratio. These enhancements have improved the weight-to-power ratio from 2.96 kg/hp to 2.5 kg/hp.\n\nThe Scuderia also features upgraded transmission software, \"Superfast2,\" which allows for faster shift times of 60 milliseconds. It integrates a new traction control system that combines the F1-Trac system from the 599 GTB with stability control and the E-Diff electronic differential. The car can accelerate from 0 to 100 km/h in 3.6 seconds and reaches a top speed of 319 km/h.",
            },
            {
              id: "f430-challenge",
              name: "F430 Challenge",
              year: "2006",
              power: "483 hp",
              description:
                "The Ferrari F430 Challenge, unveiled at the 2005 Frankfurt Motor Show, is a race car developed from the road-going Ferrari F430, designed specifically for competition in the Ferrari Challenge and the Rolex Sports Car racing series. This vehicle builds on the legacy of its predecessor, the Ferrari 360 Challenge, by incorporating similar modifications that optimize it for track performance.\n\nRetaining the same 4.3L V8 engine as the standard F430, the F430 Challenge benefits from a number of enhancements that focus primarily on performance rather than major engine changes. These enhancements include a racing exhaust system and tweaks to the engine management system to improve efficiency and performance. Additionally, the engine undergoes fine blueprinting to ensure it operates at peak performance under race conditions.\n\nSignificant weight reduction measures have been implemented in the F430 Challenge. These include the use of lighter materials and the removal of non-essential weight-contributing components that are typically found in the road car. The suspension system has also been extensively modified to better suit the rigors of track racing, offering improved handling and stability at high speeds.\n\nStylistically, the F430 Challenge maintains much of the road car's aesthetics but incorporates specific changes tailored for racing. This includes the adoption of Formula One-inspired BBS wheels fitted with a single central nut, facilitating quicker tire changes during races. These wheels are paired with large carbon brakes, providing exceptional stopping power necessary for competitive racing.\n\nOverall, the F430 Challenge exemplifies Ferrari's commitment to providing a high-performance race car that retains the DNA of its road-going versions, yet is perfectly adapted to the demands of motorsport environments.",
            },
            {
              id: "f430-gtc",
              name: "F430 GTC",
              year: "2006",
              power: "445 hp",
              description:
                "The Ferrari F430 GTC, developed since 2006 by Ferrari's Corse Clienti department in collaboration with Michelotto, represents Ferrari's pinnacle in GT2 class racing technology, tailored specifically for competition in prestigious international series such as the American Le Mans Series, the Le Mans Series, and the FIA GT Championship. This model has also been a regular competitor at the iconic 24 Hours of Le Mans, asserting its position as the fastest and most advanced racing iteration of the F430 platform.\n\nIn order to meet the strict regulations of the FIA GT2 championship, which aim to ensure parity among competing vehicles, adjustments are made to the cars including minimum weight requirements and the use of engine restrictors that vary based on engine displacement. To optimize its performance within these constraints, Ferrari modified the F430 GTC's original 4.3-liter V8 engine to a smaller 4.0-liter displacement. This strategic adjustment allowed the F430 GTC to compete in the 3.8–4.0 L subclass within GT2, which benefits from a lower minimum weight limit of 1,100 kg (2,425 lbs).\n\nThis engine downsizing naturally results in a slight reduction in power output, with the engine producing 445 PS (439 horsepower). However, the smaller engine allows for a 50 kg (110 lbs) increase in the car's minimum weight under race regulations. Despite this, the overall reduction in vehicle weight helps maintain a favorable power-to-weight ratio, ensuring that the F430 GTC remains highly competitive in its class. This meticulous balancing of regulations and vehicle dynamics showcases Ferrari's commitment to excelling in GT racing by optimizing every aspect of the car's performance and compliance with racing standards.",
            },
            {
              id: "f430-gt3",
              name: "F430 GT3",
              year: "2006",
              power: "550 hp",
              description:
                "The Ferrari F430 GT3, developed in 2006 by JMB Racing, is a racing variant specifically tailored for the FIA GT3 European Championship and other national GT championships like the British GT and FFSA GT. This model is based on the F430 Challenge but features several enhancements that differentiate it from both its sibling and the more GT2-spec racing cars.\n\nThe F430 GT3 is equipped with the same 4.3-liter V8 engine found in the F430 Challenge. However, for GT3 competition, this engine has been tuned to produce a higher output of 550 horsepower, which surpasses even the GT2 version of the F430 in terms of raw power. This tuning makes the GT3 one of the most potent iterations of the F430 series in Ferrari's racing lineup.\n\nDespite its greater power, the F430 GT3 adheres to GT3 regulations which require a specific power-to-weight ratio. For the GT3, this ratio mandates that the vehicle weighs approximately 1,219 kg (2,687 lbs) in race trim (excluding the driver and fuel). This weight is about 119 kg (262 lbs) heavier than its GT2 counterpart. The increased weight, despite the higher power output, contributes to its relatively slower performance on the track compared to the GT2. This was notably evident during the 2007 Spa 24 Hours endurance race, where the GT3 spec car's best qualification time lagged around 8 seconds per lap slower than the GT2 spec vehicle.\n\nThis performance disparity underscores the significant impact of vehicle dynamics and weight distribution in racing, where even substantial increases in power cannot always compensate for the drawbacks of added weight, particularly in a highly competitive setting like GT racing.",
            },
            {
              id: "430-gt3-scuderia",
              name: "430 GT3 Scuderia",
              year: "2009",
              power: "550 hp",
              description:
                "For the 2009 racing season, Kessel Racing developed a new car, the Scuderia GT3, envisioned as the successor to the highly successful Ferrari 430 GT3. This new car is based on the high-performance Ferrari Scuderia road car, and significant modifications were made within the limitations set by FIA GT3 regulations.\n\nThe Scuderia GT3 aims to surpass the performance of the F430 GT, which notably won the 2007 FIA GT3 European Championship. The adaptation of the Scuderia into a GT3 racing car involves comprehensive tuning and configuration adjustments to ensure it meets the competitive standards required for approval and homologation by the FIA. The car is expected to receive a new homologation form from the FIA, pending approval.\n\nInterest in the Scuderia GT3 is strong among Ferrari racing teams, with Kessel Racing planning to continue its involvement in the FIA GT3 Championship using this newer model. They will be joined by JMB Racing and CRS Racing, the latter of which is expanding its participation in international GT racing. CRS Racing has also confirmed a two-car entry in the FIA GT Championship, indicating a significant commitment to Ferrari's racing efforts across different levels of GT competition.",
            },
            {
              id: "scg-p45-competizione",
              name: "SCG P4/5 Competizione",
              year: "2009",
              power: "590 hp",
              description:
                "In September 2009, Glickenhaus announced his intention to race a new version of the P4/5 in 2010 24 Hours Nürburgring. The car, called the SCG P4/5 Competizione, would not be a conversion of his road car but instead an entirely new car with a Ferrari chassis, VIN and drivetrain, made under Glickenhaus's own car brand Scuderia Cameron Glickenhaus. In May 2010 however, it was revealed that the Competizione would in fact be raced in 2011, based on a 430 Scuderia. It would be built to FIA GT2 standards and raced by Scuderia Cameron Glickenhaus in an Experimental Class under the direction of Paolo Garella, former Head of Special Projects at Pininfarina. Ferrari completely distanced itself from the SCG P4/5 Competizione project in 2011, refusing to sell the team parts for vital engine rebuilds between races. The car finished 39th in the 2011 24 Hours Nürburgring (after bursting into flames) and in 2012 won its class and finished 12th overall.",
            },
            {
              id: "scuderia-spider-16m",
              name: "Scuderia Spider 16M",
              year: "2009",
              power: "503 hp",
              description:
                "The Ferrari Scuderia Spider 16M is a limited-edition marvel crafted to commemorate Ferrari's 16 Formula One Constructors' Championships. With only 499 units produced, it represents a rare blend of racing heritage and road-ready engineering. Based on the Ferrari Scuderia coupe, the 16M inherits the higher compression 4.3-liter V8 engine of the Scuderia, delivering an additional 20 bhp and 4 lb/ft of torque over the base Spider model.\n\nSignificant enhancements were made across the board, including the body kit, aerodynamics, suspension, interior, and electronics, all fine-tuned to match the Scuderia coupe's specifications. Weighing around 3300 pounds, the 16M sheds nearly 200 pounds compared to the F430 Spider, though it is still over 200 pounds heavier than the 430 Scuderia, largely due to its convertible nature.\n\nPerformance tests at Ferrari's Fiorano circuit proved the 16M to be faster than any other open-top road car previously produced by Ferrari. This isn't just about track performance; the 16M excellently balances high-octane sports car thrills with everyday usability. The adjustable suspension can be softened to provide a more comfortable ride, easing the intensity of the car's more performance-focused setup.\n\nDriving the 16M with the top down offers an exhilarating experience, thanks to the sonorous roar of its 503 horsepower V8 engine that revs up to 8,500 rpm. The sound is reminiscent of an F1 car, providing an unmatched auditory thrill—something that newer turbocharged models may struggle to replicate.\n\nThe debut of the 16M was a highlight at the Ferrari Finale in Mugello, emphasizing its role as a celebration of Ferrari's continuous F1 success. Its exclusivity and limited production make it highly desirable, likely causing concern among those awaiting other models like the new California.\n\nInterestingly, the name \"16M\" is not only significant for its reference to Ferrari's racing achievements but also nods to the brand's history, echoing the chassis number of one of Ferrari's earliest production cars, the 166MM Touring Barchetta. This model helped secure Ferrari's victory in the 1949 Mille Miglia, marking the beginning of Ferrari's prominence in automotive racing and production.",
            },
            {
              id: "mat-new-stratos",
              name: "MAT New Stratos",
              year: "2018",
              power: "540 hp",
              description:
                "The MAT New Stratos is often regarded as a superior Ferrari compared to current models sold by the brand. Built on the chassis of an older model, the F430, the New Stratos pays homage to the 1973-1978 Lancia Stratos. Despite its origins in the past, the New Stratos has carved out a niche as a true modern classic, developed to celebrate the iconic Lancia Stratos of rally fame.\n\nThe design journey for the New Stratos began at the Bertone design house in Turin, with Marcello Gandini at the helm. Gandini, who had previously created landmarks like the Lamborghini Miura and Countach, also designed the Lancia Stratos Zero, a concept car that led to the roadgoing Stratos HF. This vehicle was designed specifically for rally, distinguishing it from other cars adapted for racing, and it excelled in the World Rally Championship during the mid-70s.\n\nDecades later, the Stratos name was resurrected by Chris Hrabalek, who bought the rights and created the Fenomenon Stratos as a student project. This effort eventually led to the New Stratos, which debuted as a prototype at the 2005 Geneva auto show. The project saw multiple potential partnerships with firms like Prodrive and Pininfarina, with the latter finally helping to push the car towards production.\n\nThe modern Stratos utilizes a Ferrari 430 Scuderia as its base, maintaining the soul of a Ferrari with significant modifications. Despite challenges, including the unexpected death of Andrea Pininfarina, the car transitioned from prototype to production, albeit in a limited run due to parts acquisition issues with Ferrari.\n\nPhysically, the New Stratos is distinctive, featuring a shortened wheelbase and a body crafted from carbon fiber. Its interior is spartan, reflecting its racing heritage, and the car lacks modern comforts in favor of pure driving pleasure. The engine, a mid-mounted 4.3-liter V-8, is tuned to deliver an estimated 540 horsepower, providing exceptional power-to-weight performance.\n\nUltimately, the New Stratos is celebrated not for its suitability as an everyday car but for encapsulating the spirit of a true sports car. It strips down to the essentials, prioritizing the raw, exhilarating experience of driving over comfort, making it a worthy bearer of the Stratos legacy and a testament to what Ferrari once stood for in the automotive world.",
            },
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
            {
              id: "458-italia",
              name: "458 Italia",
              year: "2009-2015",
              power: "562 hp",
              description:
                "The Ferrari 458 Italia, designated as Type F142, is a mid-engine sports car produced by Ferrari and serves as the successor to the F430. It was first unveiled at the 2009 Frankfurt Motor Show and was later replaced by the 488 GTB in 2015. The 458 marked a significant evolution from its predecessor, incorporating an entirely new design influenced by Ferrari's Formula One experience.\n\nThe 458 features a 4.5-liter V8 engine from the \"Ferrari/Maserati\" F136 family. This engine delivers 570 PS (562 horsepower) at 9,000 rpm and generates 540 N⋅m (398 lb⋅ft) of torque at 6,000 rpm, with 80% of that torque available from 3,250 rpm. Notably, the 458 introduced direct fuel injection to Ferrari's mid-engine lineup, enhancing both performance and fuel efficiency.\n\nThe car's development included advanced technological contributions from Ferrari's long-standing partner, Magneti Marelli, particularly in the area of the body computer system. This integration of cutting-edge technology and engineering prowess makes the 458 Italia a standout example of Ferrari's commitment to pushing the boundaries of sports car performance.",
            },
            {
              id: "458-italia-china-edition",
              name: "458 Italia China Edition",
              year: "2012",
              power: "562 hp",
              description:
                "The 2012 Ferrari 458 Italia China Edition is a special version created exclusively for the Chinese market to celebrate the 20th anniversary of Ferrari's presence in China. This edition is highly exclusive, with only 20 units produced, marking two decades since the first Ferrari, a 348 TS, was ordered in Beijing.\n\nThis limited edition model features several unique design elements that pay homage to Chinese culture. It sports a vibrant Marco Polo Red body color and is adorned with a golden dragon graphic on the front bonnet, symbolizing power and good fortune. Complementing this are gold and black livery stripes that represent a racing track, further enhancing its sporty aesthetic.\n\nThe car also includes gold-painted wheels and gold aeroelastic winglets, adding to its distinctive appearance. Inside, the attention to detail continues with gold embroidery on the headrests and an engine start button inscribed with the simplified Chinese characters for \"start.\" Additionally, a \"20th Anniversary Special Edition\" plaque on the dash commemorates this special milestone.\n\nThe 458 Italia China Edition was unveiled at the Italia Center of Shanghai World Expo Park, underlining Ferrari's commitment to celebrating its significant market presence and cultural ties with China.",
            },
            {
              id: "sp12-ec",
              name: "SP12 EC",
              year: "2012",
              power: "562 hp",
              description:
                "The Ferrari SP12 EC is a unique one-off sports car developed specifically for English musician Eric Clapton as part of Ferrari's Special Projects programme. This bespoke vehicle, based on the 458 Italia, was unveiled in May 2012 and later showcased at the 2013 Goodwood Festival of Speed.\n\nDesigned by the Ferrari Styling Centre in collaboration with Pininfarina, the SP12 EC's exterior draws heavy inspiration from the Ferrari 512 BB, one of Clapton's favorite Ferraris, blending classic design elements with modern aesthetics. The car retains the mechanical components of the 458 Italia, including its 4.5-litre V8 engine and the seven-speed dual-clutch transmission. However, many of the car's technical details remain confidential, highlighting its exclusive nature.\n\nThe project, which is reported to have cost £10,000,000, represents a high level of customization and personalization, underscoring Ferrari's commitment to catering to the individual tastes and desires of its distinguished clientele. The SP12 EC not only reflects Clapton's admiration for the Ferrari brand but also showcases the possibilities within Ferrari's custom car program to create highly personalized, bespoke automotive works of art.",
            },
            {
              id: "458-spider",
              name: "458 Spider",
              year: "2011-2015",
              power: "562 hp",
              description:
                "The Ferrari 458 Spider, the convertible counterpart to the 458 Italia, was unveiled at the 2011 Frankfurt Motor Show. This model features an innovative aluminum retractable hardtop, which not only weighs 25 kilograms less than the traditional soft top found on the previous Ferrari F430 Spider but also operates in just 14 seconds. To integrate this retractable roof system, the engine cover of the 458 Spider was re-engineered.\n\nDespite the additional mechanisms required for the retractable top, the 458 Spider maintains the same impressive acceleration as the 458 Italia, reaching 0–100 km/h in just 3.4 seconds. However, the Spider's top speed is slightly reduced to 320 km/h, a consequence of the slight increase in weight due to the convertible design. This model seamlessly blends the Italia's performance with the added luxury and aesthetic of a convertible, making it a desirable choice for those seeking the thrill of a high-performance sports car with the versatility of an open-top driving experience.",
            },
            {
              id: "458-speciale",
              name: "458 Speciale",
              year: "2013-2015",
              power: "597 hp",
              description:
                "The Ferrari 458 Speciale, introduced at the 2013 Frankfurt Motor Show, is a high-performance variant of the 458 Italia, featuring numerous enhancements that distinguish it from the standard model. Key external upgrades include forged wheels, a vented bonnet, finned side sills, a taller rear spoiler, and redesigned bumpers. These changes are not just aesthetic; the car incorporates active aerodynamics developed by the Ferrari Styling Centre in collaboration with Pininfarina. These include movable flaps at the front and rear that dynamically adjust to balance downforce and reduce drag while the car is at speed.\n\nUnder the hood, the Speciale's 4.5-liter V8 engine has been tuned to deliver 605 PS (597 horsepower) at 9,000 rpm and 540 N⋅m (398 lb-ft) of torque at 6,000 rpm. To harness this increased power, the electronic systems have been upgraded, including the introduction of a side slip angle control (SSC) system. This innovative feature works in conjunction with the F1-Trac traction control and the E-Diff electronic differential to optimize torque management and distribution, enhancing the car's handling at its performance limits.\n\nPerformance-wise, the 458 Speciale can accelerate from 0 to 100 km/h in just 3.0 seconds, and from 0 to 200 km/h in 9.1 seconds. It also boasts an impressive lap time of 1:23.5 on Ferrari's Fiorano test track, which is just 0.5 seconds slower than the F12 berlinetta. The Speciale achieves a lateral acceleration of 1.33 g, reflecting its exceptional agility and cornering capabilities. Only 1,309 units of the Speciale were produced, making it a rare and sought-after model among Ferrari enthusiasts.",
            },
            {
              id: "458-speciale-a",
              name: "458 Speciale A",
              year: "2015",
              power: "597 hp",
              description:
                "The Ferrari 458 Speciale A, a convertible version of the 458 Speciale, was introduced at the 2014 Paris Motor Show. The \"A\" in its name stands for \"Aperta,\" which means \"open\" in Italian, highlighting its convertible design. This model was highly exclusive, with production limited to just 499 units, including 49 right-hand drive versions.\n\nLike its coupé counterpart, the Speciale A is powered by a 4.5-liter naturally aspirated V8 engine that produces 605 PS (597 horsepower) and 540 N⋅m (398 lb⋅ft) of torque. It matches the coupé's performance in acceleration, reaching 0–100 km/h in 3.0 seconds, and has a top speed of 320 km/h (199 mph). At the time of its release, it was the most powerful street-legal, naturally aspirated convertible ever produced by Ferrari. This record was held until the launch of the Ferrari LaFerrari Aperta in 2017, which features a 790 horsepower naturally aspirated V12 engine.",
            },
            {
              id: "pininfarina-sergio",
              name: "Pininfarina Sergio (Pininfarina)",
              year: "2013",
              power: "562 hp",
              description:
                "The Pininfarina Sergio is a concept car that serves as a tribute to Sergio Pininfarina, the long-standing chairman of the design firm. This modern interpretation of the classic 2-seater barchetta is based on the mechanical underpinnings of the Ferrari 458 Spider. True to the barchetta style, the Sergio lacks a windshield, and instead comes with two matching helmets for the driver and passenger to underscore its open design and racing heritage.\n\nFirst unveiled at the Geneva Motor Show in March 2013, Pininfarina expressed that the Sergio was designed with the potential for limited production in mind, suggesting it could be more than just a concept.",
            },
            {
              id: "sergio",
              name: "Sergio",
              year: "2015",
              power: "597 hp",
              description:
                "In 2015, the potential of the Pininfarina Sergio concept was realized when Ferrari and Pininfarina collaborated to build six units of the Ferrari Sergio. Unlike the original concept, the production versions were designed with a targa top body style, a change prompted by the complexities and high production costs of manufacturing a car without a windshield.\n\nThe production Sergio uses the engine from the 458 Speciale, ensuring high performance to match its striking aesthetics. Each unit was sold at a cost of approximately US$3,000,000 to a select group of handpicked customers, reflecting the car's exclusivity and the prestigious nature of the collaboration.\n\nOne of these rare units, a yellow and matte black version, was shown at the 2015 Geneva Motor Show and later sold to its first owner in Switzerland. This particular car, with a VIN of ZFF75VHB000205529, was auctioned by RM Sotheby's in Monaco in May 2018. At the time of the auction, the car had only 200 km (120 mi) on the odometer and was estimated to fetch between €2,500,000 and €3,000,000. The final sale price was not disclosed, underscoring the collectible nature of this unique Ferrari.",
            },
            {
              id: "458-mm-speciale",
              name: "458 MM Speciale",
              year: "2016",
              power: "597 hp",
              description:
                "Ferrari recently showcased its newest One-Off creation, the Ferrari 458 MM Speciale, during its inaugural shakedown at the Fiorano circuit with Ferrari's chief test driver Dario Benuzzi and the car's British owner behind the wheel. This unique vehicle was meticulously crafted by the Ferrari Styling Centre, using the chassis and running gear of the 458 Speciale as its foundation.\n\nThe 458 MM Speciale was designed to fulfill the owner's desire for a highly sporty aesthetic, coupled with innovative features like the 'visor' effect for the glasshouse. This design includes a black-painted A-pillar reminiscent of the 1984 Ferrari GTO, creating a seamless glass surface that connects the windscreen and side windows, enhancing the car's aerodynamic silhouette and lowering the roofline.\n\nThe car is painted in Bianco Italia and features a livery inspired by the Italian flag. Its bodywork is entirely new, handcrafted from aluminum with carbon-fibre bumpers at both ends. A standout feature is the new side air scoop, part of a broader revision of the car's aerodynamics. This includes newly positioned coolant radiators and redefined side intakes that help cool the engine bay more efficiently due to their altered angle and positioning.\n\nAerodynamic enhancements extend to the rear of the car, where a new spoiler not only augments downforce but also visually extends the beltline that flows from the front wheel arch, reinforcing the car's dynamic stance. This model rides on bespoke wheels, specially designed for this unique build.\n\nInterior upgrades focus on luxury and personalization, with a high-quality audio system and refined trim tailored to the owner's preferences. The interior is finished in Cioccolato leather with white stitching, complemented by satin white rings around the tunnel controls, adding sophisticated touches that enhance the bespoke nature of the cabin.\n\nThis one-off Ferrari 458 MM Speciale exemplifies Ferrari's commitment to custom tailored solutions, merging cutting-edge design with the technical underpinnings of one of its most celebrated models.",
            },
            {
              id: "458-italia-gt3",
              name: "458 Italia GT3",
              year: "2011",
              power: "550 hp",
              description:
                "In 2011, Ferrari introduced the 458 Italia GT3, developed by Michelotto, as a race-oriented version of their popular 458 Italia. This GT3 variant is lighter and more powerful than its GTE counterpart, producing about 558 PS (550 horsepower) with a higher redline of 9,000 rpm. The engine of the GT3 version bears more similarity to the 458 Italia road car than the GTE version, primarily due to different performance objectives and aero regulations.\n\nThe aerodynamic design of the 458 Italia GT3 is tailored to meet GT3 class specifications, differing from the GTE in various aspects to comply with distinct regulatory requirements. These modifications helped enhance its performance on racetracks around the world, leading to an impressive record of victories and titles across several prestigious events and series.\n\nThe car has an illustrious track record, including multiple wins at the 24 Hours of Spa-Francorchamps, victories in the Gulf 12 Hours, and significant achievements at the 12 Hours of Sepang, 24 Hours of Dubai, Liqui Moly Bathurst 12 Hour, and the 24 Hours of Barcelona. Beyond these, the 458 Italia GT3 has consistently performed well in series like the Blancpain Endurance Series, where it won several GT3 PRO AM Team and Drivers' titles and Gentlemen Trophy honors.\n\nIn the European Le Mans Series, it clinched the GTC Team and Drivers' Titles in 2013 and 2014. The GT3 also demonstrated its dominance in the International GT Open and other regional series such as the GT3 Asia, showcasing Ferrari's engineering prowess in adapting a road car into a championship-winning race car.\n\nBy 2015, the 458 Italia GT3 continued to compete vigorously across the globe, participating in numerous series including the Blancpain Endurance Series, European Le Mans Series, International GT Open, GT3 Asia, Pirelli World Challenge, and many national GT3 championships, underscoring its versatility and enduring competitive edge in the realm of GT racing.",
            },
            {
              id: "458-italia-gt2",
              name: "458 Italia GT2",
              year: "2012",
              power: "470 hp",
              description:
                "The Ferrari 458 Italia GT2, developed by Michelotto, was Ferrari's answer to the competitive GTE class in ACO and FIA-sanctioned championships. Unveiled in 2011, the 458 Italia GT2 was tailored to meet the strict specifications of GTE racing, featuring significant alterations from the road-going version of the 458 Italia.\n\nKey changes in the GT2 included the removal of the \"flex splitter\" seen on the road cars, replaced with a more conventional inlet, with air exiting through louvers on the bonnet. This was part of broader aerodynamic optimizations tailored to GTE regulations. The engine, a 4.5-liter V8, was restricted under new regulations to produce 470 PS (460 horsepower), less than both the road version and the 458 Challenge variant. This engine was adapted to produce robust torque while having a lower redline at 6,250 rpm due to the restrictor requirements. The car retained paddle-shifting, allowed by amended rules from 2011, although the double-clutch gearbox was replaced.\n\nThe 458 Italia GT2 proved highly successful in endurance racing, securing wins at prestigious events such as the 24 Hours of Le Mans in 2012 and 2014, the 12 Hours of Sebring in 2012, and the Petit Le Mans in both 2011 and 2012. It dominated various championship titles over the years, including the Intercontinental Le Mans Cup GTE Manufacturers' and the GTE PRO Team Titles in 2011. With the advent of the FIA World Endurance Championship in 2012, it continued to excel, capturing the GTE Manufacturers' and GTE PRO Team Titles multiple times and winning numerous other championships across different series.\n\nBy the end of its competitive life in 2015, the 458 Italia GT2 had amassed a commendable record, demonstrating Ferrari's prowess in adapting its road vehicles to top-tier race cars. It was eventually succeeded by the Ferrari 488 GTE in 2016, marking the continuation of Ferrari's innovative approach to endurance racing.",
            },
            {
              id: "458-italia-grand-am",
              name: "458 Italia Grand Am",
              year: "2012",
              power: "560 hp",
              description:
                "In 2012, Ferrari introduced a specialized version of the 458 GT3 tailored for Grand-Am racing. This modified 458, designed to meet the specific regulations and demands of Grand-Am competition, features several notable adjustments from the standard GT3 model.\n\nThe car maintains the same weight as the GT3 version but produces significantly less downforce due to the series' restrictions. Additionally, the engine in the Grand-Am variant is more heavily restricted, delivering a power output of 507 PS (500 horsepower) and a reduced redline of 8,000 rpm. Unlike the GT3, which utilizes a dual-clutch automatic transmission, the Grand-Am version is equipped with a conventional sequential manual transmission, aligning with the series' specifications.\n\nSafety enhancements include modifications to the roll cage to comply with the stricter safety regulations of Grand-Am racing. The car also does not feature traction control or ABS, which are typically standard in many other racing variants but are excluded here to adhere to the rules.\n\nThe Ferrari 458 Italia Grand-Am made its debut at the 2012 24 Hours of Daytona. Throughout the racing season, the car proved its capabilities and competitiveness. A notable achievement was made by the AimAutosport.com team when drivers Jeff Segal and Emil Assentato clinched the Grand-Am Rolex GT championship following a second-place finish at Laguna Seca on September 9, 2012. This success highlighted the car's performance and reliability under the rigorous conditions of Grand-Am racing.",
            },
            {
              id: "458-challenge",
              name: "458 Challenge",
              year: "2011",
              power: "562 hp",
              description:
                "The Ferrari 458 Challenge debuted in Maranello at the Annual Dealer Meeting, soon after its base model, the 458 Italia, was unveiled. This race-ready berlinetta joins the Ferrari Challenge Trofeo Pirelli for the 2011 season, marking the introduction of a new Asia-Pacific series. It is the fifth model employed in Ferrari's one-make championship.\n\nThe 458 Challenge retains the 4497 cc V8 from the 458 Italia, producing 570 horsepower at 9,000 rpm. It features modifications for competition, including changes to gear ratios and the calibration of its dual-clutch F1 gearbox, enhancing lower-rev torque. The car also incorporates the E-Diff electronic differential, a standard feature in the road-going version, adapted here for the first time in Ferrari's track-only offerings.\n\nWeight reduction was a key focus, achieved through thinner bodyshell panels and the use of lightweight materials like carbon-fibre and Lexan. The car sports a specialized suspension setup with solid aluminum bushings, stiffer springs, single-rate dampers, and 19\" racing rims. It sits 30mm lower all around, equipped with larger Pirelli slicks and the latest Brembo CCM2 brakes from the 599XX, integrated with a configurable ABS system optimized for different track conditions.\n\nAnother innovation for the Ferrari Challenge models is the inclusion of the F1-Trac traction control system, refined through Ferrari's racing experiences. This system works in tandem with the E-Diff to enhance corner-exit acceleration and includes settings for wet and dry conditions, selectable via the steering wheel-mounted manettino. Additionally, the car offers a CT-OFF mode to disable the F1-Trac under high grip conditions.\n\nEngineers achieved a significant enhancement in the 458 Challenge's performance, shaving two seconds off the Fiorano track lap time of its predecessor, setting a new record of 1'16.5\". The car also boasts exceptional lateral grip, reaching up to 1.6G. This berlinetta promises superb handling and responsiveness, crafted to heighten the racing experience for both professional and amateur drivers in Ferrari's storied one-make championship.",
            },
            {
              id: "458-challenge-evo",
              name: "458 Challenge EVO",
              year: "2014",
              power: "570 hp",
              description:
                "In 2014, Ferrari introduced the Challenge Evoluzione upgrade for the 458 Challenge cars, which had been running for three years. This mandatory upgrade kit includes new, more aggressive front and rear fascias that align closely with the design of the 458 GT3, as well as a significant rear wing with numerous adjustment points for enhanced aerodynamics. Developed with inputs from racing drivers Andrea Bertolini and Marc Gene, the Evoluzione was first showcased at the 2013 Ferrari Finali Mondiali in Mugello, offering drivers their initial experience of the updated model. All three Ferrari Challenge Trofeo Pirelli series—Europe, Asia Pacific, and North America—adopted this new specification.\n\nThe 458 Challenge Evoluzione retained the same 4.5 litre V8 engine, producing 570 horsepower, but received numerous enhancements to boost its performance, particularly in handling. Notable among these updates is the adoption of a rear wing similar to those used in GT racing, significantly increasing downforce and improving cornering capabilities. Additional aerodynamic improvements include a new front splitter and a redesigned underbody, which together enabled the fitting of stiffer front springs and an upgraded braking system. These changes made the 458 Challenge Evoluzione not only faster but also more adept at handling the rigors of competitive racing.",
            },
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
            { id: "488-gtb", name: "488 GTB", year: "2016", power: "661 hp", description: "Production coupé. Twin-turbo 3.9 L V8 producing 670 hp — the turbo's return to a Ferrari road-car V8 after 20 years. IHI twin-scroll turbos tuned for naturally-aspirated throttle response." },
            { id: "488-spider", name: "488 Spider", year: "2016", power: "661 hp", description: "Retractable hardtop sibling of the GTB. Same twin-turbo 3.9 L V8, 14-second roof mechanism." },
            { id: "488-gt3", name: "488 GT3", year: "2016", power: "550 hp", description: "FIA GT3 customer racer built by Michelotto. Detuned to comply with Balance of Performance — but won Bathurst 12 Hour, Spa, and Daytona class honours." },
            { id: "488-gte", name: "488 GTE", year: "2016", power: "488 hp", description: "WEC LMGTE Pro/Am race car. Successor to the 458 Italia GT2, fielded by AF Corse, Risi, and Spirit of Race." },
            { id: "j50", name: "J50", year: "2016", power: "681 hp", description: "Limited Special Projects coupé celebrating 50 years of Ferrari in Japan. Targa-style removable roof on the 488 Spider chassis. 10 built." },
            { id: "488-gte-evo", name: "488 GTE Evo", year: "2017", power: "488 hp", description: "Updated GTE with revised aero. Won the LMGTE Pro class at Le Mans (2019 + 2021) and the WEC manufacturers' title." },
            { id: "488-challenge", name: "488 Challenge", year: "2017", power: "661 hp", description: "Ferrari Challenge one-make series racer. First turbocharged Challenge car — replaced the 458 Challenge EVO." },
            { id: "sp38-deborah", name: "SP38 (Deborah)", year: "2018", power: "661 hp", description: "Special Projects one-off on the 488 GTB chassis, inspired by the F40 and 308 GTB. Built for a long-standing collector." },
            { id: "p80c", name: "P80/C", year: "2018", power: "661 hp", description: "Track-only one-off Special Project on the 488 GT3 chassis. Four years of development, longest collaboration with a single client to date." },
            { id: "488-pista-piloti-ferrari", name: "488 Pista Piloti Ferrari", year: "2018", power: "720 hp", description: "Limited-edition Pista in Scuderia Ferrari livery, celebrating Ferrari's drivers' programme. Reserved for active and former Ferrari Competizioni GT drivers." },
            { id: "488-pista", name: "488 Pista", year: "2019", power: "720 hp", description: "'Pista' = track. 90 kg lighter than the GTB, carbon bodywork, 50 hp more. S-Duct, side-slip control 6.0 — set a 1:21.5 lap at Fiorano." },
            { id: "488-pista-spider", name: "488 Pista Spider", year: "2019", power: "720 hp", description: "Open Pista — first time Ferrari built a hardtop-spider track-special. 14 kg added, identical 720 hp and aero." },
            { id: "488-gt-modificata", name: "488 GT Modificata", year: "2020", power: "700 hp", description: "Track-only client special outside FIA homologation — combining Pista and 488 GT3 Evo components without regulatory restrictors." },
            { id: "488-gt3-evo", name: "488 GT3 Evo", year: "2020", power: "550 hp", description: "Evolution of the GT3 with revised aero, improved cooling, and a redesigned cockpit. Won the 24 Hours of Spa in 2020." },
            { id: "488-challenge-evo", name: "488 Challenge Evo", year: "2020", power: "670 hp", description: "Major Challenge update: 25% more downforce, lighter, longer wheelbase. The fastest Challenge car ever at launch." },
            { id: "kc23", name: "KC23", year: "2023", power: "710 hp", description: "Special Projects track-only one-off on the 488 GT3 Evo chassis. Bodywork in vapour-deposited aluminium, butterfly-shaped active diffuser. Unveiled at Finali Mondiali 2023." },
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
            {
              id: "f8-tributo",
              name: "F8 Tributo",
              year: "2019-2023",
              power: "710 hp",
              description:
                "The Ferrari F8 Tributo is a mid-rear-engined sports car that stands as the pinnacle of Ferrari's two-seater berlinetta design. Its name pays homage to the most powerful V8 engine in Ferrari's history, delivering 720 horsepower and a remarkable specific power output of 185 hp/l. This V8 engine, turbocharged for optimal performance, has been celebrated with numerous awards, including \"Best Engine\" for three consecutive years and the title of best engine of the last two decades in 2018.\n\nThe F8 Tributo showcases exceptional handling and ride comfort, integrating advanced aerodynamics derived from Ferrari's extensive track experience. This model not only surpasses its predecessor, the 488 GTB, by delivering 50 more horsepower and being 40 kg lighter, but also boasts a 10% improvement in aerodynamic efficiency. The car's design by the Ferrari Styling Centre bridges traditional Ferrari aesthetics with new design language, emphasizing performance and aerodynamic efficiency.\n\nThe vehicle dynamics of the F8 Tributo have been significantly enhanced. The integration of the Ferrari Dynamic Enhancer (FDE+) in the manettino's RACE position, the latest Side Slip Angle Control system (SSC 6.1), and a smaller diameter steering wheel improve the car's performance and accessibility. These systems ensure the car's power and handling are more intuitive and controllable, allowing drivers to push the car to its limits with greater confidence.\n\nAerodynamics play a crucial role in the F8 Tributo's performance. The car is 10% more aerodynamically efficient than the 488 GTB, thanks to improvements in downforce without increasing drag. Innovations like the S-Duct at the front and the blown spoiler at the rear, coupled with advanced cooling systems, contribute to its superior performance. The rear design incorporates elements like the louvred rear screen, reminiscent of the iconic F40, and a larger spoiler that enhances both style and functionality.\n\nInside, the F8 Tributo retains Ferrari's classic driver-focused cockpit with a modern twist. The dashboard, door panels, and tunnel are all newly designed, featuring a new generation steering wheel and controls. High-quality materials and options like carbon-fibre accents and a 7\" touchscreen display for the passenger add to the luxurious yet sporty feel of the cabin. The overall design aims to enhance the sense of lightness and streamlined functionality, maintaining Ferrari's commitment to driver engagement and comfort.",
            },
            {
              id: "f8-spider",
              name: "F8 Spider",
              year: "2020-2023",
              power: "710 hp",
              description:
                "The Ferrari F8 Spider is the latest addition to Ferrari's illustrious line of drop-top sports cars, featuring the most successful mid-rear-mounted V8 in history. Designed alongside the F8 Tributo berlinetta, it utilizes Ferrari's compact and efficient Retractable Hard Top (RHT), which defines the car's streamlined profile. This new model continues the tradition of Ferrari's open-top V8s that began with the 308 GTS in 1977, balancing sportiness with usability and setting a new benchmark for performance and handling in its class.\n\nThe F8 Spider features the celebrated V8 engine, a development of the engine that has won the \"International Engine of the Year Award\" for four consecutive years. This 3902 cc unit delivers 720 horsepower at 8,000 rpm, making it the most powerful V8 Ferrari has produced for a non-special series model. The engine's instant power delivery, zero turbo lag, and unique exhaust note are complemented by advanced aerodynamic solutions derived from Ferrari's track experience.\n\nThe design of the F8 Spider incorporates several aerodynamic enhancements, including a revised front end with an S-Duct and new horizontal LED headlights. The rear spoiler has been redesigned to be larger, enhancing downforce without increasing drag, and features the classic twin light cluster and body-colored tail. The engine cover is distinctively styled with a central spine and sculpted strakes that aid in heat dissipation, inspired by Ferrari's F1 design elements.\n\nInside, the F8 Spider maintains a driver-focused cockpit with a new generation steering wheel and sporty seats. The dashboard features an aluminum sail panel and optional carbon-fiber accents, with a central 7\" touchscreen for the passenger. The layout is designed to enhance the sense of lightness and streamline the interior, creating a cohesive and engaging driving environment.\n\nIn terms of performance, the F8 Spider surpasses its predecessor, the 488 Spider, with a 50 horsepower increase and a 20 kg weight reduction. The car is also 20 kg heavier than the more extreme 488 Pista Spider but features a 10% improvement in overall efficiency. Advanced vehicle dynamics systems, including the latest Ferrari Dynamic Enhancer Plus (FDE+) and Side Slip Angle Control (SSC 6.1), make the car's impressive performance more accessible and easier to control for a broader range of drivers.\n\nOverall, the Ferrari F8 Spider blends cutting-edge performance with elegant design, setting a new standard in the realm of convertible sports cars.",
            },
            {
              id: "sp48-unica",
              name: "SP48 Unica",
              year: "2022",
              power: "710 hp",
              description:
                "The Ferrari SP48 Unica, the newest addition to Ferrari's exclusive One-Off series, exemplifies bespoke automotive craftsmanship, tailored precisely to the specifications of a single client. Built on the F8 Tributo platform, this unique two-seater sports berlinetta showcases an aggressive and distinctive design, characterized by its arrow-shaped front profile and meticulously redesigned headlights and brake air intakes. The project, directed by Chief Design Officer Flavio Manzoni, uses advanced procedural-parametric modelling and 3D prototyping to achieve a seamless and dynamic aesthetic.\n\nKey to the SP48 Unica's design are the innovative 3D grilles and procedural graphic solutions that create a striking transition from the black elements, including the windows, roof, and engine cover, to the body color. This design choice emphasizes the car's sculpted appearance, further enhanced by the smaller side windows and the absence of a rear screen. The central roof section features air intakes set into the carbon-fiber engine cover, contributing to the car's aerodynamic efficiency and emphasizing its sophisticated styling.\n\nAerodynamically, the SP48 Unica departs significantly from the F8 Tributo. The redesigned air intakes on the front bumper and under the rear spoiler, combined with an intercooler intake behind the side windows, optimize cooling and improve aerodynamic balance. The extended rear overhang reduces suction from the roof area, increasing rear downforce and enhancing the car's performance.\n\nInside, the SP48 Unica retains the technical layout of the F8 Tributo but features a distinctive combination of colors and trims that reflect its sleek and sporty exterior. Specially developed black laser-perforated Alcantara® on the seats and cabin trim reveals glimpses of iridescent reddish-orange fabric, matching the exterior color and integrating the hexagonal motif from the grilles. Matte carbon-fiber elements and Grigio Canna di Fucile accents add a sense of technical sophistication and exclusivity.\n\nThe Ferrari SP48 Unica, designed for a dedicated client deeply involved in its creation, represents a bold reinterpretation of a sports car that emphasizes Ferrari's core values of innovation and passion. It masterfully transforms the base model, enhancing its racing soul and dedication to speed, resulting in a bespoke masterpiece that is a testament to Ferrari's commitment to personalized automotive excellence.",
            },
            {
              id: "sp-8",
              name: "SP-8",
              year: "2023",
              power: "710 hp",
              description:
                "The Ferrari SP-8, the latest addition to Ferrari's One-Off series, has been unveiled as a part of the marque's Special Projects programme. Designed by the Ferrari Styling Centre under Flavio Manzoni, this unique mid-rear-engined V8 roadster is based on the F8 Spider, inheriting its layout, chassis, and engine. The SP-8 joins Ferrari's most exclusive segment, where each car is uniquely tailored to individual client specifications, representing the peak of Ferrari's customization capabilities.\n\nThe SP-8 celebrates its 3.9-litre V8 twin-turbo engine, renowned for its performance and having won the prestigious Engine of the Year award four times. The number 8 holds cultural significance for the client from Taiwan, symbolizing success and good fortune in Chinese culture. The most distinctive feature of the SP-8 is its roofless design, creating a pure two-seater roadster experience. Extensive aerodynamic refinements, including CFD simulations, wind tunnel, and track testing, ensure the car maintains acoustic comfort and wind dynamics comparable to its inspiration, the F8 Spider.\n\nThe design theme of the SP-8 focuses on the seamless fusion of its volumes. The unpainted carbon-fiber front blends into the tail, creating a striking two-tone effect. The removal of the retractable hard top allowed for a complete restyling of the tail section, resulting in a full volume with a taut belt line. The car's volume is split into two parts connected by a functional central matte black area, which includes the side air intakes and engine ducts. The upper section of this band features a vent with longitudinal elements reminiscent of classic Ferrari designs.\n\nAt the front, the SP-8 features an imposing full-width cast aluminum grille made from a single 3D-printed mold, with vertical strakes optimized for air flow to the front radiators. The collaboration between the Ferrari Styling Centre and the aerodynamics team was crucial in perfecting these elements. Other redesigned features include the headlights with special masks and lenses, Roma-derived rear lights with specific lenses, the windscreen, tailpipes similar to the 296 GTB, and custom-designed wheel rims in matte Grigio NART. These five-spoke wheels are a modern take on classic Ferrari rims, designed for reduced weight and enhanced aesthetics.\n\nInside, the SP-8's central console has been modified to house the F1 gearbox commands, adapting the iconic shift-gate for this application. The interior is finished with laser-etched Navy Blue Alcantara® seats, gradient effect cloth, and twill fabric carpets with an iridescent effect. The exterior color, matte Argento Micalizzato, pairs brilliantly with the carbon-fiber section in glossy iridescent Blue Sandstone, while the Blu Scuro Stellato color used to link the two bodywork sections was specifically developed for this car.\n\nThe Ferrari SP-8 is a bespoke masterpiece designed for a client deeply involved in its creation, epitomizing Ferrari's dedication to innovation, customization, and the pure driving experience.",
            },
            {
              id: "hc25",
              name: "HC25",
              year: "2026",
              power: "710 hp",
              description:
                "The Ferrari HC25 is a unique one-off model created under Ferrari's Special Projects programme. Unveiled at the Ferrari Racing Days event at the Circuit of the Americas, it is based on the F8 Spider platform and retains its mid-rear engine layout, chassis, and 3.9-litre twin-turbo V8 powertrain. This makes the HC25 the final non-hybrid mid-engine V8 Spider from Ferrari. Designed by the Ferrari Design Studio under the direction of Flavio Manzoni, it serves as a bridge between the brand's classic mid-engine spiders and its more modern flagship models like the 12Cilindri and F80.\n\nThe styling takes a bolder, more contemporary approach while keeping the voluptuous and sensual character typical of Ferrari's mid-engine cars. It features pure, clean surfaces with vertical flanks defined by sharp crests and geometric lines. The car expresses muscular forms around the wheels and creates a strong graphic identity through its dual-volume design, where the front and rear sections appear as distinct bodies connected by a prominent central band.\n\nThis glossy black band runs along the side of the car, incorporating air intakes and heat extraction for the powertrain. It creates an arrow-shaped flow that starts at the rear wheels, sweeps up over the door, and integrates the handle into a solid aluminium blade. The HC25 has refined proportions with reduced glazing and a lower shoulder line for a more planted look. At the front, it features all-new slim headlamps with vertical boomerang-style DRLs that echo the split rear lighting design.\n\nFinished in matte Moonlight Grey with contrasting glossy black elements and yellow accents on the logos, brake calipers, and interior details, the car rides on distinctive five-spoke wheels. It produces 720 cv (710 hp) at 7,000 rpm and 770 Nm of torque at 3,250 rpm. Performance includes 0-100 km/h in 2.9 seconds, 0-200 km/h in 8.2 seconds, and a top speed of 340 km/h.",
            },
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
