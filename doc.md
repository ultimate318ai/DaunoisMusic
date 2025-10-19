Documentation of The Strudel Language
=====================================


# Motivation

This file will be updated as long as I will learn things about the language.

# Language commands

This part will contain some of the command I have learned.

## Sound

Sound can be make with ```sound(<sound>)```

With sound of insect, wind, jazz, metal, east, crow, casio, space, numbers, ...

Multiple samples can be used : ```sound(<sound>:<sample_number>)```

*Example:*

```js
sound("casio:1")
```

### Drum Sounds

Drum sounds are made with:

- bd => bass drum
- sd => snare drum
- rim => rimshot
- hh => hihat
- oh => open hihat
- lt => low tom
- mt => middle tom
- ht => high tom
- rd => ride cymbal
- cr => crash cymbal


*Example:*

```js
sound("bd hh sd oh")
```

You can also change the _sound_ of the drum using ```bank``` command.

*Example:*

```js
sound("bd hh sd oh").bank("RolandTR808")
```