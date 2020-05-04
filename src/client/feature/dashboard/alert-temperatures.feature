Feature: Alert Beer Container Temperature out of range

    \When driving the truck,
    I want to be alerted when a beer container has a temperature out of its range
    so I can take some action to correct it.

    Scenario: Driver gets no alert when temperature equal the min temperature
        Given there is the following beer container with its real time temperature equal the min temperature
            | id | BeerName            | MinTemperature | MaxTemperature | Temperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            | 4           |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            | 5           |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            | 4           |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            | 6           |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            | 3           |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            | 4           |
        When the Driver is driving
        Then the Driver will not get an alert for the beer container:
            | id | BeerName            | IsAlerted |
            | 1  | Beer 1 (Pilsner)    | false     |
            | 2  | Beer 2 (IPA)        | false     |
            | 3  | Beer 3 (Lager)      | false     |
            | 4  | Beer 4 (Stout)      | false     |
            | 5  | Beer 5 (Wheat beer) | false     |
            | 6  | Beer 6 (Pale Ale)   | false     |

    Scenario: Driver gets no alert when temperature equal the max temperature
        Given there is the following beer container with its real time temperature equal the max temperature
            | id | BeerName            | MinTemperature | MaxTemperature | Temperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            | 6           |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            | 6           |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            | 7           |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            | 8           |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            | 5           |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            | 6           |
        When the Driver is driving
        Then the Driver will not get an alert for the beer container:
            | id | BeerName            | IsAlerted |
            | 1  | Beer 1 (Pilsner)    | false     |
            | 2  | Beer 2 (IPA)        | false     |
            | 3  | Beer 3 (Lager)      | false     |
            | 4  | Beer 4 (Stout)      | false     |
            | 5  | Beer 5 (Wheat beer) | false     |
            | 6  | Beer 6 (Pale Ale)   | false     |

    Scenario: Driver gets an alert when temperature lesser than the min temperature
        Given there is the following beer container with its real time temperature lesser than the min temperature
            | id | BeerName            | MinTemperature | MaxTemperature | Temperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            | 3           |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            | 4           |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            | 3           |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            | 5           |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            | 2           |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            | 3           |
        When the Driver is driving
        Then the Driver will get an alert for the beer container:
            | id | BeerName            | IsAlerted |
            | 1  | Beer 1 (Pilsner)    | true      |
            | 2  | Beer 2 (IPA)        | true      |
            | 3  | Beer 3 (Lager)      | true      |
            | 4  | Beer 4 (Stout)      | true      |
            | 5  | Beer 5 (Wheat beer) | true      |
            | 6  | Beer 6 (Pale Ale)   | true      |

    Scenario: Driver gets an alert when temperature greater than the max temperature
        Given there is the following beer container with its real time temperature greater than the max temperature
            | id | BeerName            | MinTemperature | MaxTemperature | Temperature |
            | 1  | Beer 1 (Pilsner)    | 4°C            | 6°C            | 7           |
            | 2  | Beer 2 (IPA)        | 5°C            | 6°C            | 7           |
            | 3  | Beer 3 (Lager)      | 4°C            | 7°C            | 8           |
            | 4  | Beer 4 (Stout)      | 6°C            | 8°C            | 9           |
            | 5  | Beer 5 (Wheat beer) | 3°C            | 5°C            | 6           |
            | 6  | Beer 6 (Pale Ale)   | 4°C            | 6°C            | 7           |
        When the Driver is driving
        Then the Driver will get an alert for the beer container:
            | id | BeerName            | IsAlerted |
            | 1  | Beer 1 (Pilsner)    | true      |
            | 2  | Beer 2 (IPA)        | true      |
            | 3  | Beer 3 (Lager)      | true      |
            | 4  | Beer 4 (Stout)      | true      |
            | 5  | Beer 5 (Wheat beer) | true      |
            | 6  | Beer 6 (Pale Ale)   | true      |
