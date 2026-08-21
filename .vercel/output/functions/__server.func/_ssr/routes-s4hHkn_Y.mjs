import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-s4hHkn_Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RARITY_COLOR = {
	common: "#a1a1aa",
	uncommon: "#3dba7a",
	rare: "#3b82f6",
	epic: "#a78bfa",
	legendary: "#c9a227",
	mythic: "#fb7185",
	forbidden: "#22d3ee"
};
var RARITY_LABEL = {
	common: "Common",
	uncommon: "Uncommon",
	rare: "Rare",
	epic: "Epic",
	legendary: "Legendary",
	mythic: "Mythic",
	forbidden: "Forbidden"
};
var BLESSINGS = [
	{
		id: "blade_fate",
		name: "Blade of Fate",
		desc: "+20% attack damage.",
		rarity: "common",
		attackPct: .2
	},
	{
		id: "iron_sinew",
		name: "Iron Sinew",
		desc: "+18 max HP.",
		rarity: "common",
		hp: 18
	},
	{
		id: "keen_edge",
		name: "Keen Edge",
		desc: "+8 attack.",
		rarity: "common",
		attack: 8
	},
	{
		id: "quick_hands",
		name: "Quick Hands",
		desc: "+12% attack speed.",
		rarity: "common",
		atkSpd: .12
	},
	{
		id: "ash_cloak",
		name: "Ash Cloak",
		desc: "+4 defense.",
		rarity: "common",
		defense: 4
	},
	{
		id: "blood_hunger",
		name: "Blood Hunger",
		desc: "Kills restore 4% max HP.",
		rarity: "uncommon",
		onKillHeal: .04
	},
	{
		id: "red_elixir",
		name: "Red Elixir",
		desc: "+26 max HP and heal 40.",
		rarity: "uncommon",
		hp: 26,
		heal: 40
	},
	{
		id: "hunter_eye",
		name: "Hunter's Eye",
		desc: "+12% crit chance.",
		rarity: "uncommon",
		crit: .12
	},
	{
		id: "shadow_heart",
		name: "Shadow Heart",
		desc: "+15% crit chance.",
		rarity: "rare",
		crit: .15
	},
	{
		id: "swift_step",
		name: "Swift Step",
		desc: "+18% move speed.",
		rarity: "rare",
		move: .18
	},
	{
		id: "second_step",
		name: "Second Step",
		desc: "Dash gains an extra charge.",
		rarity: "rare",
		dashCharges: 1
	},
	{
		id: "ghost_wind",
		name: "Ghost Wind",
		desc: "Dash cooldown -25%.",
		rarity: "rare",
		dashCd: .25
	},
	{
		id: "rune_ember",
		name: "Rune Ember",
		desc: "Skills deal +35% damage.",
		rarity: "epic",
		skillDmg: .35
	},
	{
		id: "void_echo",
		name: "Void Echo",
		desc: "Skills repeat at 25% power.",
		rarity: "epic",
		voidEcho: .25
	},
	{
		id: "ignition",
		name: "Ignition",
		desc: "Attacks have 25% chance to ignite.",
		rarity: "epic",
		ignite: .25
	},
	{
		id: "burning_blood",
		name: "Burning Blood",
		desc: "Missing HP raises attack speed.",
		rarity: "epic",
		bloodRage: true,
		atkSpd: .08
	},
	{
		id: "thunder_soul",
		name: "Thunder Soul",
		desc: "Lightning arcs to nearby foes.",
		rarity: "epic",
		lightning: true,
		attack: 4
	},
	{
		id: "crimson_edge",
		name: "Crimson Edge",
		desc: "+10% lifesteal.",
		rarity: "epic",
		lifesteal: .1
	},
	{
		id: "glass_edge",
		name: "Glass Edge",
		desc: "+50% damage, -25% max HP.",
		rarity: "legendary",
		attackPct: .5,
		hpPct: -.25,
		glass: true
	},
	{
		id: "supernova",
		name: "Supernova",
		desc: "Movement may trigger a shockwave.",
		rarity: "legendary",
		supernova: .12
	},
	{
		id: "phantom_step",
		name: "Phantom Step",
		desc: "Dash creates a hunting clone.",
		rarity: "legendary",
		phantom: true,
		dashCharges: 0
	},
	{
		id: "vampiric_pact",
		name: "Vampiric Pact",
		desc: "+8% lifesteal, +12 attack.",
		rarity: "legendary",
		lifesteal: .08,
		attack: 12
	},
	{
		id: "chrono_sand",
		name: "Chrono Sand",
		desc: "18% cooldown reduction.",
		rarity: "legendary",
		cdr: .18
	},
	{
		id: "gilded_eye",
		name: "Gilded Eye",
		desc: "+40% gold from kills.",
		rarity: "rare",
		goldPct: .4
	},
	{
		id: "thorn_mail",
		name: "Thorn Mail",
		desc: "Return 30% of melee damage.",
		rarity: "uncommon",
		thorns: .3
	},
	{
		id: "moon_fang",
		name: "Moon Fang",
		desc: "+5 attack, +8% crit.",
		rarity: "uncommon",
		attack: 5,
		crit: .08
	},
	{
		id: "storm_greaves",
		name: "Storm Greaves",
		desc: "+12% move, dash CD -10%.",
		rarity: "rare",
		move: .12,
		dashCd: .1
	},
	{
		id: "blood_well",
		name: "Blood Well",
		desc: "Heal 3 HP per second in combat.",
		rarity: "rare",
		heal: 0
	},
	{
		id: "executioner",
		name: "Executioner",
		desc: "+30% damage to enemies below 30% HP.",
		rarity: "epic",
		attackPct: .08
	},
	{
		id: "last_stand",
		name: "Last Stand",
		desc: "+40% damage below 30% HP.",
		rarity: "epic",
		attackPct: .05
	},
	{
		id: "void_skin",
		name: "Void Skin",
		desc: "+8 defense, +20 HP.",
		rarity: "rare",
		defense: 8,
		hp: 20
	},
	{
		id: "assassin_focus",
		name: "Assassin Focus",
		desc: "+25% crit damage.",
		rarity: "rare",
		critDmg: .25
	},
	{
		id: "echo_blades",
		name: "Echo Blades",
		desc: "Basic attacks hit a second time at 20%.",
		rarity: "legendary",
		attackPct: .12
	},
	{
		id: "night_veil",
		name: "Night Veil",
		desc: "After dash, +30% crit for 2s.",
		rarity: "epic",
		crit: .06
	},
	{
		id: "soul_forge",
		name: "Soul Forge",
		desc: "+14 attack, +10 defense.",
		rarity: "legendary",
		attack: 14,
		defense: 10
	},
	{
		id: "abyss_heart",
		name: "Abyss Heart",
		desc: "+40 HP, +6% lifesteal.",
		rarity: "mythic",
		hp: 40,
		lifesteal: .06
	},
	{
		id: "forbidden_tempo",
		name: "Forbidden Tempo",
		desc: "+25% attack and move speed.",
		rarity: "mythic",
		atkSpd: .25,
		move: .25
	},
	{
		id: "world_cutter",
		name: "World Cutter",
		desc: "+35% skill damage, +15 attack.",
		rarity: "mythic",
		skillDmg: .35,
		attack: 15
	},
	{
		id: "still_blood",
		name: "Still Blood",
		desc: "First lethal hit each room is ignored.",
		rarity: "forbidden",
		hp: 12
	}
];
var BLESSING_BY_ID = Object.fromEntries(BLESSINGS.map((b) => [b.id, b]));
var SYNERGIES = [
	{
		id: "blood_inferno",
		name: "Blood Inferno",
		desc: "Kills explode and raise attack speed.",
		requires: [
			"burning_blood",
			"blood_hunger",
			"crimson_edge"
		],
		grant: {
			id: "syn_inferno",
			name: "Blood Inferno",
			desc: "Kills detonate and stack attack speed.",
			rarity: "forbidden",
			atkSpd: .2,
			onKillHeal: .03,
			ignite: .4
		}
	},
	{
		id: "assassin_nothing",
		name: "Assassin of Nothing",
		desc: "Every 5s the next hit is a teleporting crit.",
		requires: [
			"shadow_heart",
			"void_echo",
			"phantom_step"
		],
		grant: {
			id: "syn_nothing",
			name: "Assassin of Nothing",
			desc: "Periodic guaranteed crit blink.",
			rarity: "forbidden",
			crit: .1,
			phantom: true
		}
	},
	{
		id: "solar_flare",
		name: "Solar Flare",
		desc: "Supernova and Ignition become plasma bursts.",
		requires: ["supernova", "ignition"],
		grant: {
			id: "syn_flare",
			name: "Solar Flare",
			desc: "Shockwaves ignite and explode.",
			rarity: "forbidden",
			supernova: .2,
			ignite: .2,
			attack: 10
		}
	},
	{
		id: "shadow_reaper",
		name: "Shadow Reaper",
		desc: "Moon Fang + Hunter's Eye: extreme crits.",
		requires: ["moon_fang", "hunter_eye"],
		grant: {
			id: "syn_reaper",
			name: "Shadow Reaper",
			desc: "+20% crit, +10 attack.",
			rarity: "forbidden",
			crit: .2,
			attack: 10,
			critDmg: .4
		}
	},
	{
		id: "storm_dancer",
		name: "Storm Dancer",
		desc: "Dash blessings combine into endless motion.",
		requires: ["second_step", "ghost_wind"],
		grant: {
			id: "syn_dancer",
			name: "Storm Dancer",
			desc: "Dash CD -20%, +1 charge, +12% move.",
			rarity: "forbidden",
			dashCharges: 1,
			dashCd: .2,
			move: .12
		}
	},
	{
		id: "glass_cannon",
		name: "Shattered Oath",
		desc: "Glass Edge + Executioner: execute low HP foes.",
		requires: ["glass_edge", "executioner"],
		grant: {
			id: "syn_glass",
			name: "Shattered Oath",
			desc: "Enemies below 15% HP die instantly.",
			rarity: "forbidden",
			attackPct: .2
		}
	},
	{
		id: "chrono_void",
		name: "Chrono Void",
		desc: "Time and void fold together.",
		requires: ["chrono_sand", "void_echo"],
		grant: {
			id: "syn_chrono",
			name: "Chrono Void",
			desc: "+12% CDR, skills echo again.",
			rarity: "forbidden",
			cdr: .12,
			voidEcho: .15
		}
	},
	{
		id: "blood_king",
		name: "Blood King",
		desc: "Vampiric Pact + Blood Hunger + Abyss Heart.",
		requires: [
			"vampiric_pact",
			"blood_hunger",
			"abyss_heart"
		],
		grant: {
			id: "syn_king",
			name: "Blood King",
			desc: "Overflow healing becomes a shield.",
			rarity: "forbidden",
			lifesteal: .08,
			hp: 30
		}
	}
];
var EQUIPMENT = [
	{
		id: "wep_shadow_dagger",
		name: "Shadow Dagger",
		slot: "weapon",
		rarity: "common",
		attack: 15,
		crit: .05,
		perk: "Backstab +50%"
	},
	{
		id: "wep_iron_katana",
		name: "Iron Katana",
		slot: "weapon",
		rarity: "uncommon",
		attack: 28,
		atkSpd: .1,
		perk: "Wider slash"
	},
	{
		id: "wep_void_blade",
		name: "Void Blade",
		slot: "weapon",
		rarity: "rare",
		attack: 45,
		crit: .1,
		perk: "Void pulse on hit"
	},
	{
		id: "wep_crimson_reaper",
		name: "Crimson Reaper",
		slot: "weapon",
		rarity: "epic",
		attack: 70,
		crit: .15,
		perk: "6% lifesteal"
	},
	{
		id: "wep_nightfall",
		name: "Nightfall Dagger",
		slot: "weapon",
		rarity: "legendary",
		attack: 110,
		crit: .22,
		atkSpd: .25,
		perk: "Dash guarantees crit"
	},
	{
		id: "arm_stalker",
		name: "Stalker Cloak",
		slot: "armor",
		rarity: "common",
		defense: 6,
		hp: 25,
		perk: "+5% dash speed"
	},
	{
		id: "arm_carapace",
		name: "Shadow Carapace",
		slot: "armor",
		rarity: "uncommon",
		defense: 14,
		hp: 50
	},
	{
		id: "arm_blood",
		name: "Blood Cuirass",
		slot: "armor",
		rarity: "rare",
		defense: 22,
		hp: 90,
		perk: "Thorns when struck"
	},
	{
		id: "arm_void",
		name: "Voidwalker Mantle",
		slot: "armor",
		rarity: "epic",
		defense: 35,
		hp: 150,
		perk: "15% phase"
	},
	{
		id: "helm_hood",
		name: "Leather Hood",
		slot: "helmet",
		rarity: "common",
		defense: 4,
		hp: 15
	},
	{
		id: "helm_mask",
		name: "Shadow Mask",
		slot: "helmet",
		rarity: "rare",
		defense: 15,
		crit: .08,
		perk: "Longer telegraphs"
	},
	{
		id: "helm_crown",
		name: "Crown of Ruin",
		slot: "helmet",
		rarity: "legendary",
		defense: 28,
		attack: 25,
		crit: .12,
		perk: "+20% boss damage"
	},
	{
		id: "glove_wraps",
		name: "Cloth Wraps",
		slot: "gloves",
		rarity: "common",
		attack: 5,
		atkSpd: .05
	},
	{
		id: "glove_striker",
		name: "Striker Gauntlets",
		slot: "gloves",
		rarity: "rare",
		attack: 18,
		atkSpd: .15,
		perk: "Combo builds faster"
	},
	{
		id: "boot_treads",
		name: "Shadow Treads",
		slot: "boots",
		rarity: "common",
		move: .1,
		defense: 4
	},
	{
		id: "boot_zephyr",
		name: "Zephyr Greaves",
		slot: "boots",
		rarity: "epic",
		move: .25,
		defense: 16,
		perk: "-25% dash CD"
	},
	{
		id: "ring_ferocity",
		name: "Ring of Ferocity",
		slot: "ring",
		rarity: "common",
		attack: 8,
		crit: .04
	},
	{
		id: "ring_vamp",
		name: "Vampiric Seal",
		slot: "ring",
		rarity: "epic",
		attack: 24,
		crit: .1,
		perk: "+8% lifesteal on crit"
	},
	{
		id: "neck_bone",
		name: "Bone Talisman",
		slot: "necklace",
		rarity: "uncommon",
		hp: 40,
		defense: 8
	},
	{
		id: "neck_abyss",
		name: "Heart of the Abyss",
		slot: "necklace",
		rarity: "legendary",
		hp: 120,
		attack: 30,
		perk: "Cheat death once"
	},
	{
		id: "relic_coin",
		name: "Cursed Doubloon",
		slot: "relic",
		rarity: "rare",
		attack: 15,
		perk: "+35% gold"
	},
	{
		id: "relic_chrono",
		name: "Chrono Hourglass",
		slot: "relic",
		rarity: "mythic",
		attack: 40,
		defense: 20,
		perk: "-25% skill CD"
	}
];
var EQUIP_BY_ID = Object.fromEntries(EQUIPMENT.map((e) => [e.id, e]));
var STARTER_EQUIP_IDS = [
	"wep_shadow_dagger",
	"arm_stalker",
	"boot_treads",
	"ring_ferocity",
	"helm_hood"
];
var ENEMIES = {
	goblin: {
		kind: "goblin",
		name: "Ash Stalker",
		hp: 58,
		attack: 11,
		speed: 95,
		range: 36,
		cooldown: 1.55,
		telegraph: .48,
		radius: 11,
		xp: 8,
		gold: 6,
		color: "#6aa56a"
	},
	skeleton: {
		kind: "skeleton",
		name: "Bone Archer",
		hp: 44,
		attack: 13,
		speed: 70,
		range: 210,
		cooldown: 2.05,
		telegraph: .7,
		radius: 10,
		xp: 9,
		gold: 7,
		color: "#cfc6b4",
		isRanged: true
	},
	bat: {
		kind: "bat",
		name: "Void Skitter",
		hp: 32,
		attack: 9,
		speed: 150,
		range: 44,
		cooldown: 1.15,
		telegraph: .32,
		radius: 9,
		xp: 7,
		gold: 5,
		color: "#7a6aa8",
		isFlying: true
	},
	cultist: {
		kind: "cultist",
		name: "Blood Cultist",
		hp: 88,
		attack: 16,
		speed: 62,
		range: 170,
		cooldown: 2.3,
		telegraph: .85,
		radius: 12,
		xp: 14,
		gold: 12,
		color: "#a33d55",
		isRanged: true
	},
	spider: {
		kind: "spider",
		name: "Iron Crawler",
		hp: 120,
		attack: 18,
		speed: 88,
		range: 40,
		cooldown: 1.7,
		telegraph: .55,
		radius: 13,
		xp: 16,
		gold: 14,
		color: "#c06a32"
	},
	berserker: {
		kind: "berserker",
		name: "Elite Berserker",
		hp: 320,
		attack: 24,
		speed: 110,
		range: 42,
		cooldown: 1.35,
		telegraph: .42,
		radius: 14,
		xp: 36,
		gold: 28,
		color: "#d44545",
		isElite: true
	},
	knight: {
		kind: "knight",
		name: "Blood Knight",
		hp: 780,
		attack: 28,
		speed: 92,
		range: 52,
		cooldown: 1.7,
		telegraph: .6,
		radius: 16,
		xp: 80,
		gold: 60,
		color: "#c81e3a",
		isElite: true
	},
	gatekeeper: {
		kind: "gatekeeper",
		name: "The Gatekeeper",
		hp: 2800,
		attack: 32,
		speed: 78,
		range: 70,
		cooldown: 1.5,
		telegraph: .7,
		radius: 22,
		xp: 220,
		gold: 160,
		color: "#6d5aa8",
		isBoss: true
	},
	widow: {
		kind: "widow",
		name: "The Iron Widow",
		hp: 3600,
		attack: 36,
		speed: 100,
		range: 90,
		cooldown: 1.35,
		telegraph: .55,
		radius: 24,
		xp: 280,
		gold: 200,
		color: "#e07a3a",
		isBoss: true
	}
};
var EVENTS = [
	{
		id: "witch",
		title: "The Veiled Witch",
		speaker: "Veiled Sorceress",
		dialog: "Every choice leaves a trace. What will you offer the dark?",
		choices: [
			{
				label: "Offer 80 gold",
				outcome: "A warding draught fills your veins.",
				karma: 1,
				gold: -80,
				blessingId: "red_elixir"
			},
			{
				label: "Offer blood (20% HP)",
				outcome: "She drinks, and a blade-charm remains.",
				karma: -1,
				hpPct: -.2,
				blessingId: "keen_edge"
			},
			{
				label: "Walk away",
				outcome: "The witch watches you leave, silent.",
				karma: 0
			}
		]
	},
	{
		id: "blacksmith",
		title: "Wandering Armorer",
		speaker: "Master Forger",
		dialog: "Starlight or shadow — which quench for your edge?",
		choices: [
			{
				label: "Temper with starlight (-50 gold)",
				outcome: "Your step lightens.",
				karma: 2,
				gold: -50,
				blessingId: "swift_step"
			},
			{
				label: "Quench in shadow",
				outcome: "A darker hunger settles in the steel.",
				karma: -1,
				blessingId: "moon_fang"
			},
			{
				label: "Share rations",
				outcome: "He presses a flask into your hand.",
				karma: 2,
				hpPct: .35
			}
		]
	},
	{
		id: "prisoner",
		title: "Caged Whisper",
		speaker: "Bound Assassin",
		dialog: "Cut the chain and I owe you a death. Leave me and I curse your name.",
		choices: [
			{
				label: "Free them",
				outcome: "A phantom blade joins your hunt.",
				karma: 2,
				blessingId: "phantom_step"
			},
			{
				label: "Take their ring",
				outcome: "Gold, and a dying glare.",
				karma: -2,
				gold: 90
			},
			{
				label: "Ignore the cage",
				outcome: "The whispering fades behind stone.",
				karma: 0
			}
		]
	},
	{
		id: "mirror",
		title: "Hall of Mirrors",
		speaker: "Your Other",
		dialog: "One of us walks out. The other stays in the glass.",
		choices: [
			{
				label: "Shatter the glass",
				outcome: "Shards cut you, but the path clears.",
				karma: 0,
				hpPct: -.12,
				blessingId: "glass_edge"
			},
			{
				label: "Bow to the other",
				outcome: "They gift you their certainty.",
				karma: 1,
				blessingId: "assassin_focus"
			},
			{
				label: "Close your eyes and walk",
				outcome: "You pass unharmed, unseen.",
				karma: 0
			}
		]
	},
	{
		id: "altar",
		title: "Hungry Altar",
		speaker: "The Stone",
		dialog: "It wants a name, a coin, or a future.",
		choices: [
			{
				label: "Offer 120 gold",
				outcome: "The altar hums and yields a relic-charm.",
				karma: 0,
				gold: -120,
				blessingId: "soul_forge"
			},
			{
				label: "Cut your palm",
				outcome: "Blood soaks in. Power answers.",
				karma: -1,
				hpPct: -.15,
				blessingId: "burning_blood"
			},
			{
				label: "Desecrate it",
				outcome: "A curse clings, but gold rains.",
				karma: -2,
				gold: 140,
				curseId: "broken_blade"
			}
		]
	},
	{
		id: "merchant_ghost",
		title: "Dead Merchant",
		speaker: "Coin-Shade",
		dialog: "I sold honestly. They still took my throat. Buy something anyway.",
		choices: [
			{
				label: "Buy a charm (60 gold)",
				outcome: "A cold coin warms in your pocket.",
				karma: 1,
				gold: -60,
				blessingId: "gilded_eye"
			},
			{
				label: "Rob the stall",
				outcome: "You take everything. The shade wails.",
				karma: -2,
				gold: 70,
				curseId: "vengeance"
			},
			{
				label: "Bury the bones",
				outcome: "Karma settles. A small gem remains.",
				karma: 3,
				gems: 8
			}
		]
	},
	{
		id: "well",
		title: "Black Well",
		speaker: "Echo Below",
		dialog: "Drink, and remember a life that is not yours.",
		choices: [
			{
				label: "Drink",
				outcome: "Memories of a better hunter flood in.",
				karma: 0,
				hpPct: .25,
				blessingId: "hunter_eye"
			},
			{
				label: "Fill a flask for later",
				outcome: "You save a draught. HP restored slightly.",
				karma: 1,
				hpPct: .1
			},
			{
				label: "Poison the well",
				outcome: "Something downstream will suffer.",
				karma: -2,
				blessingId: "ignition"
			}
		]
	},
	{
		id: "child",
		title: "Lost Candle",
		speaker: "Small Voice",
		dialog: "I dropped my light. The dark has teeth.",
		choices: [
			{
				label: "Escort them out",
				outcome: "A blessing of the threshold follows.",
				karma: 3,
				blessingId: "ash_cloak"
			},
			{
				label: "Give 30 gold",
				outcome: "They run. You hope it is enough.",
				karma: 1,
				gold: -30
			},
			{
				label: "Take the candle",
				outcome: "Light for you. None for them.",
				karma: -3,
				blessingId: "night_veil"
			}
		]
	}
];
var CURSES = {
	blood_price: {
		name: "Blood Price",
		desc: "-20% max HP.",
		hpPct: -.2
	},
	broken_blade: {
		name: "Broken Blade",
		desc: "-15% attack.",
		attackPct: -.15
	},
	vengeance: {
		name: "Vengeance",
		desc: "Enemies deal +25% damage.",
		enemyDmg: .25
	}
};
var LEGACY = [
	{
		id: "vitality",
		name: "Titan Constitution",
		desc: "+8 max HP per rank.",
		max: 10,
		base: 100,
		step: 140,
		per: "+8 HP"
	},
	{
		id: "edge",
		name: "Razor Sharpness",
		desc: "+2.5 attack per rank.",
		max: 10,
		base: 140,
		step: 180,
		per: "+2.5 ATK"
	},
	{
		id: "precision",
		name: "Deadly Instinct",
		desc: "+1.2% crit per rank.",
		max: 10,
		base: 180,
		step: 220,
		per: "+1.2% crit"
	},
	{
		id: "wealth",
		name: "Plunderer's Eye",
		desc: "+6% gold per rank.",
		max: 10,
		base: 90,
		step: 110,
		per: "+6% gold"
	},
	{
		id: "swift",
		name: "Shadow Momentum",
		desc: "-3% dash cooldown per rank.",
		max: 8,
		base: 160,
		step: 200,
		per: "-3% dash CD"
	},
	{
		id: "scavenger",
		name: "Relic Hunter",
		desc: "+4% drop rate per rank.",
		max: 8,
		base: 200,
		step: 240,
		per: "+4% drops"
	}
];
var MISSIONS = [
	{
		id: "login",
		title: "Daily Vow",
		desc: "Log in and prepare for the hunt.",
		target: 1,
		gold: 150,
		gems: 10
	},
	{
		id: "kills",
		title: "Cull the Swarm",
		desc: "Defeat 40 enemies.",
		target: 40,
		gold: 280,
		gems: 12
	},
	{
		id: "boss",
		title: "Giant Slayer",
		desc: "Defeat a miniboss or boss.",
		target: 1,
		gold: 420,
		gems: 20
	},
	{
		id: "blessings",
		title: "Favor of the Dark",
		desc: "Collect 5 blessings.",
		target: 5,
		gold: 220,
		gems: 12
	},
	{
		id: "dash",
		title: "Ghost Dancer",
		desc: "Perform 25 dashes.",
		target: 25,
		gold: 180,
		gems: 8
	},
	{
		id: "run",
		title: "Another Descent",
		desc: "Complete or die in 1 run.",
		target: 1,
		gold: 200,
		gems: 10
	}
];
var ACHIEVEMENTS = [
	{
		id: "first_blood",
		title: "First Blood",
		desc: "Defeat your first enemy.",
		target: 1,
		gems: 15
	},
	{
		id: "gatebreaker",
		title: "Gatebreaker",
		desc: "Defeat The Gatekeeper.",
		target: 1,
		gems: 40
	},
	{
		id: "combo",
		title: "Combo Virtuoso",
		desc: "Reach a 25-hit combo.",
		target: 25,
		gems: 25
	},
	{
		id: "blessings",
		title: "Divine Pantheon",
		desc: "Hold 8 blessings in one run.",
		target: 8,
		gems: 25
	},
	{
		id: "synergy",
		title: "Forbidden Alchemist",
		desc: "Trigger a blessing synergy.",
		target: 1,
		gems: 40
	},
	{
		id: "nohit",
		title: "Untouchable",
		desc: "Defeat a boss without taking damage.",
		target: 1,
		gems: 60
	},
	{
		id: "gold",
		title: "Hoard of Shadows",
		desc: "Earn 2500 gold total.",
		target: 2500,
		gems: 25
	},
	{
		id: "forge",
		title: "Master Smith",
		desc: "Upgrade any item to level 5.",
		target: 5,
		gems: 20
	},
	{
		id: "roster",
		title: "Guild of Blades",
		desc: "Unlock 4 assassins.",
		target: 4,
		gems: 50
	},
	{
		id: "kills",
		title: "Reaper",
		desc: "Defeat 500 enemies.",
		target: 500,
		gems: 30
	},
	{
		id: "speed",
		title: "Lightning Stride",
		desc: "Clear a combat room in 20s.",
		target: 1,
		gems: 20
	},
	{
		id: "widow",
		title: "Widowbreaker",
		desc: "Defeat The Iron Widow.",
		target: 1,
		gems: 50
	}
];
var BIOMES = {
	citadel: {
		id: "citadel",
		name: "Forgotten Citadel",
		line: "Cold wind through broken arches.",
		floor: "#32384a",
		floorAlt: "#2a3040",
		wall: "#4a5368",
		wallTop: "#6a7388",
		accent: "#2ec4d6",
		fog: "#0b0d14"
	},
	forest: {
		id: "forest",
		name: "Blood Forest",
		line: "Red leaves whisper of the fallen.",
		floor: "#1c1214",
		floorAlt: "#161012",
		wall: "#3a1c22",
		wallTop: "#4c242c",
		accent: "#e11d48",
		fog: "#14080a"
	},
	abyss: {
		id: "abyss",
		name: "Frozen Abyss",
		line: "The dark remembers every footstep as ice.",
		floor: "#101820",
		floorAlt: "#0c141c",
		wall: "#1c3348",
		wallTop: "#2a4c66",
		accent: "#7dd3e8",
		fog: "#070d14"
	},
	ember: {
		id: "ember",
		name: "Ember Fortress",
		line: "Heat ripples through iron corridors.",
		floor: "#22140c",
		floorAlt: "#1a100a",
		wall: "#4a2814",
		wallTop: "#6a3818",
		accent: "#e07a3a",
		fog: "#140804"
	},
	sanctum: {
		id: "sanctum",
		name: "Void Sanctum",
		line: "Reality frays at the edges of the blade.",
		floor: "#14101c",
		floorAlt: "#100c18",
		wall: "#2a2044",
		wallTop: "#3c2c66",
		accent: "#a78bfa",
		fog: "#0a0614"
	},
	grave: {
		id: "grave",
		name: "Assassin's Grave",
		line: "Every name here was once the last.",
		floor: "#161616",
		floorAlt: "#101010",
		wall: "#2c2c2c",
		wallTop: "#3c3c3c",
		accent: "#ece6dc",
		fog: "#080808"
	}
};
var KEY = "one-assasin-save-v1";
var DEFAULT_SETTINGS = {
	master: .8,
	music: .45,
	sfx: .8,
	shake: true,
	numbers: true,
	haptics: true,
	flash: true,
	leftHanded: false,
	autoAim: true,
	lowFx: false,
	language: "en",
	uiScale: 1
};
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function defaultSave() {
	const inv = STARTER_EQUIP_IDS.map((defId, i) => ({
		uid: `start-${i}-${defId}`,
		defId,
		level: 1
	}));
	const equipped = {};
	for (const item of inv) equipped[slotOf(item.defId)] = item.uid;
	return {
		version: 1,
		gold: 120,
		gems: 8,
		souls: 0,
		unlockedHeroes: ["zero"],
		selectedHero: "zero",
		heroLevels: {
			zero: 1,
			lyra: 1,
			vex: 1,
			kael: 1,
			nyx: 1,
			sol: 1
		},
		heroStars: {
			zero: 1,
			lyra: 1,
			vex: 1,
			kael: 1,
			nyx: 1,
			sol: 1
		},
		inventory: inv,
		equipped,
		legacy: {},
		discoveredBlessings: [],
		achievements: {},
		missions: {},
		bestScore: 0,
		runs: 0,
		victories: 0,
		kills: 0,
		tutorialDone: false,
		settings: { ...DEFAULT_SETTINGS },
		lastLoginDay: today(),
		claimedLogin: false
	};
}
function slotOf(defId) {
	if (defId.startsWith("wep_")) return "weapon";
	if (defId.startsWith("helm_")) return "helmet";
	if (defId.startsWith("arm_")) return "armor";
	if (defId.startsWith("glove_")) return "gloves";
	if (defId.startsWith("boot_")) return "boots";
	if (defId.startsWith("ring_")) return "ring";
	if (defId.startsWith("neck_")) return "necklace";
	if (defId.startsWith("relic_")) return "relic";
	return "weapon";
}
function migrate(raw) {
	const base = defaultSave();
	const merged = {
		...base,
		...raw,
		settings: {
			...base.settings,
			...raw.settings ?? {}
		},
		heroLevels: {
			...base.heroLevels,
			...raw.heroLevels ?? {}
		},
		heroStars: {
			...base.heroStars,
			...raw.heroStars ?? {}
		},
		equipped: {
			...base.equipped,
			...raw.equipped ?? {}
		},
		inventory: raw.inventory?.length ? raw.inventory : base.inventory,
		unlockedHeroes: raw.unlockedHeroes?.length ? raw.unlockedHeroes : base.unlockedHeroes,
		legacy: {
			...base.legacy,
			...raw.legacy ?? {}
		},
		discoveredBlessings: raw.discoveredBlessings ?? [],
		achievements: raw.achievements ?? {},
		missions: raw.missions ?? {},
		version: 1
	};
	const day = today();
	if (merged.lastLoginDay !== day) {
		merged.lastLoginDay = day;
		merged.claimedLogin = false;
		merged.missions = {};
	}
	return merged;
}
function loadSave() {
	if (typeof window === "undefined") return defaultSave();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return defaultSave();
		return migrate(JSON.parse(raw));
	} catch {
		return defaultSave();
	}
}
function writeSave(save) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(KEY, JSON.stringify(save));
	} catch {}
}
function uid() {
	return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
var HEROES = [
	{
		id: "zero",
		name: "Zero",
		title: "The Last Assassin",
		role: "Shadow Blade",
		blurb: "If the blade is drawn, someone dies before dawn.",
		hp: 100,
		attack: 20,
		defense: 4,
		moveSpeed: 220,
		attackSpeed: 1.35,
		crit: .12,
		critDmg: 1.9,
		range: 46,
		color: "#c9c3bb",
		accent: "#e11d48",
		unlockGold: 0,
		unlockGems: 0,
		skill1: {
			id: "shadow_step",
			name: "Shadow Step",
			desc: "Blink behind the nearest foe and carve a guaranteed crit.",
			cooldown: 5.2
		},
		skill2: {
			id: "void_slash",
			name: "Void Slash",
			desc: "A wide crescent of void energy that cuts through a line of enemies.",
			cooldown: 7.5
		},
		ult: {
			id: "phantom",
			name: "Phantom Judgement",
			desc: "Summon two phantom blades that hunt nearby enemies for 6s.",
			cooldown: 0
		},
		passive: {
			name: "Night Instinct",
			desc: "Dashes leave a 0.4s afterimage that deals 40% attack."
		}
	},
	{
		id: "lyra",
		name: "Lyra",
		title: "Veil Huntress",
		role: "Shadow Archer",
		blurb: "She never misses what the dark has already marked.",
		hp: 86,
		attack: 18,
		defense: 3,
		moveSpeed: 210,
		attackSpeed: 1.55,
		crit: .16,
		critDmg: 2.05,
		range: 210,
		color: "#9bb7c4",
		accent: "#2ec4d6",
		unlockGold: 800,
		unlockGems: 20,
		skill1: {
			id: "rain",
			name: "Night Rain",
			desc: "Volley of 7 arrows in a cone. Marks targets for bonus crit.",
			cooldown: 6.4
		},
		skill2: {
			id: "pierce",
			name: "Umbral Pierce",
			desc: "A piercing shot that chains to a second enemy.",
			cooldown: 8
		},
		ult: {
			id: "eclipse",
			name: "Eclipse Volley",
			desc: "Rain a storm of shadow arrows across the arena for 4s.",
			cooldown: 0
		},
		passive: {
			name: "Mark of Silence",
			desc: "The third hit on a target is always a crit."
		}
	},
	{
		id: "vex",
		name: "Vex",
		title: "Crimson Covenant",
		role: "Blood Mage",
		blurb: "Every drop spilled is another year stolen back.",
		hp: 110,
		attack: 16,
		defense: 5,
		moveSpeed: 195,
		attackSpeed: 1.15,
		crit: .1,
		critDmg: 1.75,
		range: 150,
		color: "#d48a96",
		accent: "#e11d48",
		unlockGold: 1400,
		unlockGems: 40,
		skill1: {
			id: "blood_rush",
			name: "Blood Rush",
			desc: "+80% attack speed and 8% lifesteal for 5 seconds.",
			cooldown: 11
		},
		skill2: {
			id: "soul_burst",
			name: "Soul Explosion",
			desc: "The next kill detonates, dealing 180% attack in a radius.",
			cooldown: 9
		},
		ult: {
			id: "covenant",
			name: "Crimson Covenant",
			desc: "Drain all nearby foes. Heal for 40% of damage dealt.",
			cooldown: 0
		},
		passive: {
			name: "Hemophage",
			desc: "Basic hits restore 3% of damage as health."
		}
	},
	{
		id: "kael",
		name: "Kael",
		title: "Ashen Monastery",
		role: "Blade Monk",
		blurb: "A hundred cuts taught as one breath.",
		hp: 108,
		attack: 17,
		defense: 7,
		moveSpeed: 230,
		attackSpeed: 1.7,
		crit: .14,
		critDmg: 1.8,
		range: 42,
		color: "#d7c4a3",
		accent: "#d4552a",
		unlockGold: 2e3,
		unlockGems: 55,
		skill1: {
			id: "flurry",
			name: "Fourfold Cut",
			desc: "Four rapid strikes. Each hit extends combo window.",
			cooldown: 6
		},
		skill2: {
			id: "iron_palm",
			name: "Iron Palm",
			desc: "Stun a cone of enemies and shatter their guard.",
			cooldown: 8.5
		},
		ult: {
			id: "kata",
			name: "Final Kata",
			desc: "Become unstoppable for 4s. Every hit is a dash-strike.",
			cooldown: 0
		},
		passive: {
			name: "Flow",
			desc: "Combo above 8 grants +25% move and attack speed."
		}
	},
	{
		id: "nyx",
		name: "Nyx",
		title: "Hollow Star",
		role: "Void Witch",
		blurb: "She unmakes the space between heartbeats.",
		hp: 92,
		attack: 19,
		defense: 3,
		moveSpeed: 205,
		attackSpeed: 1.2,
		crit: .13,
		critDmg: 1.95,
		range: 170,
		color: "#b7a8d4",
		accent: "#7dd3e8",
		unlockGold: 2600,
		unlockGems: 70,
		skill1: {
			id: "slow",
			name: "Time Break",
			desc: "Slow all enemies by 60% for 3 seconds.",
			cooldown: 12
		},
		skill2: {
			id: "orbs",
			name: "Void Orbs",
			desc: "Three orbiting orbs that strike nearby foes.",
			cooldown: 10
		},
		ult: {
			id: "collapse",
			name: "Event Collapse",
			desc: "Pull all enemies into a singularity, then detonate.",
			cooldown: 0
		},
		passive: {
			name: "Rift Skin",
			desc: "12% chance to phase incoming damage."
		}
	},
	{
		id: "sol",
		name: "Sol",
		title: "Ember Vow",
		role: "Flame Knight",
		blurb: "The last oath of a burned order, still burning.",
		hp: 130,
		attack: 22,
		defense: 10,
		moveSpeed: 185,
		attackSpeed: 1.05,
		crit: .08,
		critDmg: 1.7,
		range: 54,
		color: "#e0b07a",
		accent: "#e07a3a",
		unlockGold: 3200,
		unlockGems: 80,
		skill1: {
			id: "sun_strike",
			name: "Sun Strike",
			desc: "A pillar of fire in a 2-tile radius. Ignites.",
			cooldown: 6.5
		},
		skill2: {
			id: "solar_burst",
			name: "Solar Burst",
			desc: "Knockback nova. Leaves a burning ring.",
			cooldown: 9
		},
		ult: {
			id: "dawn",
			name: "False Dawn",
			desc: "The arena ignites. Enemies burn for 6s.",
			cooldown: 0
		},
		passive: {
			name: "Cinder Wake",
			desc: "Movement leaves fire that scorches pursuers."
		}
	}
];
var HERO_BY_ID = Object.fromEntries(HEROES.map((h) => [h.id, h]));
function persist(s) {
	writeSave(s);
	return s;
}
var useMeta = create((set, get) => ({
	save: defaultSave(),
	screen: "menu",
	hydrate: () => set({ save: loadSave() }),
	setScreen: (screen) => set({ screen }),
	patch: (fn) => {
		const save = structuredClone(get().save);
		fn(save);
		set({ save: persist(save) });
	},
	selectHero: (id) => {
		if (!get().save.unlockedHeroes.includes(id)) return;
		get().patch((s) => {
			s.selectedHero = id;
		});
	},
	unlockHero: (id) => {
		const h = HERO_BY_ID[id];
		const save = get().save;
		if (save.unlockedHeroes.includes(id)) return true;
		if (save.gold < h.unlockGold || save.gems < h.unlockGems) return false;
		get().patch((s) => {
			s.gold -= h.unlockGold;
			s.gems -= h.unlockGems;
			s.unlockedHeroes.push(id);
			const a = s.achievements.roster ?? {
				count: 0,
				claimed: false
			};
			a.count = s.unlockedHeroes.length;
			s.achievements.roster = a;
		});
		return true;
	},
	equipItem: (uidStr) => {
		get().patch((s) => {
			const item = s.inventory.find((i) => i.uid === uidStr);
			if (!item) return;
			const def = EQUIP_BY_ID[item.defId];
			if (!def) return;
			s.equipped[def.slot] = uidStr;
		});
	},
	upgradeItem: (uidStr) => {
		const save = get().save;
		const item = save.inventory.find((i) => i.uid === uidStr);
		if (!item || item.level >= 50) return false;
		const cost = item.level * 80 + 50;
		if (save.gold < cost) return false;
		get().patch((s) => {
			const it = s.inventory.find((i) => i.uid === uidStr);
			if (!it) return;
			s.gold -= cost;
			it.level += 1;
			const a = s.achievements.forge ?? {
				count: 0,
				claimed: false
			};
			a.count = Math.max(a.count, it.level);
			s.achievements.forge = a;
		});
		return true;
	},
	buyLegacy: (id) => {
		const def = LEGACY.find((l) => l.id === id);
		if (!def) return false;
		const save = get().save;
		const lv = save.legacy[id] ?? 0;
		if (lv >= def.max) return false;
		const cost = def.base + lv * def.step;
		if (save.gold < cost) return false;
		get().patch((s) => {
			s.gold -= cost;
			s.legacy[id] = lv + 1;
		});
		return true;
	},
	claimMission: (id) => {
		const def = MISSIONS.find((m) => m.id === id);
		if (!def) return false;
		const st = get().save.missions[id] ?? {
			count: 0,
			claimed: false,
			day: ""
		};
		if (st.claimed || st.count < def.target) return false;
		get().patch((s) => {
			const m = s.missions[id] ?? {
				count: 0,
				claimed: false,
				day: ""
			};
			m.claimed = true;
			s.missions[id] = m;
			s.gold += def.gold;
			s.gems += def.gems;
		});
		return true;
	},
	claimAchievement: (id) => {
		const def = ACHIEVEMENTS.find((a) => a.id === id);
		if (!def) return false;
		const st = get().save.achievements[id] ?? {
			count: 0,
			claimed: false
		};
		if (st.claimed || st.count < def.target) return false;
		get().patch((s) => {
			const a = s.achievements[id] ?? {
				count: 0,
				claimed: false
			};
			a.claimed = true;
			s.achievements[id] = a;
			s.gems += def.gems;
		});
		return true;
	},
	claimLogin: () => {
		get().patch((s) => {
			if (s.claimedLogin) return;
			s.claimedLogin = true;
			s.gold += 150;
			s.gems += 10;
			const m = s.missions.login ?? {
				count: 0,
				claimed: false,
				day: s.lastLoginDay
			};
			m.count = 1;
			s.missions.login = m;
		});
	},
	applyRun: (gold, gems, kills, score, win) => {
		get().patch((s) => {
			s.gold += gold;
			s.gems += gems;
			s.kills += kills;
			s.runs += 1;
			if (win) s.victories += 1;
			s.bestScore = Math.max(s.bestScore, score);
			const a = s.achievements.gold ?? {
				count: 0,
				claimed: false
			};
			a.count = s.gold;
			s.achievements.gold = a;
		});
	},
	grantItem: (defId) => {
		get().patch((s) => {
			s.inventory.push({
				uid: uid(),
				defId,
				level: 1
			});
		});
	},
	setSettings: (p) => {
		get().patch((s) => {
			s.settings = {
				...s.settings,
				...p
			};
		});
	}
}));
var Rng = class {
	s;
	constructor(seed) {
		this.s = seed >>> 0 || 1;
	}
	next() {
		this.s = this.s + 1831565813 >>> 0;
		let t = this.s;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
	int(n) {
		return Math.floor(this.next() * n);
	}
	range(a, b) {
		return a + this.next() * (b - a);
	}
	pick(arr) {
		return arr[this.int(arr.length)];
	}
	chance(p) {
		return this.next() < p;
	}
};
function inb(c, r) {
	return c >= 0 && r >= 0 && c < 17 && r < 13;
}
function walkable(cells, c, r) {
	return inb(c, r) && cells[r][c] === 0;
}
function reachable(cells, sx, sy, tx, ty) {
	const q = [sy * 17 + sx];
	const seen = /* @__PURE__ */ new Uint8Array(221);
	seen[sy * 17 + sx] = 1;
	const dirs = [
		1,
		-1,
		17,
		-17
	];
	while (q.length) {
		const i = q.pop();
		if (i === ty * 17 + tx) return true;
		const x = i % 17;
		const y = i / 17 | 0;
		for (const d of dirs) {
			const ni = i + d;
			const nx = ni % 17;
			const ny = ni / 17 | 0;
			if (!inb(nx, ny) || seen[ni] || cells[ny][nx] !== 0) continue;
			if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
			seen[ni] = 1;
			q.push(ni);
		}
	}
	return false;
}
function generateRoom(rng, type) {
	let cells = [];
	const spawn = {
		x: 2,
		y: 6
	};
	const exit = {
		x: 14,
		y: 6
	};
	for (let attempt = 0; attempt < 24; attempt++) {
		cells = [];
		for (let r = 0; r < 13; r++) {
			const row = [];
			for (let c = 0; c < 17; c++) if (c === 0 || r === 0 || c === 16 || r === 12) row.push(1);
			else if (rng.chance(type === "boss" ? .04 : .12)) row.push(1);
			else row.push(0);
			cells.push(row);
		}
		const clear = (x, y, rad = 1) => {
			for (let r = y - rad; r <= y + rad; r++) for (let c = x - rad; c <= x + rad; c++) if (inb(c, r) && r > 0 && r < 12 && c > 0 && c < 16) cells[r][c] = 0;
		};
		spawn.x = 2;
		spawn.y = 2 + rng.int(9);
		exit.x = 14;
		exit.y = 2 + rng.int(9);
		if (type === "boss") {
			spawn.y = 6;
			exit.y = 6;
		}
		clear(spawn.x, spawn.y, 2);
		clear(exit.x, exit.y, 2);
		clear(8, 6, 2);
		if (reachable(cells, spawn.x, spawn.y, exit.x, exit.y)) break;
	}
	const traps = [];
	const trapN = type === "trap" ? 8 : type === "combat" ? 2 : type === "elite" ? 3 : 0;
	for (let i = 0; i < trapN; i++) for (let t = 0; t < 20; t++) {
		const x = 2 + rng.int(13);
		const y = 2 + rng.int(9);
		if (!walkable(cells, x, y)) continue;
		if (Math.abs(x - spawn.x) + Math.abs(y - spawn.y) < 4) continue;
		traps.push({
			x,
			y
		});
		break;
	}
	let chest;
	if (type === "treasure" || type === "elite" || type === "boss") {
		chest = {
			x: 8,
			y: 6
		};
		cells[chest.y][chest.x] = 0;
	}
	return {
		cells,
		spawn,
		exit,
		chest,
		traps
	};
}
function worldOf(c, r) {
	return {
		x: (c + .5) * 32,
		y: (r + .5) * 32
	};
}
function generateGraph(rng, floors = 8) {
	const tiers = [];
	const typesFor = (floor, i, n) => {
		if (floor === 0) return "combat";
		if (floor === floors - 1) return "boss";
		if (floor === 3) return "elite";
		if (floor === 1) return i === 0 ? "combat" : "event";
		if (floor === 2) return i === 0 ? "treasure" : "shrine";
		if (floor === 4) return i === 0 ? "heal" : "shop";
		if (floor === 5) return i === 0 ? "combat" : "trap";
		if (floor === 6) return i === 0 ? "elite" : "shop";
		const bag = [
			"combat",
			"combat",
			"event",
			"treasure"
		];
		return bag[(i + floor) % bag.length];
	};
	for (let f = 0; f < floors; f++) {
		const n = f === 0 || f === floors - 1 || f === 3 ? 1 : 2 + (rng.int(2) === 0 ? 0 : 1);
		const nodes = [];
		for (let i = 0; i < n; i++) {
			const type = typesFor(f, i, n);
			nodes.push({
				id: `${f}-${i}`,
				floor: f,
				index: i,
				type,
				next: [],
				enemyCount: type === "combat" ? 3 + f : type === "elite" ? 1 : type === "boss" ? 1 : type === "trap" ? 2 : 0,
				cleared: false
			});
		}
		tiers.push(nodes);
	}
	for (let f = 0; f < floors - 1; f++) {
		const cur = tiers[f];
		const nxt = tiers[f + 1];
		for (const node of cur) {
			const a = rng.int(nxt.length);
			node.next = [a];
			if (nxt.length > 1 && rng.chance(.55)) {
				const b = (a + 1) % nxt.length;
				if (b !== a) node.next.push(b);
			}
		}
	}
	return tiers;
}
var Input = class {
	keys = /* @__PURE__ */ new Set();
	qaKeys = /* @__PURE__ */ new Set();
	move = {
		x: 0,
		y: 0,
		active: false
	};
	aim = {
		x: 0,
		y: 0,
		active: false
	};
	pointer = {
		x: 0,
		y: 0,
		down: false
	};
	attackHeld = false;
	attackPressed = false;
	dashPressed = false;
	skill1Pressed = false;
	skill2Pressed = false;
	ultPressed = false;
	pausePressed = false;
	leftHanded = false;
	unbind = [];
	attach(el) {
		this.detach();
		const kd = (e) => {
			this.keys.add(e.code);
			if ([
				"Space",
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight"
			].includes(e.code)) e.preventDefault();
			if (e.code === "KeyP" || e.code === "Escape") this.pausePressed = true;
			if (e.code === "Space") this.dashPressed = true;
			if (e.code === "KeyQ") this.skill1Pressed = true;
			if (e.code === "KeyE") this.skill2Pressed = true;
			if (e.code === "KeyR") this.ultPressed = true;
		};
		const ku = (e) => {
			this.keys.delete(e.code);
		};
		const blur = () => this.keys.clear();
		const md = (e) => {
			if (e.button === 0 || e.button === 2) {
				this.pointer.down = true;
				this.attackHeld = true;
				this.attackPressed = true;
			}
		};
		const mu = (e) => {
			if (e.button === 0 || e.button === 2) {
				this.pointer.down = false;
				this.attackHeld = false;
			}
		};
		const mm = (e) => {
			const r = el.getBoundingClientRect();
			this.pointer.x = e.clientX - r.left;
			this.pointer.y = e.clientY - r.top;
		};
		const contextmenu = (e) => e.preventDefault();
		window.addEventListener("keydown", kd);
		window.addEventListener("keyup", ku);
		window.addEventListener("blur", blur);
		el.addEventListener("mousedown", md);
		el.addEventListener("contextmenu", contextmenu);
		window.addEventListener("mouseup", mu);
		el.addEventListener("mousemove", mm);
		this.unbind = [
			() => window.removeEventListener("keydown", kd),
			() => window.removeEventListener("keyup", ku),
			() => window.removeEventListener("blur", blur),
			() => el.removeEventListener("mousedown", md),
			() => el.removeEventListener("contextmenu", contextmenu),
			() => window.removeEventListener("mouseup", mu),
			() => el.removeEventListener("mousemove", mm)
		];
	}
	detach() {
		for (const u of this.unbind) u();
		this.unbind = [];
	}
	axis() {
		let x = this.move.x;
		let y = this.move.y;
		const k = this.mergedKeys();
		if (k.has("KeyA") || k.has("ArrowLeft")) x -= 1;
		if (k.has("KeyD") || k.has("ArrowRight")) x += 1;
		if (k.has("KeyW") || k.has("ArrowUp")) y -= 1;
		if (k.has("KeyS") || k.has("ArrowDown")) y += 1;
		const len = Math.hypot(x, y);
		if (len > 1) {
			x /= len;
			y /= len;
		}
		return {
			x,
			y
		};
	}
	wantAttack() {
		return this.attackHeld || this.attackPressed || this.mergedKeys().has("KeyJ") || this.pointer.down;
	}
	wantDash() {
		return this.dashPressed;
	}
	mergedKeys() {
		if (this.qaKeys.size === 0) return this.keys;
		const s = new Set(this.keys);
		for (const c of this.qaKeys) s.add(c);
		return s;
	}
	endFrame() {
		this.attackPressed = false;
		this.dashPressed = false;
		this.skill1Pressed = false;
		this.skill2Pressed = false;
		this.ultPressed = false;
		this.pausePressed = false;
	}
};
var ctx = null;
var master = null;
var musicBus = null;
var sfxBus = null;
var unlocked = false;
var musicTimer = null;
var musicMode = "none";
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const C = window.AudioContext || window.webkitAudioContext;
		if (!C) return null;
		ctx = new C({ latencyHint: "interactive" });
		master = ctx.createGain();
		musicBus = ctx.createGain();
		sfxBus = ctx.createGain();
		musicBus.connect(master);
		sfxBus.connect(master);
		master.connect(ctx.destination);
		master.gain.value = .8;
		musicBus.gain.value = .4;
		sfxBus.gain.value = .8;
	}
	return ctx;
}
function unlockAudio() {
	const c = ac();
	if (!c) return;
	if (c.state === "suspended") c.resume();
	unlocked = true;
}
function applyAudioSettings(s) {
	if (!master || !musicBus || !sfxBus) return;
	const t = ac()?.currentTime ?? 0;
	master.gain.setTargetAtTime(s.master * s.master, t, .02);
	musicBus.gain.setTargetAtTime(s.music * s.music, t, .02);
	sfxBus.gain.setTargetAtTime(s.sfx * s.sfx, t, .02);
}
function env(g, a, d, v) {
	const c = ac();
	if (!c) return;
	const now = c.currentTime;
	g.gain.cancelScheduledValues(now);
	g.gain.setValueAtTime(1e-4, now);
	g.gain.exponentialRampToValueAtTime(v, now + a);
	g.gain.exponentialRampToValueAtTime(1e-4, now + a + d);
}
function tone(freq, dur, type, vol, bus, slide) {
	const c = ac();
	if (!c || !unlocked) return;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.value = freq;
	if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), c.currentTime + dur);
	o.connect(g);
	g.connect(bus);
	env(g, .01, dur, vol);
	o.start();
	o.stop(c.currentTime + dur + .05);
}
function noise(dur, vol, bus, hp = 400) {
	const c = ac();
	if (!c || !unlocked) return;
	const n = c.createBufferSource();
	const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	n.buffer = buf;
	const f = c.createBiquadFilter();
	f.type = "highpass";
	f.frequency.value = hp;
	const g = c.createGain();
	n.connect(f);
	f.connect(g);
	g.connect(bus);
	env(g, .005, dur, vol);
	n.start();
}
var Sfx = {
	ui() {
		if (!sfxBus) return;
		tone(520, .06, "square", .08, sfxBus);
	},
	click() {
		if (!sfxBus) return;
		tone(640, .05, "square", .07, sfxBus);
	},
	slash() {
		if (!sfxBus) return;
		noise(.07, .18, sfxBus, 900);
		tone(240 + Math.random() * 80, .08, "sawtooth", .09, sfxBus, .4);
	},
	crit() {
		if (!sfxBus) return;
		tone(880, .12, "square", .12, sfxBus, 1.4);
		noise(.1, .2, sfxBus, 600);
	},
	hit() {
		if (!sfxBus) return;
		tone(140, .1, "sawtooth", .12, sfxBus, .5);
		noise(.08, .16, sfxBus, 200);
	},
	dash() {
		if (!sfxBus) return;
		noise(.09, .14, sfxBus, 1200);
		tone(420, .1, "triangle", .07, sfxBus, 1.8);
	},
	skill() {
		if (!sfxBus) return;
		tone(300, .18, "sawtooth", .1, sfxBus, 2.2);
		tone(600, .14, "square", .06, sfxBus, 1.6);
	},
	ult() {
		if (!sfxBus) return;
		tone(110, .4, "sawtooth", .16, sfxBus, 3);
		tone(220, .35, "square", .1, sfxBus, 2.4);
	},
	kill() {
		if (!sfxBus) return;
		tone(180, .16, "triangle", .1, sfxBus, .5);
	},
	pickup() {
		if (!sfxBus) return;
		tone(720, .1, "square", .08, sfxBus, 1.5);
	},
	chest() {
		if (!sfxBus) return;
		tone(200, .2, "triangle", .1, sfxBus, 2);
		tone(400, .16, "square", .06, sfxBus, 1.8);
	},
	hurt() {
		if (!sfxBus) return;
		tone(90, .18, "sawtooth", .16, sfxBus, .6);
	},
	die() {
		if (!sfxBus) return;
		tone(80, .5, "sawtooth", .18, sfxBus, .3);
	},
	win() {
		if (!sfxBus) return;
		tone(330, .2, "square", .1, sfxBus, 1.2);
		tone(490, .25, "square", .08, sfxBus, 1.3);
		tone(660, .3, "triangle", .08, sfxBus, 1.2);
	},
	bless() {
		if (!sfxBus) return;
		tone(520, .18, "triangle", .1, sfxBus, 1.6);
		tone(780, .22, "sine", .08, sfxBus, 1.4);
	}
};
function note(freq, t, dur, vol) {
	const c = ac();
	if (!c || !musicBus || !unlocked) return;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = "triangle";
	o.frequency.value = freq;
	o.connect(g);
	g.connect(musicBus);
	const now = c.currentTime + t;
	g.gain.setValueAtTime(1e-4, now);
	g.gain.exponentialRampToValueAtTime(vol, now + .03);
	g.gain.exponentialRampToValueAtTime(1e-4, now + dur);
	o.start(now);
	o.stop(now + dur + .05);
}
var DORIAN = [
	110,
	123,
	131,
	147,
	165,
	175,
	196,
	220
];
function playPhrase(mode) {
	if (!unlocked || mode === "none") return;
	const root = mode === "boss" ? 98 : mode === "menu" ? 82 : 110;
	const scale = DORIAN.map((n) => n * (root / 110));
	const bars = mode === "boss" ? 8 : 6;
	for (let i = 0; i < bars; i++) {
		const f = scale[i % scale.length];
		note(f, i * .55, .5, mode === "boss" ? .05 : .035);
		if (i % 2 === 0) note(f * 1.5, i * .55 + .18, .28, .02);
		if (mode === "boss" && i % 3 === 0) note(f * .5, i * .55, .7, .04);
	}
	const wait = bars * 550 + 200;
	musicTimer = window.setTimeout(() => playPhrase(musicMode), wait);
}
function setMusic(mode) {
	if (musicMode === mode) return;
	musicMode = mode;
	if (musicTimer != null) {
		clearTimeout(musicTimer);
		musicTimer = null;
	}
	if (mode === "none") return;
	playPhrase(mode);
}
if (typeof window !== "undefined") document.addEventListener("visibilitychange", () => {
	const c = ac();
	if (!c) return;
	if (document.hidden) c.suspend();
	else if (unlocked) c.resume();
});
var nid = 1;
var id = () => nid++;
var Game = class {
	input = new Input();
	rng;
	hero;
	biome = "citadel";
	act = 1;
	overlay = "none";
	tutorialStep = 0;
	tutorial = false;
	cells = [];
	spawn = {
		x: 0,
		y: 0
	};
	exit = {
		x: 0,
		y: 0
	};
	roomType = "combat";
	roomCleared = false;
	chest;
	traps = [];
	px = 0;
	py = 0;
	pvx = 0;
	pvy = 0;
	aim = 0;
	hp = 100;
	maxHp = 100;
	energy = 0;
	combo = 0;
	comboT = 0;
	invuln = 0;
	flash = 0;
	atkCd = 0;
	dashCd = 0;
	dashCharges = 1;
	dashMax = 1;
	dashing = 0;
	dashAng = 0;
	sk1 = 0;
	sk2 = 0;
	facing = 1;
	hitstop = 0;
	trauma = 0;
	camX = 0;
	camY = 0;
	time = 0;
	roomTime = 0;
	stillBlood = false;
	usedStill = false;
	usedCheatDeath = false;
	enemies = [];
	projectiles = [];
	particles = [];
	floats = [];
	pickups = [];
	slashes = [];
	clones = [];
	orbs = [];
	hazards = [];
	blessings = [];
	synergies = [];
	curses = [];
	blessingChoices = [];
	event;
	shop = [];
	chestRewards = [];
	graph = [];
	floor = 0;
	node = 0;
	karma = 0;
	gold = 0;
	runGems = 0;
	stats = emptyStats();
	paused = false;
	statsCache;
	meta;
	shakeOn = true;
	numbersOn = true;
	lowFx = false;
	haptics = true;
	autoAim = true;
	lastPos = {
		x: 0,
		y: 0
	};
	constructor(meta) {
		this.meta = meta;
		this.rng = new Rng(Math.random() * 1e9 | 0);
		this.hero = HERO_BY_ID[meta.selectedHero] ?? HERO_BY_ID.zero;
		this.shakeOn = meta.settings.shake;
		this.numbersOn = meta.settings.numbers;
		this.lowFx = meta.settings.lowFx;
		this.haptics = meta.settings.haptics;
		this.autoAim = meta.settings.autoAim;
	}
	startRun(opts) {
		this.rng = new Rng(Math.random() * 1e9 | 0);
		this.hero = HERO_BY_ID[this.meta.selectedHero] ?? HERO_BY_ID.zero;
		this.act = 1;
		this.biome = "citadel";
		this.blessings = [];
		this.synergies = [];
		this.curses = [];
		this.gold = 0;
		this.runGems = 0;
		this.karma = 0;
		this.energy = 0;
		this.combo = 0;
		this.stats = emptyStats();
		this.tutorial = !!opts?.tutorial || !this.meta.tutorialDone;
		this.tutorialStep = this.tutorial ? 1 : 0;
		this.graph = generateGraph(this.rng, this.tutorial ? 5 : 8);
		this.floor = 0;
		this.node = 0;
		this.recompute();
		this.hp = this.maxHp;
		this.dashCharges = this.statsCache.dashCharges;
		this.dashMax = this.statsCache.dashCharges;
		this.usedCheatDeath = false;
		this.usedStill = false;
		this.enterNode();
		this.overlay = "none";
		if (this.tutorial) this.tutorialStep = 1;
	}
	recompute() {
		const h = this.hero;
		const hl = this.meta.heroLevels[h.id] ?? 1;
		const hs = this.meta.heroStars[h.id] ?? 1;
		const leg = this.meta.legacy;
		let atk = h.attack + (hl - 1) * 2 + (hs - 1) * 4 + (leg.edge ?? 0) * 2.5;
		let hp = h.hp + (hl - 1) * 6 + (hs - 1) * 12 + (leg.vitality ?? 0) * 8;
		let def = h.defense;
		let move = h.moveSpeed;
		let atkSpd = h.attackSpeed;
		let crit = h.crit + (leg.precision ?? 0) * .012;
		let critDmg = h.critDmg;
		const range = h.range;
		let skillDmg = 1;
		let cdr = 0;
		let lifesteal = h.id === "vex" ? .03 : 0;
		let dashCharges = 1;
		let dashCd = 1.2 * (1 - (leg.swift ?? 0) * .03);
		let goldPct = (leg.wealth ?? 0) * .06;
		let onKillHeal = 0;
		let thorns = 0;
		let ignite = 0;
		let lightning = false;
		let supernova = 0;
		let voidEcho = 0;
		let phantom = false;
		let bloodRage = false;
		let glass = false;
		for (const slot of Object.keys(this.meta.equipped)) {
			const uid = this.meta.equipped[slot];
			if (!uid) continue;
			const owned = this.meta.inventory.find((i) => i.uid === uid);
			if (!owned) continue;
			const d = EQUIP_BY_ID[owned.defId];
			if (!d) continue;
			const sc = 1 + (owned.level - 1) * .15;
			atk += (d.attack ?? 0) * sc;
			def += (d.defense ?? 0) * sc;
			hp += (d.hp ?? 0) * sc;
			crit += d.crit ?? 0;
			atkSpd *= 1 + (d.atkSpd ?? 0);
			move *= 1 + (d.move ?? 0);
			if (d.perk?.includes("lifesteal") || d.id === "wep_crimson_reaper") lifesteal += .06;
			if (d.id === "boot_zephyr") dashCd *= .75;
			if (d.id === "relic_chrono") cdr += .25;
			if (d.id === "relic_coin") goldPct += .35;
			if (d.id === "arm_void") {}
		}
		this.stillBlood = false;
		for (const b of this.blessings) {
			atk += b.attack ?? 0;
			atk *= 1 + (b.attackPct ?? 0);
			hp += b.hp ?? 0;
			hp *= 1 + (b.hpPct ?? 0);
			def += b.defense ?? 0;
			move *= 1 + (b.move ?? 0);
			atkSpd *= 1 + (b.atkSpd ?? 0);
			crit += b.crit ?? 0;
			critDmg += b.critDmg ?? 0;
			skillDmg += b.skillDmg ?? 0;
			cdr += b.cdr ?? 0;
			lifesteal += b.lifesteal ?? 0;
			dashCharges += b.dashCharges ?? 0;
			dashCd *= 1 - (b.dashCd ?? 0);
			goldPct += b.goldPct ?? 0;
			onKillHeal += b.onKillHeal ?? 0;
			thorns += b.thorns ?? 0;
			ignite += b.ignite ?? 0;
			if (b.lightning) lightning = true;
			supernova += b.supernova ?? 0;
			voidEcho += b.voidEcho ?? 0;
			if (b.phantom) phantom = true;
			if (b.bloodRage) bloodRage = true;
			if (b.glass) glass = true;
			if (b.id === "still_blood") this.stillBlood = true;
		}
		for (const c of this.curses) {
			const cur = CURSES[c];
			if (!cur) continue;
			if (cur.hpPct) hp *= 1 + cur.hpPct;
			if (cur.attackPct) atk *= 1 + cur.attackPct;
		}
		this.maxHp = Math.max(20, hp);
		this.hp = Math.min(this.hp, this.maxHp);
		this.dashMax = Math.max(1, dashCharges);
		this.statsCache = {
			maxHp: this.maxHp,
			attack: atk,
			defense: def,
			move,
			atkSpd,
			crit: Math.min(.75, crit),
			critDmg,
			range,
			skillDmg,
			cdr: Math.min(.45, cdr),
			lifesteal,
			dashCharges: this.dashMax,
			dashCd: Math.max(.45, dashCd),
			goldPct,
			onKillHeal,
			thorns,
			ignite,
			lightning,
			supernova,
			voidEcho,
			phantom,
			bloodRage,
			glass
		};
	}
	enterNode() {
		const node = this.graph[this.floor]?.[this.node];
		if (!node) return;
		this.roomType = node.type;
		this.roomCleared = false;
		this.roomTime = 0;
		this.usedStill = false;
		this.enemies = [];
		this.projectiles = [];
		this.particles = [];
		this.pickups = [];
		this.slashes = [];
		this.hazards = [];
		this.orbs = [];
		const map = generateRoom(this.rng, node.type);
		this.cells = map.cells;
		this.spawn = map.spawn;
		this.exit = map.exit;
		const sp = worldOf(map.spawn.x, map.spawn.y);
		this.px = sp.x;
		this.py = sp.y;
		this.pvx = 0;
		this.pvy = 0;
		this.camX = this.px;
		this.camY = this.py;
		this.chest = map.chest ? {
			x: map.chest.x,
			y: map.chest.y,
			open: false
		} : void 0;
		this.traps = map.traps.map((t) => ({
			...t,
			t: this.rng.range(0, 2)
		}));
		this.overlay = "none";
		const hpScale = 1 + (this.floor + (this.act - 1) * 8) * .18;
		const atkScale = 1 + (this.floor + (this.act - 1) * 8) * .12;
		if (node.type === "combat" || node.type === "trap") {
			const kinds = this.act === 1 ? [
				"goblin",
				"skeleton",
				"bat"
			] : [
				"cultist",
				"spider",
				"bat"
			];
			const n = this.tutorial && this.floor === 0 ? 3 : node.enemyCount;
			for (let i = 0; i < n; i++) this.spawnEnemy(this.rng.pick(kinds), hpScale, atkScale);
		} else if (node.type === "elite") {
			this.spawnEnemy(this.floor >= 5 || this.act > 1 ? "berserker" : "knight", hpScale * 1.1, atkScale);
			if (this.floor >= 5) this.spawnEnemy("cultist", hpScale, atkScale);
		} else if (node.type === "boss") this.spawnEnemy(this.act === 1 ? "gatekeeper" : "widow", hpScale, atkScale);
		else if (node.type === "event") {
			this.event = this.rng.pick(EVENTS);
			this.overlay = "event";
		} else if (node.type === "shop") {
			this.rollShop();
			this.overlay = "shop";
		} else if (node.type === "treasure") this.overlay = "none";
		else if (node.type === "heal") {
			this.hp = Math.min(this.maxHp, this.hp + this.maxHp * .45);
			this.float(this.px, this.py - 20, `+${Math.round(this.maxHp * .45)}`, "#3dba7a", false);
		} else if (node.type === "shrine") {
			this.blessingChoices = rollBlessings(this.rng, this.blessings, 3);
			this.overlay = "blessing";
		}
	}
	spawnEnemy(kind, hpS, atkS) {
		const def = ENEMIES[kind];
		let pos = {
			x: 13,
			y: 4
		};
		for (let i = 0; i < 30; i++) {
			const c = 2 + this.rng.int(13);
			const r = 2 + this.rng.int(9);
			if (this.cells[r][c] !== 0) continue;
			const w = worldOf(c, r);
			if (Math.hypot(w.x - this.px, w.y - this.py) < 90) continue;
			pos = {
				x: c,
				y: r
			};
			break;
		}
		const w = worldOf(pos.x, pos.y);
		const curseDmg = this.curses.includes("vengeance") ? 1.25 : 1;
		this.enemies.push({
			id: id(),
			kind,
			x: w.x,
			y: w.y,
			vx: 0,
			vy: 0,
			hp: def.hp * hpS,
			maxHp: def.hp * hpS,
			attack: def.attack * atkS * curseDmg,
			speed: def.speed,
			range: def.range,
			r: def.radius,
			cd: this.rng.range(.3, 1.2),
			telegraph: 0,
			telMax: def.telegraph,
			telAng: 0,
			telKind: def.isRanged ? "ranged" : def.isFlying ? "dash" : def.isBoss ? "slam" : "melee",
			flash: 0,
			facing: -1,
			phase: 1,
			burn: 0,
			chill: 0,
			marks: 0,
			alive: true,
			elite: !!def.isElite || !!def.isBoss
		});
	}
	update(dt) {
		if (this.overlay === "pause" || this.overlay === "defeat" || this.overlay === "victory") {
			this.input.endFrame();
			return;
		}
		if (this.overlay === "blessing" || this.overlay === "event" || this.overlay === "shop" || this.overlay === "chest" || this.overlay === "map" || this.overlay === "tutorial") {
			this.time += dt;
			this.tickFx(dt);
			this.input.endFrame();
			return;
		}
		if (this.hitstop > 0) {
			this.hitstop -= dt;
			this.tickFx(dt * .3);
			this.input.endFrame();
			return;
		}
		dt = Math.min(dt, .05);
		this.time += dt;
		this.roomTime += dt;
		this.stats.time += dt;
		const st = this.statsCache;
		const axis = this.input.axis();
		if (this.dashing > 0) {
			this.dashing -= dt;
			const sp = 520;
			this.pvx = Math.cos(this.dashAng) * sp;
			this.pvy = Math.sin(this.dashAng) * sp;
			this.invuln = Math.max(this.invuln, this.dashing);
			if (this.lowFx === false) this.burst(this.px, this.py, st.glass ? "#ece6dc" : "#2ec4d6", 3);
		} else {
			let spd = st.move;
			if (st.bloodRage) spd *= 1 + (1 - this.hp / this.maxHp) * .35;
			if (this.hero.id === "kael" && this.combo >= 8) spd *= 1.25;
			this.pvx = axis.x * spd;
			this.pvy = axis.y * spd;
		}
		this.moveBody(true, dt);
		if (this.pvx !== 0 || this.pvy !== 0) {
			if (Math.abs(this.pvx) > 4) this.facing = this.pvx > 0 ? 1 : -1;
			this.tutorialAdvance(1);
		}
		const nearest = this.nearestEnemy(280);
		let aimX = Math.cos(this.aim);
		let aimY = Math.sin(this.aim);
		if (this.autoAim && nearest) {
			aimX = nearest.x - this.px;
			aimY = nearest.y - this.py;
			const len = Math.hypot(aimX, aimY) || 1;
			aimX /= len;
			aimY /= len;
			this.aim = Math.atan2(aimY, aimX);
		} else if (axis.x || axis.y) {
			this.aim = Math.atan2(axis.y, axis.x);
			aimX = Math.cos(this.aim);
			aimY = Math.sin(this.aim);
		}
		this.atkCd = Math.max(0, this.atkCd - dt);
		this.sk1 = Math.max(0, this.sk1 - dt);
		this.sk2 = Math.max(0, this.sk2 - dt);
		this.invuln = Math.max(0, this.invuln - dt);
		this.flash = Math.max(0, this.flash - dt * 3);
		this.comboT = Math.max(0, this.comboT - dt);
		if (this.comboT <= 0) this.combo = 0;
		this.dashCd = Math.max(0, this.dashCd - dt);
		if (this.dashCd <= 0 && this.dashCharges < this.dashMax) {
			this.dashCharges++;
			this.dashCd = st.dashCd;
		}
		if (this.input.wantDash() && this.dashing <= 0 && this.dashCharges > 0) this.doDash(axis.x, axis.y);
		if (this.input.wantAttack() && this.atkCd <= 0) this.doAttack(aimX, aimY);
		if (this.input.skill1Pressed && this.sk1 <= 0) this.doSkill(1, nearest);
		if (this.input.skill2Pressed && this.sk2 <= 0) this.doSkill(2, nearest);
		if (this.input.ultPressed && this.energy >= 100) this.doUlt(nearest);
		if (this.input.pausePressed) this.overlay = "pause";
		if (st.supernova > 0 && (axis.x || axis.y) && this.rng.chance(st.supernova * dt * 1.8)) this.nova(this.px, this.py, 70, st.attack * .7, "#f0c060");
		if (this.hero.id === "sol" && (axis.x || axis.y)) {
			if (this.rng.chance(dt * 4)) this.hazards.push({
				x: this.px,
				y: this.py,
				r: 16,
				t: 1.4,
				dmg: st.attack * .15
			});
		}
		this.updateEnemies(dt);
		this.updateProjectiles(dt);
		this.updateHazards(dt);
		this.updateClones(dt);
		this.updateOrbs(dt);
		this.updatePickups(dt);
		this.tickTraps(dt);
		this.tickFx(dt);
		this.camX += (this.px - this.camX) * (1 - Math.exp(-7 * dt));
		this.camY += (this.py - this.camY) * (1 - Math.exp(-7 * dt));
		this.trauma = Math.max(0, this.trauma - dt * 1.8);
		if (!this.roomCleared && this.enemies.every((e) => !e.alive) && combatRoom$1(this.roomType)) this.onRoomClear();
		if (!combatRoom$1(this.roomType) && this.roomType !== "treasure") {}
		this.tryExit();
		this.lastPos = {
			x: this.px,
			y: this.py
		};
		this.input.endFrame();
	}
	moveBody(player, dt) {
		const r = player ? 10 : 10;
		const steps = 1;
		for (let i = 0; i < steps; i++) {
			this.px += this.pvx * dt;
			this.resolve(true, r);
			this.py += this.pvy * dt;
			this.resolve(false, r);
		}
	}
	resolve(xAxis, r) {
		const minC = Math.floor((this.px - r) / 32);
		const maxC = Math.floor((this.px + r) / 32);
		const minR = Math.floor((this.py - r) / 32);
		const maxR = Math.floor((this.py + r) / 32);
		for (let row = minR; row <= maxR; row++) for (let col = minC; col <= maxC; col++) {
			if (col < 0 || row < 0 || col >= 17 || row >= 13) continue;
			if (this.cells[row][col] === 0) continue;
			const left = col * 32;
			const top = row * 32;
			const right = left + 32;
			const bot = top + 32;
			const cx = Math.max(left, Math.min(this.px, right));
			const cy = Math.max(top, Math.min(this.py, bot));
			const dx = this.px - cx;
			const dy = this.py - cy;
			const d2 = dx * dx + dy * dy;
			if (d2 >= r * r) continue;
			if (d2 === 0) {
				if (xAxis) this.px = this.pvx > 0 ? left - r : right + r;
				else this.py = this.pvy > 0 ? top - r : bot + r;
				continue;
			}
			const d = Math.sqrt(d2);
			const push = (r - d) / d;
			this.px += dx * push;
			this.py += dy * push;
		}
		this.px = Math.max(r + 2, Math.min(544 - r - 2, this.px));
		this.py = Math.max(r + 2, Math.min(416 - r - 2, this.py));
	}
	doDash(ax, ay) {
		let dx = ax;
		let dy = ay;
		if (!dx && !dy) {
			dx = Math.cos(this.aim);
			dy = Math.sin(this.aim);
		}
		const len = Math.hypot(dx, dy) || 1;
		this.dashAng = Math.atan2(dy / len, dx / len);
		this.dashing = .16;
		this.dashCharges--;
		this.dashCd = this.statsCache.dashCd;
		this.invuln = .16;
		bumpMission(this.meta, "dash", 1);
		Sfx.dash();
		if (this.statsCache.phantom) this.clones.push({
			x: this.px,
			y: this.py,
			t: 1.6,
			ang: this.aim
		});
		if (this.hero.id === "zero") this.clones.push({
			x: this.px,
			y: this.py,
			t: .4,
			ang: this.aim
		});
		this.tutorialAdvance(3);
	}
	doAttack(ax, ay) {
		const st = this.statsCache;
		let spd = st.atkSpd;
		if (st.bloodRage) spd *= 1 + (1 - this.hp / this.maxHp) * .8;
		if (this.hero.id === "kael" && this.combo >= 8) spd *= 1.25;
		this.atkCd = 1 / Math.max(.4, spd);
		const ang = Math.atan2(ay, ax);
		this.aim = ang;
		this.slashes.push({
			x: this.px + ax * 18,
			y: this.py + ay * 18,
			ang,
			life: .16,
			color: this.hero.accent
		});
		Sfx.slash();
		this.tutorialAdvance(2);
		if (this.hero.id === "lyra" || this.hero.id === "vex" || this.hero.id === "nyx") {
			const speed = this.hero.id === "lyra" ? 380 : 300;
			this.projectiles.push({
				id: id(),
				x: this.px + ax * 14,
				y: this.py + ay * 14,
				vx: ax * speed,
				vy: ay * speed,
				dmg: st.attack,
				r: 5,
				life: .9,
				friendly: true,
				kind: "player",
				color: this.hero.accent,
				pierce: this.hero.id === "lyra" ? 1 : 0
			});
			return;
		}
		this.meleeHit(this.px, this.py, ang, st.range, Math.PI * .55, st.attack, false);
	}
	meleeHit(x, y, ang, range, arc, dmg, skill) {
		this.statsCache;
		for (const e of this.enemies) {
			if (!e.alive) continue;
			const dx = e.x - x;
			const dy = e.y - y;
			const dist = Math.hypot(dx, dy);
			if (dist > range + e.r) continue;
			if (Math.abs(wrap(Math.atan2(dy, dx) - ang)) > arc * .5 && dist > 18) continue;
			let backstab = false;
			const toMe = Math.atan2(y - e.y, x - e.x);
			if (Math.abs(wrap(toMe - e.facing)) > 2.2) backstab = true;
			this.hurtEnemy(e, dmg, {
				skill,
				backstab
			});
		}
	}
	doSkill(which, target) {
		const st = this.statsCache;
		const cdMul = 1 - st.cdr;
		if (which === 1) this.sk1 = this.hero.skill1.cooldown * cdMul;
		else this.sk2 = this.hero.skill2.cooldown * cdMul;
		Sfx.skill();
		this.tutorialAdvance(4);
		const idn = which === 1 ? this.hero.skill1.id : this.hero.skill2.id;
		const dmg = st.attack * st.skillDmg * (which === 1 ? 1.5 : 1.7);
		this.cast(idn, dmg, target);
		if (st.voidEcho > 0) window.setTimeout(() => {
			if (this.overlay === "defeat") return;
			this.cast(idn, dmg * st.voidEcho, this.nearestEnemy(300));
		}, 280);
	}
	cast(sid, dmg, target) {
		const st = this.statsCache;
		switch (sid) {
			case "shadow_step": {
				const t = target ?? this.nearestEnemy(260);
				if (t) {
					const ang = Math.atan2(this.py - t.y, this.px - t.x);
					this.px = t.x - Math.cos(ang) * (t.r + 16);
					this.py = t.y - Math.sin(ang) * (t.r + 16);
					this.invuln = .2;
					this.hurtEnemy(t, dmg, {
						skill: true,
						crit: true
					});
				} else {
					this.px += Math.cos(this.aim) * 70;
					this.py += Math.sin(this.aim) * 70;
				}
				this.burst(this.px, this.py, "#2ec4d6", 16);
				break;
			}
			case "void_slash":
				this.slashes.push({
					x: this.px,
					y: this.py,
					ang: this.aim,
					life: .28,
					color: "#7dd3e8"
				});
				this.meleeHit(this.px, this.py, this.aim, 120, Math.PI * .7, dmg, true);
				break;
			case "rain":
				for (let i = -3; i <= 3; i++) {
					const a = this.aim + i * .12;
					this.projectiles.push({
						id: id(),
						x: this.px,
						y: this.py,
						vx: Math.cos(a) * 360,
						vy: Math.sin(a) * 360,
						dmg: dmg * .45,
						r: 4,
						life: .8,
						friendly: true,
						kind: "player",
						color: "#2ec4d6",
						pierce: 0
					});
				}
				break;
			case "pierce":
				this.projectiles.push({
					id: id(),
					x: this.px,
					y: this.py,
					vx: Math.cos(this.aim) * 520,
					vy: Math.sin(this.aim) * 520,
					dmg,
					r: 6,
					life: 1,
					friendly: true,
					kind: "player",
					color: "#9bd4e0",
					pierce: 4
				});
				break;
			case "blood_rush":
				this.flash = 1;
				this.float(this.px, this.py - 24, "BLOOD RUSH", "#e11d48", true);
				this.atkCd = 0;
				this.invuln = .15;
				break;
			case "soul_burst":
				this.float(this.px, this.py - 20, "ARMED", "#e11d48", false);
				this.nextKillBoom = dmg * 1.2;
				break;
			case "flurry":
				for (let i = 0; i < 4; i++) window.setTimeout(() => {
					this.meleeHit(this.px, this.py, this.aim + (i - 1.5) * .2, st.range + 10, Math.PI * .7, dmg * .45, true);
					this.slashes.push({
						x: this.px,
						y: this.py,
						ang: this.aim,
						life: .1,
						color: "#e0b07a"
					});
				}, i * 70);
				break;
			case "iron_palm":
				this.meleeHit(this.px, this.py, this.aim, 70, Math.PI * .8, dmg, true);
				for (const e of this.enemies) {
					if (!e.alive) continue;
					if (Math.hypot(e.x - this.px, e.y - this.py) < 80) {
						e.chill = 1.2;
						e.telegraph = 0;
					}
				}
				break;
			case "slow":
				for (const e of this.enemies) if (e.alive) e.chill = 3;
				this.float(this.px, this.py - 20, "TIME BREAK", "#7dd3e8", true);
				break;
			case "orbs":
				this.orbs = [
					{
						ang: 0,
						t: 6
					},
					{
						ang: 2.09,
						t: 6
					},
					{
						ang: 4.18,
						t: 6
					}
				];
				break;
			case "sun_strike": {
				const t = target ?? this.nearestEnemy(240);
				const x = t ? t.x : this.px + Math.cos(this.aim) * 80;
				const y = t ? t.y : this.py + Math.sin(this.aim) * 80;
				this.nova(x, y, 56, dmg, "#e07a3a");
				this.hazards.push({
					x,
					y,
					r: 40,
					t: 2.2,
					dmg: st.attack * .2
				});
				break;
			}
			case "solar_burst":
				this.nova(this.px, this.py, 90, dmg, "#f0a060");
				for (const e of this.enemies) {
					if (!e.alive) continue;
					const dx = e.x - this.px;
					const dy = e.y - this.py;
					const d = Math.hypot(dx, dy) || 1;
					if (d < 100) {
						e.x += dx / d * 40;
						e.y += dy / d * 40;
					}
				}
				break;
			default: this.nova(this.px, this.py, 60, dmg, this.hero.accent);
		}
	}
	doUlt(target) {
		this.energy = 0;
		Sfx.ult();
		this.addTrauma(.7);
		const st = this.statsCache;
		const dmg = st.attack * 2.4 * st.skillDmg;
		switch (this.hero.ult.id) {
			case "phantom":
				this.clones.push({
					x: this.px,
					y: this.py,
					t: 6,
					ang: this.aim
				});
				this.clones.push({
					x: this.px,
					y: this.py,
					t: 6,
					ang: this.aim + .4
				});
				break;
			case "eclipse":
				for (let i = 0; i < 18; i++) window.setTimeout(() => {
					const a = this.rng.range(0, Math.PI * 2);
					this.projectiles.push({
						id: id(),
						x: this.px + this.rng.range(-40, 40),
						y: this.py - 80,
						vx: Math.cos(a) * 40,
						vy: 280,
						dmg: st.attack * .7,
						r: 4,
						life: 1.2,
						friendly: true,
						kind: "player",
						color: "#2ec4d6",
						pierce: 1
					});
				}, i * 90);
				break;
			case "covenant":
				this.nova(this.px, this.py, 130, dmg, "#e11d48");
				this.hp = Math.min(this.maxHp, this.hp + this.maxHp * .2);
				break;
			case "kata":
				this.invuln = 4;
				this.atkCd = 0;
				this.float(this.px, this.py - 24, "FINAL KATA", "#e0b07a", true);
				break;
			case "collapse": {
				const cx = target?.x ?? this.px;
				const cy = target?.y ?? this.py;
				for (const e of this.enemies) {
					if (!e.alive) continue;
					e.x += (cx - e.x) * .7;
					e.y += (cy - e.y) * .7;
				}
				window.setTimeout(() => this.nova(cx, cy, 90, dmg, "#a78bfa"), 200);
				break;
			}
			case "dawn":
				for (const e of this.enemies) if (e.alive) e.burn = 6;
				this.hazards.push({
					x: this.px,
					y: this.py,
					r: 220,
					t: 6,
					dmg: st.attack * .12
				});
		}
	}
	hurtEnemy(e, amount, opts) {
		if (!e.alive) return;
		const st = this.statsCache;
		let dmg = amount;
		let crit = !!opts?.crit || this.rng.chance(st.crit);
		if (opts?.backstab) dmg *= 1.5;
		if (this.hero.id === "lyra" && e.marks >= 2) {
			crit = true;
			e.marks = 0;
		} else if (this.hero.id === "lyra") e.marks++;
		if (e.hp / e.maxHp < .3 && this.blessings.some((b) => b.id === "executioner")) dmg *= 1.3;
		if (this.hp / this.maxHp < .3 && this.blessings.some((b) => b.id === "last_stand")) dmg *= 1.4;
		if (this.synergies.includes("glass_cannon") && e.hp / e.maxHp < .15) dmg = e.hp + 1;
		if (crit) dmg *= st.critDmg;
		dmg *= 1 + Math.min(1, this.combo * .02);
		e.hp -= dmg;
		e.flash = 1;
		this.combo++;
		this.comboT = 2.1;
		this.stats.maxCombo = Math.max(this.stats.maxCombo, this.combo);
		this.stats.damage += dmg;
		this.energy = Math.min(100, this.energy + dmg * .045 + (crit ? 2 : .6));
		if (st.lifesteal > 0) this.hp = Math.min(this.maxHp, this.hp + dmg * st.lifesteal);
		if (st.ignite > 0 && this.rng.chance(st.ignite)) e.burn = Math.max(e.burn, 2.4);
		if (st.lightning) {
			let chained = 0;
			for (const o of this.enemies) {
				if (!o.alive || o.id === e.id || chained > 2) continue;
				if (Math.hypot(o.x - e.x, o.y - e.y) < 80) {
					o.hp -= dmg * .35;
					o.flash = 1;
					chained++;
					this.burst(o.x, o.y, "#f0e070", 4);
				}
			}
		}
		this.float(e.x, e.y - 16, crit ? `${Math.round(dmg)}!` : `${Math.round(dmg)}`, crit ? "#f0d78c" : "#f4eee6", crit);
		this.burst(e.x, e.y, crit ? "#f0d78c" : "#e11d48", crit ? 12 : 6);
		this.addTrauma(crit ? .35 : .18);
		this.hitstop = crit ? .055 : .025;
		if (crit) Sfx.crit();
		if (e.hp <= 0) this.killEnemy(e);
	}
	killEnemy(e) {
		e.alive = false;
		e.hp = 0;
		this.stats.kills++;
		const def = ENEMIES[e.kind];
		const g = Math.round(def.gold * (1 + this.statsCache.goldPct) * (e.elite ? 1.6 : 1));
		this.gold += g;
		this.stats.gold += g;
		this.pickups.push({
			x: e.x,
			y: e.y,
			vx: this.rng.range(-40, 40),
			vy: this.rng.range(-30, -10),
			gold: g,
			life: 4
		});
		if (this.statsCache.onKillHeal) this.hp = Math.min(this.maxHp, this.hp + this.maxHp * this.statsCache.onKillHeal);
		const boom = this.nextKillBoom;
		if (boom) {
			this.nova(e.x, e.y, 70, boom, "#e11d48");
			this.nextKillBoom = 0;
		}
		if (this.synergies.includes("blood_inferno")) this.nova(e.x, e.y, 54, this.statsCache.attack * .6, "#e11d48");
		if (def.isBoss) {
			this.stats.bosses++;
			bumpMission(this.meta, "boss", 1);
		}
		this.burst(e.x, e.y, def.color, 18);
		Sfx.kill();
		bumpMission(this.meta, "kills", 1);
		bumpAch(this.meta, "first_blood", 1);
		bumpAch(this.meta, "kills", 1);
		bumpAch(this.meta, "combo", this.combo);
	}
	nova(x, y, r, dmg, color) {
		this.burst(x, y, color, 20);
		this.addTrauma(.4);
		for (const e of this.enemies) {
			if (!e.alive) continue;
			if (Math.hypot(e.x - x, e.y - y) < r + e.r) this.hurtEnemy(e, dmg, { skill: true });
		}
	}
	hurtPlayer(amount, srcX, srcY) {
		if (this.invuln > 0 || this.overlay === "defeat") return;
		if (this.hero.id === "nyx" && this.rng.chance(.12)) {
			this.float(this.px, this.py - 18, "PHASE", "#7dd3e8", false);
			this.invuln = .2;
			return;
		}
		const dmg = Math.max(1, amount - this.statsCache.defense * .35);
		if (this.stillBlood && !this.usedStill) {
			this.usedStill = true;
			this.invuln = .8;
			this.float(this.px, this.py - 20, "STILL BLOOD", "#22d3ee", true);
			return;
		}
		this.hp -= dmg;
		this.flash = 1;
		this.invuln = .45;
		this.combo = 0;
		this.addTrauma(.55);
		Sfx.hurt();
		this.float(this.px, this.py - 18, `-${Math.round(dmg)}`, "#e11d48", false);
		const dx = this.px - srcX;
		const dy = this.py - srcY;
		const d = Math.hypot(dx, dy) || 1;
		this.px += dx / d * 18;
		this.py += dy / d * 18;
		if (this.statsCache.thorns > 0) {
			const e = this.nearestEnemy(60);
			if (e) this.hurtEnemy(e, dmg * this.statsCache.thorns, { skill: true });
		}
		if (this.hp <= 0) {
			const neck = this.meta.equipped.necklace;
			const item = this.meta.inventory.find((i) => i.uid === neck);
			if (!this.usedCheatDeath && item?.defId === "neck_abyss") {
				this.usedCheatDeath = true;
				this.hp = this.maxHp * .35;
				this.invuln = 1.2;
				this.float(this.px, this.py - 24, "UNDYING", "#c9a227", true);
				return;
			}
			this.hp = 0;
			this.overlay = "defeat";
			Sfx.die();
			this.finishRun(false);
		}
	}
	updateEnemies(dt) {
		const alive = this.enemies.filter((e) => e.alive);
		for (const e of alive) {
			e.flash = Math.max(0, e.flash - dt * 4);
			if (e.burn > 0) {
				e.burn -= dt;
				e.hp -= this.statsCache.attack * .12 * dt;
				if (e.hp <= 0) this.killEnemy(e);
			}
			if (e.chill > 0) e.chill -= dt;
			const slow = e.chill > 0 ? .4 : 1;
			const def = ENEMIES[e.kind];
			if (def.isBoss) this.updateBoss(e, dt, slow);
			const dx = this.px - e.x;
			const dy = this.py - e.y;
			const dist = Math.hypot(dx, dy) || 1;
			e.facing = Math.atan2(e.vy || dy, e.vx || dx);
			e.cd -= dt;
			if (e.telegraph > 0) {
				e.telegraph -= dt;
				if (e.telegraph <= 0) this.enemyFire(e);
				continue;
			}
			if (e.cd <= 0 && dist < e.range + 10) {
				e.telegraph = e.telMax;
				e.telAng = Math.atan2(dy, dx);
				if (def.isRanged) e.telKind = "ranged";
				else if (def.isFlying) e.telKind = "dash";
				else if (def.isBoss) e.telKind = this.rng.chance(.4) ? "aoe" : "slam";
				else e.telKind = "melee";
				continue;
			}
			let tx = dx / dist;
			let ty = dy / dist;
			if (def.isRanged && dist < e.range * .65) {
				tx = -tx;
				ty = -ty;
			}
			for (const o of alive) {
				if (o.id === e.id) continue;
				const ox = e.x - o.x;
				const oy = e.y - o.y;
				const od = Math.hypot(ox, oy) || 1;
				if (od < 28) {
					tx += ox / od;
					ty += oy / od;
				}
			}
			const sl = Math.hypot(tx, ty) || 1;
			const sp = e.speed * slow;
			e.vx = tx / sl * sp;
			e.vy = ty / sl * sp;
			e.x += e.vx * dt;
			e.y += e.vy * dt;
			this.clampEnemy(e);
			if (dist < e.r + 12 && this.invuln <= 0 && !def.isRanged) {}
		}
		this.enemies = this.enemies.filter((e) => e.alive || e.flash > 0);
	}
	updateBoss(e, dt, _slow) {
		const pct = e.hp / e.maxHp;
		const prev = e.phase;
		e.phase = pct < .35 ? 3 : pct < .7 ? 2 : 1;
		if (e.phase !== prev) {
			this.float(e.x, e.y - 28, `PHASE ${e.phase}`, "#e11d48", true);
			this.addTrauma(.6);
			if (e.phase === 2) {
				this.spawnEnemy("goblin", 1.2, 1.1);
				this.spawnEnemy("skeleton", 1.2, 1.1);
			}
		}
		if (e.phase === 3) {
			e.speed = ENEMIES[e.kind].speed * 1.35;
			e.telMax = ENEMIES[e.kind].telegraph * .7;
		}
	}
	enemyFire(e) {
		const dx = this.px - e.x;
		const dy = this.py - e.y;
		const dist = Math.hypot(dx, dy) || 1;
		const ang = e.telAng;
		if (e.telKind === "ranged") {
			const n = e.kind === "cultist" || e.phase >= 3 ? 3 : 1;
			for (let i = 0; i < n; i++) {
				const a = ang + (i - (n - 1) / 2) * .18;
				this.projectiles.push({
					id: id(),
					x: e.x,
					y: e.y,
					vx: Math.cos(a) * 180,
					vy: Math.sin(a) * 180,
					dmg: e.attack,
					r: 5,
					life: 2.2,
					friendly: false,
					kind: e.kind === "cultist" ? "blood" : "arrow",
					color: e.kind === "cultist" ? "#e11d48" : "#d8d0c0",
					pierce: 0
				});
			}
		} else if (e.telKind === "dash") {
			e.x += Math.cos(ang) * 70;
			e.y += Math.sin(ang) * 70;
			if (Math.hypot(this.px - e.x, this.py - e.y) < e.r + 16) this.hurtPlayer(e.attack, e.x, e.y);
		} else if (e.telKind === "aoe") this.hazards.push({
			x: e.x + Math.cos(ang) * 40,
			y: e.y + Math.sin(ang) * 40,
			r: 48,
			t: .35,
			dmg: e.attack * 1.1
		});
		else if (e.telKind === "slam") {
			if (dist < 70) this.hurtPlayer(e.attack * 1.2, e.x, e.y);
			this.burst(e.x, e.y, "#e11d48", 14);
		} else if (dist < e.range + 8) this.hurtPlayer(e.attack, e.x, e.y);
		e.cd = ENEMIES[e.kind].cooldown * (e.phase === 3 ? .7 : 1);
	}
	updateProjectiles(dt) {
		for (const p of this.projectiles) {
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.life -= dt;
			const c = Math.floor(p.x / 32);
			const r = Math.floor(p.y / 32);
			if (r < 0 || c < 0 || r >= 13 || c >= 17 || this.cells[r][c] === 1) {
				p.life = 0;
				continue;
			}
			if (p.friendly) for (const e of this.enemies) {
				if (!e.alive) continue;
				if (Math.hypot(e.x - p.x, e.y - p.y) < e.r + p.r) {
					this.hurtEnemy(e, p.dmg, { skill: false });
					p.pierce--;
					if (p.pierce < 0) p.life = 0;
				}
			}
			else if (this.invuln <= 0 && Math.hypot(this.px - p.x, this.py - p.y) < 12 + p.r) {
				this.hurtPlayer(p.dmg, p.x, p.y);
				p.life = 0;
			}
		}
		this.projectiles = this.projectiles.filter((p) => p.life > 0);
	}
	updateHazards(dt) {
		for (const h of this.hazards) {
			h.t -= dt;
			if (h.t > 0 && this.invuln <= 0 && Math.hypot(this.px - h.x, this.py - h.y) < h.r + 8) this.hurtPlayer(h.dmg * dt * 3, h.x, h.y);
			for (const e of this.enemies) {
				if (!e.alive) continue;
				if (Math.hypot(e.x - h.x, e.y - h.y) < h.r + e.r) e.burn = Math.max(e.burn, .6);
			}
		}
		this.hazards = this.hazards.filter((h) => h.t > 0);
	}
	updateClones(dt) {
		for (const c of this.clones) {
			c.t -= dt;
			const t = this.nearestEnemy(200);
			if (t) {
				const ang = Math.atan2(t.y - c.y, t.x - c.x);
				c.x += Math.cos(ang) * 160 * dt;
				c.y += Math.sin(ang) * 160 * dt;
				c.ang = ang;
				if (Math.hypot(t.x - c.x, t.y - c.y) < t.r + 14 && this.rng.chance(dt * 3)) this.hurtEnemy(t, this.statsCache.attack * .4, { skill: true });
			}
		}
		this.clones = this.clones.filter((c) => c.t > 0);
	}
	updateOrbs(dt) {
		for (const o of this.orbs) {
			o.t -= dt;
			o.ang += dt * 3.2;
			const x = this.px + Math.cos(o.ang) * 36;
			const y = this.py + Math.sin(o.ang) * 36;
			for (const e of this.enemies) {
				if (!e.alive) continue;
				if (Math.hypot(e.x - x, e.y - y) < e.r + 10 && this.rng.chance(dt * 6)) this.hurtEnemy(e, this.statsCache.attack * .35, { skill: true });
			}
		}
		this.orbs = this.orbs.filter((o) => o.t > 0);
	}
	updatePickups(dt) {
		for (const p of this.pickups) {
			p.life -= dt;
			const dx = this.px - p.x;
			const dy = this.py - p.y;
			const d = Math.hypot(dx, dy);
			if (d < 90) {
				p.vx += dx / (d || 1) * 280 * dt;
				p.vy += dy / (d || 1) * 280 * dt;
			}
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.vx *= .92;
			p.vy *= .92;
			if (d < 16) {
				p.life = 0;
				Sfx.pickup();
			}
		}
		this.pickups = this.pickups.filter((p) => p.life > 0);
	}
	tickTraps(dt) {
		for (const t of this.traps) {
			t.t += dt;
			if (!(Math.sin(t.t * 2.2) > .35)) continue;
			const w = worldOf(t.x, t.y);
			if (this.invuln <= 0 && Math.hypot(this.px - w.x, this.py - w.y) < 16) this.hurtPlayer(8, w.x, w.y);
		}
	}
	tickFx(dt) {
		for (const p of this.particles) {
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.life -= dt;
		}
		this.particles = this.particles.filter((p) => p.life > 0);
		if (this.lowFx && this.particles.length > 80) this.particles.length = 80;
		else if (this.particles.length > 220) this.particles.length = 220;
		for (const f of this.floats) {
			f.y += f.vy * dt;
			f.life -= dt;
		}
		this.floats = this.floats.filter((f) => f.life > 0);
		for (const s of this.slashes) s.life -= dt;
		this.slashes = this.slashes.filter((s) => s.life > 0);
	}
	clampEnemy(e) {
		e.x = Math.max(e.r + 32, Math.min(512 - e.r, e.x));
		e.y = Math.max(e.r + 32, Math.min(384 - e.r, e.y));
		const c = Math.floor(e.x / 32);
		const r = Math.floor(e.y / 32);
		if (this.cells[r]?.[c] === 1) {
			e.x += -e.vx * .05;
			e.y += -e.vy * .05;
		}
	}
	tryExit() {
		if (combatRoom$1(this.roomType) && !this.roomCleared) return;
		const ex = worldOf(this.exit.x, this.exit.y);
		if (Math.hypot(this.px - ex.x, this.py - ex.y) < 22) {
			if (this.roomType === "treasure" && this.chest && !this.chest.open) {
				this.openChest();
				return;
			}
			this.openMap();
		}
		if (this.chest && !this.chest.open) {
			const cw = worldOf(this.chest.x, this.chest.y);
			if (Math.hypot(this.px - cw.x, this.py - cw.y) < 22) this.openChest();
		}
	}
	onRoomClear() {
		this.roomCleared = true;
		this.stats.rooms++;
		if (this.roomTime <= 20) bumpAch(this.meta, "speed", 1);
		this.tutorialAdvance(5);
		if (this.roomType === "boss") {
			if (this.hp >= this.maxHp - .5) {
				this.stats.noHitBoss = true;
				bumpAch(this.meta, "nohit", 1);
			}
			this.openChest();
			return;
		}
		if (this.roomType === "combat" || this.roomType === "elite" || this.roomType === "trap") {
			this.blessingChoices = rollBlessings(this.rng, this.blessings, 3);
			this.overlay = "blessing";
		}
	}
	openMap() {
		const node = this.graph[this.floor]?.[this.node];
		if (!node) return;
		node.cleared = true;
		if (this.roomType === "boss") {
			if (this.act === 1) {
				this.act = 2;
				this.biome = "forest";
				this.graph = generateGraph(this.rng, 6);
				this.floor = 0;
				this.node = 0;
				this.hp = Math.min(this.maxHp, this.hp + this.maxHp * .4);
				this.enterNode();
				this.float(this.px, this.py - 30, "BLOOD FOREST", "#e11d48", true);
				return;
			}
			this.overlay = "victory";
			Sfx.win();
			this.finishRun(true);
			return;
		}
		if (!node.next.length) {
			this.overlay = "victory";
			this.finishRun(true);
			return;
		}
		this.overlay = "map";
	}
	pickNode(index) {
		const cur = this.graph[this.floor]?.[this.node];
		if (!cur || !cur.next.includes(index)) return;
		this.floor += 1;
		this.node = index;
		this.enterNode();
	}
	pickBlessing(idStr) {
		const b = BLESSING_BY_ID[idStr] ?? this.blessingChoices.find((x) => x.id === idStr);
		if (!b) return;
		this.blessings.push(b);
		this.stats.blessings++;
		if (b.heal) this.hp = Math.min(this.maxHp + (b.hp ?? 0), this.hp + b.heal);
		this.recompute();
		this.hp = Math.min(this.hp + (b.hp ?? 0), this.maxHp);
		if (!this.meta.discoveredBlessings.includes(b.id)) this.meta.discoveredBlessings.push(b.id);
		bumpMission(this.meta, "blessings", 1);
		bumpAch(this.meta, "blessings", this.blessings.length);
		this.checkSynergies();
		Sfx.bless();
		this.overlay = "none";
		if (this.roomCleared) this.openMap();
		this.tutorialAdvance(5);
	}
	checkSynergies() {
		const have = new Set(this.blessings.map((b) => b.id));
		for (const s of SYNERGIES) {
			if (this.synergies.includes(s.id)) continue;
			if (s.requires.every((r) => have.has(r))) {
				this.synergies.push(s.id);
				this.blessings.push(s.grant);
				this.float(this.px, this.py - 36, s.name.toUpperCase(), "#22d3ee", true);
				bumpAch(this.meta, "synergy", 1);
				this.recompute();
			}
		}
	}
	pickEvent(i) {
		const ev = this.event;
		if (!ev) return;
		const c = ev.choices[i];
		if (!c) return;
		this.karma += c.karma ?? 0;
		this.gold += c.gold ?? 0;
		this.stats.gold += Math.max(0, c.gold ?? 0);
		if (c.hpPct) {
			if (c.hpPct > 0) this.hp = Math.min(this.maxHp, this.hp + this.maxHp * c.hpPct);
			else this.hp = Math.max(1, this.hp + this.maxHp * c.hpPct);
		}
		if (c.blessingId) {
			const b = BLESSING_BY_ID[c.blessingId];
			if (b) {
				this.blessings.push(b);
				this.recompute();
			}
		}
		if (c.curseId) this.curses.push(c.curseId);
		if (c.gems) this.runGems += c.gems;
		this.event = void 0;
		this.roomCleared = true;
		this.overlay = "none";
		this.openMap();
	}
	rollShop() {
		const b = rollBlessings(this.rng, this.blessings, 2);
		this.shop = [{
			kind: "heal",
			cost: 40,
			title: "Bandage",
			desc: "Restore 40% HP."
		}, ...b.map((x) => ({
			kind: "blessing",
			blessingId: x.id,
			cost: 50 + rarityCost(x.rarity),
			title: x.name,
			desc: x.desc
		}))];
	}
	buyShop(i) {
		const o = this.shop[i];
		if (!o || this.gold < o.cost) return;
		this.gold -= o.cost;
		if (o.kind === "heal") this.hp = Math.min(this.maxHp, this.hp + this.maxHp * .4);
		if (o.kind === "blessing" && o.blessingId) {
			const b = BLESSING_BY_ID[o.blessingId];
			if (b) {
				this.blessings.push(b);
				this.recompute();
				this.checkSynergies();
			}
		}
		this.shop.splice(i, 1);
		Sfx.pickup();
	}
	leaveShop() {
		this.roomCleared = true;
		this.overlay = "none";
		this.openMap();
	}
	openChest() {
		if (this.chest) this.chest.open = true;
		Sfx.chest();
		const rolls = this.roomType === "boss" ? 3 : 1;
		this.chestRewards = [];
		for (let i = 0; i < rolls; i++) if (this.rng.chance(.45)) {
			const b = rollBlessings(this.rng, this.blessings, 1)[0];
			this.chestRewards.push({
				title: b.name,
				desc: b.desc,
				apply: () => {
					this.blessings.push(b);
					this.recompute();
					this.checkSynergies();
				}
			});
		} else {
			const g = 40 + this.floor * 12 + this.rng.int(30);
			this.chestRewards.push({
				title: `${g} Gold`,
				desc: "Blood money from the dark.",
				apply: () => {
					this.gold += g;
					this.stats.gold += g;
				}
			});
		}
		this.overlay = "chest";
	}
	pickChest(i) {
		const r = this.chestRewards[i];
		if (!r) return;
		r.apply();
		this.chestRewards = [];
		this.overlay = "none";
		this.roomCleared = true;
		if (this.roomType === "boss") this.openMap();
		else this.openMap();
	}
	finishRun(win) {
		const comboMul = 1 + this.stats.maxCombo * .03;
		const speedMul = Math.max(.6, 2 - this.stats.time / 600);
		this.stats.score = Math.round((this.stats.kills * 12 + this.stats.bosses * 400 + this.stats.damage * .08 + this.stats.gold) * comboMul * speedMul * (win ? 1.4 : 1));
		this.stats.gems = this.runGems + (win ? 12 : 3) + (this.stats.bosses > 0 ? 8 : 0);
		bumpMission(this.meta, "run", 1);
		if (win) bumpAch(this.meta, this.act >= 2 ? "widow" : "gatebreaker", 1);
	}
	nearestEnemy(max) {
		let best = null;
		let bd = max;
		for (const e of this.enemies) {
			if (!e.alive) continue;
			const d = Math.hypot(e.x - this.px, e.y - this.py);
			if (d < bd) {
				bd = d;
				best = e;
			}
		}
		return best;
	}
	burst(x, y, color, n) {
		const count = this.lowFx ? Math.ceil(n * .4) : n;
		for (let i = 0; i < count; i++) {
			const a = this.rng.range(0, Math.PI * 2);
			const s = this.rng.range(30, 140);
			this.particles.push({
				x,
				y,
				vx: Math.cos(a) * s,
				vy: Math.sin(a) * s,
				life: this.rng.range(.2, .55),
				max: .5,
				color,
				size: this.rng.range(1.5, 3.5)
			});
		}
	}
	float(x, y, text, color, crit) {
		if (!this.numbersOn && /^\d/.test(text)) return;
		this.floats.push({
			x,
			y,
			vy: crit ? -50 : -36,
			text,
			color,
			life: crit ? .9 : .7,
			crit
		});
	}
	addTrauma(v) {
		if (!this.shakeOn) return;
		this.trauma = Math.min(1, this.trauma + v);
	}
	tutorialAdvance(step) {
		if (!this.tutorial) return;
		if (this.tutorialStep === step) this.tutorialStep++;
		if (this.tutorialStep > 6) {
			this.tutorial = false;
			this.meta.tutorialDone = true;
			if (this.overlay === "tutorial") this.overlay = "none";
		}
	}
	skipTutorial() {
		this.tutorial = false;
		this.meta.tutorialDone = true;
		if (this.overlay === "tutorial") this.overlay = "none";
	}
};
function emptyStats() {
	return {
		kills: 0,
		bosses: 0,
		damage: 0,
		gold: 0,
		gems: 0,
		blessings: 0,
		maxCombo: 0,
		time: 0,
		score: 0,
		rooms: 0,
		noHitBoss: false
	};
}
function combatRoom$1(t) {
	return t === "combat" || t === "elite" || t === "boss" || t === "trap";
}
function wrap(a) {
	while (a > Math.PI) a -= Math.PI * 2;
	while (a < -Math.PI) a += Math.PI * 2;
	return a;
}
function rollBlessings(rng, have, n) {
	const ids = new Set(have.map((b) => b.id));
	const pool = BLESSINGS.filter((b) => !ids.has(b.id) && b.rarity !== "forbidden");
	const out = [];
	const weighted = [...pool];
	for (let i = 0; i < n && weighted.length; i++) {
		const pick = rng.pick(weighted);
		out.push(pick);
		const idx = weighted.indexOf(pick);
		weighted.splice(idx, 1);
	}
	return out;
}
function rarityCost(r) {
	return {
		common: 0,
		uncommon: 20,
		rare: 40,
		epic: 70,
		legendary: 110,
		mythic: 160,
		forbidden: 200
	}[r];
}
function bumpMission(meta, idStr, n) {
	const m = meta.missions[idStr] ?? {
		count: 0,
		claimed: false,
		day: ""
	};
	m.count += n;
	meta.missions[idStr] = m;
}
function bumpAch(meta, idStr, n) {
	const a = meta.achievements[idStr] ?? {
		count: 0,
		claimed: false
	};
	const def = ACHIEVEMENTS.find((x) => x.id === idStr);
	if (idStr === "combo" || idStr === "blessings" || idStr === "forge" || idStr === "roster") a.count = Math.max(a.count, n);
	else if (idStr === "gold") a.count = n;
	else a.count += n;
	if (def && a.count > def.target) a.count = Math.max(a.count, def.target);
	meta.achievements[idStr] = a;
}
var WORLD_W = 544;
var WORLD_H = 416;
var pal = {
	ink: "#0c0c10",
	hood: "#1c1c24",
	hoodL: "#2c2c38",
	skin: "#d7c4a8",
	skinD: "#b39474",
	cloth: "#2a2430",
	clothL: "#3c3444",
	blood: "#c41c3c",
	bloodL: "#e84860",
	steel: "#c8d0d8",
	steelD: "#7a8490",
	cyan: "#5ad4e0",
	gold: "#d4b45c",
	bone: "#e8e0d0",
	green: "#5a9a58",
	greenD: "#3a6a38",
	purple: "#6a5a98",
	orange: "#d47838",
	red: "#b03030"
};
function make(w, h, draw) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	draw(ctx);
	return c;
}
function px(ctx, x, y, color, s = 1) {
	ctx.fillStyle = color;
	ctx.fillRect(x * s, y * s, s, s);
}
function blitMap(ctx, map, legend, s = 1) {
	for (let y = 0; y < map.length; y++) {
		const row = map[y];
		for (let x = 0; x < row.length; x++) {
			const ch = row[x];
			if (ch === "." || ch === " ") continue;
			const col = legend[ch];
			if (col) px(ctx, x, y, col, s);
		}
	}
}
var ZERO_IDLE = [
	"..hhhhhh..",
	".hhHHHHHh.",
	".hHssssHh.",
	"..HsiiHs..",
	"..cccccc..",
	".cCTTTCCc.",
	"b.cTTTT.c.b",
	"B.cTTTT.c.B",
	"..ll..ll..",
	"..ll..ll..",
	"..dd..dd.."
];
var ZERO_RUN = [
	"..hhhhhh..",
	".hhHHHHHh.",
	".hHssssHh.",
	"..HsiiHs..",
	"..cccccc..",
	".cCTTTCCc.",
	"b..CTTT..b",
	"B..CTTT..B",
	"...ll.ll..",
	"..ll...ll.",
	"..dd...dd."
];
var heroLegend = (accent) => ({
	h: pal.hood,
	H: pal.hoodL,
	s: pal.skin,
	i: pal.ink,
	c: accent,
	C: pal.cloth,
	T: pal.clothL,
	l: pal.cloth,
	d: pal.hood,
	b: pal.steel,
	B: pal.cyan
});
var cached = null;
function heroSheet(accent, extra) {
	const legend = heroLegend(accent);
	return {
		idle: make(16, 16, (ctx) => blitMap(ctx, ZERO_IDLE, legend, 1)),
		run: make(16, 16, (ctx) => blitMap(ctx, extra ?? ZERO_RUN, legend, 1)),
		attack: make(18, 16, (ctx) => {
			blitMap(ctx, ZERO_IDLE, legend, 1);
			ctx.fillStyle = pal.steel;
			ctx.fillRect(14, 6, 4, 1);
			ctx.fillStyle = pal.cyan;
			ctx.fillRect(17, 6, 1, 1);
		})
	};
}
function blob(color, eye, horns = false, wings = false) {
	return make(16, 16, (ctx) => {
		ctx.fillStyle = pal.ink;
		ctx.fillRect(3, 4, 10, 10);
		ctx.fillStyle = color;
		ctx.fillRect(4, 5, 8, 8);
		ctx.fillStyle = eye;
		ctx.fillRect(6, 7, 2, 2);
		ctx.fillRect(10, 7, 2, 2);
		ctx.fillStyle = pal.ink;
		ctx.fillRect(6, 11, 5, 1);
		if (horns) {
			ctx.fillStyle = pal.bone;
			ctx.fillRect(4, 2, 2, 3);
			ctx.fillRect(10, 2, 2, 3);
		}
		if (wings) {
			ctx.fillStyle = color;
			ctx.fillRect(1, 6, 3, 5);
			ctx.fillRect(12, 6, 3, 5);
		}
	});
}
function tile(fill, grout, crack = false) {
	return make(16, 16, (ctx) => {
		ctx.fillStyle = fill;
		ctx.fillRect(0, 0, 16, 16);
		ctx.fillStyle = grout;
		ctx.fillRect(0, 0, 16, 1);
		ctx.fillRect(0, 0, 1, 16);
		if (crack) {
			ctx.fillStyle = grout;
			ctx.fillRect(4, 6, 7, 1);
			ctx.fillRect(10, 6, 1, 5);
		}
		ctx.fillStyle = "rgba(255,255,255,0.05)";
		ctx.fillRect(2, 2, 3, 1);
	});
}
function getAtlas() {
	if (cached) return cached;
	cached = {
		heroes: {
			zero: heroSheet("#c41c3c"),
			lyra: heroSheet("#2a8aa0"),
			vex: heroSheet("#8a2040"),
			kael: heroSheet("#c06a32"),
			nyx: heroSheet("#5a4a88"),
			sol: heroSheet("#d47838")
		},
		enemies: {
			goblin: blob(pal.green, pal.gold, true),
			skeleton: blob(pal.bone, pal.blood, false),
			bat: blob(pal.purple, pal.cyan, false, true),
			cultist: blob(pal.red, pal.gold, true),
			spider: blob(pal.orange, pal.blood, false),
			berserker: blob("#a02828", pal.gold, true),
			knight: blob("#701828", pal.steel, true),
			gatekeeper: blob("#4a3a78", pal.cyan, true),
			widow: blob("#8a3a18", pal.gold, true)
		},
		tiles: {
			floor: tile("#1a1c24", "#12141a"),
			floor2: tile("#16181f", "#101218", true),
			wall: tile("#2a2d38", "#1a1c24"),
			wallTop: tile("#3a3e4c", "#2a2d38")
		},
		fx: { slash: make(24, 16, (ctx) => {
			ctx.strokeStyle = "#f2f0ea";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(12, 8, 9, -.6, 1.2);
			ctx.stroke();
			ctx.strokeStyle = pal.cyan;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.arc(12, 8, 7, -.5, 1.1);
			ctx.stroke();
		}) },
		chest: {
			shut: make(16, 14, (ctx) => {
				ctx.fillStyle = pal.ink;
				ctx.fillRect(2, 5, 12, 8);
				ctx.fillStyle = "#6a4a24";
				ctx.fillRect(3, 6, 10, 6);
				ctx.fillStyle = pal.gold;
				ctx.fillRect(7, 8, 2, 3);
				ctx.fillStyle = "#8a6230";
				ctx.fillRect(3, 6, 10, 2);
			}),
			open: make(16, 16, (ctx) => {
				ctx.fillStyle = pal.ink;
				ctx.fillRect(2, 8, 12, 6);
				ctx.fillStyle = "#6a4a24";
				ctx.fillRect(3, 9, 10, 4);
				ctx.fillStyle = pal.gold;
				ctx.fillRect(5, 10, 6, 2);
				ctx.fillStyle = "#8a6230";
				ctx.fillRect(3, 4, 10, 5);
			})
		},
		portal: make(20, 24, (ctx) => {
			ctx.fillStyle = pal.ink;
			ctx.fillRect(2, 2, 16, 20);
			ctx.fillStyle = "#2a3a4a";
			ctx.fillRect(4, 4, 12, 16);
			ctx.fillStyle = pal.cyan;
			ctx.globalAlpha = .7;
			ctx.fillRect(7, 6, 6, 12);
			ctx.globalAlpha = 1;
		}),
		altar: make(16, 16, (ctx) => {
			ctx.fillStyle = pal.ink;
			ctx.fillRect(2, 8, 12, 7);
			ctx.fillStyle = "#3a3a44";
			ctx.fillRect(3, 9, 10, 5);
			ctx.fillStyle = pal.blood;
			ctx.fillRect(7, 4, 2, 6);
			ctx.fillStyle = pal.gold;
			ctx.fillRect(6, 3, 4, 2);
		})
	};
	return cached;
}
function Panel({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-line bg-panel/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] " + className,
		children
	});
}
function Btn({ children, onClick, variant = "ghost", disabled, className = "", wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: "rounded-md border px-4 py-2.5 font-cond text-[15px] font-semibold tracking-wide transition-colors duration-150 disabled:opacity-40 " + (wide ? "w-full " : "") + (variant === "primary" ? "bg-blood text-bone hover:bg-blood/90 border-blood-dim" : variant === "danger" ? "bg-blood-deep text-bone border-blood-dim" : variant === "gold" ? "bg-gold/15 text-gold border-gold/40 hover:bg-gold/25" : "bg-raised text-bone border-line hover:border-line-strong hover:bg-panel") + " " + className,
		children
	});
}
function Tag({ children, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-sm border px-1.5 py-0.5 font-cond text-[11px] font-semibold uppercase tracking-[0.14em]",
		style: {
			color: color ?? "#8c877e",
			borderColor: color ? color + "66" : "#2c2c38"
		},
		children
	});
}
function Currency({ gold, gems }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 font-cond text-sm tabular",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-gold",
			children: [gold, " G"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-cyan",
			children: [gems, " ◆"]
		})]
	});
}
function Back({ onClick, label = "Back" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "font-cond text-sm font-semibold uppercase tracking-[0.16em] text-mute hover:text-bone",
		children: ["← ", label]
	});
}
function HeroMark() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const c = ref.current;
		if (!c) return;
		const spr = getAtlas().heroes.zero.idle;
		const scale = 5;
		c.width = spr.width * scale;
		c.height = spr.height * scale;
		const ctx = c.getContext("2d");
		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(spr, 0, 0, c.width, c.height);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "mb-2 h-[72px] w-[72px]",
		style: { imageRendering: "pixelated" }
	});
}
function MainMenu({ onPlay }) {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const claimLogin = useMeta((s) => s.claimLogin);
	const hero = HEROES.find((h) => h.id === save.selectedHero);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, {
					gold: save.gold,
					gems: save.gems
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-cond text-xs uppercase tracking-[0.18em] text-mute",
					onClick: () => setScreen("settings"),
					children: "Settings"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-1 flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroMark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-[11px] uppercase tracking-[0.42em] text-mute",
						children: "Dark fantasy roguelike"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display mt-3 text-[34px] font-bold leading-none text-bone",
						children: ["ONE", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-blood",
							children: "ASSASIN"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-cond text-[13px] uppercase tracking-[0.28em] text-mute",
						children: "One life. One blade. One chance."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-px w-24 bg-blood/70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 max-w-[260px] text-[13px] leading-relaxed text-mute",
						children: [
							hero.name,
							" — ",
							hero.title,
							". ",
							save.runs,
							" descents. Best ",
							save.bestScore,
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					!save.claimedLogin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "gold",
						wide: true,
						onClick: () => {
							unlockAudio();
							Sfx.ui();
							claimLogin();
						},
						children: "Claim daily vow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "primary",
						wide: true,
						className: "py-3.5 text-[17px]",
						onClick: () => {
							unlockAudio();
							Sfx.ui();
							setMusic("menu");
							onPlay();
						},
						children: "Descend"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									Sfx.click();
									setScreen("heroes");
								},
								children: "Assassins"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									Sfx.click();
									setScreen("equipment");
								},
								children: "Armory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									Sfx.click();
									setScreen("legacy");
								},
								children: "Legacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									Sfx.click();
									setScreen("missions");
								},
								children: "Bounties"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									Sfx.click();
									setScreen("codex");
								},
								children: "Codex"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									Sfx.click();
									setScreen("collection");
								},
								children: "Marks"
							})
						]
					})
				]
			})
		]
	});
}
function Hub({ onRun }) {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const hero = HEROES.find((h) => h.id === save.selectedHero);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
					onClick: () => setScreen("menu"),
					label: "Menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, {
					gold: save.gold,
					gems: save.gems
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl text-bone",
				children: "The Threshold"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mute",
				children: "A ruined camp above the citadel. The portal waits."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-5 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-[11px] uppercase tracking-[0.2em] text-mute",
						children: "Ready"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg text-bone",
						children: hero.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mute",
						children: [
							hero.role,
							" · Lv ",
							save.heroLevels[hero.id],
							" · ",
							hero.title
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "primary",
						wide: true,
						className: "mt-4 py-3",
						onClick: () => {
							unlockAudio();
							Sfx.ui();
							onRun();
						},
						children: "Enter the dungeon"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-1 flex-col gap-2 overflow-auto",
				children: [
					{
						title: "Campfire",
						sub: "Change assassin",
						go: () => setScreen("heroes")
					},
					{
						title: "Blacksmith",
						sub: "Temper steel",
						go: () => setScreen("equipment")
					},
					{
						title: "Mystic",
						sub: "Blessing memory",
						go: () => setScreen("codex")
					},
					{
						title: "Altar",
						sub: "Assassin Legacy",
						go: () => setScreen("legacy")
					},
					{
						title: "Bounty board",
						sub: "Daily vows",
						go: () => setScreen("missions")
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						Sfx.click();
						s.go();
					},
					className: "flex items-center justify-between rounded-lg border border-line bg-ink px-4 py-3 text-left hover:border-line-strong",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-cond text-[15px] font-semibold text-bone",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-mute",
						children: s.sub
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mute",
						children: "→"
					})]
				}, s.title))
			})
		]
	});
}
function HeroesScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const selectHero = useMeta((s) => s.selectHero);
	const unlockHero = useMeta((s) => s.unlockHero);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("hub") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, {
					gold: save.gold,
					gems: save.gems
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Assassins"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex-1 space-y-3 overflow-auto pr-1",
				children: HEROES.map((h) => {
					const locked = !save.unlockedHeroes.includes(h.id);
					const selected = save.selectedHero === h.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "p-4 " + (selected ? "border-blood/60" : ""),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg",
									style: { color: h.accent },
									children: h.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-cond text-xs uppercase tracking-[0.16em] text-mute",
									children: h.title
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									color: h.accent,
									children: h.role
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-mute",
								children: h.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-cond text-xs text-faint",
								children: [
									"HP ",
									h.hp,
									" · ATK ",
									h.attack,
									" · ",
									h.skill1.name,
									" / ",
									h.skill2.name
								]
							}),
							locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
								wide: true,
								className: "mt-3",
								variant: "gold",
								onClick: () => {
									const ok = unlockHero(h.id);
									Sfx.ui();
									if (!ok) Sfx.hurt();
								},
								children: [
									"Unlock · ",
									h.unlockGold,
									" G · ",
									h.unlockGems,
									" ◆"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								wide: true,
								className: "mt-3",
								variant: selected ? "primary" : "ghost",
								onClick: () => {
									selectHero(h.id);
									Sfx.click();
								},
								children: selected ? "Selected" : "Take the blade"
							})
						]
					}, h.id);
				})
			})
		]
	});
}
function EquipmentScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const equipItem = useMeta((s) => s.equipItem);
	const upgradeItem = useMeta((s) => s.upgradeItem);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("hub") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, {
					gold: save.gold,
					gems: save.gems
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Armory"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex-1 space-y-2 overflow-auto pr-1",
				children: [save.inventory.map((it) => {
					const def = EQUIP_BY_ID[it.defId];
					if (!def) return null;
					const equipped = save.equipped[def.slot] === it.uid;
					const cost = it.level * 80 + 50;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "p-3 " + (equipped ? "border-gold/40" : ""),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-cond text-[15px] font-semibold text-bone",
									children: def.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-mute",
									children: [
										def.slot,
										" · Lv ",
										it.level
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									color: RARITY_COLOR[def.rarity],
									children: RARITY_LABEL[def.rarity]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-cond text-xs text-faint",
								children: [
									def.attack ? `ATK ${Math.round((def.attack ?? 0) * (1 + (it.level - 1) * .15))} ` : "",
									def.hp ? `HP ${Math.round((def.hp ?? 0) * (1 + (it.level - 1) * .15))} ` : "",
									def.perk ?? ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									className: "flex-1 py-2 text-sm",
									variant: equipped ? "primary" : "ghost",
									onClick: () => equipItem(it.uid),
									children: equipped ? "Worn" : "Equip"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
									className: "flex-1 py-2 text-sm",
									onClick: () => upgradeItem(it.uid),
									children: [
										"Temper ",
										cost,
										" G"
									]
								})]
							})
						]
					}, it.uid);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-4 pt-2 text-center text-xs text-faint",
					children: "Find new steel in treasure rooms and boss chests."
				})]
			})
		]
	});
}
function LegacyScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const buyLegacy = useMeta((s) => s.buyLegacy);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("hub") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, {
					gold: save.gold,
					gems: save.gems
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Assassin Legacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mute",
				children: "Permanent strength paid in blood-gold."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex-1 space-y-2 overflow-auto",
				children: LEGACY.map((l) => {
					const lv = save.legacy[l.id] ?? 0;
					const cost = l.base + lv * l.step;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-cond font-semibold text-bone",
									children: l.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-cond text-xs text-mute",
									children: [
										lv,
										"/",
										l.max
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-mute",
								children: l.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								wide: true,
								className: "mt-2 py-2 text-sm",
								disabled: lv >= l.max,
								onClick: () => buyLegacy(l.id),
								children: lv >= l.max ? "Maxed" : `Raise · ${cost} G`
							})
						]
					}, l.id);
				})
			})
		]
	});
}
function MissionsScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const claimMission = useMeta((s) => s.claimMission);
	const claimAchievement = useMeta((s) => s.claimAchievement);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("hub") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, {
					gold: save.gold,
					gems: save.gems
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Bounties"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex-1 space-y-2 overflow-auto",
				children: [
					MISSIONS.map((m) => {
						const st = save.missions[m.id] ?? {
							count: 0,
							claimed: false,
							day: ""
						};
						const done = st.count >= m.target;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-cond font-semibold text-bone",
									children: m.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-mute",
									children: m.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-cond text-xs tabular text-faint",
									children: [
										Math.min(st.count, m.target),
										"/",
										m.target,
										" · ",
										m.gold,
										" G · ",
										m.gems,
										" ◆"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									wide: true,
									className: "mt-2 py-2 text-sm",
									variant: done && !st.claimed ? "gold" : "ghost",
									disabled: !done || st.claimed,
									onClick: () => claimMission(m.id),
									children: st.claimed ? "Claimed" : done ? "Claim" : "In progress"
								})
							]
						}, m.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display pt-2 text-lg",
						children: "Marks of the Guild"
					}),
					ACHIEVEMENTS.map((a) => {
						const st = save.achievements[a.id] ?? {
							count: 0,
							claimed: false
						};
						const done = st.count >= a.target;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-cond font-semibold text-bone",
									children: a.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-mute",
									children: a.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-cond text-xs text-faint",
									children: [
										Math.min(st.count, a.target),
										"/",
										a.target
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									wide: true,
									className: "mt-2 py-2 text-sm",
									disabled: !done || st.claimed,
									variant: done && !st.claimed ? "gold" : "ghost",
									onClick: () => claimAchievement(a.id),
									children: st.claimed ? "Sealed" : done ? `Claim ${a.gems} ◆` : "Locked"
								})
							]
						}, a.id);
					})
				]
			})
		]
	});
}
function CodexScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("hub") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Blessing Codex"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-mute",
				children: [
					save.discoveredBlessings.length,
					"/",
					BLESSINGS.length,
					" witnessed"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex-1 space-y-2 overflow-auto",
				children: [
					BLESSINGS.map((b) => {
						const known = save.discoveredBlessings.includes(b.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-cond font-semibold text-bone",
									children: known ? b.name : "????"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									color: RARITY_COLOR[b.rarity],
									children: RARITY_LABEL[b.rarity]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-mute",
								children: known ? b.desc : "Not yet found in the dark."
							})]
						}, b.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display pt-2 text-lg",
						children: "Forbidden combinations"
					}),
					SYNERGIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-cond font-semibold text-forbidden",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-mute",
							children: s.desc
						})]
					}, s.id))
				]
			})
		]
	});
}
function CollectionScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("menu") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-sm text-mute",
						children: "Descents"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tabular",
						children: save.runs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-3 font-cond text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-mute",
								children: "Victories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-bone",
								children: save.victories
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-mute",
								children: "Kills"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-bone",
								children: save.kills
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-mute",
								children: "Best score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-gold",
								children: save.bestScore
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-mute",
								children: "Assassins"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg text-bone",
								children: [save.unlockedHeroes.length, "/6"]
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-mute",
				children: [
					"Steel in vault: ",
					save.inventory.length,
					" pieces. Catalog ",
					EQUIPMENT.length,
					"."
				]
			})
		]
	});
}
function SettingsScreen() {
	const save = useMeta((s) => s.save);
	const setScreen = useMeta((s) => s.setScreen);
	const setSettings = useMeta((s) => s.setSettings);
	const s = save.settings;
	const toggle = (k) => setSettings({ [k]: !s[k] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, { onClick: () => setScreen("menu") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-4 text-2xl",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						label: "Master",
						value: s.master,
						onChange: (v) => setSettings({ master: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						label: "Music",
						value: s.music,
						onChange: (v) => setSettings({ music: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						label: "Effects",
						value: s.sfx,
						onChange: (v) => setSettings({ sfx: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Screen shake",
						on: s.shake,
						onClick: () => toggle("shake")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Damage numbers",
						on: s.numbers,
						onClick: () => toggle("numbers")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Haptics",
						on: s.haptics,
						onClick: () => toggle("haptics")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Flash effects",
						on: s.flash,
						onClick: () => toggle("flash")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Auto aim",
						on: s.autoAim,
						onClick: () => toggle("autoAim")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Low effects",
						on: s.lowFx,
						onClick: () => toggle("lowFx")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						label: "Left-handed",
						on: s.leftHanded,
						onClick: () => toggle("leftHanded")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "flex-1",
							variant: s.language === "en" ? "primary" : "ghost",
							onClick: () => setSettings({ language: "en" }),
							children: "English"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "flex-1",
							variant: s.language === "pl" ? "primary" : "ghost",
							onClick: () => setSettings({ language: "pl" }),
							children: "Polski"
						})]
					})
				]
			})
		]
	});
}
function Slider({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-cond text-xs uppercase tracking-[0.16em] text-mute",
			children: [
				label,
				" ",
				Math.round(value * 100)
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 0,
			max: 1,
			step: .01,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "mt-1 w-full accent-blood"
		})]
	});
}
function Toggle({ label, on, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center justify-between rounded-md border border-line bg-ink px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-bone",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-cond text-xs uppercase tracking-widest " + (on ? "text-ok" : "text-mute"),
			children: on ? "On" : "Off"
		})]
	});
}
function renderGame(ctx, game, cssW, cssH, dpr) {
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	ctx.imageSmoothingEnabled = false;
	const biome = BIOMES[game.biome];
	ctx.fillStyle = biome.fog;
	ctx.fillRect(0, 0, cssW, cssH);
	const trauma = game.trauma * game.trauma;
	const shakeX = game.shakeOn ? (Math.random() - .5) * 18 * trauma : 0;
	const shakeY = game.shakeOn ? (Math.random() - .5) * 18 * trauma : 0;
	const zoom = cssW < 520 ? 1.6 : 1.4;
	const viewW = cssW / zoom;
	const viewH = cssH / zoom;
	let camX = game.camX + shakeX / zoom;
	let camY = game.camY + shakeY / zoom;
	camX = WORLD_W > viewW ? Math.max(viewW / 2 - 16, Math.min(WORLD_W - viewW / 2 + 16, camX)) : WORLD_W / 2;
	camY = WORLD_H > viewH ? Math.max(viewH / 2 - 16, Math.min(WORLD_H - viewH / 2 + 24, camY)) : WORLD_H / 2;
	ctx.save();
	ctx.translate(cssW / 2, cssH * .42);
	ctx.scale(zoom, zoom);
	ctx.translate(-camX, -camY);
	drawFloor(ctx, game, biome);
	drawTraps(ctx, game);
	drawDecor(ctx, game, biome);
	if (game.chest) drawChest(ctx, game);
	drawExit(ctx, game);
	drawHazards(ctx, game);
	drawEnemies(ctx, game);
	drawClones(ctx, game);
	drawPlayer(ctx, game);
	drawOrbs(ctx, game);
	drawProjectiles(ctx, game);
	drawSlashes(ctx, game);
	drawParticles(ctx, game);
	drawFloats(ctx, game);
	drawTelegraphs(ctx, game);
	ctx.restore();
	const g = ctx.createRadialGradient(cssW / 2, cssH * .42, cssW * .18, cssW / 2, cssH * .45, cssW * .78);
	g.addColorStop(0, "rgba(0,0,0,0)");
	g.addColorStop(1, "rgba(0,0,0,0.5)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, cssW, cssH);
	if (game.flash > 0 && game.meta.settings.flash) {
		ctx.fillStyle = `rgba(225,29,72,${game.flash * .18})`;
		ctx.fillRect(0, 0, cssW, cssH);
	}
}
function drawFloor(ctx, game, biome) {
	for (let r = 0; r < game.cells.length; r++) {
		const row = game.cells[r];
		for (let c = 0; c < row.length; c++) {
			const x = c * 32;
			const y = r * 32;
			if (row[c] === 1) {
				ctx.fillStyle = biome.wall;
				ctx.fillRect(x, y, 32, 32);
				ctx.fillStyle = biome.wallTop;
				ctx.fillRect(x, y, 32, 10);
				ctx.fillStyle = "rgba(255,255,255,0.07)";
				ctx.fillRect(x + 2, y + 2, 26, 2);
				ctx.fillStyle = "rgba(0,0,0,0.28)";
				ctx.fillRect(x, y + 32 - 5, 32, 5);
				if ((c + r) % 3 === 0) {
					ctx.fillStyle = biome.accent;
					ctx.globalAlpha = .35;
					ctx.fillRect(x + 12, y + 12, 3, 9);
					ctx.globalAlpha = 1;
				}
			} else {
				ctx.fillStyle = (c + r) % 2 === 0 ? biome.floor : biome.floorAlt;
				ctx.fillRect(x, y, 32, 32);
				ctx.fillStyle = "rgba(255,255,255,0.06)";
				ctx.fillRect(x + 2, y + 2, 8, 1);
				if ((c * 13 + r * 7) % 11 === 0) {
					ctx.fillStyle = "rgba(0,0,0,0.16)";
					ctx.fillRect(x + 8, y + 10, 10, 1);
				}
			}
		}
	}
}
function drawTraps(ctx, game) {
	for (const t of game.traps) {
		const x = t.x * 32;
		const y = t.y * 32;
		const on = Math.sin(t.t * 2.2) > .35;
		ctx.fillStyle = "#2a1a16";
		ctx.fillRect(x + 6, y + 6, 20, 20);
		if (on) {
			ctx.fillStyle = "#e11d48";
			ctx.fillRect(x + 10, y + 8, 3, 16);
			ctx.fillRect(x + 16, y + 8, 3, 16);
			ctx.fillStyle = "rgba(225,29,72,0.25)";
			ctx.fillRect(x + 4, y + 4, 24, 24);
		}
	}
}
function drawDecor(ctx, game, biome) {
	ctx.strokeStyle = biome.accent + "33";
	ctx.strokeRect(32, 32, WORLD_W - 64, WORLD_H - 64);
}
function drawChest(ctx, game) {
	const atlas = getAtlas();
	const ch = game.chest;
	const img = ch.open ? atlas.chest.open : atlas.chest.shut;
	ctx.drawImage(img, ch.x * 32 + 6, ch.y * 32 + 6, 20, ch.open ? 20 : 18);
}
function drawExit(ctx, game) {
	if (combatRoom(game) && !game.roomCleared) return;
	const atlas = getAtlas();
	const x = game.exit.x * 32 + 6;
	const y = game.exit.y * 32 + 4;
	const pulse = .6 + Math.sin(game.time * 4) * .4;
	ctx.globalAlpha = pulse;
	ctx.drawImage(atlas.portal, x, y, 20, 24);
	ctx.globalAlpha = 1;
	ctx.fillStyle = `rgba(46,196,214,${.15 + pulse * .15})`;
	ctx.beginPath();
	ctx.arc(x + 10, y + 12, 16, 0, Math.PI * 2);
	ctx.fill();
}
function combatRoom(game) {
	return game.roomType === "combat" || game.roomType === "elite" || game.roomType === "boss" || game.roomType === "trap";
}
function drawHazards(ctx, game) {
	for (const h of game.hazards) {
		ctx.fillStyle = "rgba(224,122,58,0.18)";
		ctx.beginPath();
		ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "rgba(224,122,58,0.55)";
		ctx.lineWidth = 1;
		ctx.stroke();
	}
}
function drawEnemies(ctx, game) {
	const atlas = getAtlas();
	for (const e of game.enemies) {
		if (!e.alive && e.flash <= 0) continue;
		const def = ENEMIES[e.kind];
		const sprite = atlas.enemies[e.kind] ?? atlas.enemies.goblin;
		const scale = def.isBoss ? 3.1 : def.isElite ? 2.2 : 1.9;
		const sw = 16 * scale;
		const sh = 16 * scale;
		ctx.save();
		ctx.translate(e.x, e.y);
		ctx.fillStyle = "rgba(0,0,0,0.4)";
		ctx.beginPath();
		ctx.ellipse(0, sh * .38, sw * .35, 4, 0, 0, Math.PI * 2);
		ctx.fill();
		if (e.flash > 0) ctx.filter = "brightness(2.4)";
		if (!e.alive) ctx.globalAlpha = Math.max(0, e.flash);
		ctx.drawImage(sprite, -sw / 2, -sh / 2, sw, sh);
		ctx.filter = "none";
		ctx.globalAlpha = 1;
		ctx.restore();
		if (e.alive) {
			const bw = Math.max(22, sw);
			ctx.fillStyle = "#1a1014";
			ctx.fillRect(e.x - bw / 2, e.y - sh / 2 - 8, bw, 3);
			ctx.fillStyle = def.isBoss ? "#e11d48" : "#3dba7a";
			ctx.fillRect(e.x - bw / 2, e.y - sh / 2 - 8, bw * Math.max(0, e.hp / e.maxHp), 3);
		}
		if (e.burn > 0) {
			ctx.fillStyle = "rgba(224,122,58,0.7)";
			ctx.fillRect(e.x - 3, e.y - 20, 6, 6);
		}
	}
}
function drawTelegraphs(ctx, game) {
	for (const e of game.enemies) {
		if (!e.alive || e.telegraph <= 0) continue;
		const p = 1 - e.telegraph / e.telMax;
		ctx.save();
		ctx.translate(e.x, e.y);
		ctx.rotate(e.telAng);
		ctx.globalAlpha = .28 + p * .5;
		ctx.fillStyle = "#e11d48";
		ctx.strokeStyle = "#fb7185";
		ctx.lineWidth = 2;
		if (e.telKind === "ranged") ctx.fillRect(0, -3, 220, 6);
		else if (e.telKind === "aoe" || e.telKind === "slam") {
			ctx.beginPath();
			ctx.arc(30, 0, 36 + p * 10, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
		} else if (e.telKind === "dash") {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(80, 0);
			ctx.stroke();
			ctx.fillRect(60, -5, 20, 10);
		} else {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.arc(0, 0, e.range + 6, -.7, .7);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
		ctx.restore();
	}
}
function drawPlayer(ctx, game) {
	const atlas = getAtlas();
	const set = atlas.heroes[game.hero.id] ?? atlas.heroes.zero;
	const moving = Math.hypot(game.pvx, game.pvy) > 12;
	const img = game.dashing > 0 ? set.run : moving && (game.time * 8 | 0) % 2 === 0 ? set.run : set.idle;
	const scale = 3;
	const w = img.width * scale;
	const h = img.height * scale;
	ctx.save();
	ctx.translate(game.px, game.py);
	ctx.fillStyle = "rgba(225,29,72,0.22)";
	ctx.beginPath();
	ctx.arc(0, 2, 16, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "rgba(0,0,0,0.45)";
	ctx.beginPath();
	ctx.ellipse(0, h * .34, 11, 4, 0, 0, Math.PI * 2);
	ctx.fill();
	if (game.invuln > 0) ctx.globalAlpha = .55 + Math.sin(game.time * 40) * .3;
	ctx.scale(game.facing, 1);
	if (game.flash > 0) ctx.filter = "brightness(2.5)";
	ctx.drawImage(img, -w / 2, -h / 2 - 6, w, h);
	ctx.restore();
	ctx.save();
	ctx.translate(game.px + Math.cos(game.aim) * 26, game.py + Math.sin(game.aim) * 26);
	ctx.fillStyle = "#ece6dc";
	ctx.fillRect(-2, -2, 4, 4);
	ctx.restore();
}
function drawClones(ctx, game) {
	const atlas = getAtlas();
	const set = atlas.heroes[game.hero.id] ?? atlas.heroes.zero;
	for (const c of game.clones) {
		ctx.globalAlpha = Math.min(.55, c.t);
		ctx.drawImage(set.idle, c.x - 16, c.y - 16, 32, 32);
		ctx.globalAlpha = 1;
	}
}
function drawOrbs(ctx, game) {
	for (const o of game.orbs) {
		const x = game.px + Math.cos(o.ang) * 36;
		const y = game.py + Math.sin(o.ang) * 36;
		ctx.fillStyle = "#7dd3e8";
		ctx.beginPath();
		ctx.arc(x, y, 5, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "rgba(125,211,232,0.25)";
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI * 2);
		ctx.fill();
	}
}
function drawProjectiles(ctx, game) {
	for (const p of game.projectiles) {
		ctx.fillStyle = p.color;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.r + 1, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(p.x, p.y, Math.max(1.5, p.r * .4), 0, Math.PI * 2);
		ctx.fill();
	}
}
function drawSlashes(ctx, game) {
	for (const s of game.slashes) {
		ctx.save();
		ctx.translate(s.x, s.y);
		ctx.rotate(s.ang);
		ctx.globalAlpha = Math.max(0, s.life * 5);
		ctx.strokeStyle = s.color;
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(0, 0, 24, -.9, .9);
		ctx.stroke();
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(0, 0, 18, -.7, .7);
		ctx.stroke();
		ctx.restore();
	}
}
function drawParticles(ctx, game) {
	for (const p of game.particles) {
		ctx.globalAlpha = Math.max(0, p.life / .5);
		ctx.fillStyle = p.color;
		ctx.fillRect(p.x, p.y, p.size, p.size);
	}
	ctx.globalAlpha = 1;
}
function drawFloats(ctx, game) {
	ctx.textAlign = "center";
	for (const f of game.floats) {
		ctx.globalAlpha = Math.max(0, f.life / .8);
		ctx.fillStyle = f.color;
		ctx.font = `700 ${f.crit ? 14 : 11}px Barlow Condensed, sans-serif`;
		ctx.fillText(f.text, f.x, f.y);
	}
	ctx.globalAlpha = 1;
}
var TIPS = [
	"",
	"Move — WASD or left stick",
	"Attack — click / J / right button",
	"Dash — Space / dash button. I-frames.",
	"Skill — Q and E",
	"Pick a blessing. Build the night.",
	"Walk into the cyan gate to continue."
];
function RunView({ game, onExit, onRetry }) {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const [overlay, setOverlay] = (0, import_react.useState)(game.overlay);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [isTouch, setIsTouch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		game.input.attach(wrap);
		let raf = 0;
		let last = performance.now();
		let acc = 0;
		const loop = (t) => {
			const dt = Math.min(.05, (t - last) / 1e3);
			last = t;
			game.update(dt);
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const cssW = wrap.clientWidth;
			const cssH = wrap.clientHeight;
			if (canvas.width !== Math.floor(cssW * dpr) || canvas.height !== Math.floor(cssH * dpr)) {
				canvas.width = Math.floor(cssW * dpr);
				canvas.height = Math.floor(cssH * dpr);
				canvas.style.width = cssW + "px";
				canvas.style.height = cssH + "px";
			}
			const ctx = canvas.getContext("2d");
			if (ctx) renderGame(ctx, game, cssW, cssH, dpr);
			if (game.overlay !== overlay) setOverlay(game.overlay);
			acc += dt;
			if (acc > .08) {
				acc = 0;
				setTick((n) => n + 1);
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const w = window;
		w.__controlsTest = {
			getYaw: () => game.aim,
			getSpeed: () => Math.hypot(game.pvx, game.pvy),
			getPos: () => ({
				x: game.px,
				y: game.py
			}),
			setKeys: (codes) => {
				game.input.qaKeys = new Set(codes);
			},
			setSteer: (v) => {
				game.input.qaKeys = new Set(v > .2 ? ["KeyA"] : v < -.2 ? ["KeyD"] : []);
			}
		};
		return () => {
			cancelAnimationFrame(raf);
			game.input.detach();
		};
	}, [game]);
	game.statsCache;
	const hpP = game.maxHp > 0 ? game.hp / game.maxHp : 0;
	const biome = BIOMES[game.biome];
	const boss = game.enemies.find((e) => e.alive && (e.kind === "gatekeeper" || e.kind === "widow" || e.kind === "knight"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative h-full w-full overflow-hidden bg-void",
		style: { touchAction: "none" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 h-full w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2 pr-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-8 w-8 overflow-hidden rounded-md border border-line bg-ink",
										style: { background: game.hero.accent + "33" }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-cond text-[11px] uppercase tracking-[0.16em] text-mute",
										children: game.hero.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-cond text-xs tabular text-bone",
										children: [
											Math.ceil(game.hp),
											"/",
											Math.ceil(game.maxHp)
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 h-2.5 overflow-hidden rounded-full bg-blood-deep",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-blood",
										style: { width: `${hpP * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 h-1.5 overflow-hidden rounded-full bg-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-cyan",
										style: { width: `${game.energy}%` }
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right font-cond text-xs tabular text-mute",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-gold",
									children: [game.gold, " G"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: biome.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									game.roomType,
									" · ",
									game.floor + 1
								] })
							]
						})]
					}),
					boss && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center font-display text-[12px] tracking-[0.2em] text-bone",
							children: boss.kind === "widow" ? "THE IRON WIDOW" : boss.kind === "knight" ? "BLOOD KNIGHT" : "THE GATEKEEPER"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-1 h-2 max-w-[240px] overflow-hidden rounded-full bg-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-blood",
								style: { width: `${boss.hp / boss.maxHp * 100}%` }
							})
						})]
					}),
					game.combo >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-center font-cond text-lg font-bold tabular text-bone",
						children: [
							game.combo,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-[0.2em] text-mute",
								children: "COMBO"
							})
						]
					})
				]
			}),
			game.tutorial && game.tutorialStep > 0 && game.tutorialStep < 7 && overlay === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-24 px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-md border border-line bg-ink/80 px-3 py-2 font-cond text-sm text-bone",
					children: TIPS[game.tutorialStep]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex justify-center gap-1",
					children: game.blessings.slice(0, 8).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full",
						style: { background: RARITY_COLOR[b.rarity] }
					}, b.id + b.name))
				})
			}),
			isTouch && overlay === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {
				game,
				leftHanded: game.meta.settings.leftHanded
			}),
			!isTouch && overlay === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-cond text-[11px] uppercase tracking-[0.18em] text-faint",
				children: "WASD move · Click attack · Space dash · Q E skills · R ult · Esc pause"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute right-3 top-3 z-10 rounded-md border border-line bg-ink/80 px-2 py-1 font-cond text-[11px] uppercase tracking-widest text-mute",
				onClick: () => {
					game.overlay = game.overlay === "pause" ? "none" : "pause";
					setOverlay(game.overlay);
				},
				children: "II"
			}),
			overlay !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				game,
				overlay,
				onClose: () => {
					if (overlay === "pause") game.overlay = "none";
					setOverlay(game.overlay);
				},
				onExit,
				onRetry,
				bump: () => setTick((n) => n + 1)
			})
		]
	});
}
function TouchPad({ game, leftHanded }) {
	const stick = (0, import_react.useRef)(null);
	const [knob, setKnob] = (0, import_react.useState)({
		x: 0,
		y: 0,
		on: false,
		lx: 72,
		ly: 0
	});
	const onDown = (e) => {
		const r = e.currentTarget.getBoundingClientRect();
		stick.current = {
			id: e.pointerId,
			ox: e.clientX,
			oy: e.clientY
		};
		e.currentTarget.setPointerCapture(e.pointerId);
		setKnob({
			x: 0,
			y: 0,
			on: true,
			lx: e.clientX - r.left,
			ly: e.clientY - r.top
		});
	};
	const onMove = (e) => {
		if (!stick.current || stick.current.id !== e.pointerId) return;
		const dx = e.clientX - stick.current.ox;
		const dy = e.clientY - stick.current.oy;
		const max = 42;
		const len = Math.hypot(dx, dy);
		const k = len > max ? max / len : 1;
		const x = dx * k / max;
		const y = dy * k / max;
		game.input.move = {
			x,
			y,
			active: true
		};
		setKnob((s) => ({
			...s,
			x: dx * k,
			y: dy * k
		}));
	};
	const onUp = () => {
		stick.current = null;
		game.input.move = {
			x: 0,
			y: 0,
			active: false
		};
		setKnob((s) => ({
			...s,
			on: false,
			x: 0,
			y: 0
		}));
	};
	const skillBtn = (label, sub, ready, onClick) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onPointerDown: (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (!ready) return;
			onClick();
			Sfx.click();
		},
		className: "flex h-14 w-14 flex-col items-center justify-center rounded-full border text-[10px] font-cond uppercase tracking-wider " + (ready ? "border-line-strong bg-raised text-bone" : "border-line bg-ink text-faint"),
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[9px] text-mute",
			children: sub
		})]
	});
	const stickEl = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-36 w-36",
		onPointerDown: onDown,
		onPointerMove: onMove,
		onPointerUp: onUp,
		onPointerCancel: onUp,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-4 rounded-full border border-line bg-ink/50" }), knob.on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute h-12 w-12 rounded-full border border-bone/40 bg-bone/20",
			style: {
				left: 48 + knob.x,
				top: 48 + knob.y
			}
		})]
	});
	const actions = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 mr-2 flex flex-col items-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [skillBtn("Q", game.hero.skill1.name.split(" ")[0] ?? "S1", game.sk1 <= 0, () => {
				game.input.skill1Pressed = true;
			}), skillBtn("E", game.hero.skill2.name.split(" ")[0] ?? "S2", game.sk2 <= 0, () => {
				game.input.skill2Pressed = true;
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end gap-2",
			children: [
				skillBtn("Dash", String(game.dashCharges), game.dashCharges > 0, () => {
					game.input.dashPressed = true;
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onPointerDown: (e) => {
						e.preventDefault();
						e.stopPropagation();
						game.input.attackHeld = true;
						game.input.attackPressed = true;
						e.currentTarget.setPointerCapture(e.pointerId);
					},
					onPointerUp: (e) => {
						e.preventDefault();
						game.input.attackHeld = false;
					},
					onPointerCancel: () => {
						game.input.attackHeld = false;
					},
					onPointerLeave: (e) => {
						if (e.currentTarget.hasPointerCapture(e.pointerId)) return;
						game.input.attackHeld = false;
					},
					className: "flex h-20 w-20 items-center justify-center rounded-full border border-blood/60 bg-blood text-sm font-cond font-bold uppercase tracking-wider text-bone",
					children: "ATK"
				}),
				skillBtn("R", "Ult", game.energy >= 100, () => {
					game.input.ultPressed = true;
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-x-0 bottom-0 flex items-end justify-between px-2 pb-2 " + (leftHanded ? "flex-row-reverse" : ""),
		children: [stickEl, actions]
	});
}
function Overlay({ game, overlay, onClose, onExit, onRetry, bump }) {
	if (overlay === "pause") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mx-6 w-full max-w-sm p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl",
			children: "Paused"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "primary",
				wide: true,
				onClick: onClose,
				children: "Resume"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				wide: true,
				onClick: onExit,
				children: "Return to camp"
			})]
		})]
	}) });
	if (overlay === "blessing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-4 w-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 text-center font-display text-xl",
			children: "A blessing in the dark"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: game.blessingChoices.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					game.pickBlessing(b.id);
					Sfx.bless();
					bump();
				},
				className: "rounded-lg border bg-panel p-3 text-left hover:border-line-strong",
				style: { borderColor: RARITY_COLOR[b.rarity] + "66" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-cond font-semibold text-bone",
						children: b.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						color: RARITY_COLOR[b.rarity],
						children: RARITY_LABEL[b.rarity]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-mute",
					children: b.desc
				})]
			}, b.id))
		})]
	}) });
	if (overlay === "map") {
		const cur = game.graph[game.floor]?.[game.node];
		const next = game.graph[game.floor + 1] ?? [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-4 w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1 text-center font-display text-xl",
					children: "Path of the blade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-center text-sm text-mute",
					children: "Choose the next chamber."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: next.map((n) => {
						const open = cur?.next.includes(n.index);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							wide: true,
							disabled: !open,
							variant: n.type === "boss" ? "danger" : n.type === "elite" ? "gold" : "ghost",
							onClick: () => {
								game.pickNode(n.index);
								Sfx.ui();
								bump();
							},
							children: [
								labelRoom(n.type),
								" · ",
								n.type
							]
						}, n.id);
					})
				})
			]
		}) });
	}
	if (overlay === "event" && game.event) {
		const ev = game.event;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mx-4 max-w-md p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-cond text-[11px] uppercase tracking-[0.2em] text-mute",
					children: ev.speaker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-bone",
					children: ev.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-mute",
					children: ev.dialog
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: ev.choices.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						wide: true,
						onClick: () => {
							game.pickEvent(i);
							Sfx.ui();
							bump();
						},
						children: c.label
					}, c.label))
				})
			]
		}) });
	}
	if (overlay === "shop") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "mx-4 max-w-md p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Pale Merchant"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-gold",
				children: [game.gold, " gold on you"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: [game.shop.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					wide: true,
					disabled: game.gold < o.cost,
					onClick: () => {
						game.buyShop(i);
						bump();
					},
					children: [
						o.title,
						" · ",
						o.cost,
						" G",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] font-normal text-mute",
							children: o.desc
						})
					]
				}, o.title + i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					wide: true,
					variant: "primary",
					onClick: () => {
						game.leaveShop();
						bump();
					},
					children: "Leave"
				})]
			})
		]
	}) });
	if (overlay === "chest") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-4 w-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 text-center font-display text-xl",
			children: "Take one"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: game.chestRewards.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
				wide: true,
				variant: "gold",
				onClick: () => {
					game.pickChest(i);
					bump();
				},
				children: [r.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] font-normal text-mute",
					children: r.desc
				})]
			}, r.title + i))
		})]
	}) });
	if (overlay === "defeat" || overlay === "victory") {
		const win = overlay === "victory";
		const s = game.stats;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrim, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mx-4 max-w-md p-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-cond text-[11px] uppercase tracking-[0.28em] text-mute",
					children: win ? "Dungeon cleared" : "The blade falls"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-2 text-3xl",
					children: win ? "CLEARED" : "YOU DIED"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2 font-cond text-sm tabular",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Time",
							v: fmtTime(s.time)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Kills",
							v: String(s.kills)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Combo",
							v: String(s.maxCombo)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Damage",
							v: String(Math.round(s.damage))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Gold",
							v: String(s.gold)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							k: "Score",
							v: String(s.score)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "primary",
						wide: true,
						onClick: onRetry,
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						wide: true,
						onClick: onExit,
						children: "Return to camp"
					})]
				})
			]
		}) });
	}
	return null;
}
function Scrim({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center bg-void/75 p-3 backdrop-blur-[2px]",
		children
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-ink px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-widest text-mute",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-bone",
			children: v
		})]
	});
}
function labelRoom(t) {
	return t.toUpperCase();
}
function fmtTime(s) {
	return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
function Backdrop({ showHero = false }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		let raf = 0;
		let t = 0;
		const loop = () => {
			const parent = canvas.parentElement;
			if (!parent) return;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = parent.clientWidth;
			const h = parent.clientHeight;
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
				canvas.style.width = w + "px";
				canvas.style.height = h + "px";
			}
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.imageSmoothingEnabled = false;
			ctx.fillStyle = "#08080c";
			ctx.fillRect(0, 0, w, h);
			t += .008;
			const tw = 28;
			const th = 14;
			for (let y = 0; y < h + th; y += th) {
				const off = (y / th | 0) % 2 ? tw / 2 : 0;
				for (let x = -28; x < w + tw; x += tw) {
					ctx.fillStyle = Math.sin((x + y) * .05) * .5 + .5 > .55 ? "#14141c" : "#101018";
					ctx.fillRect(x + off, y, 27, 13);
				}
			}
			const g = ctx.createRadialGradient(w * .5, h * .35, 20, w * .5, h * .4, Math.max(w, h) * .7);
			g.addColorStop(0, "rgba(225,29,72,0.10)");
			g.addColorStop(.45, "rgba(8,8,12,0.2)");
			g.addColorStop(1, "rgba(8,8,12,0.92)");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
			ctx.fillStyle = "rgba(236,230,220,0.18)";
			for (let i = 0; i < 18; i++) {
				const mx = (i * 97 + t * 30) % (w + 40) - 20;
				const my = (i * 53 + Math.sin(t + i) * 20) % h;
				ctx.fillRect(mx, my, 2, 2);
			}
			if (showHero) try {
				const spr = getAtlas().heroes.zero.idle;
				const scale = Math.min(8, Math.floor(Math.min(w, h) / 42));
				const sw = spr.width * scale;
				const sh = spr.height * scale;
				ctx.globalAlpha = .95;
				ctx.drawImage(spr, (w - sw) / 2, h * .28, sw, sh);
				ctx.globalAlpha = 1;
			} catch {}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [showHero]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pointer-events-none absolute inset-0 h-full w-full"
	});
}
function GameApp() {
	const hydrate = useMeta((s) => s.hydrate);
	const screen = useMeta((s) => s.screen);
	const setScreen = useMeta((s) => s.setScreen);
	const save = useMeta((s) => s.save);
	const applyRun = useMeta((s) => s.applyRun);
	const [game, setGame] = (0, import_react.useState)(null);
	const applied = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		applyAudioSettings(save.settings);
	}, [save.settings]);
	(0, import_react.useEffect)(() => {
		const boot = () => unlockAudio();
		window.addEventListener("pointerdown", boot, { once: true });
		window.addEventListener("keydown", boot, { once: true });
		return () => {
			window.removeEventListener("pointerdown", boot);
			window.removeEventListener("keydown", boot);
		};
	}, []);
	const startRun = () => {
		applied.current = false;
		const g = new Game(useMeta.getState().save);
		g.startRun();
		setGame(g);
		setScreen("run");
		setMusic("dungeon");
	};
	const endRun = (retry) => {
		if (game && !applied.current) {
			applied.current = true;
			applyRun(game.stats.gold, game.stats.gems, game.stats.kills, game.stats.score, game.overlay === "victory");
		}
		if (retry) {
			startRun();
			return;
		}
		setGame(null);
		setScreen("hub");
		setMusic("menu");
	};
	const inRun = screen === "run" && game;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-void",
		children: [!inRun && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, { showHero: screen === "menu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden border-x border-line/80 bg-ink/80 shadow-[0_0_80px_rgba(0,0,0,0.65)] backdrop-blur-[1px] max-[480px]:border-x-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-full",
				children: [
					screen === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainMenu, { onPlay: () => setScreen("hub") }),
					screen === "hub" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hub, { onRun: startRun }),
					screen === "heroes" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroesScreen, {}),
					screen === "equipment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentScreen, {}),
					screen === "legacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegacyScreen, {}),
					screen === "missions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionsScreen, {}),
					screen === "codex" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodexScreen, {}),
					screen === "collection" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionScreen, {}),
					screen === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsScreen, {}),
					inRun && game && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunView, {
						game,
						onExit: () => endRun(false),
						onRetry: () => endRun(true)
					})
				]
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
