# Cicrcle
import math
from functools import total_ordering


@total_ordering
class Circle:
    """A simple class representing a circle, defined by radius or diameter."""

    def __init__(self, radius=None, diameter=None):
        if radius is None and diameter is None:
            raise ValueError("You must specify either a radius or a diameter.")
        if radius is not None and diameter is not None:
            raise ValueError("Specify only one of radius or diameter, not both.")

        if radius is not None:
            self.radius = radius         
        else:
            self.diameter = diameter    



    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("Radius must be positive.")
        self._radius = value

    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        if value <= 0:
            raise ValueError("Diameter must be positive.")
        self._radius = value / 2

    # ---------- behavior ----------

    def area(self):
        return math.pi * self._radius ** 2

    # ---------- dunder methods ----------

    def __repr__(self):
        return f"Circle(radius={self._radius:.2f})"

    def __str__(self):
        return (
            f"Circle with radius {self._radius:.2f} "
            f"(diameter {self.diameter:.2f}, area {self.area():.2f})"
        )

    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(radius=self._radius + other._radius)

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self._radius == other._radius

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self._radius > other._radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self._radius < other._radius


if __name__ == "__main__":
    c1 = Circle(radius=4)
    c2 = Circle(diameter=10)   
    c3 = Circle(radius=4)

    print(c1)                     
    print(repr(c2))                
    print(f"c1 area: {c1.area():.2f}")
    print(f"c2 diameter: {c2.diameter}")

    c4 = c1 + c2                  
    print(f"c1 + c2 -> {c4}")

    print(f"c1 == c3: {c1 == c3}") 
    print(f"c2 > c1: {c2 > c1}")    

    circles = [c2, c1, c4, c3]
    circles.sort()               
    print("Sorted circles:")
    for c in circles:
        print(f"  {c}")