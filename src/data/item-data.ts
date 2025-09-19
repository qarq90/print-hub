// import { StaticImageData } from "next/image";

// import ApsaraPencil from "../../public/img/schedule-order/ApsaraPencil.png";
// import PermanentMarker from "../../public/img/schedule-order/PermanentMarker.png";
// import WhiteboardMarker from "../../public/img/schedule-order/WhiteBoardMarker.png";
// import Highlighter from "../../public/img/schedule-order/Highlighter.png";
// import Stapler from "../../public/img/schedule-order/Stapler.png";
// import Scissor from "../../public/img/schedule-order/Scissors.png";
// import TransparentPouch from "../../public/img/schedule-order/TransparentPouch.png";
// import IndiaGeography from "../../public/img/schedule-order/IndianGeographyMap.png";
// import IndiaPolitics from "../../public/img/schedule-order/IndianPoliticalMap.png";
// import Chalk from "../../public/img/schedule-order/Chalk.png";
// import GlueStick from "../../public/img/schedule-order/GlueStick.png";
// import A4BlankSheets from "../../public/img/schedule-order/A4BlankSheets.png";
// import A4SingleSide from "../../public/img/schedule-order/A4SingleSide.png";
// import A4DoubleSide from "../../public/img/schedule-order/A4DoubleSide.png";
// import PencilLead from "../../public/img/schedule-order/PencilLead.png";
// import NoteBook from "../../public/img/schedule-order/NoteBook.png";
// import ColorPencils from "../../public/img/schedule-order/ColorPencils.png";
// import GeometryBox from "../../public/img/schedule-order/GeometryBox.png";
// import Crayons from "../../public/img/schedule-order/Crayons.jpeg";
// import Eraser from "../../public/img/schedule-order/Eraser.jpg";
// import GraphsPaper from "../../public/img/schedule-order/GraphPaper.png";
// import PaperClips from "../../public/img/schedule-order/PaperClips.jpeg";
// import WaterColor from "../../public/img/schedule-order/WaterColors.png";
// import DrawingBook from "../../public/img/schedule-order/DrawingBook.png";
// import BrownPaper from "../../public/img/schedule-order/BrownPaper.png";
// import ScientificCalculator from "../../public/img/schedule-order/ScientificCalculator.jpeg";
// import Sharpner from "../../public/img/schedule-order/Sharpner.jpg";
// import Roller from "../../public/img/schedule-order/roller.png";
// import BasicCalculator from "../../public/img/schedule-order/BasicCalculator.png";
// import Tape from "../../public/img/schedule-order/Tape.png";
// import LongBook from "../../public/img/schedule-order/Longbook.png";

// export interface ItemType {
//     factor: string;
//     value: string;
// }

// export interface Item {
//     id: string;
//     name: string;
//     category: string;
//     price: number;
//     types: ItemType[];
//     short_description: string;
//     long_description: string[];
//     weight: string;
//     dimensions: string;
//     image: StaticImageData;
// }

