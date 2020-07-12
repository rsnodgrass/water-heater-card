# Water Heater Card for Lovelace

![beta_badge](https://img.shields.io/badge/maturity-Beta-yellow.png)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

A water heater card for Home Assistant's Lovelace UI, directly based on the [simple-thermostat](https://github.com/nervetattoo/simple-thermostat/) card.

![Example water heater card](https://github.com/rsnodgrass/water-heater-card/raw/master/example-card.png)

#### Not Implemented

This is a community developed Lovelace card, if you want features please implement them and submit a Pull Request.

- vacation/away mode support
- operation mode icons

## Example Card

```yaml
entity: water_heater.water_heater
type: 'custom:simple-thermostat'
step_layout: row
```

## Installation

Make sure that [Home Assistant Community Store (HACS)](https://github.com/custom-components/hacs) is setup, then add the "Lovelace" repository: rsnodgrass/water-heater-card.

## Available configuration options:

- `entity` _string_: The water_heater entity id **required**
- `name` _string|false_: Override the card name, or disable showing a name at all. Default is to use the friendly_name of the thermostat provided
- `sensors` _array_
  - `entity` _string_: A sensor value entity id
  - `name` _string_: Specify a sensor name to use instead of the default friendly_name
  - `icon` _string_: Specify an icon to use instead of a name
  - `attribute` _string_: The key for an attribute to use instead of state. If this sensor has no entity it will use the main entity's attributes
  - `unit` _string_: When specifying an attribute you can manually set the unit to display

### Example usage:

```yaml
cards:
  - type: 'custom:water-heater-card'
    entity: water_heater.bradford_white_50g
    sensors:
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_energy
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_power
        name: Energy today
```

## Theme Control

For consistency, this shares the same CSS theme controls as [simple-thermostat](https://github.com/nervetattoo/simple-thermostat/) card.
