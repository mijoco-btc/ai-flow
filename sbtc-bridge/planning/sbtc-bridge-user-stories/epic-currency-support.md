---
description: Stories related to currency support
---

# Epic: Currency Support

Stories, gathered from user feedback, related to entry and display of amounts in various currencies and denominations.

## As a user I want to enter amount in my fiat currency

For depositing and withdrawing the default for entering amounts is fiat (this can be changed to bitcoin in settings see below). The default fiat currency will be taken from their locale information if available. USD will be used if no locale info is available. If the user has previously set their currency options then this will be the default.

1. User navigates to deposit or withdrawal form
2. User is prompted to enter amount in their preferred currency&#x20;
   1. If this is a fiat currency the amount will be converted to bitcoin and displayed below the input
   2. Otherwise the amount will be converted to the users preferred fiat and displayed below the input

## As a user I want to set my default fiat currency

Fiat currency defaults to USD. The user is able to change this in settings;

1. User opens the settings menu &#x20;
2. User selects currency options
3. User selects their preferred fiat currency

## As a user I want to set the denomination for displaying Bitcoin amounts

Default denomination for displaying Bitcoin (and sBTC) amounts is bitcoin. This can be changed to milli bitcoin or satoshi. Bitcoin amounts will be both entered and displayed in the chosen denomination.

1. User opens the settings menu (or user clicks icon near input field, go to 3)&#x20;
2. User selects currency options
3. User selects their preferred denomination for displaying bitcoin.
