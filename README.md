# Lovelace Water Heater Card

# THIS DOES NOT WORK!!!!  PROOF OF CONCEPT

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

A water heater control card for Home Assistant's Lovelace UI, based on the [simple-thermostat card](https://github.com/nervetattoo/simple-thermostat/).

## Compact mode

![Compact configuration](https://github.com/nervetattoo/simple-thermostat/raw/master/simple-thermostat-compact.png)

Example:

```yaml
type: custom:simple-thermostat
entity: water_heater.rheem_80g_heat_pump
```

## Installation

Use HACS

## Available configuration options:

- `entity` _string_: The water_heater entity id **required**
- `name` _string|false_: Override the card name, or disable showing a name at all. Default is to use the friendly_name of the thermostat provided
- `fallback` _string_: Specify a text to display if a valid set point can't be determined. Defaults to `N/A`
- `icon` _string|object_: Show an icon next to the card name. You can also pass an object to specify state-specific icons. Defaults state-specific icons radiator/radiator-disabled/snowflake
  - `idle`: _string_: Use this icon for state idle
  - `heating`: _string_ Use this icon for state heating
  - `cool`: _string_ Use this icon for state cool
- `step_size` _number_: Override the default 0.5 step size for increasing/decreasing the temperature
- `step_layout` _string_: `row` or `column` (default). Using `row` will make the card more compact
- `label` _object_: Override untranslated labels
  - `temperature`: _string_ Override Temperature label
  - `state`: _string_ Override State label
- `hide` _object_: Control specifically information fields to show. Defaults to showing everything
  - `temperature`: _bool_ (Default to `false`)
  - `state`: _bool_ (Default to `false`)
- `control` _object|array_ (From 0.27)
  - `_names` _bool_: Show mode names or not. Defaults to true
  - `_icons` _bool_: Show mode icons or not. Defaults to true
  - `_headings` _bool_: Show a heading for each mode button row. Defaults to true
  - `{type}` _object|bool_: The key of the mode type (hvac, preset, fan, swing)
    - `_name` \_string: Override the name of the mode type
    - `{mode}` _string_: Name of mode type to conttrol
      - `name` _string|bool_: Specify a custom name or set to `false` to show only the icon
      - `icon` _string|bool_: Specify a custom icon or set to `false` to not show icon
- `sensors` _array_
  - `entity` _string_: A sensor value entity id
  - `name` _string_: Specify a sensor name to use instead of the default friendly_name
  - `icon` _string_: Specify an icon to use instead of a name
  - `attribute` _string_: The key for an attribute to use instead of state. If this sensor has no entity it will use the main entity's attributes
  - `unit` _string_: When specifying an attribute you can manually set the unit to display

## Usage of the control config

The `control` config is most easily explained using a few examples as it supports both a simplified definition using just an array to list the types of modes to control. By default, with no config, it will show `hvac` and `preset` (if the entity supports it). You can replicate the default manually like this:

```yaml
control:
  - hvac
  - preset
```

This will list all modes for both types. You can get more fine grained control by switching to an object format and taking control of specific modes:

```yaml
control:
  preset:
    away: true
    none:
      name: Not set
```

What is worth noticing is that there is no merging of the default any more, so with this config you will not get `hvac_mode` displayed. If you still want it to display like default you need to set:

```yaml
control:
  preset:
    away: true
    none:
      name: Not set
  hvac: true
```

As previously you can define both `name` and `icon` on the individual modes, including setting them to `false`. What is new is that if you want to only show icons you can hide the names on all modes for the card (or vice versa for only showing names)

```yaml
control:
  _names: false
```

Please note that you need to quote off/on mode keys to not have them interprented as true/false.

```yaml
control:
  hvac:
    off: will not work
    "off": works
```

### Example usage:

```yaml
cards:
  - type: 'custom:water-heater-card'
    entity: water_heater.home
    sensors:
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_energy
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_power
        name: Energy today
      - attribute: min_temp
        name: Min temp
    control:
      hvac:
        some_mode: false
        another_mode: false
        'off':
          name: Make it cold
          icon: false
        'on':
          name: false
          icon: mdi:whitewalker
```

## Theme Control

For consistency this shares the same CSS theme controls as simple-thermostat.

## See Also

