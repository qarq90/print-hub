import { StaticImageData } from "next/image";
import A4DoubleSide from "../../public/img/schedule-order/a4-double-side.png";
import BallPen from "../../public/img/schedule-order/ball-pen.png";
import BrownPaper from "../../public/img/schedule-order/brown-paper.png";
import CraftPaper from "../../public/img/schedule-order/craft-paper.png";
import Crayons from "../../public/img/schedule-order/crayons.png";
import DrawingBook from "../../public/img/schedule-order/drawing-book.png";
import GlueStick from "../../public/img/schedule-order/glue-stick.jpg";
import GraphsPaper from "../../public/img/schedule-order/graphs-paper.png";
import IndiaGeography from "../../public/img/schedule-order/india-geography.jpg";
import IndiaPolitics from "../../public/img/schedule-order/india-politics.jpg";
import LongBook from "../../public/img/schedule-order/longbook.png";
import ColorPencils from "../../public/img/schedule-order/color-pencils.jpeg";
import PencilLead from "../../public/img/schedule-order/pencil-lead.png";
import PenPencil from "../../public/img/schedule-order/pen-pencil.png";
import Roller from "../../public/img/schedule-order/roller.png";
import Stapler from "../../public/img/schedule-order/stapler.png";
import Tape from "../../public/img/schedule-order/tape.png";
import WaterColor from "../../public/img/schedule-order/water-color.png";
import A4Sheets from "../../public/img/schedule-order/a4-sheets.png";
import PaperClips from "../../public/img/schedule-order/paper-clips.jpg";
import Scissor from "../../public/img/schedule-order/scissor.jpg";
import Chalk from "../../public/img/schedule-order/chalk.jpg";
import WhiteboardMarker from "../../public/img/schedule-order/white-board-marker.png";
import TransparentPouch from "../../public/img/schedule-order/transparent-pouch.png";

export interface ItemType {
    factor: string;
    value: string;
}

export interface Item {
    id: string;
    name: string;
    category: string;
    price: number;
    types: ItemType[];
    short_description: string;
    long_description: string[];
    weight: string;
    dimensions: string;
    image: StaticImageData;
}

