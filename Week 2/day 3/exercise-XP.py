#1: Currencies
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        label = self.currency if self.amount == 1 else f"{self.currency}s"
        return f"{self.amount} {label}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        elif isinstance(other, (int, float)):
            return self.amount + other
        return NotImplemented

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, (int, float)):
            self.amount += other
        else:
            return NotImplemented
        return self

#3: Sring Method
import string
import random

def random_string(length=5):
    letters = string.ascii_letters
    result = ""
    for _ in range(length):
        result += random.choice(letters)
    return result

print(random_string())

#4: Current Date
import datetime

def show_current_date():
    today = datetime.date.today()
    print(today)

show_current_date()

#5: Time left until January 1st
import datetime

def time_until_new_year():
    now = datetime.datetime.now()
    next_new_year = datetime.datetime(now.year + 1, 1, 1)
    diff = next_new_year - now
    print(f"Time left until January 1st: {diff}")

time_until_new_year()

#6: Birthday and Minutes lived
import datetime

def minutes_lived(birthdate_str, fmt="%Y-%m-%d"):
    birthdate = datetime.datetime.strptime(birthdate_str, fmt)
    now = datetime.datetime.now()
    diff = now - birthdate
    minutes = diff.total_seconds() / 60
    print(f"You have lived approximately {int(minutes)} minutes.")

minutes_lived("2000-05-14")

#7: Faker module
# Run: pip install faker
from faker import Faker

fake = Faker()
users = []

def add_users(count):
    for _ in range(count):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user)

add_users(5)
print(users)

