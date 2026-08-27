#1: Temperature
from abc import ABC, abstractmethod

class Temperature(ABC):
    def __init__(self, degrees):
        self.degrees = degrees

    @abstractmethod
    def to_celsius(self):
        """Convert this temperature's value to Celsius (the common hub unit)."""
        ...

    @classmethod
    @abstractmethod
    def from_celsius(cls, celsius_value):
        """Build an instance of this class from a Celsius value."""
        ...

    def convert_to(self, target_cls):
        """Generic conversion: this class -> Celsius -> target class."""
        return target_cls.from_celsius(self.to_celsius())

    def __str__(self):
        return f"{self.degrees:.2f}{self.unit_symbol}"

    def __repr__(self):
        return f"{self.__class__.__name__}({self.degrees})"


class Celsius(Temperature):
    unit_symbol = "°C"

    def to_celsius(self):
        return self.degrees

    @classmethod
    def from_celsius(cls, celsius_value):
        return cls(celsius_value)


class Fahrenheit(Temperature):
    unit_symbol = "°F"

    def to_celsius(self):
        return (self.degrees - 32) * 5 / 9

    @classmethod
    def from_celsius(cls, celsius_value):
        return cls(celsius_value * 9 / 5 + 32)


class Kelvin(Temperature):
    unit_symbol = "K"

    def to_celsius(self):
        return self.degrees - 273.15

    @classmethod
    def from_celsius(cls, celsius_value):
        return cls(celsius_value + 273.15)

boiling = Celsius(100)
print(boiling.convert_to(Fahrenheit))
print(boiling.convert_to(Kelvin))    

#2: The Quantam Realm
import random

class QuantumParticle:
    _counter = 0

    def __init__(self, x=None, y=None, spin=None, name=None):
        QuantumParticle._counter += 1
        self.name = name or f"p{QuantumParticle._counter}"

        self.position_value = x if x is not None else random.randint(1, 10_000)
        self.momentum_value = y if y is not None else round(random.random(), 4)
        self.spin_value = spin if spin is not None else random.choice([0.5, -0.5])

        self.entangled_partner = None

    def _disturb(self):
        """Measuring any property disturbs position and momentum."""
        self.position_value = random.randint(1, 10_000)
        self.momentum_value = round(random.random(), 4)
        print("Quantum Interferences!!")

    def position(self):
        self._disturb()
        return self.position_value

    def momentum(self):
        self._disturb()
        return self.momentum_value

    def spin(self):
        self.spin_value = random.choice([0.5, -0.5])
        self._disturb()
        if self.entangled_partner is not None:
            self.entangled_partner.spin_value = -self.spin_value
            print("Spooky Action at a Distance !!")
        return self.spin_value

    def entangle(self, other):
        if not isinstance(other, QuantumParticle):
            raise TypeError("Can only entangle a QuantumParticle with another QuantumParticle")
        self.entangled_partner = other
        other.entangled_partner = self
        print(f"Particle {self.name} is now in quantum entanglement with Particle {other.name}")

    def __repr__(self):
        return (f"QuantumParticle(name={self.name!r}, position={self.position_value}, "
                f"momentum={self.momentum_value}, spin={self.spin_value})")

p1 = QuantumParticle(x=1, y=5.0)
p2 = QuantumParticle(x=2, y=5.0)
p1.entangle(p2)

p1.spin()
