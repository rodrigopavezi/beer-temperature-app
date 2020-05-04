Feature: View Beer Container Temperatures

    \When driving the truck,
    I want to see in an easy way all the beers container temperatures and ranges
    so I can be aware and be prepared if any of them are going out of the temperature range.

    Scenario: Driver sees beer container temperature ranges
        Given the Driver is on the driver seat
        When there is a container with the following beer:
            | id | BeerName            | MinTemperature | MaxTemperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            |
        Then the Driver can see the following container temperature range:
            | id | BeerName            | MinTemperature | MaxTemperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            |

    Scenario: Driver sees beer container temperatures
        Given there is the following beer container with the real time temperature:
            | id | BeerName            | MinTemperature | MaxTemperature | Temperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            | 4           |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            | 5           |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            | 4           |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            | 6           |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            | 3           |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            | 4           |
        When the Driver is driving
        Then the Driver can see the following container temperature:
            | BeerName            | Temperature |
            | Beer 1 (Pilsner)    | 4°C         |
            | Beer 2 (IPA)        | 5°C         |
            | Beer 3 (Lager)      | 4°C         |
            | Beer 4 (Stout)      | 6°C         |
            | Beer 5 (Wheat beer) | 3°C         |
            | Beer 6 (Pale Ale)   | 4°C         |


