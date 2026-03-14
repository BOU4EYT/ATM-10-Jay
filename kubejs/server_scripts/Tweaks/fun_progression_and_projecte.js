// This File has been authored by AllTheMods Staff, or a Community contributor for use in AllTheMods - AllTheMods 10.
// As all AllTheMods packs are licensed under All Rights Reserved, this file is not allowed to be used in any public packs not released by the AllTheMods Team, without explicit permission.

ServerEvents.recipes(event => {
  // Exploration convenience and lower grind for travel-heavy playthroughs
  event.shapeless(
    Item.of('minecraft:ender_eye', 4),
    ['minecraft:ender_pearl', 'minecraft:blaze_powder']
  ).id('allthemods:extra_ender_eyes')

  event.shaped(
    Item.of('minecraft:elytra'),
    [
      'PSP',
      'SNS',
      'PSP'
    ],
    {
      P: 'minecraft:phantom_membrane',
      S: 'minecraft:nether_star',
      N: 'minecraft:netherite_ingot'
    }
  ).id('allthemods:crafted_elytra')

  // ProjectE support: if present, make progression feel rewarding without long setup walls.
  if (Platform.isLoaded('projecte')) {
    event.shaped(
      Item.of('projecte:philosophers_stone'),
      [
        'RGR',
        'GDG',
        'RGR'
      ],
      {
        R: 'minecraft:redstone_block',
        G: 'minecraft:glowstone_dust',
        D: 'minecraft:diamond'
      }
    ).id('allthemods:projecte/philosophers_stone')

    event.shaped(
      Item.of('projecte:transmutation_table'),
      [
        'OEO',
        'ESE',
        'OEO'
      ],
      {
        O: 'minecraft:obsidian',
        E: 'minecraft:ender_eye',
        S: 'projecte:philosophers_stone'
      }
    ).id('allthemods:projecte/transmutation_table')

    event.shaped(
      Item.of('projecte:transmutation_tablet'),
      [
        'ESE',
        'DTD',
        'ESE'
      ],
      {
        E: 'minecraft:ender_eye',
        S: 'minecraft:nether_star',
        D: 'minecraft:diamond_block',
        T: 'projecte:transmutation_table'
      }
    ).id('allthemods:projecte/transmutation_tablet')
  }
})

// This File has been authored by AllTheMods Staff, or a Community contributor for use in AllTheMods - AllTheMods 10.
// As all AllTheMods packs are licensed under All Rights Reserved, this file is not allowed to be used in any public packs not released by the AllTheMods Team, without explicit permission.
