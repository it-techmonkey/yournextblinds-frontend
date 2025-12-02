// Hardcoded customization options for all products
// Products in products.json will only specify which options are available via features flags

export const ROOM_OPTIONS = [
  { id: "living-room", name: "Living Room", icon: "/products/room/livingRoom.svg" },
  { id: "bedroom", name: "Bedroom", icon: "/products/room/bedroom.svg" },
  { id: "kitchen", name: "Kitchen", icon: "/products/room/kitchen.svg" },
  { id: "dining-room", name: "Dining Room", icon: "/products/room/diningRoom.svg" },
  { id: "bathroom", name: "Bathroom", icon: "/products/room/bathroom.svg" },
  { id: "office", name: "Office", icon: "/products/room/office.svg" },
  { id: "kids-room", name: "Kids Room", icon: "/products/room/kidsRoom.svg" },
  { id: "others", name: "Others", icon: "/products/room/others.svg" }
];

export const MOUNT_OPTIONS = [
  {
    id: "inside",
    name: "Inside Mount",
    description: "Inside Mount Shutters fit within your window recess and sit in front of your glass on your wall. Your Product will be made with 1/4 Reduction.",
    image: "/products/mount/insidemount.png"
  },
  {
    id: "outside",
    name: "Outside Mount",
    description: "Outside Mount Shutters fit within your window recess and sit in front of your glass on your wall. Your Product will be made with 3/8 Reduction.",
    image: "/products/mount/outsidemount.png"
  }
];

export const CONTROL_OPTIONS = [
  { id: "manual", name: "Manual", price: 0 },
  { id: "motor-wand", name: "Rechargeable Motor (Wand)", price: 75 },
  { id: "motor-remote", name: "Rechargeable Motor (Remote)", price: 95 }
];

export const CONTROL_POSITION_OPTIONS = [
  { id: "left", name: "Left Control", price: 0, image: "/products/lift/leftControl.png" },
  { id: "right", name: "Right Control", price: 0, image: "/products/lift/rightControl.png" }
];

export const LIFT_OPTIONS = [
  { 
    id: "cord-loop", 
    name: "Continuous Cord Loop", 
    description: "Continuous cord loop is a looped cord that hangs at the bottom of your blinds. With child safety cordless blinds and keeps your window with new looks.", 
    price: 0, 
    image: "/products/lift/continuousCordLoop.png" 
  },
  { 
    id: "cordless", 
    name: "Cordless", 
    description: "Continuous cord loop is a looped cord that hangs at the bottom of your blinds. Makes child-friendly cordless blinds and keeps your window with new looks.", 
    price: 25, 
    image: "/products/lift/cordless.png" 
  },
  { 
    id: "motorized", 
    name: "Motorized", 
    description: "Motorized shades allow you to adjust the height of your blinds, raising and lowering the window, with a spring up, without any pulling or choosing to move the shades by hand.", 
    price: 95, 
    image: "/products/lift/motorised.png" 
  }
];

export const LIFT_POSITION_OPTIONS = [
  { id: "left", name: "Left Control", price: 0, image: "/products/lift/leftControl.png" },
  { id: "right", name: "Right Control", price: 0, image: "/products/lift/rightControl.png" }
];

export const VALANCE_OPTIONS = [
  { id: "no-valance", name: "No Valance", price: 0, image: "/products/valance/noValance.png" },
  { id: "platinum", name: "Platinum Valance", price: 35, image: "/products/valance/platinumValance.png" },
  { id: "grey", name: "Premium Grey Valance", price: 35, image: "/products/valance/premiumGreyValance.png" },
  { id: "black", name: "Premium Black Valance", price: 35, image: "/products/valance/premiumBlackValance.png" }
];

export const HEADRAIL_OPTIONS = [
  { id: "slim", name: "Standard White Slim Headrail (Free)", price: 0, image: "/products/headrail/slimHeadrail.png" }
];

export const WAND_POSITION_OPTIONS = [
  { id: "left", name: "Left Wand", price: 0, image: "/products/wand/leftWand.png" },
  { id: "right", name: "Right Wand", price: 0, image: "/products/wand/rightWand.png" }
];

export const OPEN_STYLE_OPTIONS = [
  { id: "wand", name: "Wand", price: 0, image: "/products/wand/wand.png" },
  { id: "chain-chord", name: "Chain Chord", price: 15, image: "/products/wand/chainChord.png" }
];

export const ROLLER_STYLE_OPTIONS = [
  { id: "standard", name: "Standard Roll", price: 0, image: "/products/rollerstyle/standardRoll.png" },
  { id: "reverse", name: "Reverse Roll", price: 10, image: "/products/rollerstyle/reverseRoll.png" }
];

export const BOTTOM_BAR_OPTIONS = [
  { id: "silver-round", name: "Standard Silver Round Bar", price: 0, image: "/products/bottomBar/standardSilverRoundBar.png" },
  { id: "white-round", name: "Standard White Round Bar", price: 0, image: "/products/bottomBar/standardWhiteRoundBar.png" },
  { id: "fabric-wrapped", name: "Premium Fabric Wrapped Bar", price: 25, image: "/products/bottomBar/premiumFabricWrappedBar.png" }
];

export const COLOUR_OPTIONS = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "black", name: "Black", hex: "#1a1a1a" },
  { id: "grey", name: "Grey", hex: "#808080" },
  { id: "chrome", name: "Chrome", hex: "#C0C0C0" },
  { id: "beige", name: "Beige", hex: "#F5F5DC" },
  { id: "brown", name: "Brown", hex: "#8B4513" }
];

export const FABRIC_TYPE_OPTIONS = [
  { id: "solid", name: "Solid Fabric", price: 0, image: "/products/fabric/solid.png" },
  { id: "decorative", name: "Decorative Blinds", price: 25, image: "/products/fabric/decorative.png" }
];

export const BOTTOM_CHAIN_OPTIONS = [
  { id: "standard", name: "Standard Chain", price: 0 },
  { id: "premium", name: "Premium Chain", price: 15 }
];

export const BRACKET_OPTIONS = [
  { id: "standard", name: "Standard Bracket", price: 0 },
  { id: "extended", name: "Extended Bracket", price: 20 }
];