export const Items: Item[] = [
    // Writing category
    {
        id: "pencil-pack-10",
        name: "Pencil",
        category: "Writing",
        price: 1.99,
        types: [
            {
                factor: "Pack Size",
                value: "Pack of 10",
            },
        ],
        short_description:
            "A pack of 10 standard graphite pencils for writing and sketching.",
        long_description: [
            "Made from high-quality wood for durability and a comfortable grip.",
            "Features a firm graphite core that resists breaking.",
            "Ideal for school, office, and artistic use.",
        ],
        weight: "0.1 kg",
        dimensions: "18 x 7 x 1 cm",
        image: PenPencil,
    },
    {
        id: "pen-pencil",
        name: "Pen Pencil",
        category: "Writing",
        price: 2.49,
        types: [],
        short_description: "A mechanical pencil with a sleek, pen-like design.",
        long_description: [
            "Designed for comfort and precision writing or drafting.",
            "Features a clip for secure attachment to pockets or notebooks.",
            "Often includes an integrated eraser under the cap.",
        ],
        weight: "0.05 kg",
        dimensions: "14 x 1 x 1 cm",
        image: PenPencil,
    },
    {
        id: "ball-pen",
        name: "Ball Pen",
        category: "Writing",
        price: 1.49,
        types: [],
        short_description: "A reliable ballpoint pen for everyday writing.",
        long_description: [
            "Provides a consistent, skip-free ink flow.",
            "Durable point and comfortable grip for long writing sessions.",
            "Ideal for note-taking, forms, and general use.",
        ],
        weight: "0.03 kg",
        dimensions: "14 x 1 x 1 cm",
        image: BallPen,
    },
    {
        id: "gel-pen",
        name: "Gel Pen",
        category: "Writing",
        price: 2.29,
        types: [],
        short_description: "A smooth-writing gel ink pen for vibrant lines.",
        long_description: [
            "Uses water-based gel ink for a bold, vivid impression.",
            "Writes smoothly on most paper surfaces without smudging.",
            "Available in a wide array of ink colors.",
        ],
        weight: "0.03 kg",
        dimensions: "14 x 1 x 1 cm",
        image: BallPen,
    },
    {
        id: "fountain-pen",
        name: "Fountain Pen",
        category: "Writing",
        price: 8.99,
        types: [
            {
                factor: "Nib Size",
                value: "Medium",
            },
            {
                factor: "Ink Color",
                value: "Blue",
            },
        ],
        short_description: "Classic fountain pen for smooth, elegant writing.",
        long_description: [
            "Stainless steel nib provides consistent ink flow and smooth writing experience.",
            "Refillable ink cartridge or converter system for economical use.",
            "Elegant design perfect for signatures, calligraphy, and special occasions.",
        ],
        weight: "0.04 kg",
        dimensions: "14 x 1.5 x 1.5 cm",
        image: BallPen,
    },
    {
        id: "whiteboard-marker-4",
        name: "Whiteboard Marker (Pack of 4)",
        category: "Writing",
        price: 2.99,
        types: [
            {
                factor: "Colors",
                value: "Black, blue, red, green",
            },
            {
                factor: "Tip Size",
                value: "Chisel tip",
            },
        ],
        short_description:
            "Set of 4 vibrant whiteboard markers for presentations and teaching.",
        long_description: [
            "Quick-drying ink that erases easily without ghosting or staining.",
            "Low-odor formula suitable for classrooms and office environments.",
            "Chisel tip allows for both broad and fine lines with the same marker.",
        ],
        weight: "0.12 kg",
        dimensions: "15 x 10 x 2 cm",
        image: WhiteboardMarker,
    },
    {
        id: "permanent-markers",
        name: "Permanent Markers",
        category: "Writing",
        price: 3.99,
        types: [
            {
                factor: "Colors",
                value: "Black, blue, red, green",
            },
            {
                factor: "Tip Size",
                value: "Fine point",
            },
        ],
        short_description:
            "Permanent ink markers for writing on various surfaces.",
        long_description: [
            "Water-resistant ink that won't smudge or fade.",
            "Works on paper, plastic, metal, glass and more.",
            "Quick-drying formula prevents smearing.",
        ],
        weight: "0.12 kg",
        dimensions: "15 x 10 x 2 cm",
        image: WhiteboardMarker,
    },
    {
        id: "highlighters-pack-4",
        name: "Highlighters (Pack of 4)",
        category: "Writing",
        price: 3.49,
        types: [
            {
                factor: "Colors",
                value: "Yellow, pink, blue, green",
            },
            {
                factor: "Tip Type",
                value: "Chisel tip",
            },
        ],
        short_description:
            "Vibrant highlighters for emphasizing important text.",
        long_description: [
            "Quick-drying ink that doesn't bleed through most paper types.",
            "Transparent color allows text to remain readable underneath.",
            "Perfect for studying, note-taking, and document review.",
        ],
        weight: "0.1 kg",
        dimensions: "15 x 10 x 2 cm",
        image: WhiteboardMarker,
    },
    {
        id: "chalk",
        name: "Chalk",
        category: "Writing",
        price: 0.99,
        types: [
            {
                factor: "Colors",
                value: "White",
            },
            {
                factor: "Pack Quantity",
                value: "12 pieces",
            },
        ],
        short_description:
            "Traditional white chalk for blackboard writing and drawing.",
        long_description: [
            "Smooth writing experience with minimal dust emission.",
            "Creates clear, visible marks on blackboard surfaces.",
            "Economical option for classrooms, restaurants, and personal use.",
        ],
        weight: "0.05 kg",
        dimensions: "8 x 8 x 1 cm",
        image: Chalk,
    },

    // Art category
    {
        id: "color-pencils-24",
        name: "Color Pencils",
        category: "Art",
        price: 5.99,
        types: [
            {
                factor: "Pack Size",
                value: "Pack of 24 Colors",
            },
        ],
        short_description:
            "A vibrant set of 24 colored pencils for artists and hobbyists.",
        long_description: [
            "Cores are break-resistant and provide smooth, even color laydown.",
            "Wooden casing provides strength and comfort.",
            "Excellent for coloring, sketching, and detailed artwork.",
        ],
        weight: "0.3 kg",
        dimensions: "19 x 14 x 2 cm",
        image: ColorPencils,
    },
    {
        id: "crayons-24",
        name: "Crayons (Pack of 24)",
        category: "Art",
        price: 3.99,
        types: [
            {
                factor: "Colors",
                value: "24 assorted colors",
            },
            {
                factor: "Type",
                value: "Non-toxic",
            },
        ],
        short_description:
            "Vibrant non-toxic crayons for children's art projects.",
        long_description: [
            "Bright, bold colors that glide smoothly on paper.",
            "Round shape designed for small hands with easy grip.",
            "AP certified non-toxic formula safe for children.",
        ],
        weight: "0.25 kg",
        dimensions: "15 x 10 x 2 cm",
        image: Crayons,
    },
    {
        id: "water-colors-24",
        name: "Water Colors (24 colors)",
        category: "Art",
        price: 6.99,
        types: [
            {
                factor: "Colors",
                value: "24 vibrant colors",
            },
            {
                factor: "Type",
                value: "Cake format",
            },
        ],
        short_description: "Complete watercolor set with 24 pigmented colors.",
        long_description: [
            "Richly pigmented colors that blend beautifully with water.",
            "Includes brush and mixing palette for immediate use.",
            "Ideal for beginners and students learning watercolor techniques.",
        ],
        weight: "0.3 kg",
        dimensions: "20 x 15 x 2 cm",
        image: WaterColor,
    },
    {
        id: "oil-pastels-24",
        name: "Oil Pastels (24 colors)",
        category: "Art",
        price: 7.99,
        types: [
            {
                factor: "Colors",
                value: "24 vibrant colors",
            },
            {
                factor: "Type",
                value: "Non-toxic",
            },
        ],
        short_description: "Creamy oil pastels for rich, blendable artwork.",
        long_description: [
            "Smooth application without crumbling or breaking.",
            "Blends easily for creating gradients and mixed colors.",
            "Vibrant pigments provide excellent coverage on various surfaces.",
        ],
        weight: "0.35 kg",
        dimensions: "18 x 14 x 2 cm",
        image: Crayons,
    },
    {
        id: "paint-brushes-set",
        name: "Paint Brushes Set",
        category: "Art",
        price: 5.99,
        types: [
            {
                factor: "Brushes",
                value: "5 different sizes",
            },
            {
                factor: "Bristle Type",
                value: "Synthetic",
            },
        ],
        short_description: "Assorted paint brushes for various art projects.",
        long_description: [
            "Different sizes allow for detailed work and broad coverage.",
            "Synthetic bristles maintain shape and are easy to clean.",
            "Comfortable wooden handles for precise control.",
        ],
        weight: "0.15 kg",
        dimensions: "20 x 10 x 2 cm",
        image: WaterColor,
    },
    {
        id: "craft-paper",
        name: "Craft Paper",
        category: "Art",
        price: 2.99,
        types: [
            {
                factor: "Pack Size",
                value: "Assorted colors pack",
            },
            {
                factor: "Sheet Size",
                value: "A4 size",
            },
        ],
        short_description: "Vibrant colored craft paper for creative projects.",
        long_description: [
            "Available in multiple bright colors for various art and craft applications.",
            "Ideal for school projects, scrapbooking, and DIY decorations.",
            "Medium weight paper that holds shape well when folded or cut.",
        ],
        weight: "0.3 kg",
        dimensions: "29.7 x 21 x 1 cm",
        image: CraftPaper,
    },
    {
        id: "scrap-book",
        name: "Scrap Book",
        category: "Art",
        price: 8.99,
        types: [
            {
                factor: "Page Count",
                value: "50 thick pages",
            },
            {
                factor: "Page Type",
                value: "Blank pages",
            },
        ],
        short_description:
            "Dedicated scrapbook with thick pages for preserving memories.",
        long_description: [
            "Extra-thick pages prevent bleeding and support various adhesives.",
            "Acid-free paper ensures photos and mementos last for years.",
            "Ideal for creating memory books, photo albums, and craft projects.",
        ],
        weight: "0.7 kg",
        dimensions: "30 x 30 x 2.5 cm",
        image: DrawingBook,
    },

    // Accessories category
    {
        id: "eraser",
        name: "Eraser",
        category: "Accessories",
        price: 0.49,
        types: [],
        short_description:
            "A soft rubber eraser for cleanly removing pencil marks.",
        long_description: [
            "Gentle on paper and prevents smudging.",
            "Leaves no residue or tears on the paper surface.",
            "Compact size for easy storage in any pencil case.",
        ],
        weight: "0.01 kg",
        dimensions: "5 x 2 x 1 cm",
        image: GlueStick,
    },
    {
        id: "sharpner",
        name: "Sharpner",
        category: "Accessories",
        price: 0.79,
        types: [],
        short_description: "A compact metal sharpener for pencils.",
        long_description: [
            "Features a sharp, durable blade for a fine point.",
            "Includes a lid to contain shavings for a clean workspace.",
            "Portable and practical for everyday use.",
        ],
        weight: "0.02 kg",
        dimensions: "4 x 4 x 2 cm",
        image: Scissor,
    },
    {
        id: "pen-pencil-leads",
        name: "Pen Pencil Leads",
        category: "Accessories",
        price: 1.29,
        types: [
            {
                factor: "Lead Diameter",
                value: "0.5 mm",
            },
            {
                factor: "Lead Diameter",
                value: "0.7 mm",
            },
        ],
        short_description: "Refill graphite leads for mechanical pencils.",
        long_description: [
            "Smooth-writing formula minimizes skipping and breaking.",
            "Available in various diameters to fit different pencil models.",
            "Packaged in a convenient dispenser case.",
        ],
        weight: "0.02 kg",
        dimensions: "7 x 4 x 1 cm",
        image: PencilLead,
    },
    {
        id: "glue-stick",
        name: "Glue Stick",
        category: "Accessories",
        price: 1.49,
        types: [
            {
                factor: "Size",
                value: "40g",
            },
            {
                factor: "Color",
                value: "Clear drying",
            },
        ],
        short_description:
            "Solid adhesive stick for paper crafting and projects.",
        long_description: [
            "Clean, mess-free application compared to liquid glue.",
            "Washable formula that's safe for children.",
            "Dries clear without wrinkling paper.",
        ],
        weight: "0.06 kg",
        dimensions: "7 x 2.5 x 2.5 cm",
        image: GlueStick,
    },
    {
        id: "scissors",
        name: "Scissors",
        category: "Accessories",
        price: 3.99,
        types: [
            {
                factor: "Size",
                value: "Standard",
            },
            {
                factor: "Blade Type",
                value: "Straight",
            },
        ],
        short_description:
            "Sharp stainless steel scissors for precise cutting.",
        long_description: [
            "Made from durable stainless steel with comfortable plastic handles.",
            "Ideal for cutting paper, cardboard, fabric, and various craft materials.",
            "Safety designed with rounded tips for secure handling.",
        ],
        weight: "0.15 kg",
        dimensions: "15 x 8 x 1 cm",
        image: Scissor,
    },
    {
        id: "transparent-tape",
        name: "Transparent Tape",
        category: "Accessories",
        price: 1.49,
        types: [
            {
                factor: "Width",
                value: "1 inch",
            },
            {
                factor: "Length",
                value: "40 meters",
            },
        ],
        short_description: "Clear adhesive tape for sealing and repairing.",
        long_description: [
            "Crystal clear finish that becomes nearly invisible on paper.",
            "Smooth dispensing with easy-tear perforations.",
            "Strong adhesive suitable for paper, cardboard, and lightweight materials.",
        ],
        weight: "0.08 kg",
        dimensions: "8 x 8 x 2 cm",
        image: Tape,
    },
    {
        id: "paper-tape",
        name: "Paper Tape",
        category: "Accessories",
        price: 1.99,
        types: [
            {
                factor: "Width",
                value: "1.5 inch",
            },
            {
                factor: "Material",
                value: "Kraft paper",
            },
        ],
        short_description:
            "Eco-friendly paper tape for packaging and crafting.",
        long_description: [
            "Made from biodegradable kraft paper with water-activated adhesive.",
            "Easily writable surface for labeling packages directly on the tape.",
            "Strong bond that strengthens over time for secure packaging.",
        ],
        weight: "0.12 kg",
        dimensions: "10 x 10 x 3 cm",
        image: Tape,
    },
    {
        id: "double-sided-tape",
        name: "Double Sided Tape",
        category: "Accessories",
        price: 2.49,
        types: [
            {
                factor: "Width",
                value: "0.5 inch",
            },
            {
                factor: "Adhesive Strength",
                value: "Medium hold",
            },
        ],
        short_description:
            "Discreet adhesive tape with sticky surfaces on both sides.",
        long_description: [
            "Creates invisible bonds for mounting, crafting, and display purposes.",
            "Removable variant available for temporary applications.",
            "Ideal for scrapbooking, photo mounting, and display projects.",
        ],
        weight: "0.06 kg",
        dimensions: "7 x 7 x 1 cm",
        image: Tape,
    },
    {
        id: "correction-tape",
        name: "Correction Tape",
        category: "Accessories",
        price: 2.29,
        types: [
            {
                factor: "Width",
                value: "5mm",
            },
            {
                factor: "Tape Color",
                value: "White",
            },
        ],
        short_description: "Dry correction tape for neat error correction.",
        long_description: [
            "No-mess application without the odor of correction fluid.",
            "Instant drying allows for immediate rewriting over corrected area.",
            "Refillable design for economical use.",
        ],
        weight: "0.05 kg",
        dimensions: "8 x 4 x 2 cm",
        image: Tape,
    },
    {
        id: "scale-15cm",
        name: "Scale (15 cm)",
        category: "Accessories",
        price: 1.29,
        types: [
            {
                factor: "Length",
                value: "15 cm",
            },
            {
                factor: "Material",
                value: "Plastic",
            },
        ],
        short_description:
            "Compact 15 cm plastic ruler for precise measurements.",
        long_description: [
            "Clear transparent design with easy-to-read metric markings.",
            "Durable plastic construction resistant to cracking or breaking.",
            "Ideal for school, office, and craft use.",
        ],
        weight: "0.03 kg",
        dimensions: "15 x 3 x 0.3 cm",
        image: Roller,
    },
    {
        id: "scale-30cm",
        name: "Scale (30 cm)",
        category: "Accessories",
        price: 2.29,
        types: [
            {
                factor: "Length",
                value: "30 cm",
            },
            {
                factor: "Material",
                value: "Plastic",
            },
        ],
        short_description:
            "Standard 30 cm ruler for school and office measurements.",
        long_description: [
            "Features both metric and imperial measurement systems.",
            "Sturdy construction with clear, precise markings.",
            "Beveled edges allow for clean tracing along the ruler.",
        ],
        weight: "0.06 kg",
        dimensions: "30 x 3 x 0.3 cm",
        image: Roller,
    },
    {
        id: "roller-scale",
        name: "Roller Scale",
        category: "Accessories",
        price: 4.99,
        types: [
            {
                factor: "Measurement Range",
                value: "Up to 100 cm",
            },
            {
                factor: "Mechanism",
                value: "Spring return",
            },
        ],
        short_description:
            "Retractable measuring tool with automatic rewind feature.",
        long_description: [
            "Compact case with push-button retraction for easy storage.",
            "Durable metal clip for attaching to belts or pockets.",
            "Clear markings on flexible steel tape resistant to wear.",
        ],
        weight: "0.2 kg",
        dimensions: "8 x 8 x 3 cm",
        image: Roller,
    },
    {
        id: "paper-clips",
        name: "Paper Clips",
        category: "Accessories",
        price: 0.99,
        types: [
            {
                factor: "Size",
                value: "Standard",
            },
            {
                factor: "Pack Quantity",
                value: "100 pieces",
            },
        ],
        short_description:
            "Metal paper clips for temporarily binding documents.",
        long_description: [
            "Galvanized steel construction prevents rust and corrosion.",
            "Smooth rounded edges prevent paper tearing or snagging.",
            "Reusable design for economical office organization.",
        ],
        weight: "0.05 kg",
        dimensions: "10 x 5 x 1 cm",
        image: PaperClips,
    },
    {
        id: "stapler",
        name: "Stapler",
        category: "Accessories",
        price: 5.99,
        types: [
            {
                factor: "Capacity",
                value: "Standard desktop",
            },
            {
                factor: "Color",
                value: "Black",
            },
        ],
        short_description: "Desktop stapler for binding documents together.",
        long_description: [
            "Durable metal construction with comfortable grip.",
            "Staple refill mechanism for easy reloading.",
            "Includes built-in staple remover for convenience.",
        ],
        weight: "0.3 kg",
        dimensions: "15 x 7 x 5 cm",
        image: Stapler,
    },
    {
        id: "stapler-pins",
        name: "Stapler Pins",
        category: "Accessories",
        price: 0.99,
        types: [
            {
                factor: "Size",
                value: "Standard 26/6",
            },
            {
                factor: "Quantity",
                value: "1000 pins",
            },
        ],
        short_description: "Refill staples for staplers.",
        long_description: [
            "Galvanized steel construction prevents rusting.",
            "Compatible with most standard desktop staplers.",
            "Sharp points for easy penetration through multiple sheets.",
        ],
        weight: "0.08 kg",
        dimensions: "5 x 4 x 1 cm",
        image: PaperClips,
    },
    {
        id: "punch-machine",
        name: "Punch Machine",
        category: "Accessories",
        price: 6.99,
        types: [
            {
                factor: "Hole Capacity",
                value: "2 holes",
            },
            {
                factor: "Paper Capacity",
                value: "Up to 20 sheets",
            },
        ],
        short_description: "Paper punch for creating holes in documents.",
        long_description: [
            "Creates standard holes for filing documents in binders.",
            "Built-in waste container collects paper circles for clean operation.",
            "Adjustable guide for precise hole placement.",
        ],
        weight: "0.4 kg",
        dimensions: "18 x 10 x 8 cm",
        image: Stapler,
    },
    {
        id: "transparent-pouch",
        name: "Transparent Pouch",
        category: "Accessories",
        price: 1.99,
        types: [
            {
                factor: "Size",
                value: "A4",
            },
            {
                factor: "Closure Type",
                value: "Zip lock",
            },
        ],
        short_description:
            "Clear plastic pouch for organizing and protecting documents.",
        long_description: [
            "Made from durable, transparent PVC for easy content identification.",
            "Keeps documents, papers, and important sheets protected from moisture and dust.",
            "Ideal for students, offices, and organizing important paperwork.",
        ],
        weight: "0.08 kg",
        dimensions: "32 x 24 x 0.1 cm",
        image: TransparentPouch,
    },
    {
        id: "geometry-box",
        name: "Geometry Box",
        category: "Accessories",
        price: 8.99,
        types: [
            {
                factor: "Contents",
                value: "Compass, divider, protractor, set squares",
            },
            {
                factor: "Case",
                value: "Plastic box",
            },
        ],
        short_description: "Complete set of mathematical drawing instruments.",
        long_description: [
            "Includes all essential tools for geometry and technical drawing.",
            "Durable plastic case keeps instruments organized and protected.",
            "Essential for students studying mathematics and engineering.",
        ],
        weight: "0.25 kg",
        dimensions: "20 x 15 x 3 cm",
        image: TransparentPouch,
    },
    {
        id: "transparent-file",
        name: "Transparent File",
        category: "Accessories",
        price: 2.99,
        types: [
            {
                factor: "Size",
                value: "A4",
            },
            {
                factor: "Closure",
                value: "Button flap",
            },
        ],
        short_description:
            "Clear plastic file for document protection and organization.",
        long_description: [
            "Made from durable transparent PVC for easy content visibility.",
            "Button and string closure keeps documents secure and prevents slipping.",
            "Ideal for carrying important papers, assignments, and reports.",
        ],
        weight: "0.1 kg",
        dimensions: "32 x 24 x 0.2 cm",
        image: TransparentPouch,
    },

    // Paper category
    {
        id: "a4-single-sided",
        name: "A4 Single Sided Sheets",
        category: "Paper",
        price: 3.99,
        types: [
            {
                factor: "Paper Weight",
                value: "75 gsm",
            },
        ],
        short_description:
            "A ream of 500 single-sided A4 sheets for general printing.",
        long_description: [
            "Bright white paper ensures sharp print quality and high contrast.",
            "Smooth surface prevents ink bleeding and is ideal for inkjet and laser printers.",
            "Single-sided design is perfect for drafts, flyers, and one-sided documents.",
        ],
        weight: "2.5 kg",
        dimensions: "30 x 21 x 5 cm",
        image: A4Sheets,
    },
    {
        id: "a4-double-sided",
        name: "A4 Double Sided Sheets",
        category: "Paper",
        price: 5.99,
        types: [
            {
                factor: "Paper Weight",
                value: "90 gsm",
            },
        ],
        short_description:
            "A ream of 500 premium A4 sheets for double-sided printing.",
        long_description: [
            "Higher weight paper minimizes show-through for professional-looking documents.",
            "Opaque finish allows for clean printing on both sides.",
            "Perfect for reports, booklets, brochures, and important documents.",
        ],
        weight: "2.7 kg",
        dimensions: "30 x 21 x 5 cm",
        image: A4DoubleSide,
    },
    {
        id: "a4-blank-sheets",
        name: "A4 Blank Sheets",
        category: "Paper",
        price: 4.99,
        types: [
            {
                factor: "Pack Size",
                value: "Pack of 100 sheets",
            },
            {
                factor: "Paper Weight",
                value: "80 gsm",
            },
        ],
        short_description:
            "High-quality A4 blank sheets for printing, writing and drawing.",
        long_description: [
            "Premium quality paper with smooth surface for excellent print results.",
            "Ideal for laser and inkjet printers, photocopiers, and everyday office use.",
            "Perfect for taking notes, sketching, and crafting projects.",
        ],
        weight: "0.5 kg",
        dimensions: "29.7 x 21 x 0.5 cm",
        image: A4Sheets,
    },
    {
        id: "brown-paper",
        name: "Brown Paper",
        category: "Paper",
        price: 3.49,
        types: [
            {
                factor: "Sheet Size",
                value: "Large roll",
            },
            {
                factor: "Paper Weight",
                value: "70 gsm",
            },
        ],
        short_description:
            "Eco-friendly brown kraft paper for wrapping and crafting.",
        long_description: [
            "Durable and biodegradable paper made from recycled materials.",
            "Perfect for gift wrapping, parcel protection, and arts and crafts.",
            "Natural brown color provides a rustic and eco-conscious appearance.",
        ],
        weight: "0.8 kg",
        dimensions: "50 x 70 cm (roll)",
        image: BrownPaper,
    },
    {
        id: "long-book",
        name: "Long Book",
        category: "Paper",
        price: 6.99,
        types: [
            {
                factor: "Page Count",
                value: "200 pages",
            },
            {
                factor: "Line Type",
                value: "Ruled lines",
            },
        ],
        short_description:
            "Standard long format notebook for school and office use.",
        long_description: [
            "Durable cover protects pages from damage and wear.",
            "High-quality paper prevents ink bleed-through for neat writing.",
            "Perfect for note-taking, journaling, and subject-specific notebooks.",
        ],
        weight: "0.4 kg",
        dimensions: "24 x 18 x 1.5 cm",
        image: LongBook,
    },
    {
        id: "notebook-short",
        name: "Notebook (short book)",
        category: "Paper",
        price: 4.49,
        types: [
            {
                factor: "Page Count",
                value: "120 pages",
            },
            {
                factor: "Cover Type",
                value: "Soft cover",
            },
        ],
        short_description:
            "Compact short notebook for quick notes and portability.",
        long_description: [
            "Convenient size fits easily in bags, purses, and pockets.",
            "Ideal for quick notes, shopping lists, and on-the-go journaling.",
            "Available with ruled, blank, or grid pages based on preference.",
        ],
        weight: "0.2 kg",
        dimensions: "18 x 12 x 1 cm",
        image: LongBook,
    },
    {
        id: "single-side-interleaf-book",
        name: "Single Side Interleaf Book",
        category: "Paper",
        price: 7.99,
        types: [
            {
                factor: "Page Count",
                value: "150 pages",
            },
            {
                factor: "Interleaf Type",
                value: "Single side printed",
            },
        ],
        short_description:
            "Specialized notebook with interleaving for organized note-taking.",
        long_description: [
            "Features alternating blank and ruled pages for versatile note-taking.",
            "Ideal for students who need to combine written notes with diagrams.",
            "Perfect for scientific subjects requiring both text and illustrations.",
        ],
        weight: "0.45 kg",
        dimensions: "24 x 18 x 1.8 cm",
        image: LongBook,
    },
    {
        id: "graph-paper",
        name: "Graph Paper",
        category: "Paper",
        price: 2.99,
        types: [
            {
                factor: "Grid Size",
                value: "5mm squares",
            },
            {
                factor: "Pack Size",
                value: "50 sheets",
            },
        ],
        short_description:
            "Precision grid paper for technical drawings and math work.",
        long_description: [
            "Light blue grid lines that don't overwhelm pencil or ink work.",
            "Perfect for graphs, charts, diagrams, and mathematical calculations.",
            "Quality paper suitable for pencil, pen, and marker.",
        ],
        weight: "0.25 kg",
        dimensions: "29.7 x 21 x 0.5 cm",
        image: GraphsPaper,
    },
    {
        id: "indian-political-map",
        name: "Indian Political Map",
        category: "Paper",
        price: 4.99,
        types: [
            {
                factor: "Size",
                value: "Large",
            },
            {
                factor: "Language",
                value: "English",
            },
        ],
        short_description:
            "Detailed political map of India showing states and union territories.",
        long_description: [
            "Clear demarcation of state boundaries and capital cities.",
            "Includes important geographic features like rivers and mountain ranges.",
            "Laminated surface allows for writing with whiteboard markers and easy cleaning.",
        ],
        weight: "0.2 kg",
        dimensions: "70 x 50 x 0.2 cm",
        image: IndiaPolitics,
    },
    {
        id: "indian-geography-map",
        name: "Indian Geography Map",
        category: "Paper",
        price: 4.99,
        types: [
            {
                factor: "Size",
                value: "Large",
            },
            {
                factor: "Language",
                value: "English",
            },
        ],
        short_description:
            "Comprehensive geographical map of India showing physical features.",
        long_description: [
            "Detailed representation of mountains, rivers, plateaus, and coastal features.",
            "Includes elevation information and important geographical landmarks.",
            "Laminated surface for durability and ability to make temporary markings.",
        ],
        weight: "0.2 kg",
        dimensions: "70 x 50 x 0.2 cm",
        image: IndiaGeography,
    },
];