// export const Items: Item[] = [
//     {
//         id: "pencil-sw94w6sxpe1x",
//         name: "Pencil",
//         category: "Writing",
//         price: 121,
//         types: [
//             { factor: "Pack Size", value: "10 Pencils" },
//             { factor: "Material", value: "Wood" },
//         ],
//         short_description:
//             "A pack of 10 standard graphite pencils for writing and sketching.",
//         long_description: [
//             "Made from high-quality wood for durability and a comfortable grip.",
//             "Features a firm graphite core that resists breaking.",
//             "Ideal for school, office, and artistic use.",
//         ],
//         weight: "0.1 kg",
//         dimensions: "10 x 7 x 1 cm",
//         image: ApsaraPencil,
//     },
//     // {
//     //     id: "pen-pencil-0qc5aqy2hkqy",
//     //     name: "Pen Pencil",
//     //     category: "Writing",
//     //     price: 20,
//     //     types: [
//     //         { factor: "Lead Size", value: "0.5 mm" },
//     //         { factor: "Grip Type", value: "Rubber" },
//     //         { factor: "Refillable", value: "Yes" },
//     //     ],
//     //     short_description: "A mechanical pencil with a sleek, pen-like design.",
//     //     long_description: [
//     //         "Designed for comfort and precision writing or drafting.",
//     //         "Features a clip for secure attachment to pockets or notebooks.",
//     //         "Often includes an integrated eraser under the cap.",
//     //     ],
//     //     weight: "0.05 kg",
//     //     dimensions: "14 x 1 x 1 cm",
//     //     image: PenPencil,
//     // },
//     // {
//     //     id: "ball-pen-han74ss602nk",
//     //     name: "Ball Pen",
//     //     category: "Writing",
//     //     price: 10,
//     //     types: [
//     //         { factor: "Ink Color", value: "Blue" },
//     //         { factor: "Tip Size", value: "0.7 mm" },
//     //         { factor: "Refill Type", value: "Standard" },
//     //     ],
//     //     short_description: "A reliable ballpoint pen for everyday writing.",
//     //     long_description: [
//     //         "Provides a consistent, skip-free ink flow.",
//     //         "Durable point and comfortable grip for long writing sessions.",
//     //         "Ideal for note-taking, forms, and general use.",
//     //     ],
//     //     weight: "0.03 kg",
//     //     dimensions: "14 x 1 x 1 cm",
//     //     image: BallPen,
//     // },
//     // {
//     //     id: "gel-pen-yij97z8lkz6w",
//     //     name: "Gel Pen",
//     //     category: "Writing",
//     //     price: 10,
//     //     types: [
//     //         { factor: "Ink Color", value: "Black" },
//     //         { factor: "Tip Size", value: "0.5 mm" },
//     //         { factor: "Ink Type", value: "Gel" },
//     //     ],
//     //     short_description: "A smooth-writing gel ink pen for vibrant lines.",
//     //     long_description: [
//     //         "Uses water-based gel ink for a bold, vivid impression.",
//     //         "Writes smoothly on most paper surfaces without smudging.",
//     //         "Available in a wide array of ink colors.",
//     //     ],
//     //     weight: "0.03 kg",
//     //     dimensions: "14 x 1 x 1 cm",
//     //     image: BallPen,
//     // },
//     // {
//     //     id: "fountain-pen-6flo37y122dn",
//     //     name: "Fountain Pen",
//     //     category: "Writing",
//     //     price: 142,
//     //     types: [
//     //         { factor: "Nib Size", value: "Medium" },
//     //         { factor: "Ink Type", value: "Cartridge/Converter" },
//     //         { factor: "Body Material", value: "Metal" },
//     //     ],
//     //     short_description: "Classic fountain pen for smooth, elegant writing.",
//     //     long_description: [
//     //         "Stainless steel nib provides consistent ink flow and smooth writing experience.",
//     //         "Refillable ink cartridge or converter system for economical use.",
//     //         "Elegant design perfect for signatures, calligraphy, and special occasions.",
//     //     ],
//     //     weight: "0.04 kg",
//     //     dimensions: "14 x 1.5 x 1.5 cm",
//     //     image: BallPen,
//     // },
//     {
//         id: "whiteboard-marker-6qzu6arzyd7p",
//         name: "Whiteboard Marker",
//         category: "Writing",
//         price: 109,
//         types: [
//             { factor: "Pack Size", value: "4 Markers or single" },
//             { factor: "Colors", value: "Black, Blue, Red, Green" },
//         ],
//         short_description:
//             "(Pack of 4 or single) vibrant whiteboard markers for presentations and teaching.",
//         long_description: [
//             "Quick-drying ink that erases easily without ghosting or staining.",
//             "Low-odor formula suitable for classrooms and office environments.",
//             "Chisel tip allows for both broad and fine lines with the same marker.",
//         ],
//         weight: "0.12 kg",
//         dimensions: "15 x 10 x 2 cm",
//         image: WhiteboardMarker,
//     },
//     {
//         id: "permanent-marker-bvnvvp3i5ibe",
//         name: "Permanent Marker",
//         category: "Writing",
//         price: 109,
//         types: [
//             { factor: "Pack Size", value: "4 Markers or single" },
//             { factor: "Colors", value: "Black, Blue, Red, Green" },
//         ],
//         short_description:
//             "(Pack of 4 or single) Permanent ink markers for writing on various surfaces.",
//         long_description: [
//             "Water-resistant ink that won't smudge or fade.",
//             "Works on paper, plastic, metal, glass and more.",
//             "Quick-drying formula prevents smearing.",
//         ],
//         weight: "0.12 kg",
//         dimensions: "15 x 10 x 2 cm",
//         image: PermanentMarker,
//     },
//     {
//         id: "highlighter-okqigzjse0mb",
//         name: "Highlighter",
//         category: "Writing",
//         price: 109,
//         types: [
//             { factor: "Pack Size", value: "4 Highlighters or single" },
//             { factor: "Colors", value: "Yellow, Pink, Blue, Green" },
//         ],
//         short_description:
//             "(Pack of 4 or single) Vibrant highlighters for emphasizing important text.",
//         long_description: [
//             "Quick-drying ink that doesn't bleed through most paper types.",
//             "Transparent color allows text to remain readable underneath.",
//             "Perfect for studying, note-taking, and document review.",
//         ],
//         weight: "0.1 kg",
//         dimensions: "15 x 10 x 2 cm",
//         image: Highlighter,
//     },
//     {
//         id: "chalk-0smz9q497e9d",
//         name: "Chalk",
//         category: "Writing",
//         price: 225,
//         types: [
//             { factor: "Pack Size", value: "100 Pieces or 30" },
//             { factor: "Color", value: "White, Yellow, Pink, Green, Blue" },
//         ],
//         short_description:
//             "Traditional white chalk for blackboard writing and drawing.",
//         long_description: [
//             "Smooth writing experience with minimal dust emission.",
//             "Creates clear, visible marks on blackboard surfaces.",
//             "Economical option for classrooms, restaurants, and personal use.",
//         ],
//         weight: "0.05 kg",
//         dimensions: "8 x 8 x 1 cm",
//         image: Chalk,
//     },
//     {
//         id: "color-pencils-2n53d54rpgpg",
//         name: "Color Pencils",
//         category: "Art",
//         price: 109,
//         types: [
//             { factor: "Pack Size", value: "24 Pencils" },
//             { factor: "Quality", value: "Artist Grade" },
//         ],
//         short_description:
//             "A vibrant set of 24 colored pencils for artists and hobbyists.",
//         long_description: [
//             "Cores are break-resistant and provide smooth, even color laydown.",
//             "Wooden casing provides strength and comfort.",
//             "Excellent for coloring, sketching, and detailed artwork.",
//         ],
//         weight: "0.3 kg",
//         dimensions: "19 x 14 x 2 cm",
//         image: ColorPencils,
//     },
//     {
//         id: "crayons-(pack-of-24)-9lsik74ejyfg",
//         name: "Crayons (Pack of 24)",
//         category: "Art",
//         price: 120,
//         types: [
//             { factor: "Pack Size", value: "24 Crayons" },
//             { factor: "Safety", value: "Non-Toxic" },
//         ],
//         short_description:
//             "Vibrant non-toxic crayons for children's art projects.",
//         long_description: [
//             "Bright, bold colors that glide smoothly on paper.",
//             "Round shape designed for small hands with easy grip.",
//             "AP certified non-toxic formula safe for children.",
//         ],
//         weight: "0.25 kg",
//         dimensions: "15 x 10 x 2 cm",
//         image: Crayons,
//     },
//     {
//         id: "water-colors-(24-colors)-dusxpcyb0kkp",
//         name: "Water Colors (24 colors)",
//         category: "Art",
//         price: 116,
//         types: [
//             { factor: "Colors", value: "24" },
//             { factor: "Included", value: "Brush & Palette" },
//         ],
//         short_description: "Complete watercolor set with 24 pigmented colors.",
//         long_description: [
//             "Richly pigmented colors that blend beautifully with water.",
//             "Includes brush and mixing palette for immediate use.",
//             "Ideal for beginners and students learning watercolor techniques.",
//         ],
//         weight: "0.3 kg",
//         dimensions: "20 x 15 x 2 cm",
//         image: WaterColor,
//     },
//     // {
//     //     id: "oil-pastels-(24-colors)-lfbu6gpcke5f",
//     //     name: "Oil Pastels (24 colors)",
//     //     category: "Art",
//     //     price: 186,
//     //     types: [
//     //         { factor: "Colors", value: "24" },
//     //         { factor: "Texture", value: "Creamy" },
//     //         { factor: "Blendability", value: "Excellent" },
//     //     ],
//     //     short_description: "Creamy oil pastels for rich, blendable artwork.",
//     //     long_description: [
//     //         "Smooth application without crumbling or breaking.",
//     //         "Blends easily for creating gradients and mixed colors.",
//     //         "Vibrant pigments provide excellent coverage on various surfaces.",
//     //     ],
//     //     weight: "0.35 kg",
//     //     dimensions: "18 x 14 x 2 cm",
//     //     image: Crayons,
//     // },
//     // {
//     //     id: "paint-brushes-set-3p8eynk739pn",
//     //     name: "Paint Brushes Set",
//     //     category: "Art",
//     //     price: 150,
//     //     types: [
//     //         { factor: "Brush Count", value: "5 Brushes" },
//     //         { factor: "Bristle Type", value: "Synthetic" },
//     //         { factor: "Sizes", value: "Varied" },
//     //     ],
//     //     short_description: "Assorted paint brushes for various art projects.",
//     //     long_description: [
//     //         "Different sizes allow for detailed work and broad coverage.",
//     //         "Synthetic bristles maintain shape and are easy to clean.",
//     //         "Comfortable wooden handles for precise control.",
//     //     ],
//     //     weight: "0.15 kg",
//     //     dimensions: "20 x 10 x 2 cm",
//     //     image: WaterColor,
//     // },
//     // {
//     //     id: "craft-paper-3abqk0u8ro1v",
//     //     name: "Craft Paper",
//     //     category: "Art",
//     //     price: 80,
//     //     types: [
//     //         { factor: "Sheet Size", value: "A4" },
//     //         { factor: "Colors", value: "Multi-color" },
//     //         { factor: "Pack Size", value: "50 Sheets" },
//     //     ],
//     //     short_description: "Vibrant colored craft paper for creative projects.",
//     //     long_description: [
//     //         "Available in multiple bright colors for various art and craft applications.",
//     //         "Ideal for school projects, scrapbooking, and DIY decorations.",
//     //         "Medium weight paper that holds shape well when folded or cut.",
//     //     ],
//     //     weight: "0.3 kg",
//     //     dimensions: "29.7 x 21 x 1 cm",
//     //     image: CraftPaper,
//     // },
//     {
//         id: "scrap-book-nkqtjgs16m89",
//         name: "Drawing Book",
//         category: "Art",
//         price: 250,
//         types: [
//             { factor: "Pages", value: "50" },
//             { factor: "Size", value: "21x30cm" },
//         ],
//         short_description:
//             "Dedicated Drawing with thick pages for preserving memories.",
//         long_description: [
//             "Extra-thick pages prevent bleeding and support various adhesives.",
//             "Acid-free paper ensures photos and mementos last for years.",
//             "Ideal for creating memory books, photo albums, and craft projects.",
//         ],
//         weight: "0.7 kg",
//         dimensions: "30 x 30 x 2.5 cm",
//         image: DrawingBook,
//     },
//     {
//         id: "basic-calculator-3k9s8d7f2j1g",
//         name: "Basic Calculator",
//         category: "Accessories",
//         price: 299,
//         types: [
//             { factor: "Display", value: "LCD 10-digit" },
//             { factor: "Power Source", value: "Solar + Battery" },
//         ],
//         short_description:
//             "Standard calculator for everyday mathematical calculations.",
//         long_description: [
//             "Performs basic arithmetic operations including addition, subtraction, multiplication, and division.",
//             "Solar powered with battery backup for reliable operation in any lighting condition.",
//             "Compact design with large buttons for easy use in office or educational settings.",
//         ],
//         weight: "0.15 kg",
//         dimensions: "14 x 8 x 1.5 cm",
//         image: BasicCalculator,
//     },
//     {
//         id: "scientific-calculator-5m2n4b6v8c3x",
//         name: "Scientific Calculator",
//         category: "Accessories",
//         price: 599,
//         types: [
//             { factor: "Display", value: "LCD 2-line" },
//             { factor: "Power Source", value: "Battery" },
//         ],
//         short_description:
//             "Advanced scientific calculator for students and professionals.",
//         long_description: [
//             "Performs complex mathematical, statistical, and trigonometric calculations.",
//             "Features include fraction calculations, equation solving, and matrix operations.",
//             "Ideal for engineering, mathematics, and science students at high school and college level.",
//         ],
//         weight: "0.2 kg",
//         dimensions: "15.8 x 8 x 1.5 cm",
//         image: ScientificCalculator,
//     },
//     {
//         id: "eraser-jeiq3ppq4mxy",
//         name: "Eraser",
//         category: "Accessories",
//         price: 14,
//         types: [
//             { factor: "Type", value: "Rubber" },
//             { factor: "Residue", value: "Low" },
//         ],
//         short_description:
//             "A soft rubber eraser for cleanly removing pencil marks.",
//         long_description: [
//             "Gentle on paper and prevents smudging.",
//             "Leaves no residue or tears on the paper surface.",
//             "Compact size for easy storage in any pencil case.",
//         ],
//         weight: "0.01 kg",
//         dimensions: "5 x 2 x 1 cm",
//         image: Eraser,
//     },
//     {
//         id: "sharpner-rovzc1kb84eb",
//         name: "Sharpner",
//         category: "Accessories",
//         price: 63,
//         types: [
//             { factor: "Blade Material", value: "Steel" },
//             { factor: "Hole Size", value: "Standard" },
//         ],
//         short_description: "A compact metal sharpener for pencils.",
//         long_description: [
//             "Features a sharp, durable blade for a fine point.",
//             "Includes a lid to contain shavings for a clean workspace.",
//             "Portable and practical for everyday use.",
//         ],
//         weight: "0.02 kg",
//         dimensions: "4 x 4 x 2 cm",
//         image: Sharpner,
//     },
//     {
//         id: "pen-pencil-leads-avw8gxuq7bnh",
//         name: "Pen Pencil Leads",
//         category: "Accessories",
//         price: 25,
//         types: [
//             { factor: "Diameter", value: "0.5 mm" },
//             { factor: "Quantity", value: "12 Leads" },
//         ],
//         short_description: "Refill graphite leads for mechanical pencils.",
//         long_description: [
//             "Smooth-writing formula minimizes skipping and breaking.",
//             "Available in various diameters to fit different pencil models.",
//             "Packaged in a convenient dispenser case.",
//         ],
//         weight: "0.02 kg",
//         dimensions: "7 x 4 x 1 cm",
//         image: PencilLead,
//     },
//     {
//         id: "glue-stick-dixitkvk02t7",
//         name: "Glue Stick",
//         category: "Accessories",
//         price: 35,
//         types: [
//             { factor: "Weight", value: "40g" },
//             { factor: "Color", value: "Clear Drying" },
//         ],
//         short_description:
//             "Solid adhesive stick for paper crafting and projects.",
//         long_description: [
//             "Clean, mess-free application compared to liquid glue.",
//             "Washable formula that's safe for children.",
//             "Dries clear without wrinkling paper.",
//         ],
//         weight: "0.06 kg",
//         dimensions: "7 x 2.5 x 2.5 cm",
//         image: GlueStick,
//     },
//     {
//         id: "scissors-panibtqzcnk6",
//         name: "Scissors",
//         category: "Accessories",
//         price: 80,
//         types: [
//             { factor: "Blade Material", value: "Stainless Steel" },
//             { factor: "Size", value: "15cm" },
//         ],
//         short_description:
//             "Sharp stainless steel scissors for precise cutting.",
//         long_description: [
//             "Made from durable stainless steel with comfortable plastic handles.",
//             "Ideal for cutting paper, cardboard, fabric, and various craft materials.",
//             "Safety designed with rounded tips for secure handling.",
//         ],
//         weight: "0.15 kg",
//         dimensions: "15 x 8 x 1 cm",
//         image: Scissor,
//     },
//     {
//         id: "transparent-tape-jcjgbywlg44m",
//         name: "Transparent Tape",
//         category: "Accessories",
//         price: 40,
//         types: [
//             { factor: "Width", value: "1.2 cm" },
//             { factor: "Length", value: "40m" },
//         ],
//         short_description: "Clear adhesive tape for sealing and repairing.",
//         long_description: [
//             "Crystal clear finish that becomes nearly invisible on paper.",
//             "Smooth dispensing with easy-tear perforations.",
//             "Strong adhesive suitable for paper, cardboard, and lightweight materials.",
//         ],
//         weight: "0.08 kg",
//         dimensions: "8 x 8 x 2 cm",
//         image: Tape,
//     },
//     // {
//     //     id: "paper-tape-pyyp6n25qnzg",
//     //     name: "Paper Tape",
//     //     category: "Accessories",
//     //     price: 50,
//     //     types: [
//     //         { factor: "Material", value: "Kraft Paper" },
//     //         { factor: "Width", value: "4.8 cm" },
//     //         { factor: "Eco-Friendly", value: "Yes" },
//     //     ],
//     //     short_description:
//     //         "Eco-friendly paper tape for packaging and crafting.",
//     //     long_description: [
//     //         "Made from biodegradable kraft paper with water-activated adhesive.",
//     //         "Easily writable surface for labeling packages directly on the tape.",
//     //         "Strong bond that strengthens over time for secure packaging.",
//     //     ],
//     //     weight: "0.12 kg",
//     //     dimensions: "10 x 10 x 3 cm",
//     //     image: Tape,
//     // },
//     // {
//     //     id: "double-sided-tape-ttdmm3kv8cxk",
//     //     name: "Double Sided Tape",
//     //     category: "Accessories",
//     //     price: 60,
//     //     types: [
//     //         { factor: "Width", value: "1 cm" },
//     //         { factor: "Length", value: "5m" },
//     //         { factor: "Removability", value: "Permanent" },
//     //     ],
//     //     short_description:
//     //         "Discreet adhesive tape with sticky surfaces on both sides.",
//     //     long_description: [
//     //         "Creates invisible bonds for mounting, crafting, and display purposes.",
//     //         "Removable variant available for temporary applications.",
//     //         "Ideal for scrapbooking, photo mounting, and display projects.",
//     //     ],
//     //     weight: "0.06 kg",
//     //     dimensions: "7 x 7 x 1 cm",
//     //     image: Tape,
//     // },
//     // {
//     //     id: "correction-tape-7cjpes4ozjpc",
//     //     name: "Correction Tape",
//     //     category: "Accessories",
//     //     price: 45,
//     //     types: [
//     //         { factor: "Width", value: "5mm" },
//     //         { factor: "Application", value: "Dry" },
//     //         { factor: "Refillable", value: "Yes" },
//     //     ],
//     //     short_description: "Dry correction tape for neat error correction.",
//     //     long_description: [
//     //         "No-mess application without the odor of correction fluid.",
//     //         "Instant drying allows for immediate rewriting over corrected area.",
//     //         "Refillable design for economical use.",
//     //     ],
//     //     weight: "0.05 kg",
//     //     dimensions: "8 x 4 x 2 cm",
//     //     image: Tape,
//     // },
//     // {
//     //     id: "scale-(15-cm)-6fukhb33nn3m",
//     //     name: "Scale (15 cm)",
//     //     category: "Accessories",
//     //     price: 25,
//     //     types: [
//     //         { factor: "Length", value: "15 cm" },
//     //         { factor: "Material", value: "Plastic" },
//     //         { factor: "Transparency", value: "Clear" },
//     //     ],
//     //     short_description:
//     //         "Compact 15 cm plastic ruler for precise measurements.",
//     //     long_description: [
//     //         "Clear transparent design with easy-to-read metric markings.",
//     //         "Durable plastic construction resistant to cracking or breaking.",
//     //         "Ideal for school, office, and craft use.",
//     //     ],
//     //     weight: "0.03 kg",
//     //     dimensions: "15 x 3 x 0.3 cm",
//     //     image: Roller,
//     // },
//     // {
//     //     id: "scale-(30-cm)-4mj9wpuf2ep5",
//     //     name: "Scale (30 cm)",
//     //     category: "Accessories",
//     //     price: 40,
//     //     types: [
//     //         { factor: "Length", value: "30 cm" },
//     //         { factor: "Material", value: "Plastic" },
//     //         { factor: "Markings", value: "Metric & Imperial" },
//     //     ],
//     //     short_description:
//     //         "Standard 30 cm ruler for school and office measurements.",
//     //     long_description: [
//     //         "Features both metric and imperial measurement systems.",
//     //         "Sturdy construction with clear, precise markings.",
//     //         "Beveled edges allow for clean tracing along the ruler.",
//     //     ],
//     //     weight: "0.06 kg",
//     //     dimensions: "30 x 3 x 0.3 cm",
//     //     image: Roller,
//     // },
//     {
//         id: "roller-scale-2p2mv1htq2h1",
//         name: "Roller Scale",
//         category: "Accessories",
//         price: 150,
//         types: [
//             { factor: "Length", value: "3m" },
//             { factor: "Material", value: "Clear Plastic" },
//         ],
//         short_description:
//             "Retractable measuring tool with automatic rewind feature.",
//         long_description: [
//             "Compact case with push-button retraction for easy storage.",
//             "Durable metal clip for attaching to belts or pockets.",
//             "Clear markings on flexible steel tape resistant to wear.",
//         ],
//         weight: "0.2 kg",
//         dimensions: "8 x 8 x 3 cm",
//         image: Roller,
//     },
//     {
//         id: "paper-clips-hmy1s353schx",
//         name: "Paper Clips",
//         category: "Accessories",
//         price: 20,
//         types: [
//             { factor: "Size", value: "Standard" },
//             { factor: "Quantity", value: "24 pieces" },
//         ],
//         short_description:
//             "Metal paper clips for temporarily binding documents.",
//         long_description: [
//             "Galvanized steel construction prevents rust and corrosion.",
//             "Smooth rounded edges prevent paper tearing or snagging.",
//             "Reusable design for economical office organization.",
//         ],
//         weight: "0.05 kg",
//         dimensions: "10 x 5 x 1 cm",
//         image: PaperClips,
//     },
//     {
//         id: "stapler-3wx33nxx1vsz",
//         name: "Stapler",
//         category: "Accessories",
//         price: 120,
//         types: [
//             { factor: "Capacity", value: "50 Sheets" },
//             { factor: "Feature", value: "Built-in Remover" },
//         ],
//         short_description: "Desktop stapler for binding documents together.",
//         long_description: [
//             "Durable metal construction with comfortable grip.",
//             "Staple refill mechanism for easy reloading.",
//             "Includes built-in staple remover for convenience.",
//         ],
//         weight: "0.3 kg",
//         dimensions: "15 x 7 x 5 cm",
//         image: Stapler,
//     },
//     // {
//     //     id: "stapler-pins-v93an02gm6sx",
//     //     name: "Stapler Pins",
//     //     category: "Accessories",
//     //     price: 25,
//     //     types: [
//     //         { factor: "Size", value: "26/6" },
//     //         { factor: "Material", value: "Galvanized Steel" },
//     //         { factor: "Quantity", value: "1000 staples" },
//     //     ],
//     //     short_description: "Refill staples for staplers.",
//     //     long_description: [
//     //         "Galvanized steel construction prevents rusting.",
//     //         "Compatible with most standard desktop staplers.",
//     //         "Sharp points for easy penetration through multiple sheets.",
//     //     ],
//     //     weight: "0.08 kg",
//     //     dimensions: "5 x 4 x 1 cm",
//     //     image: PaperClips,
//     // },
//     // {
//     //     id: "punch-machine-qroqia9agahi",
//     //     name: "Punch Machine",
//     //     category: "Accessories",
//     //     price: 180,
//     //     types: [
//     //         { factor: "Holes", value: "2 Holes" },
//     //         { factor: "Capacity", value: "20 Sheets" },
//     //         { factor: "Feature", value: "Waste Container" },
//     //     ],
//     //     short_description: "Paper punch for creating holes in documents.",
//     //     long_description: [
//     //         "Creates standard holes for filing documents in binders.",
//     //         "Built-in waste container collects paper circles for clean operation.",
//     //         "Adjustable guide for precise hole placement.",
//     //     ],
//     //     weight: "0.4 kg",
//     //     dimensions: "18 x 10 x 8 cm",
//     //     image: Stapler,
//     // },
//     {
//         id: "transparent-pouch-x6ra8eib1zpq",
//         name: "Transparent Pouch",
//         category: "Accessories",
//         price: 50,
//         types: [
//             { factor: "Size", value: "A4" },
//             { factor: "Closure", value: "Zip Lock" },
//         ],
//         short_description:
//             "Clear plastic pouch for organizing and protecting documents.",
//         long_description: [
//             "Made from durable, transparent PVC for easy content identification.",
//             "Keeps documents, papers, and important sheets protected from moisture and dust.",
//             "Ideal for students, offices, and organizing important paperwork.",
//         ],
//         weight: "0.08 kg",
//         dimensions: "32 x 24 x 0.1 cm",
//         image: TransparentPouch,
//     },
//     {
//         id: "geometry-box-cs9x0x1h022v",
//         name: "Geometry Box",
//         category: "Accessories",
//         price: 200,
//         types: [
//             {
//                 factor: "Components",
//                 value: "Compass, Divider, Protractor, Set Squares",
//             },
//             { factor: "Size", value: "Medium" },
//         ],
//         short_description: "Complete set of mathematical drawing instruments.",
//         long_description: [
//             "Includes all essential tools for geometry and technical drawing.",
//             "Durable plastic case keeps instruments organized and protected.",
//             "Essential for students studying mathematics and engineering.",
//         ],
//         weight: "0.25 kg",
//         dimensions: "20 x 15 x 3 cm",
//         image: GeometryBox,
//     },
//     {
//         id: "a4-single-sided-sheets-dag33ursv2j1",
//         name: "A4 Single Sided Sheets",
//         category: "Paper",
//         price: 300,
//         types: [
//             { factor: "Quantity", value: "50 Sheets" },
//             { factor: "GSM", value: "64" },
//         ],
//         short_description:
//             "A ream of 50 single-sided A4 sheets for general printing.",
//         long_description: [
//             "Bright white paper ensures sharp print quality and high contrast.",
//             "Smooth surface prevents ink bleeding and is ideal for inkjet and laser printers.",
//             "Single-sided design is perfect for drafts, flyers, and one-sided documents.",
//         ],
//         weight: "2.5 kg",
//         dimensions: "30 x 21 x 5 cm",
//         image: A4SingleSide,
//     },
//     {
//         id: "a4-double-sided-sheets-d33vfg226rl1",
//         name: "A4 Double Sided Sheets",
//         category: "Paper",
//         price: 350,
//         types: [
//             { factor: "Quantity", value: "50 Sheets" },
//             { factor: "GSM", value: "64" },
//         ],
//         short_description:
//             "A ream of 50 premium A4 sheets for double-sided printing.",
//         long_description: [
//             "Higher weight paper minimizes show-through for professional-looking documents.",
//             "Opaque finish allows for clean printing on both sides.",
//             "Perfect for reports, booklets, brochures, and important documents.",
//         ],
//         weight: "2.7 kg",
//         dimensions: "30 x 21 x 5 cm",
//         image: A4DoubleSide,
//     },
//     {
//         id: "a4-blank-sheets-sf7ybfmd8c68",
//         name: "A4 Blank Sheets",
//         category: "Paper",
//         price: 120,
//         types: [
//             { factor: "Quantity", value: "100 Sheets" },
//             { factor: "GSM", value: "75" },
//         ],
//         short_description:
//             "High-quality A4 blank sheets for printing, writing and drawing.",
//         long_description: [
//             "Premium quality paper with smooth surface for excellent print results.",
//             "Ideal for laser and inkjet printers, photocopiers, and everyday office use.",
//             "Perfect for taking notes, sketching, and crafting projects.",
//         ],
//         weight: "0.5 kg",
//         dimensions: "29.7 x 21 x 0.5 cm",
//         image: A4BlankSheets,
//     },
//     {
//         id: "brown-paper-fscvcciu3ifr",
//         name: "Brown Paper",
//         category: "Paper",
//         price: 90,
//         types: [
//             { factor: "Format", value: "Roll" },
//             { factor: "Width", value: "50 cm" },
//         ],
//         short_description:
//             "Eco-friendly brown kraft paper for wrapping and crafting.",
//         long_description: [
//             "Durable and biodegradable paper made from recycled materials.",
//             "Perfect for gift wrapping, parcel protection, and arts and crafts.",
//             "Natural brown color provides a rustic and eco-conscious appearance.",
//         ],
//         weight: "0.8 kg",
//         dimensions: "50 x 70 cm (roll)",
//         image: BrownPaper,
//     },
//     {
//         id: "long-book-ie99x3fqkd9d",
//         name: "Long Book",
//         category: "Paper",
//         price: 120,
//         types: [
//             { factor: "Pages", value: "200 or 100" },
//             { factor: "Rule Type", value: "Ruled" },
//         ],
//         short_description:
//             "Standard long format notebook for school and office use.",
//         long_description: [
//             "Durable cover protects pages from damage and wear.",
//             "High-quality paper prevents ink bleed-through for neat writing.",
//             "Perfect for note-taking, journaling, and subject-specific notebooks.",
//         ],
//         weight: "0.4 kg",
//         dimensions: "24 x 18 x 1.5 cm",
//         image: LongBook,
//     },
//     {
//         id: "notebook-(short-book)-n2x9jvwgugm4",
//         name: "Notebook (short book)",
//         category: "Paper",
//         price: 80,
//         types: [
//             { factor: "Pages", value: "100" },
//             { factor: "Rule Type", value: "Ruled/Blank" },
//         ],
//         short_description:
//             "Compact short notebook for quick notes and portability.",
//         long_description: [
//             "Convenient size fits easily in bags, purses, and pockets.",
//             "Ideal for quick notes, shopping lists, and on-the-go journaling.",
//             "Available with ruled, blank, or grid pages based on preference.",
//         ],
//         weight: "0.2 kg",
//         dimensions: "18 x 12 x 1 cm",
//         image: NoteBook,
//     },
//     {
//         id: "single-side-interleaf-book-4oosasdrsgnn",
//         name: "Single Side Interleaf Book",
//         category: "Paper",
//         price: 150,
//         types: [
//             { factor: "Pages", value: "150" },
//             { factor: "Pattern", value: "Alternating Ruled/Blank" },
//         ],
//         short_description:
//             "Specialized notebook with interleaving for organized note-taking.",
//         long_description: [
//             "Features alternating blank and ruled pages for versatile note-taking.",
//             "Ideal for students who need to combine written notes with diagrams.",
//             "Perfect for scientific subjects requiring both text and illustrations.",
//         ],
//         weight: "0.45 kg",
//         dimensions: "24 x 18 x 1.8 cm",
//         image: LongBook,
//     },
//     {
//         id: "graph-paper-5r38xa5ko3b6",
//         name: "Graph Paper",
//         category: "Paper",
//         price: 70,
//         types: [
//             { factor: "Grid Size", value: "5mm" },
//             { factor: "Quantity", value: "50 Sheets or single" },
//         ],
//         short_description:
//             "Precision grid paper for technical drawings and math work.",
//         long_description: [
//             "Light blue grid lines that don't overwhelm pencil or ink work.",
//             "Perfect for graphs, charts, diagrams, and mathematical calculations.",
//             "Quality paper suitable for pencil, pen, and marker.",
//         ],
//         weight: "0.25 kg",
//         dimensions: "29.7 x 21 x 0.5 cm",
//         image: GraphsPaper,
//     },
//     {
//         id: "indian-political-map-po7yl2dwnplw",
//         name: "Indian Political Map",
//         category: "Paper",
//         price: 120,
//         types: [
//             { factor: "Size", value: "70x50cm" },
//             { factor: "Language", value: "English" },
//         ],
//         short_description:
//             "Detailed political map of India showing states and union territories.",
//         long_description: [
//             "Clear demarcation of state boundaries and capital cities.",
//             "Includes important geographic features like rivers and mountain ranges.",
//             "Laminated surface allows for writing with whiteboard markers and easy cleaning.",
//         ],
//         weight: "0.2 kg",
//         dimensions: "70 x 50 x 0.2 cm",
//         image: IndiaPolitics,
//     },
//     {
//         id: "indian-geography-map-mbsy7x5c3uh2",
//         name: "Indian Geography Map",
//         category: "Paper",
//         price: 120,
//         types: [
//             { factor: "Size", value: "70x50cm" },
//             { factor: "Features", value: "Physical Geography" },
//         ],
//         short_description:
//             "Comprehensive geographical map of India showing physical features.",
//         long_description: [
//             "Detailed representation of mountains, rivers, plateaus, and coastal features.",
//             "Includes elevation information and important geographical landmarks.",
//             "Laminated surface for durability and ability to make temporary markings.",
//         ],
//         weight: "0.2 kg",
//         dimensions: "70 x 50 x 0.2 cm",
//         image: IndiaGeography,
//     },
// ];
